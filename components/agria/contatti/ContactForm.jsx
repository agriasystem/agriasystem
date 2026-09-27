'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { Button, Input, Textarea } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { trackLead } from '@/lib/analytics';
import { form as copy } from '@/content/agria/contatti';
import {
  EMPTY_VALUES,
  HONEYPOT,
  LIMITS,
  PHONE_PREFIXES,
  PREFERENCES,
  SECTORS,
  SERVICES,
  STEPS,
  TIMINGS,
  validateAll,
  validateStep,
} from '@/lib/contact/fields';
import styles from './ContactForm.module.css';

const ENDPOINT = '/api/contact';
const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = 'contact_form';

// Carica reCAPTCHA v3 una sola volta (badge nascosto, avviso sotto il pulsante).
let recaptchaLoading = null;
function loadRecaptcha() {
  if (!RECAPTCHA_KEY || typeof window === 'undefined') return Promise.resolve(null);
  if (window.grecaptcha?.execute) return Promise.resolve(window.grecaptcha);
  if (!recaptchaLoading) {
    recaptchaLoading = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_KEY)}`;
      script.async = true;
      script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha));
      script.onerror = () => {
        recaptchaLoading = null;
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }
  return recaptchaLoading;
}

// Token appena generato (vale due minuti e un solo uso). Senza token il server
// rifiuta la richiesta con il messaggio di verifica non riuscita.
async function recaptchaToken() {
  const timeout = new Promise((resolve) => setTimeout(() => resolve(''), 8000));
  const token = (async () => {
    const grecaptcha = await loadRecaptcha();
    if (!grecaptcha) return '';
    return grecaptcha.execute(RECAPTCHA_KEY, { action: RECAPTCHA_ACTION });
  })().catch(() => '');
  return Promise.race([token, timeout]);
}

// Gruppo di scelte esclusive con radio nativi: frecce per cambiare scelta,
// Tab per uscire dal gruppo, nessun codice di tastiera da mantenere.
// variant: 'cardChoice' (icona, titolo, descrizione), 'tile' (icona e titolo),
// 'pill' (solo testo), 'option' (riga con icona e descrizione).
function ChoiceGroup({ id, name, legend, options, value, onChange, error, variant, className = '' }) {
  const errorId = `${id}-error`;
  return (
    <fieldset
      id={id}
      className={className}
      aria-describedby={error ? errorId : undefined}
      data-invalid={error ? '' : undefined}
    >
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles[`${variant}Grid`]}>
        {options.map((option) => {
          const item = typeof option === 'string' ? { value: option } : option;
          const checked = value === item.value;
          return (
            <label key={item.value} className={styles[variant]} data-checked={checked || undefined}>
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={checked}
                onChange={() => onChange(item.value)}
                required
                className={styles.radio}
              />
              {item.icon && variant !== 'pill' && (
                <span className={styles.choiceIcon} aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
              )}
              <span className={styles.choiceText}>
                <span className={styles.choiceLabel}>{item.label || item.value}</span>
                {item.description && variant !== 'tile' && (
                  <span className={styles.choiceDescription}>{item.description}</span>
                )}
              </span>
              {variant !== 'pill' && (
                <span className={styles.choiceCheck} aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
              )}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

// Modulo contatti in tre passi (Prompt 15). Validazione per passo, errori
// sotto il campo, riepilogo delle scelte fatte, invio a /api/contact.
// Senza JavaScript i tre passi sono visibili uno sotto l'altro e un avviso
// spiega che per l'invio serve JavaScript (i pulsanti non compaiono).
// moduleLabels: { id: etichetta } dei moduli del configuratore in homepage,
// per precompilare il messaggio quando si arriva con ?moduli=.
export default function ContactForm({ moduleLabels = {} }) {
  const baseId = useId();
  const fid = (name) => `${baseId}-${name}`;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | error | error-message | done
  const [serverMessage, setServerMessage] = useState(null);
  const sendingRef = useRef(false);
  const submissionIdRef = useRef(null);
  const legendRefs = useRef([]);
  const successRef = useRef(null);
  const movedRef = useRef(false);

  // identificativo della richiesta: il server lo usa per scartare i doppi invii
  useEffect(() => {
    submissionIdRef.current =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }, []);

  // reCAPTCHA si carica solo quando il visitatore inizia a compilare il modulo
  // (primo focus o prima interazione), non all'apertura della pagina
  const startRecaptcha = () => {
    loadRecaptcha();
  };

  // arrivo dal configuratore della homepage: moduli scelti nel messaggio
  useEffect(() => {
    const ids = new URLSearchParams(window.location.search).getAll('moduli');
    const labels = ids.map((id) => moduleLabels[id]).filter(Boolean);
    if (labels.length) {
      setValues((current) => (current.messaggio ? current : { ...current, messaggio: copy.modulesNote(labels) }));
    }
  }, [moduleLabels]);

  // cambio di passo: il focus va al titolo del nuovo passo
  useEffect(() => {
    if (!movedRef.current) return;
    legendRefs.current[step]?.focus();
  }, [step]);

  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
  }, [status]);

  function set(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
    if (status === 'error') setStatus('idle');
  }

  function focusFirstError(found) {
    const first = STEPS.flatMap((s) => s.fields).find((field) => found[field]);
    if (!first) return;
    const target = document.getElementById(fid(first));
    const focusable = target?.matches('input, select, textarea') ? target : target?.querySelector('input, select, textarea');
    focusable?.focus();
  }

  function goTo(index) {
    movedRef.current = true;
    setDirection(index > step ? 'forward' : 'back');
    setStep(index);
  }

  function next() {
    const found = validateStep(values, step);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError(found);
      return;
    }
    goTo(step + 1);
  }

  async function submit(event) {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      next();
      return;
    }
    if (sendingRef.current || status === 'done') return;

    const found = validateAll(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const firstStep = STEPS.findIndex((s) => s.fields.some((field) => found[field]));
      if (firstStep !== step) goTo(firstStep);
      else focusFirstError(found);
      return;
    }

    sendingRef.current = true;
    setStatus('sending');
    try {
      const token = await recaptchaToken();
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          submissionId: submissionIdRef.current,
          pageUri: window.location.href,
          pageName: document.title,
          recaptchaToken: token,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus(data.message ? 'error-message' : 'error');
        setServerMessage(data.message || null);
        sendingRef.current = false;
        return;
      }
      trackLead({ preference: values.preferenza, sector: values.settore, service: values.servizio });
      if (data.next === 'calendario') {
        // calendario di Alessandro: giorno e ora li sceglie il visitatore
        window.location.assign(copy.meetingsUrl);
        return; // resta in "invio" fino al cambio pagina: nessun secondo invio
      }
      setStatus('done');
    } catch {
      setStatus('error');
      sendingRef.current = false;
    }
  }

  const sending = status === 'sending';
  const hasErrors = Object.keys(errors).length > 0;
  const summaries = [
    [SECTORS.find((s) => s.value === values.settore)?.label, values.azienda.trim()],
    [values.servizio, values.tempistica],
  ];

  if (status === 'done') {
    return (
      <div className={styles.card}>
        <div ref={successRef} tabIndex={-1} className={styles.success} role="status">
          <span className={styles.successIcon} aria-hidden="true">
            <Icon name="check" size={24} />
          </span>
          <h2 className="font-agria-sans text-agria-h2 text-agria-graphite">{copy.success.title}</h2>
          <p className="max-w-[46ch] font-agria-sans text-agria-lg text-agria-grey">{copy.success.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <form
        noValidate
        onSubmit={submit}
        onFocusCapture={startRecaptcha}
        onPointerDownCapture={startRecaptcha}
        aria-labelledby={fid('title')}
        data-direction={direction}
      >
        <div className={styles.head}>
          <h2 id={fid('title')} className="font-agria-sans text-agria-h3 text-agria-graphite">
            {copy.title}
          </h2>
          <p className={styles.progressText} aria-live="polite">
            <span className={styles.jsOnly}>
              {copy.progress(step + 1, STEPS.length)} · {STEPS[step].title}
            </span>
          </p>
        </div>

        <ol className={`${styles.stepper} ${styles.jsOnly}`}>
          {STEPS.map((s, index) => {
            const state = index < step ? 'done' : index === step ? 'current' : 'todo';
            return (
              <li key={s.key} data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
                <span className={styles.stepperBar} aria-hidden="true" />
                <span className={styles.stepperLabel}>
                  <span className="font-agria-mono">{String(index + 1).padStart(2, '0')}</span> {s.title}
                </span>
              </li>
            );
          })}
        </ol>

        {step > 0 && (
          <dl className={styles.summary}>
            {summaries.slice(0, step).map((parts, index) => (
              <div key={STEPS[index].key} className={styles.summaryRow}>
                <dt className={styles.summaryLabel}>{STEPS[index].title}</dt>
                <dd className={styles.summaryValue}>{parts.filter(Boolean).join(' · ')}</dd>
                <dd>
                  <button type="button" className={styles.summaryEdit} onClick={() => goTo(index)}>
                    {copy.actions.edit}
                    <span className="sr-only">: {STEPS[index].title}</span>
                  </button>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className={styles.requiredNote}>{copy.requiredNote}</p>

        {/* Passo 1 — L'azienda */}
        <fieldset className={styles.step} data-current={step === 0 || undefined}>
          <legend
            ref={(el) => {
              legendRefs.current[0] = el;
            }}
            tabIndex={-1}
            className={styles.stepTitle}
          >
            <span className="font-agria-mono text-agria-label text-agria-green-dark">01</span> {STEPS[0].title}
          </legend>
          <ChoiceGroup
            id={fid('settore')}
            name="settore"
            legend={copy.labels.settore}
            options={SECTORS}
            value={values.settore}
            onChange={(v) => set('settore', v)}
            error={errors.settore}
            variant="cardChoice"
          />
          <Input
            id={fid('azienda')}
            name="azienda"
            label={copy.labels.azienda}
            placeholder={copy.labels.aziendaPlaceholder}
            autoComplete="organization"
            maxLength={LIMITS.azienda}
            required
            value={values.azienda}
            onChange={(e) => set('azienda', e.target.value)}
            error={errors.azienda}
          />
        </fieldset>

        {/* Passo 2 — Il progetto */}
        <fieldset className={styles.step} data-current={step === 1 || undefined}>
          <legend
            ref={(el) => {
              legendRefs.current[1] = el;
            }}
            tabIndex={-1}
            className={styles.stepTitle}
          >
            <span className="font-agria-mono text-agria-label text-agria-green-dark">02</span> {STEPS[1].title}
          </legend>
          <ChoiceGroup
            id={fid('servizio')}
            name="servizio"
            legend={copy.labels.servizio}
            options={SERVICES}
            value={values.servizio}
            onChange={(v) => set('servizio', v)}
            error={errors.servizio}
            variant="tile"
          />
          <ChoiceGroup
            id={fid('tempistica')}
            name="tempistica"
            legend={copy.labels.tempistica}
            options={TIMINGS}
            value={values.tempistica}
            onChange={(v) => set('tempistica', v)}
            error={errors.tempistica}
            variant="pill"
          />
          <Textarea
            id={fid('messaggio')}
            name="messaggio"
            label={
              <>
                {copy.labels.messaggio} <span className={styles.optional}>{copy.labels.messaggioHint}</span>
              </>
            }
            placeholder={copy.labels.messaggioPlaceholder}
            maxLength={LIMITS.messaggio}
            rows={4}
            value={values.messaggio}
            onChange={(e) => set('messaggio', e.target.value)}
            error={errors.messaggio}
          />
        </fieldset>

        {/* Passo 3 — I contatti */}
        <fieldset className={styles.step} data-current={step === 2 || undefined}>
          <legend
            ref={(el) => {
              legendRefs.current[2] = el;
            }}
            tabIndex={-1}
            className={styles.stepTitle}
          >
            <span className="font-agria-mono text-agria-label text-agria-green-dark">03</span> {STEPS[2].title}
          </legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id={fid('nome')}
              name="nome"
              label={copy.labels.nome}
              autoComplete="given-name"
              maxLength={LIMITS.nome}
              required
              value={values.nome}
              onChange={(e) => set('nome', e.target.value)}
              error={errors.nome}
            />
            <Input
              id={fid('cognome')}
              name="cognome"
              label={copy.labels.cognome}
              autoComplete="family-name"
              maxLength={LIMITS.cognome}
              required
              value={values.cognome}
              onChange={(e) => set('cognome', e.target.value)}
              error={errors.cognome}
            />
          </div>
          <Input
            id={fid('email')}
            name="email"
            type="email"
            inputMode="email"
            label={copy.labels.email}
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            error={errors.email}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor={fid('telefono')} className="font-agria-sans text-agria-sm font-medium text-agria-graphite">
              {copy.labels.telefono}
            </label>
            <div className={styles.phone}>
              <select
                aria-label={copy.labels.prefisso}
                name="prefisso"
                autoComplete="tel-country-code"
                value={values.prefisso}
                onChange={(e) => set('prefisso', e.target.value)}
                className={styles.prefix}
              >
                {PHONE_PREFIXES.map((prefix) => (
                  <option key={prefix.value} value={prefix.value}>
                    {prefix.label}
                  </option>
                ))}
              </select>
              <input
                id={fid('telefono')}
                name="telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                required
                maxLength={24}
                value={values.telefono}
                onChange={(e) => set('telefono', e.target.value)}
                aria-invalid={errors.telefono ? true : undefined}
                aria-describedby={errors.telefono ? `${fid('telefono')}-error` : undefined}
                className={styles.phoneInput}
                data-invalid={errors.telefono ? '' : undefined}
              />
            </div>
            {errors.telefono && (
              <p id={`${fid('telefono')}-error`} className={styles.error}>
                {errors.telefono}
              </p>
            )}
          </div>
          <ChoiceGroup
            id={fid('preferenza')}
            name="preferenza"
            legend={copy.labels.preferenza}
            options={PREFERENCES}
            value={values.preferenza}
            onChange={(v) => set('preferenza', v)}
            error={errors.preferenza}
            variant="option"
          />
          <div id={fid('privacy')} className="flex flex-col gap-2">
            <label className={styles.consent}>
              <input
                type="checkbox"
                name="privacy"
                required
                checked={values.privacy}
                onChange={(e) => set('privacy', e.target.checked)}
                aria-invalid={errors.privacy ? true : undefined}
                aria-describedby={errors.privacy ? `${fid('privacy')}-error` : undefined}
                className={styles.checkbox}
              />
              <span>
                {copy.labels.privacyBefore}
                <Link href={copy.privacyHref} target="_blank" className={styles.inlineLink}>
                  {copy.labels.privacyLink}
                </Link>
                {copy.labels.privacyAfter}
              </span>
            </label>
            {errors.privacy && (
              <p id={`${fid('privacy')}-error`} className={`${styles.error} pl-8`}>
                {errors.privacy}
              </p>
            )}
          </div>
        </fieldset>

        {/* campo trappola: invisibile, fuori dal percorso di tastiera */}
        <div className={styles.trap} aria-hidden="true">
          <label>
            Sito web
            <input
              type="text"
              name={HONEYPOT}
              tabIndex={-1}
              autoComplete="off"
              value={values[HONEYPOT]}
              onChange={(e) => set(HONEYPOT, e.target.value)}
            />
          </label>
        </div>

        <noscript>
          <p className={styles.noscript}>{copy.noScript}</p>
        </noscript>

        <div className={styles.feedback} aria-live="assertive">
          {hasErrors && status !== 'error' && status !== 'error-message' && (
            <p className={styles.error}>{copy.errorSummary}</p>
          )}
          {status === 'error' && <p className={styles.error}>{copy.sendError}</p>}
          {status === 'error-message' && serverMessage && <p className={styles.error}>{serverMessage}</p>}
        </div>

        <div className={styles.actions}>
          {step > 0 ? (
            <Button variant="ghost" onClick={() => goTo(step - 1)} disabled={sending}>
              {copy.actions.back}
            </Button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <Button type="submit" variant="primary">
              {copy.actions.next}
              <Icon name="arrow-right" size={16} />
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={sending} aria-busy={sending || undefined}>
              {sending && <span className={styles.spinner} aria-hidden="true" />}
              {sending ? copy.actions.sending : copy.actions.submit}
            </Button>
          )}
        </div>
        <p className={`${styles.recaptchaNote} ${styles.jsOnly}`}>
          {copy.recaptcha.before}
          <a href={copy.recaptcha.privacyHref} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
            {copy.recaptcha.privacy}
          </a>
          {copy.recaptcha.middle}
          <a href={copy.recaptcha.termsHref} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
            {copy.recaptcha.terms}
          </a>
          {copy.recaptcha.after}
        </p>
      </form>
    </div>
  );
}
