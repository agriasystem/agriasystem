# AGRIA — Prompt 17: GA4, ruoli, foto e pagina Azienda

**Data:** 2026-09-28
**Branch:** `agria/contenuti` (da `main` 5c6e60f). Nessun merge in `main` senza approvazione.

| Commit | Contenuto |
|---|---|
| `b4c221e feat(agria): GA4 con consenso e evento generate_lead` | Fase A |
| `91f3f75 feat(agria): ruoli aggiornati e fotografie del team` | Fase B e B2 |
| `feat(agria): copy definitivo della pagina Azienda` | Fase C e questo report |

## 1. GA4: architettura

- **gtag.js diretto**, nessun Google Tag Manager, nessun Google Ads. Identificativo da `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-H1SRV38J0Q` su Vercel), mai scritto nel codice.
- `lib/consent.js`: scelta in localStorage `analytics_consent` = `granted` | `denied`; nessun valore = scelta non fatta. Rimuove la vecchia chiave `mg_cookie_consent_v1`.
- `lib/analytics.js`: `enableAnalytics`, `disableAnalytics`, `trackEvent`, `trackLead`, `trackFormStart`, `trackWhatsappClick`.
- `components/agria/consent/AnalyticsConsent.jsx`: nel layout del sito, montato una volta per visita; applica la scelta salvata e segue i cambi.
- `components/CookieConsentBanner.jsx`: avviso con "Rifiuta" e "Accetta statistiche" di pari aspetto, link a cookie e privacy policy; "Preferenze cookie" nel footer lo riapre mostrando la scelta attuale.

### Comportamento

| Momento | Cosa succede |
|---|---|
| Prima della scelta | gtag.js non caricato, nessuna richiesta verso Google, nessun `dataLayer` |
| Rifiuto | Come sopra; scelta persistente, l'avviso non ricompare |
| Consenso | `consent default` con `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` su `denied`; `consent update` con solo `analytics_storage: granted`; `js` e un solo `config`; gtag.js caricato una volta (Consent Mode base) |
| Navigazione interna | Nessun nuovo caricamento, nessun `page_view` manuale: i cambi pagina li rileva la misurazione avanzata dello stream (cronologia del browser, attiva) |
| Revoca | `consent update` a `denied`, `ga-disable-<ID>` attivo, cookie `_ga` e `_ga_*` rimossi dal dominio (i tecnici restano); nessun evento successivo |

### Eventi

| Evento | Quando | Parametri |
|---|---|---|
| `page_view` | Configurazione (prima pagina) e misurazione avanzata (cambi pagina) | automatici |
| `generate_lead` | Solo dopo la risposta positiva di `/api/contact`, solo con consenso. Mai su errore di reCAPTCHA, errore del server o clic sul pulsante | `request_type`: `information` \| `videocall`; `service_category`: `digital_presence` \| `digital_commerce` \| `digital_automation` \| `software_products` \| `undefined` |
| `contact_form_start` | Prima interazione con il modulo contatti (nome diverso da `form_start` della misurazione avanzata) | `form_name: contatti` |
| `whatsapp_click` | Clic sui collegamenti WhatsApp | `location`: `contatti` \| `assistente` |

Omesso il clic sul calendario: dopo una richiesta di videocall il reindirizzamento è automatico e `generate_lead` con `videocall` lo copre. Nello stream: conservazione 14 mesi, interazioni con i moduli disattivate (nessun `form_submit`).

**Dati personali:** mai inviati. Nessun nome, cognome, email, telefono, azienda, messaggio, identificativo HubSpot, del task o della richiesta. Verificato nel test sul `dataLayer` completo dopo un invio reale al server simulato.

## 2. Pagine legali (aggiornate al 28 settembre 2026)

- Privacy: dati statistici solo con consenso; finalità "statistiche aggregate", base giuridica consenso (art. 6.1.a) revocabile da "Preferenze cookie"; Google Analytics 4 tra i fornitori (funzioni pubblicitarie disattivate); trasferimenti extra UE; conservazione "al massimo 14 mesi", cookie fino a 2 anni secondo la documentazione di Google.
- Cookie policy: via "solo cookie tecnici"; distinzione tra strumenti tecnici necessari (`analytics_consent`, sessionStorage dell'assistente, reCAPTCHA per la sicurezza) e strumenti statistici facoltativi (GA4, cookie `_ga` e `_ga_<ID>`), con attivazione, base giuridica, trasferimento e revoca.

## 3. Ruoli

| Persona | Ruolo |
|---|---|
| Matteo Garuzzo | CEO & CTO |
| Matteo De Pilla | Co-Founder, Head of Engineering & AI |
| Alessandro Poponi | Co-Founder, Head of Sales & Business Development |

Trovati e aggiornati: `content/agria/azienda.js` (unica occorrenza visibile), `content/team.js` e `components/blog/AuthorBox.jsx` (legacy, non usati da pagine vive). Aggiunti nei dati strutturati di `/azienda`: `Organization.employee` con tre `Person` e `jobTitle`. Non toccati: `content/testimonials.js` (da eliminare nella pulizia legacy), i report storici `docs/agria/01-audit-report.md` e `docs/AUDIT-STRATEGIA-MG-SOLUTIONS.md`, le pagine legali (soggetto: Matteo Garuzzo, libero professionista).

## 4. Fotografie del team

Servizio fotografico unico (tre ritratti verticali 3456×5184, 3,6 MB ciascuno), stesso taglio quadrato per tutti e tre (larghezza piena, dalla stessa altezza), 800×800, bianco e nero, JPEG ottimizzato. `next/image`, `alt` con nome e ruolo, stesse card e stessa interazione.

| File | Peso |
|---|---|
| `matteo-garuzzo.jpg` | 70 KB |
| `matteo-de-pilla.jpg` | 69 KB |
| `alessandro-poponi.jpg` | 73 KB |

Gli originali sono passati da un branch temporaneo (`foto-team-originali`, poi cancellato) e non sono nella storia di `agria/contenuti` né di `main`. Eliminati dal repository i duplicati con spazi nel nome e il vecchio png.

## 5. Pagina Azienda

Copy definitivo in `content/agria/azienda.js`, title e description nuovi. Struttura e interazioni invariate; aggiunti: titolo e introduzione del team, etichetta della linea temporale, CTA a metà pagina dopo il percorso (`components/agria/azienda/MidCta.jsx`). Ordine allineato al copy: hero, perché tre settori, principi, persone, percorso e CTA, ricerca e sviluppo, territorio, dati aziendali, CTA finale. Dati aziendali: "Agria System è il marchio con cui opera Matteo Garuzzo, libero professionista." con indirizzo, P.IVA, email e telefono.

## 6. Test e build

- Test automatico del consenso (browser, gtag.js e reCAPTCHA intercettati, server con HubSpot simulato): 26/26. Prima della scelta e dopo il rifiuto nessuna richiesta; consenso con un solo caricamento e un solo `config`; navigazione senza doppioni; `generate_lead` una volta dopo invio riuscito, mai su errore del server o reCAPTCHA fallito; nessun dato personale; revoca senza eventi successivi e con cookie GA rimossi.
- Regressione del modulo contatti (HubSpot, Resend, reCAPTCHA simulati): 28/28 identici.
- Build e lint puliti a ogni fase.
