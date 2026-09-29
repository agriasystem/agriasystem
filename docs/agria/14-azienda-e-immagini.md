# AGRIA — Prompt 14: Azienda, immagini automatiche e completamenti

**Data:** 2026-09-26
**Branch:** `agria/redesign`
**Natura del lavoro:** pipeline immagini Unsplash con crediti automatici, pagina `/azienda`, completamenti nelle tre pagine servizio. Nessuna pagina contatti, legale o settore; nessun redirect né rimozione di pagine legacy; nessuna pagina `/en`; `main` non è stato toccato.

---

## 1. Commit

| Commit | Contenuto |
|---|---|
| `92c06ec feat(agria): pipeline immagini Unsplash e crediti automatici` | `scripts/fetch-images.mjs`, `scripts/images.config.json`, manifest `content/agria/image-credits.json`, `AgriaImage`, `PhotoCredit`, `/crediti-immagini` generata dai dati |
| `805fdf0 feat(agria): pagina Azienda` | Pagina `/azienda`, nove sezioni, tre interazioni proprie, dati strutturati, sitemap |
| `bc5990a feat(agria): sezioni SEO, GEO e identità nelle pagine servizio` | Fase C |
| `91c3520 feat(agria): foto dei settori dalla pipeline e utm agria_website` | Voci dei tre settori, `utmSource` corretto, ID fissati, helper `agriaImageOr` |
| `3c25cc5 chore(agria): manifest immagini rigenerato con utm agria_website` | Manifest rigenerato in locale con `--force` |
| `08e5f71 feat(agria): foto hospitality e cantine dalla pipeline, via hospitality.jpg` | Card e anteprime sulle foto della pipeline, eliminato `public/images/agria/settori/hospitality.jpg` |
| commit di questo report | Copy della pagina Azienda (sezioni 3-9), script con query multiple e filtro sulla descrizione, report |

---

## 2. Pipeline immagini

### Funzionamento
- Le foto **non** vengono salvate nel repository: il sito usa gli URL restituiti dall'API (hotlinking, come chiedono le Unsplash API Guidelines). `AgriaImage` chiede al CDN di Unsplash larghezza, qualità e formato.
- Per ogni voce lo script cerca, sceglie il primo risultato orizzontale adatto (almeno 1600 px, rapporto almeno 1,2, non Unsplash+, non escluso), **registra il download** su `download_location`, misura il peso JPEG a 1600 px abbassando la qualità fino a stare sotto 500 KB, e scrive il manifest.
- Il manifest contiene per ogni foto: ID, URL, dimensioni, alt, qualità, peso, fotografo con link al profilo, link alla foto, query usata, data e **descrizione Unsplash** (`unsplashDescription`: testo alternativo, descrizione e tag), usata per verificare gli alt.
- Attribuzione: `PhotoCredit` sotto le foto di sezione e `/crediti-immagini`, entrambi generati dal manifest, con `utm_source=agria_website&utm_medium=referral` (app Unsplash "Agria Website").

### Configurazione (`scripts/images.config.json`)
| Campo | Uso |
|---|---|
| `key` | Chiave usata nel codice: `agriaImage('settori/cantine')` |
| `query` / `queries` | Ricerca in inglese; `queries` sono provate in ordine finché una dà un risultato adatto |
| `require` | Almeno una di queste parole deve comparire nella descrizione Unsplash: scarta foto fuori tema |
| `id` | Foto fissata: con `--force` si aggiornano link e crediti, la foto resta la stessa |
| `exclude` | ID da scartare |
| `alt` | Testo alternativo in italiano, copiato nel manifest a ogni esecuzione |

### Uso
```powershell
node scripts/fetch-images.mjs                          # solo voci nuove
node scripts/fetch-images.mjs --only=settori/frantoi   # una voce
node scripts/fetch-images.mjs --force=settori/frantoi  # riseleziona una voce
node scripts/fetch-images.mjs --force                  # riseleziona tutto (le voci con id restano uguali)
```
Richiede `UNSPLASH_ACCESS_KEY` in `.env.local`. Dopo l'esecuzione: committare `content/agria/image-credits.json`. Una chiave usata nel codice ma assente dal manifest fa fallire la build con un messaggio esplicito; `agriaImageOr(key, ripiego)` serve solo nel passaggio tra aggiunta della voce e lancio dello script.

**Nota ambiente:** l'ambiente cloud usato per lo sviluppo non raggiunge i domini Unsplash; lo script va eseguito in locale.

### Foto nel manifest
| Chiave | Foto | Fotografo | Uso | Alt |
|---|---|---|---|---|
| `servizi/presence` | `wOkEwfChQqM` | Zoshua Colah | Digital Presence, sezione mercati e indice | Banco di accoglienza di una struttura ricettiva, con lampade e quadri alle pareti |
| `servizi/commerce` | `pdFLNMuMuzk` | Wander Fleur | Digital Commerce, sezione mercati e indice | Imballaggi con pluriball dentro scatole di cartone |
| `servizi/automation` | `fuiexaKxlhk` | Tool., Inc | Digital Automation, sezione mercati e indice | Persona al lavoro su un computer portatile, a una scrivania |
| `settori/hospitality` | `qegPEtazWCY` | Yanapi Senaud | Card Hospitality in homepage, anteprime Hospitality dei servizi | Gazebo nel giardino di una villa in Piemonte |
| `settori/cantine` | `PUDQGDlM_V8` | Daniel Vogel | Card Cantine in homepage | Fondi di botti allineate in una cantina sotterranea |
| `settori/frantoi` | `RD0iQoLCkPo` | John Cameron | Card Frantoi in homepage | Olive verdi raccolte, pronte per la molitura |
| `azienda/territorio` | `zoJgZydvpRA` | Moira Nazzari | Azienda, "Dove lavoriamo" (query "perugia italy") | Veduta di un centro storico collinare con una torre dell'orologio |
| `blog/software-per-cantine` | `27G8PF-fjrs` | David Goldman | Articolo `/blog/software-per-cantine`, in cima e nelle card (query "wine barrels", aggiunta il 29 settembre 2026) | Corridoio di una cantina tra file di barrique, con un grande tino di legno sullo sfondo |

Tutti gli alt sono stati verificati sulla `unsplashDescription` del manifest e corretti dove non corrispondevano (automation, commerce, cantine, frantoi, hospitality, territorio). Tutte le foto hanno l'ID fissato.

### File locali
- Eliminato `public/images/agria/settori/hospitality.jpg` (sostituito dalla pipeline).
- I sette PNG in `public/images/sectors/` restano: li usano le pagine legacy settori, geo, contatti e prenota-call.
- Eliminati dalla copia locale quattro file non tracciati e non referenziati: `public/images/agria/settori/agriturismo.jpg`, `public/images/sectors/aleksandrs-karevs-_LCnNnM0cyc-unsplash.jpg`, `public/images/sectors/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg`, `public/images/servizi/presence.jpg`.

---

## 3. Pagina `/azienda`

Contenuti in `content/agria/azienda.js`, componenti in `components/agria/azienda/`.

| # | Sezione | Fondo | Interazione |
|---|---|---|---|
| 1 | Hero | ink con scena dei filari (`PageHero`) | CTA a riempimento |
| 2 | Posizionamento | bianco, due colonne, testo grande | apparizione allo scroll |
| 3 | Principi | sfumato chiaro | **fisarmonica orizzontale**: il pannello sotto il cursore, a fuoco o toccato si allarga; i chiusi mostrano il titolo in verticale. Sotto 768 px pannelli verticali |
| 4 | Chi risponde dei progetti | bianco | **card del team**: iniziali su fondo tipografico, riga di dettaglio al passaggio o al focus, sempre aperta su touch. LinkedIn solo dove esiste |
| 5 | Ricerca e sviluppo | ink sfumato | — |
| 6 | Dove lavoriamo | bianco con fotografia e credito | zoom della foto |
| 7 | Come si inizia | bianco | **linea temporale verticale** che si riempie con lo scorrimento e accende i passi |
| 8 | Dati aziendali | off-white | denominazione, indirizzo, P.IVA, email, telefono |
| 9 | CTA finale | ink | CTA a riempimento |

**Copy:** riscritta per intero (frasi dichiarative, affermazioni verificabili, nessuna promessa, nessuna metrica). Hero e posizionamento dalla proposta A scelta fra tre: *L'infrastruttura digitale di chi produce e accoglie.* e *Tre settori. Nessuna eccezione.*

**Accessibilità:** i pannelli chiusi della fisarmonica restano nell'albero di accessibilità (trasparenti, non cliccabili, mai `visibility: hidden`); senza JavaScript pannelli, schede e linea temporale sono tutti aperti; con movimento ridotto nessuna transizione e linea accesa subito.

**SEO:** title e description del prompt; JSON-LD `WebPage`, `Organization` (indirizzo e P.IVA reali, nessun profilo social), `BreadcrumbList`; `/azienda` in sitemap.

**Foto del team:** iniziali. Le foto in `public/images/team` non sono omogenee (ritaglio circolare in bianco e nero da 500 px, un'orizzontale, una verticale): si attivano impostando `photo` in `content/agria/azienda.js`.

---

## 4. Completamenti nelle pagine servizio

- **Digital Presence:** sezione `SEO e GEO` dopo l'AI (griglia due per due con filetti su sfumatura chiara, quattro voci con icona); sezione `Identità e digital experience` prima delle FAQ (blocco editoriale). Il template le mostra solo se l'area le definisce.
- **Digital Commerce:** quinta voce AI `Schede trovabili`; griglia a sei colonne da `lg` (tre card sopra, due sotto), da `sm` l'ultima dispari occupa la riga.
- **Digital Automation:** settima riga dei deliverable, `Registro delle automazioni attive, con responsabile e frequenza` (Delivery).

---

## 5. Contrasti

| Elemento | Rapporto |
|---|---|
| Grigio su bianco / off-white | 5,05 / 4,70:1 |
| Grigio scurito dentro `GradientSection` su bianco | 7,15:1 |
| Green-dark su bianco / off-white | 6,01 / 5,59:1 |
| Bianco su green-dark (passo acceso) | 6,01:1 |
| Bianco 70% su ink | 9,68:1 |
| Green-bright su ink | 12,13:1 |

---

## 6. Esito della validazione

| Verifica | Esito |
|---|---|
| `npm run build` | Riuscito, **174 pagine** statiche (una in più: `/azienda`) |
| Script immagini | A freddo: voci nuove scaricate. A caldo: voci presenti saltate. `--force` con ID fissati: stesse foto, link rigenerati. Query multiple e filtro `require` provati con API simulata |
| Chiavi | Nessuna chiave nei file tracciati; `.env.local` in `.gitignore` |
| `/crediti-immagini` | Generata dal manifest e dai `CREDITS.json` legacy |
| Scorrimento orizzontale | Nessuno a 375, 768 e 1440 px su `/azienda` e sulle tre pagine servizio |
| Tastiera | 42 fermate su `/azienda`, tutte con focus visibile |
| Senza JavaScript | Pannelli, schede, linea temporale e nuove sezioni leggibili |
| Revisione | Quattro revisori indipendenti con verifica avversariale: due problemi reali trovati e corretti |
| Console | Nessun errore JavaScript. Restano i 404 dei prefetch verso `/settori/*`, non ancora create |

---

## 7. Note per i prompt successivi

- **Privacy (prompt pagine legali):** l'informativa dovrà coprire il form contatti con invio a HubSpot, reCAPTCHA v3 di Google e il caricamento delle foto dal CDN di Unsplash (hotlinking: il browser del visitatore contatta `images.unsplash.com`).
- Email nei dati aziendali: quella di `content/site.js`. Da sostituire se Agria avrà un indirizzo dedicato.
- Link LinkedIn di Matteo De Pilla e Alessandro Poponi: da aggiungere quando disponibili.
- Immagine Open Graph AGRIA per le pagine interne: ancora da creare.
