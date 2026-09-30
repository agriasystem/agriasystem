# 19 · Pulizia del codice legacy

Aggiornato al 30 settembre 2026. Branch `agria/contenuti`, punto di partenza `ccd6b03`.

## Metodo

1. **Inventario in sola lettura.** Le dipendenze sono state ricostruite con un grafo degli import, a partire da tutte le route di `app/`, dal middleware e dai file di configurazione. I file statici sono stati confrontati con i riferimenti presenti nel codice vivo.
2. **Approvazione dell'inventario**, con due eccezioni esplicite:
   - regola 3: i file statici non collegati vengono rimossi anche se rispondevano 200;
   - regola 2: solo per `ReopenConsentButton`.
3. **Rimozione in tre commit separati.** Dopo ognuno: build, conteggio delle pagine, crawl e verifica della migration map.

Il commit previsto per le route non è stato fatto. In `app/` non c'era nessuna route legacy: i vecchi indirizzi esistono solo come regole del middleware (301 e 410) e restano invariati.

## Cosa è stato rimosso

### `8a69d8b` chore(agria): rimozione componenti e contenuti non utilizzati

**Componenti del vecchio sito (43 file).** Nessuna route li importava.
- `Nav`, `Footer`, `NewsletterFooter`, `SocialIcons`, `CTA`, `Reveal`, `FAQAccordion`, `CountUp`, `StatNumber`.
- `TestimonialCarousel`, `PortfolioGrid`, `PricingBlock`, `BookingForm`, `CalendlyEmbed`, `HospitalityExperience`, `RisorseContent`.
- `MethodStepTemplate`, `SectorPageTemplate`, `ServicePageTemplate`, `QuizPopup`, `QuizFloatingButton`.
- Le cartelle `Quiz/`, `blog/`, `geo/`, `icons/`, `servizi/`, `software/`.

**Componente del consenso.** `ReopenConsentButton` non era usato: il banner vivo si riapre dal pulsante "Gestisci cookie" del footer Agria, con `reopenConsentBanner`.

**Librerie.** `lib/quiz/` (quiz, email con Calendly, analisi dei siti), `lib/geo-data.js`, `lib/pricing-data.js`.

**Contenuti legacy.**
- `content/testimonials.js`: testimonianze illustrative.
- `content/team.js`: vecchio team.
- `content/portfolio.js`: case study inventati.
- `content/servizi.js`, `settori.js`, `settori-pagine.js`, `software.js`, `metodo.js`, `numbers.js`, `faqs.js`, `home.js`.

**Articoli.** I 19 articoli reindirizzati (301) o eliminati (410). Gli indirizzi restano gestiti dal middleware.

**Script e istruzioni.** `scripts/fetch-blog-images.js`, `scripts/fetch-servizi-images.js`, `ISTRUZIONI-WINDOWS.md`.

**Modifiche necessarie per la rimozione.**
- `lib/data.js` ora esporta solo `site`, `posts` e `getPost`.
- `content/blog/index.js` elenca solo i 13 articoli mantenuti.
- `tailwind.config.js`: aggiunto `./lib/**/*.{js,jsx}` ai file letti da Tailwind. Il grassetto degli articoli (`font-semibold` in `lib/richtext.js`) era generato solo perché lo usavano anche i componenti legacy. Il confronto del CSS prima e dopo conferma che nessuna classe ancora usata è sparita.
- `content/agria/assistente.js`: la risposta di ripiego è in forma impersonale ("Su questo non c'è una risposta preparata"). "Sono l'assistente automatico" resta: è la voce del bot e chiarisce che si tratta di un sistema automatico.

### `e96c7b3` chore(agria): rimozione immagini e file statici non utilizzati

**83 file di `public/`, 104,4 MB.** Nessuna pagina viva li citava.

| Cartella o file | Cosa conteneva |
|---|---|
| `images/case-studies/` (18 file) | mockup dei case study inventati |
| `images/sectors/` (7 file), `images/hero/` | foto del vecchio sito |
| `images/matteo/` (4 file) | vecchio brand personale |
| `images/preview-sites/` | anteprime dei siti |
| `images/software/` (10 file), `images/servizi/` (21 file) | immagini dei vecchi servizi |
| `images/brand/mg-logo-mark.png`, `images/brand/favicon/favicon.svg` | logo e favicon non usati |
| 17 immagini in `images/blog/` | articoli eliminati |

Restano le due immagini degli articoli eliminati riusate dalle pagine vive: `bandi-incentivi…` e `pos-cassa…`. Gli indirizzi dei file rimossi ora rispondono 404, come concordato.

**Crediti immagini.** Nei tre `public/images/*/CREDITS.json`, `utm_source=mg_solutions` è diventato `agria_website`. `content/agria/image-credits.json` era già corretto.

### `3861f83` chore(agria): rimozione dipendenze non utilizzate

- **Supabase:** `@supabase/supabase-js` e `lib/supabase.js`. Build intermedia superata.
- **Prisma:** `@prisma/client`, `prisma`, `lib/db.js`, `prisma/` (schema `Lead` e migrazione iniziale).
- **`package.json`:**
  - `build` è ora `next build`;
  - `postinstall` è rimosso;
  - il nome è `agriasystem`.
- **`package-lock.json`:** solo rimozioni, nessuna versione cambiata.
- **`.env.example`:** senza le variabili di database e Supabase.
- **Vercel:** Build Command in override con `npm run build`, che ora esegue solo `next build`. Install Command predefinito. Nessun richiamo a Prisma.

I dati del vecchio database non sono stati toccati da qui. La loro eliminazione spetta al titolare, dalla console di Supabase.

## Cosa è stato conservato e perché

- **Infrastruttura validata:**
  - middleware, `lib/migration.js`, sitemap, robots;
  - `app/api/contact/`, `lib/contact/`;
  - GA4: `lib/analytics.js`, `AnalyticsConsent`;
  - consenso: `lib/consent.js`, `CookieConsentBanner`, che è vivo nonostante il nome legacy;
  - pagine legali e `docs/agria/`.
- **`/design-system`:** anteprima interna, noindex, attiva solo con `NEXT_PUBLIC_DESIGN_PREVIEW=true`. È raggiungibile, quindi resta per la regola 3.
- **`lib/i18n/` e `content/i18n/`:** vivi (layout, SEO, selettore della lingua), preparano `/en`.
- **Script vivi:**
  - `fetch-images.mjs` e `images.config.json`: la pipeline Unsplash;
  - `unsplash-candidates.js`, `unsplash-map.json`;
  - `og-image.mjs`, `hubspot-owners.mjs`, `verify-migration.mjs`, `verify-contact-test.mjs`.
- **Riferimenti al vecchio dominio nei file vivi, voluti:**
  - `lib/migration.js`: il vecchio dominio e i vecchi percorsi sono regole di redirect;
  - `lib/seo.js`: il filtro che ignora `matteogaruzzo.com` in `NEXT_PUBLIC_SITE_URL`;
  - `content/agria/azienda.js`: il profilo LinkedIn personale reale.

## Verifiche finali

Tutte eseguite sulla build dell'ultimo commit (`3861f83`).

| Controllo | Esito |
|---|---|
| Build da zero (`node_modules` e `.next` eliminate, `npm install`, `npm run build`) | superata |
| Pagine generate | 36/36, come in partenza |
| Crawl del sito compilato | 272 indirizzi e risorse, nessuno rotto; 30 pagine HTML; la 404 risponde 404 |
| Migration map (`scripts/verify-migration.mjs`) | 88 righe, 42 redirect, 29 indirizzi in sitemap: tutti superati |
| Form contatti con HubSpot, Resend e reCAPTCHA simulati | 28 scenari su 28 identici al riferimento validato |
| Pagine legali | nessuna modifica ai file; le 4 pagine rispondono 200, un solo `h1`, aggiornate al 28 settembre 2026; nessun riferimento a servizi rimossi |
| Residui nelle pagine pubbliche | MG Solutions, `matteogaruzzo.com`, Calendly, Supabase: 0 occorrenze su 31 pagine |
| Lint | nessun errore |

## Stato del repository

|  | Prima (`ccd6b03`) | Dopo (`3861f83`) |
|---|---|---|
| File versionati | 423 | 255 |
| Peso dei file versionati | 110,7 MB | 5,8 MB |
| di cui `public/` | 115 file, 108,8 MB | 32 file, 4,4 MB |

Righe:
- **totale:** 178 file cambiati, −9.261 e +114 righe;
- **senza `public/` e `package-lock.json`:** −8.937 righe;
- **per commit:** −8.825 (componenti e contenuti), −101 (statici), −335 (dipendenze).

La storia git (184 MB compressi) non si riduce: si ridurrebbe solo riscrivendo la storia, cosa non proposta.

## Variabili d'ambiente da rimuovere da Vercel

Da rimuovere solo dopo che `3861f83` è in produzione:
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Nessun'altra variabile di Calendly, quiz o newsletter compare nel codice o nella storia del repository.
