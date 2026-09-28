'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Icon from '@/components/agria/icons/Icon';
import { CONSENT_EVENT, CONSENT_REOPEN_EVENT, hasValidConsent } from '@/lib/consent';
import { containsPersonalData, findAnswer } from '@/lib/assistant/match';
import { answers, assistant } from '@/content/agria/assistente';
import styles from './Assistant.module.css';

const STORAGE_KEY = 'agria-assistant-open';
const byId = Object.fromEntries(answers.map((answer) => [answer.id, answer]));
const whatsappHref = `${assistant.handoff.whatsapp.href}?text=${encodeURIComponent(assistant.handoff.whatsappMessage)}`;

function readOpen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeOpen(open) {
  try {
    sessionStorage.setItem(STORAGE_KEY, open ? '1' : '0');
  } catch {
    // archiviazione non disponibile: lo stato vale solo per la pagina
  }
}

// Messaggio dell'assistente da una risposta curata
const reply = (answer) => ({ from: 'bot', text: answer.text, links: answer.links, handoff: answer.handoff });

// Assistente in basso a destra (Prompt 15, fase C), montato nel punto di
// innesto del layout: presente su tutte le pagine. Risposte curate in
// content/agria/assistente.js, nessun modello AI, nessun dato registrato: la
// conversazione vive solo in memoria. Dichiara di essere automatico.
// - Chiuso di default; lo stato aperto/chiuso resta durante la navigazione
//   (il layout non si smonta) e dopo un ricaricamento (sessionStorage).
// - Non compare mentre il banner dei cookie è aperto, per non coprirlo.
// - Esc chiude e riporta il focus sul pulsante; il focus va al campo
//   all'apertura; le risposte sono annunciate (aria-live).
// - Su mobile il riquadro occupa il fondo dello schermo solo se aperto; chiuso
//   resta un pulsante rotondo di 48 px.
export default function Assistant() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [messages, setMessages] = useState(() => [{ from: 'bot', text: assistant.greeting }]);
  const [draft, setDraft] = useState('');
  const baseId = useId();
  const pillRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    setOpen(readOpen());
    setBannerOpen(!hasValidConsent());
    setReady(true);
    const onConsent = () => setBannerOpen(false);
    const onReopen = () => setBannerOpen(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
    };
  }, []);

  const setOpenState = useCallback((value, { returnFocus = false } = {}) => {
    setOpen(value);
    writeOpen(value);
    if (!value && returnFocus) requestAnimationFrame(() => pillRef.current?.focus());
  }, []);

  // focus sul campo all'apertura
  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  // l'ultimo messaggio resta visibile
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, open]);

  // Esc chiude, ovunque sia il focus dentro il riquadro
  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === 'Escape') setOpenState(false, { returnFocus: true });
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpenState]);

  function ask(question, answerId) {
    const text = question.trim();
    if (!text) return;
    // il suggerimento usato sparisce: il focus torna al campo
    inputRef.current?.focus({ preventScroll: true });
    if (!answerId && containsPersonalData(text)) {
      setMessages((current) => [
        ...current,
        { from: 'user', text: [assistant.personalDataPlaceholder], muted: true },
        { from: 'bot', text: assistant.personalData, handoff: true },
      ]);
      return;
    }
    const answer = answerId ? byId[answerId] : findAnswer(text, answers);
    setMessages((current) => [
      ...current,
      { from: 'user', text: [text] },
      answer ? reply(answer) : { from: 'bot', text: assistant.fallback, handoff: true },
    ]);
  }

  function onSubmit(event) {
    event.preventDefault();
    ask(draft);
    setDraft('');
  }

  if (!ready || bannerOpen) return null;

  const panelId = `${baseId}-panel`;
  const titleId = `${baseId}-title`;
  const asked = new Set(messages.filter((m) => m.from === 'user').map((m) => m.text[0]));
  const suggestions = assistant.suggestions.map((id) => byId[id]).filter((a) => a && !asked.has(a.question));

  return (
    <div className={styles.root}>
      {open && (
        <section id={panelId} role="dialog" aria-modal="false" aria-labelledby={titleId} className={styles.panel}>
          <header className={styles.header}>
            <span className={styles.avatar} aria-hidden="true">
              <Icon name="chat" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className={styles.title}>
                {assistant.name}
              </h2>
              <p className={styles.disclosure}>{assistant.disclosure}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpenState(false, { returnFocus: true })}
              aria-label={assistant.closeLabel}
              className={styles.close}
            >
              <span className={styles.closeGlyph} aria-hidden="true" />
            </button>
          </header>

          <ol ref={logRef} className={styles.log} aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <li key={index} className={styles[message.from]} data-muted={message.muted || undefined}>
                <span className="sr-only">{message.from === 'bot' ? `${assistant.name}: ` : 'Voi: '}</span>
                {message.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {message.links?.length > 0 && (
                  <ul className={styles.links}>
                    {message.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={styles.link} onClick={() => setOpenState(false)}>
                          {link.label}
                          <Icon name="arrow-right" size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {message.handoff && (
                  <div className={styles.handoff}>
                    <p>{assistant.handoff.text}</p>
                    <div className={styles.handoffActions}>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryAction}
                        data-analytics="whatsapp"
                        data-analytics-location="assistente"
                      >
                        <Icon name="chat" size={16} />
                        {assistant.handoff.whatsapp.label}
                      </a>
                      <Link href={assistant.handoff.form.href} className={styles.secondaryAction} onClick={() => setOpenState(false)}>
                        <Icon name="file-text" size={16} />
                        {assistant.handoff.form.label}
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>

          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              <p className="sr-only">{assistant.suggestionsLabel}</p>
              <ul>
                {suggestions.map((answer) => (
                  <li key={answer.id}>
                    <button type="button" className={styles.suggestion} onClick={() => ask(answer.question, answer.id)}>
                      {answer.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form className={styles.form} onSubmit={onSubmit}>
            <label htmlFor={`${baseId}-input`} className="sr-only">
              {assistant.inputLabel}
            </label>
            <input
              ref={inputRef}
              id={`${baseId}-input`}
              type="text"
              autoComplete="off"
              maxLength={300}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={assistant.inputPlaceholder}
              className={styles.input}
            />
            <button type="submit" className={styles.send} aria-label={assistant.send} disabled={!draft.trim()}>
              <Icon name="arrow-right" size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        ref={pillRef}
        type="button"
        className={styles.pill}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? assistant.closeLabel : assistant.openLabel}
        onClick={() => setOpenState(!open, { returnFocus: false })}
        data-open={open || undefined}
      >
        <Icon name={open ? 'minus' : 'chat'} size={20} />
        <span className={styles.pillText} aria-hidden="true">
          {assistant.pillText}
        </span>
      </button>
    </div>
  );
}
