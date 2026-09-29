# 18 · Social e riscrittura SEO dei primi cinque articoli

Aggiornato al 29 settembre 2026. Branch `agria/contenuti`.

## Fase A: social (commit `40de394`)

- `components/agria/social.js` è l'unica fonte dei profili: LinkedIn e Instagram. Facebook è predisposto ma commentato.
- Il footer mostra i due profili. Si aprono in una nuova scheda, con `aria-label` descrittivo.
- `Organization.sameAs` è presente su home, `/azienda` e `/contatti`.

## Fase B: modello comune degli articoli

File toccati:
- `app/(site)/blog/[slug]/page.jsx`
- `components/agria/service/FinalCta.jsx`
- `lib/analytics.js`
- `components/agria/consent/AnalyticsConsent.jsx`

Cosa cambia:
- **Invariati:** l'indice dei contenuti, gli articoli correlati e i collegamenti di approfondimento (`relatedLinks`).
- **Riquadro di collegamento a metà articolo** (`midLink`). Si inserisce dopo la sezione centrale del corpo.
- **Avvertenza prima del corpo** (`notice`, facoltativa): riquadro sotto la data, prima dell'immagine e dell'indice. Oggi la usa solo l'articolo fiscale.
- **CTA finale contestuale** (`cta.title`, `cta.text`). Il pulsante porta a `/contatti`. Se l'articolo non ha una CTA propria, resta quella generica.
- **Dati strutturati `Article`** (prima era `BlogPosting`):
  - `datePublished` è la data reale di pubblicazione;
  - `dateModified` viene da `updated`;
  - autore ed editore sono l'organizzazione Agria System;
  - la descrizione è la meta description approvata.
- **Open Graph:** `modifiedTime` viene da `updated`.
- **Misurazione dei clic verso `/contatti`:** gli articoli hanno un contenitore `data-analytics-article="<slug>"`. Un clic verso `/contatti` dentro il contenitore invia l'evento GA4 `contact_click` con due parametri:
  - `location`: `article_cta` per il pulsante finale, `article_inline` per i link nel testo;
  - `article`: lo slug.

  Nessun dato personale. Solo con consenso, come gli altri eventi. I clic sull'header e sul resto del sito non inviano l'evento.
- **Sitemap:** il codice non è stato toccato. `lastmod` usava già `updated`.

In GA4 si può registrare `location` e `article` come dimensioni personalizzate a livello di evento per filtrarle nei report. È un'operazione facoltativa, da fare nell'interfaccia di GA4.

## Fase C: i cinque articoli

Parametri comuni a tutti e cinque:
- slug e data di pubblicazione invariati;
- `updated: '2026-09-28'`;
- solo h2 nel corpo;
- una sezione "Domande frequenti" e una "Da dove partire";
- un solo link a `/contatti` nel corpo, nella sezione finale.

Il `<title>` è il seoTitle più " | Agria System".

### 1. Vendere olio online: come costruire l'e-commerce di un frantoio
`/blog/ecommerce-per-frantoi`

- **Title** (58 caratteri): Vendere olio online: e-commerce per frantoi | Agria System
- **Description** (150 caratteri): Cosa serve per vendere olio online: formati, listini per privati e ristorazione, spedizioni e campagna olearia. Guida per frantoi e aziende olivicole.
- **Corpo:** circa 1.500 parole, 8 minuti di lettura, 8 sezioni.
  - Riscritto quasi da zero. L'originale era centrato su una piattaforma e-commerce di terze parti e non parlava di formati, spedizioni, conservazione, vendita alla ristorazione, campagna olearia e preordini. Ora questi sono il cuore dell'articolo.
  - Aggiunti: scheda prodotto e tracciabilità del lotto, assortimenti e abbonamenti, FAQ.
  - Categoria cambiata da "Shopify" a "E-commerce". Tolto il nome della piattaforma da tag e testo.
- **Link nel corpo:** `/servizi/digital-commerce`, `/settori/frantoi`, `/contatti`.
- **Riquadro a metà articolo:** porta a `/settori/frantoi`.
- **CTA:** "Volete vendere il vostro olio online?"
- **Punti deboli:**
  - Nessun esempio reale di frantoio: non ce ne sono da citare.
  - Tolto il pagamento con bonifico a scadenza per i clienti professionali: ora il testo parla solo di condizioni differenziate tra privati e professionali, concordate cliente per cliente.

### 2. Gestionale per agriturismo: quale serve davvero e quando non serve
`/blog/software-per-agriturismi`

- **Title** (59 caratteri): Gestionale agriturismo: quando serve davvero | Agria System
- **Description** (147 caratteri): Come scegliere un gestionale per agriturismo, cosa deve fare davvero e perché spesso il problema non è il software ma i sistemi che non si parlano.
- **Corpo:** circa 1.450 parole, 7 minuti di lettura, 10 sezioni.
  - L'impostazione cambia. Prima era "come scegliere o costruire" e c'era "già pronto o su misura". Ora è "quando serve un gestionale nuovo e quando basta collegare gli strumenti che si usano già".
  - Aggiunti:
    - cosa deve fare un gestionale per un agriturismo (camere ed esperienze insieme);
    - il ruolo del booking engine;
    - i casi in cui cambiare conviene e quelli in cui è un costo inutile;
    - la risposta onesta a "qual è il migliore";
    - le domande da fare al fornitore;
    - le FAQ, inclusa la differenza tra gestionale, channel manager e booking engine.
- **Link nel corpo:** `/blog/agriturismo-booking-online-prenotazioni`, `/servizi/digital-automation`, `/settori/hospitality`, `/contatti`.
- **Riquadro a metà articolo:** porta a `/servizi/digital-automation`.
- **CTA:** "Non sapete se vi serve un gestionale nuovo?"
- **Punti deboli:**
  - Cita la comunicazione degli alloggiati come adempimento. È un obbligo reale, ma resta generico e senza riferimenti normativi.
  - La categoria resta "Agribusiness AI", ereditata. Si potrebbe valutare "Software".

### 3. Software gestionale per cantine: cosa serve e cosa si può collegare
`/blog/software-per-cantine`

- **Title** (62 caratteri): Gestionale cantina: cosa serve e cosa collegare | Agria System
- **Description** (143 caratteri): Produzione, magazzino, vendita diretta ed export: cosa deve gestire una cantina, quali strumenti servono davvero e come farli lavorare insieme.
- **Corpo:** circa 2.270 parole, 11 minuti di lettura, 14 sezioni. È l'articolo più lungo, perché la ricerca copre più aree della cantina.
  - Il corpo è ora organizzato per aree: produzione, magazzino, adempimenti, vendita diretta, degustazioni, CRM e club, export.
  - Per ogni area dice se serve uno strumento dedicato o se bastano i collegamenti.
  - Aggiunti: il criterio "problema dentro lo strumento o tra gli strumenti", un percorso per fasi, le domande da farsi prima di scegliere e le FAQ.
- **Link nel corpo:** `/servizi/digital-automation`, `/blog/degustazioni-cantina-trasformare-visite-vendite`, `/blog/vendita-internazionale-vino-dtc-export-estero`, `/settori/cantine`, `/contatti`.
- **Riquadro a metà articolo:** porta a `/settori/cantine`.
- **CTA:** "Volete mettere in ordine i dati della cantina?"
- **Punti deboli:**
  - La sezione sugli adempimenti (registri telematici, documenti di accompagnamento) è volutamente generica e rimanda al consulente.
  - Il title ha 62 caratteri: nei risultati di ricerca può essere troncato alla fine del marchio.

### 4. Sito web per agriturismo: cosa serve per ricevere prenotazioni dirette
`/blog/siti-web-per-agriturismi`

- **Title** (61 caratteri): Sito web per agriturismo: prenotazioni dirette | Agria System
- **Description** (151 caratteri): Struttura, disponibilità, foto e visibilità locale: cosa serve al sito di un agriturismo per avere prenotazioni dirette invece di rimandare ai portali.
- **Corpo:** circa 1.400 parole, 7 minuti di lettura, 9 sezioni.
  - Riorientato sulla prenotazione diretta. Le sezioni coprono:
    - cosa cerca chi arriva sul sito;
    - perché se ne va senza prenotare;
    - la struttura delle pagine;
    - le foto;
    - la visibilità locale (scheda sulle mappe);
    - come convivere con i portali di prenotazione.
  - Aggiunte le FAQ e un passo pratico finale: provare a prenotare dal telefono.
- **Link nel corpo:** `/blog/agriturismo-booking-online-prenotazioni`, `/blog/seo-locale-agroalimentare-google-maps`, `/servizi/digital-presence`, `/settori/hospitality`, `/contatti`.
- **Riquadro a metà articolo:** porta a `/settori/hospitality`.
- **CTA:** "Volete più prenotazioni dirette?"
- **Punti deboli:** nessun esempio reale di struttura. I tempi di posizionamento sono indicati solo in modo qualitativo ("mesi").

### 5. E-commerce di vino: IVA, accise e fatturazione, cosa sapere prima di partire
`/blog/gestione-fiscale-ecommerce-vino-iva-fatturazione`

- **Title** (61 caratteri): E-commerce di vino: IVA, accise e fatturazione | Agria System
- **Description** (140 caratteri): Gli adempimenti da conoscere prima di aprire un e-commerce di vino: IVA, accise, documenti di trasporto, vendite in Italia e verso l'estero.
- **Corpo:** circa 1.390 parole, 7 minuti di lettura, 10 sezioni.
  - L'avvertenza (non sostituisce il commercialista o il consulente doganale, aggiornato a settembre 2026) è nel riquadro `notice`, visibile prima dell'immagine e del corpo, non più come prima sezione.
  - Nessuna aliquota, soglia, norma o scadenza.
  - Ogni tema (IVA per Paese, dati di fatturazione nel checkout, estero, documenti e corrieri, maggiore età) è tradotto in cosa deve fare il sito. Segue chi decide cosa tra cantina, commercialista e sviluppo.
  - In revisione ho tolto le affermazioni perentorie su adempimenti:
    - "certificazione dei corrispettivi" è diventato "obblighi di registrazione e documentazione", da stabilire con il commercialista;
    - documenti di accompagnamento e rappresentante fiscale "possono" servire, non "servono";
    - la FAQ sulla fattura non dice più "non necessariamente": dice che dipende dall'azienda e dalla richiesta del cliente.
- **Link nel corpo:** `/blog/vendita-internazionale-vino-dtc-export-estero`, `/servizi/digital-commerce`, `/settori/cantine`, `/contatti`.
- **Riquadro a metà articolo:** porta a `/servizi/digital-commerce`.
- **CTA:** "Volete vendere vino online senza complicarvi la vita?"
- **Punti deboli:**
  - Cita il regime OSS e il rappresentante fiscale, sempre rimandando al consulente.
  - Rilettura di un commercialista in corso, a cura del titolare.

## Fase D: verifiche

Eseguite su build di produzione locale.

| Controllo | Esito |
|---|---|
| Un solo `h1` per pagina | 5/5 |
| Gerarchia dei titoli senza salti (h1 → h2 → …) | 5/5 |
| `Article` con headline, date, autore, editore, immagine, mainEntityOfPage | 5/5 |
| `datePublished` / `dateModified` | date originali / 2026-09-28 |
| Canonical su `https://agriasystem.com/blog/<slug>` | 5/5 |
| Link interni della pagina che rispondono 200 | tutti |
| `/blog` mostra i nuovi titoli | 5/5 |
| Sitemap: `lastmod` 2026-09-28, 29 indirizzi (invariati) | ok |
| `verify-migration`: 88 righe, 42 redirect | tutti i controlli superati |
| `contact_click` (`article_cta` e `article_inline` con slug; header nessun evento) | ok |
| Lint | nessun errore nuovo (restano 2 avvisi preesistenti in `AgriaImage.jsx`) |

Non toccati:
- slug;
- redirect, middleware e codice della sitemap;
- GA4 (configurazione e consenso);
- HubSpot, Resend e reCAPTCHA.

Scansione dei testi: nessuna parola vietata, nessun nome di prodotto o concorrente, nessuna cifra, percentuale o prezzo, nessuna prima persona singolare.

## Fase E: foto del gestionale cantina (29 settembre 2026)

In cima a `/blog/software-per-cantine` c'era un grafico di analisi web con numeri in evidenza (`JKUTrJ4vK00`, Luke Chesser). Sostituito con una foto della pipeline Unsplash, eseguita in locale:

- Voce `blog/software-per-cantine` in `scripts/images.config.json`: query "winery cellar", "wine barrels", "wine production", `require` cellar, barrel, winery.
- Delle 36 candidate adatte ho escluso quelle senza cantina (vigneti, grappoli, calici) e quelle con numeri sulle botti, marchi impressi, etichette di bottiglie o cartelli leggibili.
- Scelta `27G8PF-fjrs` di David Goldman (da "wine barrels"), controllata a piena risoluzione: nessun testo leggibile. ID fissato.
- Alt: "Corridoio di una cantina tra file di barrique, con un grande tino di legno sullo sfondo", verificato sulla descrizione Unsplash ("a row of wine barrels in a wine cellar").
- L'articolo prende URL, alt e credito dal manifest con `agriaImage`. Credito "Foto di David Goldman su Unsplash" sotto l'immagine. Open Graph e `Article.image` usano il ritaglio 1200×630 del CDN Unsplash.
- In `/crediti-immagini` David Goldman sostituisce Luke Chesser.
- Eliminati `public/images/blog/software-per-cantine.jpg` e le sue voci in `public/images/blog/CREDITS.json` e `scripts/fetch-blog-images.js`.

## Da decidere

1. **Pagamento a scadenza per la ristorazione** (articolo frantoi): tolto.
2. **Rilettura fiscale** dell'articolo sull'e-commerce di vino: in corso, a cura del titolare.
3. **Immagini:** ho corretto il testo alternativo di quattro articoli su cinque perché descrivesse la foto reale (frantoi, gestionale agriturismo, gestionale cantina, sito agriturismo). La foto del gestionale cantina (grafico di analisi web con numeri in evidenza) è stata sostituita il 29 settembre: vedi Fase E.
4. **Categoria "Agribusiness AI"** di gestionale agriturismo e gestionale cantina: valutare "Software".
