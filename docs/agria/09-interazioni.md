# AGRIA — Prompt 09: Rifinitura homepage e libreria di interazioni

**Data:** 2026-09-23
**Branch:** `agria/redesign`
**Riferimento visivo:** `docs/agria/concept/agria-concept-v3.html`
**Natura del lavoro:** correzioni alla homepage, libreria di interazioni riutilizzabile (standard del sito da qui in avanti), foto reale per il settore Hospitality, sezioni interattive in homepage, pannelli di navigazione estesi. Nessuna route creata o rimossa, nessuna modifica a sitemap, redirect o metadata; `main` non è stato toccato.

---

## 1. Commit

| Commit | Contenuto |
|---|---|
| `fix(agria): spaziature, etichette e coerenza della homepage` | Spaziatura compatta, etichette di stato leggibili, barre con linea di base, valori a parola più piccoli, descrizioni del pannello Servizi |
| `feat(agria): libreria di interazioni riutilizzabili` | `components/agria/motion/`, `GradientSection`, `HighlightCard`, CTA a riempimento, demo in `/design-system` |
| `feat(agria): hero animato, foto dei settori e sezioni interattive` | Titolo animato, foto Hospitality, Servizi come AutoTabs, blocco dati sfumato, ConciergeSlot |
| `feat(agria): pannelli di navigazione estesi` | Pannelli a due colonne con card di evidenza; titolo dell'hero allargato a due righe |

---

## 2. Libreria di interazioni

Tutti i componenti usano CSS e JavaScript nativi, rispettano `prefers-reduced-motion` e lasciano la pagina leggibile senza JavaScript. Demo con varianti in `/design-system` → "Libreria di interazioni".

### `RotatingHeadline` — `components/agria/motion/RotatingHeadline.jsx`
| Proprietà | Tipo | Default | Note |
|---|---|---|---|
| `prefix` | string | `''` | Parte fissa |
| `phrases` | string[] | — | Parti che ruotano; **la prima è quella predefinita** |
| `suffix` | string | `''` | Parte fissa finale (es. il punto) |
| `as` | tag | `span` | |
| `className` | string | | |

- Scrive a ~85 ms per carattere (con piccola variazione naturale), cancella a ~42 ms, pausa di 2,4 s sulla parola completa e di 0,38 s tra una parola e l'altra; ciclo continuo.
- Cursore lampeggiante (`.agria-caret`), presente solo mentre l'animazione è attiva.
- HTML, screen reader e motori di ricerca: la frase predefinita completa in un testo `sr-only`; la parte animata è `aria-hidden`.
- **Nessun salto di layout:** tutte le varianti occupano la stessa cella di una griglia tramite un segnaposto invisibile generato in CSS (`content: attr(data-text)`), quindi l'altezza è sempre quella della variante più lunga e le varianti non compaiono come testo nella pagina.
- Senza JavaScript o con movimento ridotto: frase predefinita, nessun cursore. Se l'utente attiva il movimento ridotto mentre la pagina è aperta, l'animazione si ferma e torna alla frase predefinita.

### `HoverGroup` — `components/agria/motion/HoverGroup.jsx`
| Proprietà | Tipo | Default |
|---|---|---|
| `as` | tag | `div` |
| `className` | string | |

- Solo CSS (`.agria-hover-group`): con il cursore su un elemento, i fratelli scendono a opacità 0.8 con transizione di 0,35 s.
- Attivo solo su dispositivi con cursore (`@media (hover: hover)`); a tastiera nessun elemento viene attenuato.
- Uso: i figli diretti sono gli elementi del gruppo. Se gli elementi usano anche `Reveal`, `Reveal` va **dentro** l'elemento del gruppo, non sullo stesso nodo (le due opacità si sovrascriverebbero).

### `ZoomImage` — `components/agria/motion/ZoomImage.jsx`
| Proprietà | Tipo | Default | Note |
|---|---|---|---|
| `src`, `alt` | string | — | `alt` obbligatorio e descrittivo |
| `sizes` | string | `100vw` | Da impostare sempre in base al layout |
| `priority` | bool | `false` | Solo per immagini sopra la piega |
| `className` | string | | Il contenitore: definire altezza o `aspect-*`; di default `rounded-agria-card` |
| `imageClassName` | string | | |

- `next/image` con `fill` e `object-cover`: l'immagine non si deforma mai.
- Al passaggio del cursore l'immagine scala a 1.05 in 0,7 s; il contenitore resta fermo. Anche un antenato con la classe `agria-zoom-trigger` (es. l'intera card) attiva lo zoom, anche con focus da tastiera al suo interno.
- Con movimento ridotto nessuno zoom.

### CTA animata — `components/agria/ui/Button.jsx`
- Le varianti `primary` e `bright` hanno un riempimento (pseudo-elemento `::before`) che si espande da sinistra in 0,5 s al passaggio del cursore e al focus da tastiera. `bright` mantiene il sollevamento di 1px e l'alone.
- Riempimento: grafite su `primary`, bianco 40% su `bright`; il testo resta sopra (`isolate` + `-z-10`).
- Vale per tutti i bottoni primari AGRIA (header, menu mobile, homepage). I bottoni legacy (`.btn-solid`) non cambiano: spariscono con le pagine legacy.

### `AutoTabs` — `components/agria/motion/AutoTabs.jsx`
| Proprietà | Tipo | Default | Note |
|---|---|---|---|
| `items` | `{ id?, label, content }[]` | — | |
| `label` | string | — | `aria-label` del `tablist` |
| `duration` | number (ms) | `7000` | Tempo per scheda |
| `className` | string | | |

- La barra sotto la scheda attiva si riempie in `duration` ms (animazione CSS `agria-progress`); alla fine passa alla scheda successiva, in ciclo.
- Pausa: cursore sopra il blocco, focus dentro il blocco, **pulsante Pausa/Riprendi** (WCAG 2.2.2, necessario su touch). Scegliere una scheda (click, tocco o frecce) ferma la rotazione definitivamente e fa sparire barra e pulsante.
- Pattern WAI-ARIA Tabs: `tablist`/`tab`/`tabpanel`, `aria-selected`, `aria-controls`, frecce sinistra/destra, Home, End, tabindex a rotazione.
- Con movimento ridotto la rotazione non parte (schede normali, nessuna barra). Senza JavaScript tutti i pannelli sono visibili uno sotto l'altro e le schede sono nascoste (`@media (scripting: none)`).

### `GradientSection` — `components/agria/ui/GradientSection.jsx`
| Proprietà | Tipo | Default |
|---|---|---|
| `variant` | `'light' \| 'dark'` | `'light'` |
| + tutte le proprietà di `Section` (`spacing`, `spacingTop`, `spacingBottom`, `id`, `aria-*`) | | |

- `light`: off-white con due aloni (green 12%, green-bright 16%). `dark`: ink con aloni green-bright 16% e green 22%; i testi interni vanno con `onDark`.
- Sulla variante chiara il token `--agria-grey` è ridefinito localmente a `#54595A` (esportato come `TINT_GREY`): tutti i testi secondari all'interno restano sopra 4.5:1 senza cambiare i componenti.

### `HighlightCard` — `components/agria/ui/HighlightCard.jsx`
| Proprietà | Tipo | Default | Note |
|---|---|---|---|
| `tone` | `'dark' \| 'light'` | `'dark'` | |
| `eyebrow`, `title`, `text` | string | | |
| `titleAs` | tag | `h2` | |
| `titleId` | string | | Per `aria-labelledby` della sezione |
| `items` | `{ title, text?, meta? }[]` | `[]` | Tre card interne, in `HoverGroup`; `meta` è un'etichetta breve |
| `note` | string | | Riga finale in piccolo |

### Altri elementi di supporto
- `Section`: prop `spacing` (`normal` | `compact` | `none`), `spacingTop`, `spacingBottom`; sfondo `ink`. Token `agria-section-compact` = `clamp(3rem, 1.875rem + 4.5vw, 6rem)`.
- `Reveal` (Prompt 08) resta lo standard per l'apparizione allo scroll.

---

## 3. Standard permanenti (da qui in avanti, su ogni pagina)

1. **Alternanza dei fondi:** mai più di due sezioni bianche consecutive senza una sezione off-white, sfumata (`GradientSection`), scura o con fotografia.
2. **Ogni gruppo di card usa `HoverGroup`; ogni immagine in card usa `ZoomImage`** (con `agria-zoom-trigger` sulla card).
3. **Ogni CTA primaria usa `Button` `primary` o `bright`**, quindi l'animazione di riempimento.
4. **Ogni sezione lunga di elenco è spezzata da un blocco visivo diverso** (`GradientSection`, `HighlightCard`, foto, sezione scura).
5. **Tutte le animazioni sono disattivabili con `prefers-reduced-motion` e non bloccano la lettura:** contenuto sempre presente nell'HTML, niente testo nascosto finché JS non parte (eccetto `Reveal`, che nasconde solo con `scripting: enabled`).
6. **Nessun contenuto inventato:** quando manca una prova reale si usa una formulazione onesta o si lascia lo spazio a una sezione futura.
7. **Contrasto:** su superfici sfumate chiare i testi secondari usano il grigio scurito (automatico dentro `GradientSection`/`HighlightCard`); green-bright solo su fondo scuro.

---

## 4. Dove sono applicati in homepage

| Sezione | Fondo | Interazioni |
|---|---|---|
| Hero | ink | Titolo fisso, senza animazione (dal Prompt 24 `RotatingHeadline` resta solo nella pagina del design system), CTA `bright` a riempimento |
| Fatti | bianco, sovrapposto | Valori a parola più piccoli dei valori numerici |
| Settori | bianco, spaziatura superiore compatta | `HoverGroup` sulle tre card; `ZoomImage` sulla foto Hospitality; Vino e Olio con pattern |
| Servizi | off-white | `AutoTabs` Hospitality · Vino · Olio, in ogni scheda tre card (`HoverGroup`) verso le pagine servizio |
| Dai dati alle decisioni | `GradientSection` chiara | `HighlightCard` scura con i tre segnali ed etichette di stato |
| Come lavoriamo | bianco, compatta | `HoverGroup` sulle tre card |
| Chiarezza · Ricerca | off-white, compatta | — |
| Chiusura | bianco, compatta, card ink | CTA `bright` a riempimento |

Sequenza dei fondi: scuro → bianco → off-white → sfumato → bianco → off-white → bianco con card scura. Nessuna coppia di sezioni bianche consecutive.

**Titolo dell'hero:** il contenitore passa da 16ch a 19ch. Con 16ch lo spazio riservato era di tre righe (la variante "il vostro agriturismo") e con la variante predefinita restava una riga vuota sotto il titolo; da 18ch tutte le varianti stanno in due righe (misurato a 1536px, carattere 72px). 19ch lascia un margine; `ch` è proporzionale al carattere, quindi il rapporto regge su tutti i desktop.

**Mega menu:** pannelli Servizi e Settori su due colonne da `lg` (1024px): voci a sinistra, card di evidenza sfumata a destra, larghezza 640px. Servizi → *Prima capire, poi costruire.* + "Come lavoriamo" (`/#come-lavoriamo`); Settori → *Conosciamo tre mestieri, non tutti.* + "Tutti i settori" (`/settori`). Tra 768 e 1023px il pannello resta a una colonna (320px) senza card, per non uscire dallo schermo. Pannello scuro, `ArrowDown` apre e porta il focus sulla prima voce, `Esc` chiude e riporta il focus sul trigger.

**Anteprime nel mega menu (Prompt 25, fase C):** da `xl` (1280px) il pannello Servizi passa a 760px e la card di evidenza a 356px; Settori resta a 640px. Nella card, tra titolo e link, uno spazio 4:3 riservato dal primo render mostra l'anteprima della voce sotto il cursore o il focus (`preview` in `nav-data.js`): le tre aree, Assistente AI con la sua anteprima, Gestione delle richieste con quella di Automation; Collegare gestionale e sito non ne ha e lascia la card di oggi. All'apertura si scarica solo il codice (`MenuPreview`, `ServicePreview`), la finestra si monta al passaggio e si smonta alla chiusura. Sotto `xl` nulla cambia e nulla si scarica.

---

## 5. Punto di innesto del concierge AI

- **Componente:** `components/agria/ConciergeSlot.jsx`, montato in `app/(site)/layout.jsx` dopo il footer, quindi presente su tutte le pagine.
- **Oggi:** `<div id="agria-concierge-root" data-concierge-slot>` vuoto, `position: fixed` in basso a destra (16px, 24px da `sm`), `z-index: 40`, `pointer-events: none`, nessuna dimensione. Non si vede e non intercetta click.
- **Per attivarlo:** passare il widget come figlio di `ConciergeSlot` nel layout (o montarlo via portal su `#agria-concierge-root`) e dare `pointer-events: auto` al solo widget. `z-index` 40 lo tiene sotto header (50) e menu mobile, sopra il contenuto.
- **Attenzione:** il banner cookie occupa il fondo pagina finché non viene chiuso; il widget deve evitarne l'area o comparire dopo il consenso (`lib/consent.js`). Deve rispettare gli stessi standard: movimento ridotto, tastiera, contrasto.

---

## 6. Peso delle immagini

| File | Dimensioni | Peso | Uso |
|---|---|---|---|
| `public/images/agria/settori/agriturismo.jpg` | 5982×3988 | **4.868 KB** — oltre 500 KB, segnalato, non convertito | Card Hospitality |
| `public/images/agria/settori/hospitality.jpg` | 4608×3072 | **1.759 KB** — oltre 500 KB | Non usata |

- `next/image` serve la foto in WebP ridimensionata: 7 KB a 256px, 125 KB a 1080px (misurato); con `sizes="(min-width: 768px) 33vw, 100vw"` una card scarica al massimo la versione da 640–1080px.
- **Vino e Olio:** nella cartella ammessa non ci sono file `vino` né `olio`: le due card restano con il pattern geometrico. Basterà aggiungere le foto e il campo `image` in `content/agria/home.js`.
- **Attenzione — file non tracciato:** `agriturismo.jpg` non è nel repository (per scelta, nessun file di `public/images/` viene committato in questa fase), ma la homepage committata lo usa. Su qualunque ambiente costruito dal repository (deploy, altro computer) la card Hospitality avrà un'immagine mancante finché la versione leggera non verrà committata. Il committente sostituirà il file con una versione ottimizzata.

---

## 7. Contrasti (WCAG 2.1, testo normale ≥ 4.5:1)

| Combinazione | Rapporto |
|---|---|
| Etichetta di stato nello schema (Fase A), green-dark su verde 12% | 5.27:1 |
| Grigio scurito `#54595A` su `GradientSection` chiara, punto peggiore | 5.56:1 |
| Green-dark su `GradientSection` chiara, punto peggiore | 4.67:1 |
| Grigio scurito su `HighlightCard` chiara, punto peggiore | 5.67:1 |
| Bianco 70% su `GradientSection` scura | 6.30:1 |
| Green-bright su `HighlightCard` scura | 5.93:1 |
| Bianco 70% nelle card interne scure | 5.06:1 |
| Etichetta green-bright (solo contorno) nelle card interne scure | 5.13:1 |
| CTA `primary` a riempimento completato, bianco su grafite | 18.88:1 |
| CTA `bright` a riempimento completato, ink su green-bright schiarito | 14.61:1 |
| Card di evidenza del mega menu: bianco / link green-bright, punto peggiore | 8.97:1 / 5.53:1 |

**Eccezione dichiarata:** con `HoverGroup` l'elemento attenuato (opacità 0.8) porta il grigio secondario a 3.37:1 su bianco. È uno stato transitorio, solo mentre il cursore è su un **altro** elemento del gruppo, mai da tastiera né su touch; l'elemento su cui si trova il cursore resta a contrasto pieno. Due correzioni fatte durante la fase B: il grigio sulle sfumature chiare (era 3.93:1) e l'etichetta green-bright su fondo verde nelle card scure (era 3.83:1).

Valori calcolati con la funzione di `app/(design-system)/design-system/contrast.js`, visibili in `/design-system`.

---

## 8. Esito della validazione

- `npm run build`: **riuscito**, 170/170 pagine, stesso numero di prima. `/`: 409 B, 102 kB di JS al primo caricamento.
- **Movimento ridotto:** `RotatingHeadline` (non parte, frase predefinita), `AutoTabs` (non ruota, nessuna barra), zoom, cursore, riempimento (compare senza animazione per la regola globale), `Reveal` e animazioni dell'hero sono tutti condizionati a `prefers-reduced-motion`.
- **Senza JavaScript:** l'HTML servito contiene un solo `h1` con il titolo "Prenotazioni e ordini, senza ricopiarli a mano.", i tre pannelli delle schede (i due nascosti diventano visibili via `scripting: none`), la foto con `alt`.
- **Salti di layout del titolo:** altezza del titolo identica con tutte e quattro le varianti e a metà scrittura: 185px a 375, 173px a 768, 227px a 1536 (prima dell'allargamento); dopo l'allargamento tutte le varianti su 2 righe a 1536px.
- **Tastiera** (tasti reali): nei Settori i tre link; nei Servizi scheda attiva, pulsante Pausa, pannello, tre link "Approfondisci" con nome completo ("Approfondisci: Digital Commerce per Vino"); frecce ed End tra le schede; nel mega menu `ArrowDown`, voci, link della card, `Esc` con ritorno del focus sul trigger. Focus visibile ovunque.
- **Mobile e tablet:** nessuno scorrimento orizzontale a 375px e 768px (anche a 1024 e 1536); schede alte 55px, il tocco seleziona la scheda e ferma la rotazione; foto a 310×168 (375px) e 216×168 (768px) con `object-fit: cover`, non deformata; pannelli del menu dentro lo schermo a 768 e 1024px.
- **Console:** nessun errore dopo il caricamento della homepage e di `/design-system`.
- **Lint:** nessun errore nei file toccati. Restano errori `react/no-unescaped-entities` preesistenti in `app/(site)/servizi/page.jsx` e `app/(site)/servizi/wine-club/page.jsx` (legacy, non toccati).

**Metodo e limiti:** verifiche responsive con iframe a larghezza fissa. In questa scheda automatizzata, quando la finestra è ridotta a icona Chrome rallenta fortemente timer e frame: parte delle prove è stata ripetuta con la finestra in primo piano. Lo spostamento del focus di `ArrowDown` nel mega menu avviene al frame successivo (logica del Prompt 06, invariata): con frame ritardati nell'ambiente di test arriva in ritardo, nel browser reale è immediato. Nessun test con screen reader reale né su dispositivo touch fisico.
