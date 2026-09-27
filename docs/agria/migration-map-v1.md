# AGRIA — SEO Migration Map v1

Estratto del capitolo 8 dell'AGRIA Website Master Plan v1 (22 settembre 2026). Il Master Plan completo resta la fonte vincolante; questo file serve a Claude Code come riferimento nel repository.

Non è solo un cambio di dominio: è migrazione di dominio (matteogaruzzo.com → agriasystem.com), rebranding, consolidamento dei contenuti e nuova information architecture. Ogni URL è valutata per intento originario, traffico, query, contenuto e destinazione semanticamente equivalente. Nessun redirect generico solo per recuperare autorità.

**Dati usati.** Search Console di matteogaruzzo.com, 30 luglio – 19 settembre 2026 (lo storico della proprietà inizia il 30 luglio). Export aggiornato al 22 settembre in `docs/agria/data/`.

**Legenda.**
- **KEEP + REWRITE**: stessa URL, contenuto riscritto.
- **MERGE**: URL chiusa con 301 verso una pagina che ne assorbe il contenuto.
- **301**: redirect verso una destinazione pertinente.
- **DELETE**: risposta 410 (o 404), nessun redirect.

## Nuove pagine (non esistono oggi)

| Pagina | Slug IT | Slug EN |
|---|---|---|
| Digital Presence | /servizi/digital-presence | /en/services/digital-presence |
| Digital Commerce | /servizi/digital-commerce | /en/services/digital-commerce |
| Digital Automation | /servizi/digital-automation | /en/services/digital-automation |
| Hospitality | /settori/hospitality | /en/industries/hospitality |
| Cantine | /settori/cantine | /en/industries/wineries |
| Frantoi | /settori/frantoi | /en/industries/olive-oil |
| Azienda | /azienda | /en/company |
| Versioni EN delle pagine core | /en, /en/services, /en/industries, /en/contact | — |

**Storico — settori rinominati (Prompt 10, 24 settembre 2026).** Vino e Olio sono prodotti, non settori: diventano Cantine (EN: Wineries) e Frantoi (EN: Olive Oil Producers). Slug precedenti: /settori/vino → /settori/cantine, /settori/olio → /settori/frantoi, /en/industries/wine → /en/industries/wineries; /en/industries/olive-oil resta invariato. Le pagine vecchie non sono mai state pubblicate, quindi non serve nessun redirect; le destinazioni delle tabelle sotto sono già aggiornate.

## Pagine principali

| URL attuale | Impr. / click | Azione | Destinazione |
|---|---|---|---|
| / | 5.830 / 11 | KEEP + REWRITE | / |
| /servizi | 3 / 0 | KEEP + REWRITE | /servizi |
| /settori | 19 / 0 | KEEP + REWRITE | /settori |
| /contatti | 18 / 1 | KEEP + REWRITE | /contatti |
| /blog | 15 / 0 | KEEP + REWRITE | /blog (Insights) |
| /privacy-policy | 2 / 0 | KEEP + REWRITE | /privacy-policy |
| /cookie-policy | 3 / 0 | KEEP + REWRITE | /cookie-policy |
| /termini-e-condizioni | 24 / 2 | KEEP + REWRITE | /termini-e-condizioni |
| /chi-sono | 53 / 1 | 301 | /azienda |
| /metodo | 4 / 0 | MERGE | /azienda |
| /metodo/analisi-e-obiettivi | 10 / 0 | MERGE | /azienda |
| /metodo/strategia-di-settore | 2 / 0 | MERGE | /azienda |
| /metodo/design | 2 / 0 | MERGE | /azienda |
| /metodo/sviluppo | 3 / 0 | MERGE | /azienda |
| /prenota-call | 29 / 0 | 301 | /contatti |
| /quiz | 3 / 0 | 301 | /contatti |
| /proposta/[id] | noindex | DELETE | route rimossa |
| /risorse | 3 / 0 | DELETE | — |
| /referral | 1 / 0 | DELETE | — |
| /crediti-immagini | 0 | KEEP + REWRITE | /crediti-immagini (noindex, generata dai crediti Unsplash) |
| /geo e 16 regioni | 73 / 0 | DELETE | — |
| /blog/tag/* (71) | 38 / 0 | DELETE | — |

## Servizi

| URL attuale | Impr. / click | Azione | Destinazione |
|---|---|---|---|
| /servizi/ecommerce-shopify | 40 / 1 | 301 | /servizi/digital-commerce |
| /servizi/wine-club | 0 | 301 | /servizi/digital-commerce |
| /servizi/siti-web-contatti | 10 / 1 | 301 | /servizi/digital-presence |
| /servizi/restyling-ottimizzazione | 3 / 0 | 301 | /servizi/digital-presence |
| /servizi/consulenza-strategica | 3 / 0 | 301 | /servizi/digital-presence |
| /servizi/seo-geo-strategy | 0 | 301 | /servizi/digital-presence |
| /servizi/brand-identity | 0 | 301 | /servizi/digital-presence |
| /servizi/automazioni-ai | 17 / 0 | 301 | /servizi/digital-automation |
| /servizi/software-ai-su-misura (non più nel codice) | 4 / 0 | 301 | /servizi/digital-automation |

## Settori

| URL attuale | Impr. / click | Azione | Destinazione |
|---|---|---|---|
| /settori/wine-viticulture | 3 / 0 | 301 | /settori/cantine |
| /settori/oleifici-food-tech | 21 / 1 | 301 | /settori/frantoi |
| /settori/wine-hospitality-agriturismi | 16 / 1 | 301 | /settori/hospitality |

## Software

Le pagine /software/* intercettano domanda reale ("gestionale agriturismo", "software cantine") ma sono posizionate male e gli articoli del blog le battono sulle stesse ricerche. L'intento viene servito da contenuto editoriale, senza presentare Agria come venditore di gestionali.

| URL attuale | Impr. / click | Pos. | Azione | Destinazione |
|---|---|---|---|---|
| /software/hospitality | 311 / 1 | 34,5 | MERGE | /blog/software-per-agriturismi |
| /software/vitivinicolo | 265 / 0 | 37,6 | MERGE | /blog/software-per-cantine |
| /software/frantoi | 30 / 1 | 32,1 | 301 | /settori/frantoi |
| /software | 58 / 0 | 45,2 | DELETE | — |
| /software/pricing | 9 / 1 | — | DELETE | Oggi 301 → /software: aggiornare, niente catene |
| /software/lead-sales | 4 / 0 | — | DELETE | Idem |
| /software/social-ai | 2 / 0 | — | DELETE | Idem |
| /software/booking-experience | 5 / 0 | — | DELETE | Idem |
| /software/staff-operations | — | — | DELETE | Idem |
| /software/control-tower | — | — | DELETE | Idem |

## Portfolio (concept)

Richiesta di rimozione temporanea dall'indice inviata in Search Console il 22 settembre 2026 (prefisso /portfolio).

| URL attuale | Impr. | Azione | Destinazione |
|---|---|---|---|
| /portfolio | — | 301 | /settori |
| /portfolio/tenuta-monteverdi | 25 | 301 | /settori/cantine |
| /portfolio/azienda-rossi | 4 | DELETE | — |
| /portfolio/podere-la-vite | 4 | DELETE | — |
| /portfolio/frantoi-san-lorenzo | 3 | DELETE | — |
| /portfolio/tasting-flow | 1 | DELETE | — |
| /portfolio/wine-club-pro | 0 | DELETE | — |

## Insights: articoli (/blog/[slug])

### KEEP + REWRITE in Fase 1 (13 articoli)

Stesso slug, stesso intento di ricerca, contenuto riscritto nel tone of voice Agria, senza prezzi, metriche non verificabili o riferimenti legacy.

| Articolo | Impr. / click | Pos. | Note |
|---|---|---|---|
| ecommerce-per-frantoi | 506 / 6 | 8,7 | Articolo più forte del sito |
| software-per-agriturismi | 380 / 1 | 9,5 | Assorbe /software/hospitality |
| software-per-cantine | 174 / 1 | 17,8 | Assorbe /software/vitivinicolo |
| siti-web-per-agriturismi | 143 / 2 | 10,4 | |
| gestione-fiscale-ecommerce-vino-iva-fatturazione | 132 / 3 | 11,1 | Verificare l'attualità delle informazioni fiscali |
| siti-web-per-cantine | 84 / 1 | 9,5 | |
| vendita-internazionale-vino-dtc-export-estero | 66 / 1 | 27,3 | |
| agriturismo-booking-online-prenotazioni | 49 / 0 | 13,9 | |
| degustazioni-cantina-trasformare-visite-vendite | 35 / 0 | 9,9 | Diventa la guida di riferimento sull'enoturismo |
| ecommerce-vino-margini-vendita-diretta | 28 / 3 | 4,3 | CTR più alto del sito |
| storytelling-vino-marketing-vendite | 17 / 0 | 7,6 | |
| chatbot-cantina-ai-customer-service | 8 / 1 | 5,6 | |
| seo-locale-agroalimentare-google-maps | 7 / 0 | 6,7 | Diventa la guida su SEO e visibilità nei motori AI |

### MERGE e 301

| Articolo | Impr. | Azione | Destinazione |
|---|---|---|---|
| ecommerce-vino-vendite-dirette | 4 | MERGE | /blog/ecommerce-vino-margini-vendita-diretta |
| ecommerce-per-cantine | 0 | MERGE | /blog/ecommerce-vino-margini-vendita-diretta |
| enoturismo-prenotazioni-online-vendite-dirette | 6 | MERGE | /blog/degustazioni-cantina-trasformare-visite-vendite |
| pos-cassa-cantina-vendita-degustazione | 6 | MERGE | /blog/degustazioni-cantina-trasformare-visite-vendite |
| cross-selling-upselling-cantina-scontrino-medio | 9 | MERGE | /blog/degustazioni-cantina-trasformare-visite-vendite |
| ridurre-no-show-prenotazioni-cantina-promemoria | 8 | MERGE | /blog/degustazioni-cantina-trasformare-visite-vendite |
| multi-canale-cantina-getyourguide-viator-ota | 5 | MERGE | /blog/degustazioni-cantina-trasformare-visite-vendite |
| formazione-team-accoglienza-cantina-vendite | 3 | MERGE | /blog/degustazioni-cantina-trasformare-visite-vendite |
| comunicare-sostenibilita-cantina-marketing-vendite | 9 | MERGE | /blog/storytelling-vino-marketing-vendite |
| seo-geo-farsi-trovare-ai | 4 | MERGE | /blog/seo-locale-agroalimentare-google-maps |
| ecommerce-for-frantoi (non più nel codice) | 1 | 301 | /blog/ecommerce-per-frantoi |
| shopify-velocita-conversioni | 6 | 301 | /servizi/digital-commerce |
| wine-club-revenue-ricorrente-fedelta | 0 | 301 | /servizi/digital-commerce |
| email-marketing-sequenze-automatiche-cantina-visitatori | 9 | 301 | /servizi/digital-automation |
| agenti-ai-processo-commerciale | 9 | 301 | /servizi/digital-automation |
| agente-ai-reparto-commerciale | 1 | 301 | /servizi/digital-automation |
| software-frantoi-gestione-ordini-crm | 1 | 301 | /settori/frantoi |

### DELETE

| Articolo | Impr. | Motivo |
|---|---|---|
| specialista-digitale-vs-web-agency-agroalimentare | 9 | Racconto freelance contro agenzia, incompatibile con il posizionamento |
| scegliere-partner-digitale-checklist | 1 | Da riscrivere eventualmente in Fase 2 su un nuovo slug |
| bandi-incentivi-digitalizzazione-agroalimentare | 1 | Contenuto datato, rischio di informazioni non più valide |

## Decisioni del 27 settembre 2026

- /contatti/grazie tolta dalla mappa: la conferma resta nel riquadro del modulo.
- /referral e /risorse: DELETE (410). /crediti-immagini: KEEP, ricostruita in stile Agria.
- I 13 articoli KEEP restano online allo stesso indirizzo nel layout Agria, con una pulizia minima, in attesa della riscrittura.
- API legacy del quiz e della newsletter (/api/quiz/*, /api/newsletter/*): 410.
- Applicazione: `lib/migration.js` (regole) e `middleware.js`; verifica con `node scripts/verify-migration.mjs`.

## Regole di applicazione

1. Dominio parametrizzato in una variabile d'ambiente al posto dei 6 punti hardcoded.
2. Redirect in `next.config.js`, versionati: prima le mappature di percorso, poi il redirect di dominio da matteogaruzzo.com ad agriasystem.com con lo stesso percorso di destinazione finale. Nessuna catena.
3. Le URL DELETE rispondono 410 (o 404) su entrambi i domini.
4. Per i MERGE, il contenuto utile della pagina assorbita entra davvero nell'articolo di destinazione.
5. Sitemap separate IT/EN, solo URL indicizzabili, `lastModified` reale.
6. hreflang reciproci IT/EN dove esiste la traduzione.
7. Nuova proprietà Search Console di tipo Dominio per agriasystem.com e strumento di cambio indirizzo al go-live.
8. matteogaruzzo.com resta attivo come dominio di redirect per almeno 12 mesi, consigliato in modo permanente.
9. Monitoraggio di copertura ed errori nelle settimane successive al lancio.
