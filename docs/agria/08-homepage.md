# AGRIA — Prompt 08: Homepage

**Data:** 2026-09-23
**Branch:** `agria/redesign`
**Riferimento visivo:** `docs/agria/concept/agria-concept-v3.html`
**Natura del lavoro:** la homepage legacy di MG Solutions (`/`) è sostituita dalla homepage AGRIA. Il codice legacy non più usato dalla home (componenti `Reveal`, `CTA`, `BookingForm`, `TestimonialCarousel`, `FAQAccordion`, `ServiceArea`, dati `heroStats`, `caseStudies`…) resta nel repository fino al Prompt 15. Nessuna route creata o rimossa; `main` non è stato toccato.

---

## 1. Commit

| Commit | Contenuto |
|---|---|
| `feat(agria): hero e sezioni della homepage` | Nuova homepage, componenti `components/agria/home/`, copy in `content/agria/home.js`, estensioni UI, token h2/h3 |
| `feat(agria): metadata e structured data della homepage` | Title, description, Open Graph e Twitter della home; schema `Organization` spostato dal layout alla home e ripulito; schema FAQ rimosso |

---

## 2. Struttura della pagina

| # | Sezione | Fondo | Componente | Note |
|---|---|---|---|---|
| 1 | Hero | ink | `HomeHero` | Filari 3D, luce che scorre, pill `Prenotazioni · Ordini · Clienti · Costi`, unico `h1`, CTA `/contatti` e `#come-lavoriamo` |
| 2 | Striscia di fatti | bianco, sovrapposta all'hero | `FactStrip` | 4 riquadri: `Fatto da noi`, `Decidete voi`, `Anche un no`, `Liberi`; nessun numero di performance |
| 3 | Settori | bianco | `SectorCards` | 3 card con pattern geometrico, link `Vedi il settore` |
| 4 | Servizi | off-white | `ServiceCards` | Introduzione + 3 card, link `Approfondisci` |
| 5 | Dai dati alle decisioni | bianco | `DataSection` | Due colonne; schema con barre decorative e 3 righe |
| 6 | Come lavoriamo | off-white, `id="come-lavoriamo"` | `MethodSection` | Lista ordinata di 3 passi |
| 7–8 | Chiarezza · Ricerca e sviluppo | bianco | `ClaritySection` | Due blocchi affiancati, ognuno con il suo `h2` |
| 9 | CTA finale | card ink su bianco | `ClosingCta` | Alone green-bright, CTA `/contatti` |

Tutto il copy è in `content/agria/home.js`, identico al prompt (apostrofi dritti compresi). I componenti non contengono testo.

---

## 3. Componenti creati e modificati

### Creati
| File | Contenuto |
|---|---|
| `components/agria/home/HomeHero.jsx` + `HomeHero.module.css` | Hero. Il CSS Module (supportato nativamente da Next, nessuna dipendenza) riprende valori e animazioni del blocco HERO della concept. |
| `components/agria/home/FactStrip.jsx` | Striscia di fatti (`ul`, 2 colonne su mobile, 4 da `md`) |
| `components/agria/home/SectionIntro.jsx` | Etichetta + `h2` + introduzione, riusato da tutte le sezioni |
| `components/agria/home/SectorCards.jsx`, `SectorPattern.jsx` | Card settore e pattern SVG temporanei della concept |
| `components/agria/home/ServiceCards.jsx` | Card servizio su `Card` |
| `components/agria/home/DataSection.jsx` | Testo + schema (`figure` con `figcaption`) |
| `components/agria/home/MethodSection.jsx` | Metodo, destinazione dell'ancora |
| `components/agria/home/ClaritySection.jsx` | Chiarezza + Ricerca e sviluppo |
| `components/agria/home/ClosingCta.jsx` | Chiusura scura |
| `components/agria/ui/Reveal.jsx` | Apparizione allo scroll (dissolvenza + 16px), `IntersectionObserver`, soglia 0.12 come nella concept |
| `content/agria/home.js` | Copy della home |

### Modificati
| File | Modifica |
|---|---|
| `app/(site)/page.jsx` | Sola composizione delle sezioni + metadata e JSON-LD della home |
| `app/(site)/layout.jsx` | Rimosso lo schema `Organization` globale (ora solo in home) |
| `components/agria/ui/Heading.jsx`, `Text.jsx`, `Eyebrow.jsx` | Prop `onDark`: bianco / bianco 70% / green-bright su superfici scure. `h2` passa a peso 300. `Text` ha la nuova dimensione `md`. |
| `components/agria/ui/Card.jsx` | Prop `interactive` (sollevamento di 3px, bordo verde, ombra su hover, come nella concept) e `textSize` |
| `components/agria/ui/Button.jsx` | Variante `line` (contorno chiaro su scuro, CTA secondaria dell'hero) |
| `tailwind.config.js` | `agria-h2` = `clamp(1.95rem, 4vw, 3.05rem)` peso 300; `agria-h3` = `clamp(1.15rem, 1.8vw, 1.45rem)` peso 500, come nella concept; nuovo `agria-md` (15,5px) per i testi delle card |
| `app/globals.css` | Regole di `.agria-reveal`, attive solo con `(scripting: enabled) and (prefers-reduced-motion: no-preference)` |

---

## 4. Scelte dove la concept lasciava spazio

- **Ingresso dell'hero in solo CSS.** Nella concept anche i testi dell'hero appaiono via `IntersectionObserver`. Qui entrano con un'animazione CSS pura: il titolo, che è il probabile LCP, non aspetta l'idratazione di React. Le sezioni sotto usano `Reveal`.
- **Contenuto visibile senza JavaScript.** `.agria-reveal` nasconde gli elementi solo con `scripting: enabled`: senza JS (o per i crawler che non lo eseguono) la pagina è completa.
- **Chiarezza e Ricerca affiancate.** Due blocchi brevi e consecutivi su fondo bianco: in due colonne con un filetto superiore invece di due sezioni con 260px di vuoto in mezzo. In colonna su mobile.
- **Schema dati senza etichette di stato.** Deciso con il committente: le etichette della concept (`in crescita`, `da verificare`, `sopra la media`) non sono nel copy approvato; al loro posto un indicatore grafico neutro. Le barre sono decorative (`aria-hidden`).
- **Nessun link "La nostra ricerca"** nella sezione dati: presente nella concept, assente dal copy.
- **Nessuna nota "Foto reale al posto del pattern"** sulle card settore: era un'annotazione interna della concept.
- **Token h2/h3 allineati alla concept** (deciso con il committente). `agria-display` è rimasto invariato perché già vicino all'h1 della concept (2,75–4,5rem contro 2,6–4,7rem).
- **Ancora con margine.** `scroll-mt-20` sulla sezione metodo: dopo il salto la sezione parte 9px sotto l'header sticky.
- **Link con nome accessibile esplicito**: i tre `Vedi il settore` e i tre `Approfondisci` hanno `aria-label` "Vedi il settore: Hospitality" ecc. Il testo visibile resta quello del copy; il nome inizia con il testo visibile (WCAG 2.5.3).
- **Metadata.** `pageMetadata` aggiunge al titolo social il nome legacy (`site.name` = "MG Solutions"): nella home titolo social e `siteName` sono sovrascritti con "Agria", senza modificare `lib/seo.js`. Keyword legacy rimosse (`keywords: null`, incluso "Matteo Garuzzo").
- **Nessuna immagine social** (deciso con il committente): l'immagine esistente è tutta MG Solutions. `twitter:card` passa a `summary`, perché `summary_large_image` senza immagine non ha senso.
- **Organization** (deciso con il committente): spostato dal layout alla sola home, nome "Agria", logo `agria-logo-centered.svg`, description = description della home. Rimossi `founder` e `sameAs` (profili personali). Telefono, email e indirizzo invariati. Le altre pagine non hanno più uno schema `Organization`; il `Service` delle pagine servizi continua a citare `site.name` come provider finché quelle pagine non vengono rifatte.
- **Schema FAQ rimosso** dalla home: descriveva FAQ che la nuova pagina non mostra.

---

## 5. Contrasti (WCAG 2.1, testo normale ≥ 4.5:1)

| Combinazione | Rapporto |
|---|---|
| Etichetta hero, green-bright su ink | 12.13:1 |
| Etichetta hero sul punto più chiaro dell'alone | 8.02:1 |
| Titolo, bianco su ink / sull'alone | 19.68:1 / 13.01:1 |
| Sottotitolo, bianco 70% su ink / sull'alone | 9.68:1 / 7.24:1 |
| Testo delle pill (bianco 82%) su pill / su pill sopra un filare | 11.94:1 / 5.56:1 |
| CTA, ink su green-bright | 12.13:1 |
| Bottone `line`, bianco su ink | 19.68:1 |
| Chiusura, bianco 70% sull'alone | 7.24:1 |
| Grafite su bianco | 18.88:1 |
| Grey su bianco (testi delle card, etichette dei fatti) | 5.05:1 |
| Grey su off-white (introduzione Servizi) | 4.70:1 |
| Green-dark su bianco (link, etichette) | 6.01:1 |
| Green-dark su off-white | 5.59:1 |

---

## 6. Esito della validazione

- `npm run build`: **riuscito**, 170/170 pagine, stesso numero di prima. `/` pesa 1,83 kB, con 95,8 kB di JS al primo caricamento.
- Un solo `h1` ("Prenotazioni e ordini, senza ricopiarli a mano."), 7 `h2`.
- Nessuna occorrenza di "MG Solutions", "Matteo", "€", "%", "cliente", "testimon", "case study" nel testo della pagina né nell'HTML generato (`MG Solutions`: 0).
- Metadata verificati nell'HTML: title, description, canonical `/`, `og:title`, `og:site_name=Agria`, nessuna immagine social, nessuna meta `keywords`. JSON-LD: `WebPage` + `Organization` (Agria, senza `founder`/`sameAs`).
- Tastiera: con 32 pressioni reali di Tab si raggiungono in ordine barra annuncio, header, le 9 destinazioni della pagina e il footer; tutti i 30 elementi hanno `:focus-visible` e anello visibile.
- Ancora: il click su "Come lavoriamo" porta la sezione a 80px dal bordo superiore, sotto l'header (71px).
- Scorrimento orizzontale: 0 a 375px, 768px e 1280px; nessun elemento del contenuto oltre la larghezza.
- `prefers-reduced-motion`: verificato sui fogli di stile caricati che le animazioni dei filari (`sweep`), delle pill (`float`), l'ingresso dell'hero e le regole di `Reveal` esistono solo dentro `prefers-reduced-motion: no-preference`. Resta attiva la regola globale preesistente che azzera durate e scorrimento morbido.
- Immagini: nessuna immagine nella pagina (pattern SVG inline e CSS), quindi nessuna oltre 300 KB.
- Console: nessun errore o avviso al caricamento.

**Metodo e limiti.** Verifiche responsive con iframe a larghezza fissa, non su dispositivo reale. In questa scheda automatizzata lo scorrimento morbido non viene animato (anche `scrollIntoView()` resta fermo), per cui il salto all'ancora è stato verificato con lo scorrimento istantaneo impostato solo per il test. Nessun test con screen reader reale.

---

## 7. Dove serviranno foto reali

| Punto | Oggi | Serve |
|---|---|---|
| Card **Hospitality** (`SectorCards`, area 168px di altezza) | Pattern a curve di livello | Foto reale di una struttura (agriturismo, relais, masseria) |
| Card **Vino** | Pattern a filari | Foto reale di cantina o vigneto |
| Card **Olio** | Pattern a oliveto | Foto reale di frantoio o oliveto |
| **Immagine social** della home (Open Graph, 1200×630) | Nessuna | Immagine AGRIA senza foto personali né marchio MG |

Per le card: formato orizzontale, `next/image` con dimensioni esplicite, peso sotto i 300 KB (la validazione del prompt lo richiede). L'hero non richiede foto: i filari 3D fanno parte della direzione approvata.

---

## 8. Da sapere

- **Link che oggi danno 404** (pagine previste nei prompt successivi): `/settori/hospitality|vino|olio`, `/servizi/digital-presence|commerce|automation`.
- **Modifiche esterne al working tree, non incluse nei commit:** durante il lavoro sono comparse cancellazioni di `public/images/hero/home-hero.png`, `public/images/sectors/olio-hero.png`, `public/images/sectors/wine-hero.png`, `public/images/servizi/brand-identity-hero.jpg` e nuove immagini in `public/images/sectors/` e `public/images/agria/`. Le cancellazioni romperebbero gli sfondi di `/contatti`, `/geo/[regione]`, `/prenota-call`, `/referral`, `/settori/oleifici-food-tech`, `/settori/wine-viticulture` e di un servizio in `content/servizi.js`. Tre delle nuove foto superano ampiamente i 300 KB (5,7 MB, 3,5 MB, 2,8 MB).
- **Contatti nello schema:** email (`gmail`) e dominio canonico (`matteogaruzzo.com`, da `NEXT_PUBLIC_SITE_URL`) restano quelli attuali, come richiesto; andranno aggiornati quando esisteranno dominio e casella AGRIA.
