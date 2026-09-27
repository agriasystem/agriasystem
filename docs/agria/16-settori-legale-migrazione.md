# AGRIA — Fase 2 prima del lancio: settori, articoli, pagine legali, migrazione

**Data:** 2026-09-27
**Branch:** `agria/redesign`, poi `main` (Production su Vercel)
**Stato:** completata; merge in `main` dopo le verifiche finali.

## 1. Cosa contiene

| Area | File principali |
|---|---|
| Pagine settore `/settori/hospitality`, `/settori/cantine`, `/settori/frantoi` e indice `/settori`, composte da testi approvati | `content/agria/settori.js`, `components/agria/sector/SectorPage.jsx` |
| 13 articoli mantenuti nel layout Agria, pulizia minima (prezzi, casi concept, riferimenti legacy, link alle destinazioni finali); indice `/blog` (Insights) | `app/(site)/blog/`, `content/blog/kept.js`, `content/blog/posts/*` |
| Privacy policy, cookie policy, termini, note legali | `content/agria/legale.js`, `components/agria/legal/LegalPage.jsx` |
| Crediti fotografici generati dai crediti Unsplash delle foto pubblicate | `app/(site)/crediti-immagini/page.jsx` |
| Migrazione degli indirizzi: 301 alle destinazioni finali, 410, vecchio dominio → agriasystem.com senza catene | `lib/migration.js`, `middleware.js` |
| Sitemap (29 indirizzi indicizzabili) e robots | `app/sitemap.js`, `app/robots.js` |
| Verifica automatica della mappa | `node scripts/verify-migration.mjs <url>` |
| Dati del sito: recapiti Agria, titolare, immagine social | `content/site.js`, `scripts/og-image.mjs` |
| reCAPTCHA caricato solo quando si inizia a compilare il modulo; banner cookie senza Calendly | `components/agria/contatti/ContactForm.jsx`, `components/CookieConsentBanner.jsx` |

| Pagina 404 nel layout Agria (stato 404, noindex) per ogni indirizzo senza pagina | `app/(site)/not-found.jsx`, `app/(site)/[...pagina]/page.jsx` |
| Favicon e manifest Agria in `public/` (via il monogramma MG) | `app/(site)/layout.jsx` |
| Avviso cookie senza categorie (solo strumenti tecnici) | `components/CookieConsentBanner.jsx`, `lib/consent.js` |

Route legacy rimosse (ora 301 o 410): chi-sono, metodo, prenota-call, quiz, proposta, risorse, referral, geo, portfolio, software, servizi legacy, settori legacy, tag del blog, API di quiz e newsletter. Supabase e Prisma non sono più usati da nessuna route (restano solo `lib/db.js`, `lib/supabase.js` e le dipendenze, da togliere in una pulizia successiva).

## 2. Dati legali e infrastruttura (verificati)

- Titolare: Matteo Garuzzo, libero professionista, P.IVA 04006460549, Via Ponte Vecchio, 06135 Perugia; Agria System è il marchio con cui opera. Nessun REA, PEC o dato societario.
- Recapiti: `info@agriasystem.com`, `matteo.garuzzo@agriasystem.com`, telefono e WhatsApp +39 366 344 5417. Nessun recapito Gmail o su matteogaruzzo.com.
- Posta aziendale su Google Workspace (dichiarata nella privacy).
- Vercel: funzioni in fra1 (Francoforte) dal primo deploy dopo il 27 settembre 2026, log conservati 1 giorno. Resend: Irlanda (eu-west-1). HubSpot: data center UE (eu1).
- Se cambia la regione delle funzioni: aggiornare in `content/agria/legale.js` `VERCEL_FUNCTIONS_REGION`, la frase "funzioni di Vercel in Germania" al punto 6 della privacy e `LAST_UPDATED`.

## 3. Dopo il go-live

1. `node scripts/verify-migration.mjs https://agriasystem.com`.
2. Search Console: sitemap sulla proprietà agriasystem.com, Cambio di indirizzo dalla proprietà matteogaruzzo.com.
3. Bing Webmaster Tools: importazione da Search Console.
4. Prova reale del modulo da agriasystem.com.
5. Monitoraggio del report Pagine per alcune settimane; matteogaruzzo.com resta collegato per almeno 12 mesi.

## 4. Da dove riprendere lo sviluppo

1. Riscrittura dei 13 articoli nel tone of voice Agria (migration map, KEEP + REWRITE), a partire da `ecommerce-per-frantoi` e `software-per-agriturismi`.
2. Versioni EN delle pagine core (fondamenta i18n già pronte).
3. Pulizia del codice legacy non più raggiungibile (componenti, quiz, Supabase, Prisma e relative dipendenze).
