# AGRIA — Prompt 15: Parliamo del progetto, HubSpot e assistente

**Data:** 2026-09-26
**Branch:** `agria/redesign`
**Stato:** fasi A, B e C completate. Invio reale verso HubSpot verificato in locale.
**Natura del lavoro:** pagina `/contatti` con modulo nativo a passi, integrazione HubSpot lato server con creazione della trattativa, assistente con risposte curate su tutte le pagine. Nessun widget, script, stile o iframe del modulo HubSpot nel frontend; nessun token nel frontend; `main` non è stato toccato.

---

## 1. Commit

| Commit | Contenuto |
|---|---|
| `1713cb7 feat(agria): pagina contatti con form nativo a passi` | Fase A |
| `93bb99e feat(agria): integrazione HubSpot lato server con creazione trattativa` | Fase B, con la prima versione di questo report |
| `feat(agria): assistente con risposte curate e passaggio a WhatsApp` | Fase C e report completo |

---

## 2. Pagina `/contatti`

Testi in `content/agria/contatti.js`, componenti in `components/agria/contatti/`, campi e regole in `lib/contact/fields.js`.

| # | Sezione | Fondo | Interazione |
|---|---|---|---|
| 1 | Hero *Parliamo del progetto.* | ink con scena dei filari | — |
| 2 | Modulo a passi + colonna *Risponde una persona · Nessun impegno · Dati trattati con cura* | bianco, modulo sovrapposto all'hero | modulo a tre passi (sotto) |
| 3 | Altri modi per parlarci | off-white | email, telefono, WhatsApp con messaggio precompilato, sede con mappa, orari; tre card sopra e due sotto |
| 4 | Cosa succede dopo | ink | **quattro tappe che avanzano da sole**: barra a tempo, pausa al passaggio del cursore, al focus e con pulsante (WCAG 2.2.2); testi sempre visibili |
| 5 | Domande frequenti | bianco | **schede apribili** su due colonne (`details`/`summary` nativi) |
| 6 | Chiusura | off-white | rimando alle tre aree e all'indice dei servizi |

### Modulo
- **Passi:** L'azienda (settore, azienda) · Il progetto (servizio, tempistica, messaggio facoltativo) · I contatti (nome, cognome, email, telefono con prefisso, preferenza, consenso).
- **Scelte:** radio nativi dentro card, pill e opzioni: frecce e Tab funzionano senza codice di tastiera. Valori inviati esattamente come nel prompt.
- **Comportamento:** validazione per passo, errori sotto il campo, focus sul primo campo errato; titolo del passo a fuoco al cambio; barra di avanzamento; riepilogo delle scelte fatte con *Modifica*; transizioni tra i passi disattivate con movimento ridotto.
- **Invio:** pulsante disabilitato con stato di caricamento; blocco del doppio clic nel browser e sul server; identificativo della richiesta; campo trappola.
- **Consenso privacy:** casella non preselezionata, link a `/privacy-policy`; senza spunta il modulo non parte. Nessuna iscrizione a newsletter.
- **Configuratore della homepage:** con `?moduli=` il messaggio viene precompilato con i moduli scelti.
- **Senza JavaScript:** i tre passi sono visibili uno sotto l'altro, i pulsanti non compaiono, un avviso rimanda a email e WhatsApp.

### Dopo l'invio
- **Fissare una videocall** → il browser apre il calendario di Alessandro, `https://meetings-eu1.hubspot.com/alessandro-poponi`, dove il visitatore sceglie giorno e ora. La trattativa nasce in *Appuntamento da Fissare*; il passaggio ad *Appuntamento Fissato* dopo la prenotazione resta manuale.
- **Ricevere maggiori informazioni** → il modulo lascia il posto a *Richiesta ricevuta* nello stesso riquadro.
- **Conversione:** evento `generate_lead` in `window.dataLayer` (e `gtag`, se presente) con preferenza, settore e servizio; nessun dato personale. Pronto per GA4 via Google Tag Manager.

La pagina intermedia `/contatti/prenota` con il calendario in un riquadro è stata rimossa dopo la prova reale: il calendario si apre direttamente, senza iframe né consenso cookie sul sito.

---

## 3. Integrazione HubSpot — architettura

```
browser (modulo) ──token reCAPTCHA v3, action contact_form──┐
        │ POST /api/contact (JSON)                          │
        ▼                                                   │
app/api/contact/route.js                                    │
  1. dimensione e formato della richiesta                   │
  2. campo trappola → risposta di successo, nessuna chiamata│
  3. limite per IP (5 richieste in 10 minuti)               │
  4. validazione di tutti i campi e dei valori ammessi      │
  5. doppio invio: stesso identificativo → stessa risposta  │
  6. reCAPTCHA: success, action, hostname, punteggio ◄──────┘
     (fallita → rifiuto, HubSpot non viene contattato)
  7. Forms API: submission con consenso al trattamento
  8. CRM: contatto per email (aggiorna o crea)
  9. CRM: azienda per dominio affidabile o per nome (riusa o crea)
 10. associazione contatto-azienda
 11. trattativa con associazioni a contatto e azienda
  → notifica al team via Resend (o segnalazione, se un passaggio non riesce)
  → risposta: { ok, next: 'calendario' | 'grazie' } oppure { ok: false, message }
```

File: `lib/contact/config.js` (identificativi e costanti), `http.js` (timeout, ripetizione, registro), `guards.js` (limite per IP, doppio invio), `recaptcha.js`, `hubspot.js`, `notify.js` (segnalazione al team).

### Campi inviati alla Forms API
| Campo | Oggetto | Valore |
|---|---|---|
| `firstname`, `lastname`, `email` | contatto (0-1) | dal modulo |
| `phone` | contatto (0-1) | prefisso + numero, es. `+393331234567` |
| `company` | contatto (0-1) | nome dell'azienda (campo obbligatorio del modulo HubSpot) |
| `name` | azienda (0-2) | nome dell'azienda |
| `settore_agria` | azienda (0-2) | `Hospitality`, `Cantina / Vitivinicolo`, `Frantoio / Olivicolo`, `Altro` (campo obbligatorio del modulo HubSpot) |
| `servizio_di_interesse_sito` | contatto (0-1) | uno dei cinque servizi |
| `tempistica_progetto` | contatto (0-1) | una delle cinque tempistiche |
| `message` | contatto (0-1) | messaggio, se presente |
| `tipo_richiesta_sito` | contatto (0-1) | `Fissare una videocall` o `Ricevere maggiori informazioni` |

`legalConsentOptions.consent`: `consentToProcess: true`, testo esatto della casella, `communications: []` (nessun consenso di marketing). `context`: `pageUri`, `pageName`, `ipAddress`, `hutk` se presente.

### CRM
Proprietario di contatto, azienda e trattativa: **Alessandro Poponi, `37994989`**. Su un contatto o un'azienda già esistenti il proprietario si imposta solo se manca, per non riassegnare record di altri.
- **Contatto:** `GET /crm/v3/objects/contacts/{email}?idProperty=email` → `PATCH` se esiste, altrimenti `POST`; un `409` (contatto appena creato dalla submission) porta all'aggiornamento del contatto esistente. Proprietà scritte via CRM, non solo dalla submission: email, nome, cognome, telefono, azienda, `servizio_di_interesse_sito`, `tempistica_progetto`, `tipo_richiesta_sito`, `message`, `hubspot_owner_id`.
- **Azienda:** il nome inserito nel modulo è la fonte. Si cerca un'azienda con lo stesso nome normalizzato (minuscole, senza accenti, punteggiatura e spazi doppi: "Cantina  Agrodolce S.r.l." = "cantina agrodolce srl"); se esiste si riusa, altrimenti si crea con `name`, `settore_agria` e `hubspot_owner_id`. Il dominio dell'email **non** è un criterio di riutilizzo e non viene scritto sull'azienda: potrà servire solo se il modulo raccoglierà esplicitamente il sito aziendale.
- **Associazione contatto-azienda:** `PUT /crm/v4/objects/contact/{id}/associations/default/company/{id}`.
- **Trattativa:** `[AZIENDA] — Opportunità da qualificare`, pipeline `default`, `hubspot_owner_id` `37994989`, `fonte_lead_agria` = `Sito web`, `servizio_di_interesse` mappato (sito web → Digital Presence, E-commerce → Digital Commerce, AI → Digital Automation, Software → Software / Products, Non ancora definito → Non ancora definito). Fase secondo `tipo_richiesta_sito`: *Ricevere maggiori informazioni* → **Nuovo Lead `6062102776`**; *Fissare una videocall* → **Appuntamento da Fissare `6062103741`**. Associazioni nella creazione: contatto (tipo 3) e azienda principale (tipo 5).
- **Task di controllo per Matteo** (`lib/contact/manager-task.js`): dopo la trattativa, solo per una richiesta nuova, un task *Nuovo lead sito — [AZIENDA]* assegnato a Matteo Garuzzo (`HUBSPOT_MANAGER_OWNER_ID`), scadenza oggi alle 18 ora italiana (23:59 se le 18 sono passate), stato *Non iniziato*, tipo *Da fare*. Testo: nome e cognome, azienda, email, telefono, servizio, tempistica, tipo richiesta (informazioni/videocall), nome della trattativa. Creato con `POST /crm/v3/objects/tasks` e associazioni nella stessa chiamata: contatto (tipo 204), azienda (tipo 192), trattativa (tipo 216). Trattativa, contatto e azienda restano ad Alessandro; nessun task per Alessandro. Un errore del task non ferma la richiesta né la notifica: viene registrato (`manager_task_failed`, con gli ambiti in caso di 403). Senza la variabile il task non viene creato (`manager_task_skipped`).

### Notifica interna
Dopo ogni richiesta completata, email via Resend ai destinatari di `TEAM_NOTIFICATION_EMAIL` (più indirizzi separati da virgola), indipendente dalla notifica nativa HubSpot, con rispondi-a sull'email del visitatore. Contenuto: nome e cognome, azienda, email, telefono, settore, servizio richiesto, tempistica, tipo di richiesta, messaggio. Nessun token, segreto o dato tecnico. Se un passaggio in HubSpot non riesce, al posto della notifica parte una segnalazione con gli stessi dati e il passaggio da completare a mano. Un invio ripetuto dello stesso modulo, che riusa la trattativa, non manda una seconda email.

### Duplicati ed errori
| Caso | Comportamento |
|---|---|
| Doppio clic | Il browser blocca il secondo invio; il server riconosce lo stesso identificativo e restituisce la stessa risposta senza nuove chiamate |
| Invio ripetuto subito dopo (nuovo identificativo) | Prima di creare la trattativa si leggono le trattative associate al contatto (associazioni v4, subito aggiornate, non soggette al ritardo della ricerca): una trattativa aperta con lo stesso nome creata negli ultimi 15 minuti viene riusata |
| Timeout o errore temporaneo nella creazione | Le creazioni (contatto, azienda, trattativa) non vengono ripetute alla cieca: prima si ricontrolla se il record esiste già, poi si ritenta una volta |
| Errore temporaneo nelle letture e negli aggiornamenti (rete, timeout 8 s, 429, 5xx) | Una sola ripetizione |
| Forms API: 404 su `api.hsforms.com` | Una ripetizione su `api-eu1.hsforms.com` |
| Campo non presente nel modulo HubSpot, o campo obbligatorio che il sito conosce su un altro oggetto | La submission si corregge da sola (toglie il campo, oppure lo aggiunge sull'oggetto richiesto) e riprova, al massimo tre tentativi; ogni correzione è registrata (`form_fields_adjusted`) |
| Campo obbligatorio che il sito non raccoglie | Submission registrata come fallita con il nome del campo; contatto, azienda, trattativa e notifica arrivano comunque |
| Proprietà del contatto, dell'azienda o della trattativa rifiutata | Record salvato senza quella proprietà, registrato |
| 403 ambito mancante | Registrati endpoint e ambiti richiesti; segnalazione al team |
| Submission riuscita, trattativa o azienda fallite | Esito positivo per il visitatore; segnalazione al team con i dati della richiesta |
| Submission e contatto entrambi falliti | Errore al visitatore, con rimando a email e WhatsApp |
| Task per Matteo: doppio clic, invio ripetuto, timeout | Doppio clic: nessuna nuova chiamata. Invio ripetuto: la trattativa viene riusata e il task non si crea. Prima di creare il task si leggono i task associati alla trattativa: se ne esiste già uno con lo stesso titolo e lo stesso owner si riusa. Timeout o 5xx nella creazione: si ricontrolla prima di ritentare una volta |
| reCAPTCHA fallito | *Non siamo riusciti a verificare la richiesta. Riprova tra qualche istante.* L'esito non viene ricordato: si può riprovare |

**Registro:** una riga JSON per evento con identificativo della richiesta, passaggio, esito, codici e ambiti. Mai nomi, email, telefoni, messaggi o token (verificato nel registro dei test).

---

## 4. Variabili d'ambiente (Vercel)

| Variabile | Uso | Obbligatoria |
|---|---|---|
| `HUBSPOT_PRIVATE_APP_TOKEN` | API CRM, solo server | Sì |
| `RECAPTCHA_SECRET_KEY` | verifica reCAPTCHA, solo server | Sì |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA nel browser (pubblica per natura) | Sì |
| `RECAPTCHA_MIN_SCORE` | soglia del punteggio | No, predefinita 0.5 |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | notifica al team di ogni richiesta e segnalazione di quelle non completate | Sì, per la notifica interna |
| `TEAM_NOTIFICATION_EMAIL` | destinatari della notifica, più indirizzi separati da virgola | Sì, per la notifica interna |
| `HUBSPOT_MANAGER_OWNER_ID` | ID owner HubSpot di Matteo Garuzzo per il task di controllo (non è un segreto; si ricava con `node scripts/hubspot-owners.mjs --set`, che lo scrive anche in `.env.local`) | Sì, per il task; se vuota nessun task |

Portale, modulo, pipeline, fase, proprietario, regione e mappature restano costanti in `lib/contact/config.js`: non sono segreti. Hostname reCAPTCHA ammessi: `agriasystem.com`, `www.agriasystem.com`, `localhost`.

---

## 5. Differenze rispetto alla documentazione HubSpot

La documentazione ufficiale non è raggiungibile da questo ambiente: le verifiche usano copie datate marzo 2026 delle pagine ufficiali, l'SDK ufficiale HubSpot e la libreria ufficiale di Google.

1. **Host EU della Forms API:** le pagine ufficiali mostrano solo `api.hsforms.com`; community HubSpot e molti progetti indicano che i portali `eu1` devono usare `api-eu1.hsforms.com`. Si usa l'endpoint indicato nel prompt e, su 404, quello EU.
2. **Search CRM:** il limite attuale è di 5 richieste al secondo (non 4); gli oggetti appena creati compaiono nella ricerca dopo qualche istante (per questo il doppio invio è gestito prima, in memoria).
3. **Associations v4:** la guida mostra ora percorsi datati (`/crm/objects/2026-03/...`); i percorsi `/crm/v4/...` usati qui restano supportati fino a marzo 2027 secondo il changelog.
4. **403:** gli ambiti mancanti arrivano in `errors[].context.requiredGranularScopes` (non più `requiredScopes`); il codice legge entrambi.
5. **Fonte della trattativa:** non esiste una proprietà standard; il portale usa la proprietà personalizzata `fonte_lead_agria` (confermata dopo la prova reale).
6. **`settore_agria` e campi del modulo:** ogni campo inviato deve esistere nel modulo HubSpot (`FIELD_NOT_IN_FORM_DEFINITION`); il codice li invia come proprietà di contatto (0-1) e il nome azienda come azienda (0-2). Se il modulo li definisce diversamente, vengono scartati e registrati.
7. **Modulo HubSpot con CAPTCHA attivo:** la submission via API fallirebbe (`FORM_HAS_RECAPTCHA_ENABLED`); il CAPTCHA del modulo HubSpot va lasciato disattivo, la protezione è reCAPTCHA v3 sul sito.
8. **Fase e pipeline:** le fasi `6062102776` e `6062103741` appartengono alla pipeline `default`.

---

## 6. Esito della validazione

| Verifica | Esito |
|---|---|
| Terza prova reale (log) | reCAPTCHA 0.9, contatto, azienda, associazione, trattativa nella fase giusta, notifica a 2 destinatari; Forms API 400 `REQUIRED_FIELD` sul campo `company`, poi aggiunto alla submission |
| Quarta e quinta prova reale (log) | Forms API 400 `REQUIRED_FIELD`: prima `company`, poi `0-2/settore_agria` (il modulo HubSpot vuole il settore sull'azienda). Entrambi corretti; CRM, trattativa e notifica riusciti in ogni prova |
| Submission autocorrettiva (API simulate, regole del portale reale) | Modulo reale: 2xx al primo tentativo. Modulo con settore sul contatto: corretta da sola e 2xx. Campo obbligatorio sconosciuto: fallita con il nome del campo, lead comunque nel CRM. Contatto che torna con un'altra azienda: un'azienda e una trattativa per richiesta, ciascuna associata all'azienda inserita |
| Azienda per nome (API simulate) | Email `@altra.it` con azienda "Cantina Agrodolce": creata "Cantina Agrodolce", non riusata l'azienda di quel dominio; "CANTINA agrodolce" riusa "Cantina Agrodolce"; Forms API 2xx con `company` |
| `npm run build` | Riuscito, **174 pagine** (`/contatti`, `/api/contact` dinamico; `/contatti/prenota` rimossa) |
| Token nel bundle | Build con token e chiave segreta di prova: nessuna traccia in `.next`; la chiave pubblica reCAPTCHA è solo nel codice della pagina contatti |
| Segreti nei file tracciati | Nessuno; `.env.example` solo con i nomi |
| HubSpot nel frontend | Nessuno script, stile, iframe o riferimento del modulo HubSpot; l'unico riferimento è l'indirizzo del calendario di Alessandro, aperto dopo l'invio |
| Invio completo (API simulate) | 20 scenari: invio informazioni e videocall, consenso mancante, valori non ammessi, lunghezze, trappola, reCAPTCHA con punteggio basso, action errata, hostname errato, token assente, doppio invio simultaneo e successivo, azienda riusata per dominio, host EU di riserva, campo rifiutato, proprietà rifiutata, 403, trattativa non creata, CRM irraggiungibile, tutto irraggiungibile, limite per IP |
| Chiamate a HubSpot con reCAPTCHA fallito | Nessuna |
| Doppio invio | Una sola trattativa |
| Consenso privacy | Senza spunta nessuna richiesta parte (browser) e il server rifiuta |
| Tastiera | Passi, card, pill, opzioni, prefisso, consenso, riepilogo e pausa delle tappe usabili da tastiera, focus visibile |
| Senza JavaScript | Tre passi leggibili, avviso, domande apribili, tappe tutte accese |
| Scorrimento orizzontale | Nessuno a 375, 768 e 1440 px su `/contatti` |
| Console | Nessun errore |
| Correzioni dopo la prova reale (API simulate) | 25 scenari: fasi per tipo di richiesta, proprietario su contatto, azienda e trattativa, `fonte_lead_agria`, proprietà del contatto via CRM, trattativa creata con risposta persa per timeout (una sola trattativa), invio ripetuto dello stesso modulo (una sola trattativa), proprietà del contatto rifiutata, notifica a due destinatari, segnalazione senza dati tecnici; dal browser, doppio clic con videocall: una trattativa in *Appuntamento da Fissare* e apertura del calendario |
| Invio reale verso HubSpot | Riuscito il 26/09/2026 in locale (`npm run dev`, localhost:3001): richiesta ricevuta sul sito, notifica arrivata in HubSpot |

### Contrasti
| Elemento | Rapporto |
|---|---|
| Grigio su bianco / off-white (descrizioni, note) | 5,05 / 4,70:1 |
| Green-dark su bianco (link, icone, numeri) | 6,01:1 |
| Errori rosso 700 su bianco | 6,47:1 |
| Bianco 70% su ink (tappe) | 9,68:1 |
| Titoli delle tappe non raggiunte, bianco 72% su ink | 10,1:1 |
| Ink su green-bright (tappa attiva) | 12,13:1 |

---

### Verifica di un invio reale
`scripts/verify-contact-test.mjs` legge da HubSpot, in sola lettura e senza stampare il token, i record creati da un invio di prova e controlla contatto, proprietà del contatto, azienda, associazioni, trattative (numero, fase, proprietario, `fonte_lead_agria`, servizio):

```
node scripts/verify-contact-test.mjs --info=email-test-A --call=email-test-B
```

Lo script controlla anche che sulla trattativa ci sia un solo task *Nuovo lead sito — [AZIENDA]* con owner `HUBSPOT_MANAGER_OWNER_ID`.

## 7. Da confermare
- Ambiti della Private App per il task: quelli richiesti dall'API Tasks per creare e leggere i task (non indicati nella copia della documentazione consultata) e, per lo script degli owner, `crm.objects.owners.read`. Se mancano, il registro riporta endpoint e ambito (`manager_task_failed`) e la richiesta va comunque a buon fine.
- Impostazione HubSpot *associazione automatica delle aziende ai contatti per dominio email*: se attiva nel portale, HubSpot può associare di sua iniziativa il contatto all'azienda del dominio, indipendentemente dal sito. Da verificare in Impostazioni → Oggetti → Aziende.
- Orari indicativi: *Lunedì-venerdì, 9:00-18:00*.
- Tempo di risposta nelle domande: *di norma entro un giorno lavorativo*.
- Etichetta della categoria cookie "Calendario prenotazioni (Calendly)": da aggiornare con le pagine legali.

## 8. Note per le pagine legali
L'informativa privacy e la cookie policy dovranno coprire: invio dei dati del modulo a HubSpot (contatto, azienda, trattativa), reCAPTCHA v3 di Google caricato sulla pagina contatti, calendario di prenotazione HubSpot aperto dopo l'invio, caricamento delle foto dal CDN di Unsplash.

---

## 9. Assistente

File: `components/agria/assistant/Assistant.jsx` (interfaccia), `lib/assistant/match.js` (scelta della risposta), `content/agria/assistente.js` (**tutti i testi**). Montato nel punto di innesto `ConciergeSlot` del layout: presente su tutte le pagine.

### Funzionamento
- **Nessun modello AI e nessun servizio esterno.** La domanda viene normalizzata (minuscole, senza accenti né punteggiatura) e confrontata con le parole chiave di ogni risposta; vince quella con più corrispondenze, e le frasi lunghe pesano di più.
- **Nessuna corrispondenza** → *Su questo non ho una risposta preparata, e preferisco non improvvisare.* e le due vie: **Scrivi su WhatsApp** (`+39 366 344 5417`, messaggio precompilato) e **Apri il form** (`/contatti`).
- **Richiesta esplicita di una persona** (parlare con qualcuno, operatore, chiamare, WhatsApp, videocall…) → stesse due vie.
- **Dati personali** (email o numero di telefono nel messaggio) → il messaggio non viene mostrato né conservato; l'assistente invita a usare il modulo.
- **Dichiarato automatico:** sotto il nome, *Assistente automatico, non un operatore. Risposte preparate dal team.*, e nel primo messaggio.
- **Nessuna registrazione:** la conversazione vive solo in memoria; nel browser si salva soltanto lo stato aperto/chiuso (`sessionStorage`).

### Risposte curate
| id | Suggerimento | Argomento |
|---|---|---|
| `chi-siete` | Chi siete? | technology company a Perugia, sviluppo interno |
| `cosa-fate` | **Cosa fate esattamente?** | le tre aree, con link |
| `settori` | **Lavorate col mio settore?** | hospitality, cantine, frantoi; altri settori valutati nella prima analisi |
| `come-si-inizia` | Come si inizia? | prima analisi, ricontatto, proposta; senza costi né impegni |
| `tempi` | **Quanto tempo serve?** | nessun tempo standard: si definisce nella proposta |
| `costi` | Quanto costa? | nessun listino: investimento nella proposta |
| `cosa-non-fate` | Cosa non fate? | lavori spot, gestionali non mantenuti, subappalti, pacchetti, social, grafica per la stampa |
| `ai` | Usate l'intelligenza artificiale? | metodo di lavoro, applicazioni misurabili |
| `dove` | Dove siete? | Via Ponte Vecchio, 06135 Perugia; tutta Italia; versioni in inglese |
| `dati` | Come trattate i dati? | chat senza registrazione, dati del modulo solo per la risposta, proprietà del cliente |
| `persona` | **Voglio parlare con qualcuno** | passaggio a WhatsApp e al modulo |
| `saluto`, `grazie` | — | cortesia |

In grassetto i quattro suggerimenti iniziali (`assistant.suggestions`); un suggerimento già usato sparisce.

### Come modificarle
In `content/agria/assistente.js`: cambiare `text` per il contenuto, `keywords` per le domande che la attivano (minuscole, senza accenti; un frammento come `prenotazion` copre prenotazione e prenotazioni; spazi ai bordi, come `' social '`, per una parola isolata), `links` per i rimandi, `handoff: true` per proporre WhatsApp e modulo. Una nuova risposta è un nuovo oggetto nell'elenco; un nuovo suggerimento iniziale è il suo `id` in `assistant.suggestions`. Nessun altro file da toccare.

### Comportamento e accessibilità
- Pulsante a pillola in basso a destra (*Domande?* da 768 px, solo icona da 48 px su mobile) con etichetta accessibile *Apri l'assistente* e `aria-expanded`.
- Riquadro `role="dialog"` non modale con titolo; focus sul campo all'apertura, di nuovo sul campo dopo ogni domanda; **Esc** chiude e riporta il focus sul pulsante; risposte annunciate (`aria-live`); focus visibile su ogni controllo.
- Chiuso di default; lo stato aperto o chiuso resta durante la navigazione e dopo un ricaricamento; seguire un link dell'assistente lo chiude, per lasciare libera la pagina.
- Non compare mentre il banner dei cookie è aperto e si nasconde se viene riaperto.
- Mobile: chiuso occupa 48×48 px; aperto, 343 px di larghezza e al massimo il 70% dell'altezza. Lo slot passa da `z-index` 40 a 35, così il menu mobile (40) lo copre invece di esserne coperto.
- Senza JavaScript non compare; con movimento ridotto nessuna animazione.

### Validazione dell'assistente
| Verifica | Esito |
|---|---|
| Suggerimenti, domande libere, risposta mancante, dati personali | Corretti (20 domande di prova, tutte con la risposta attesa o con il passaggio a una persona) |
| Dati personali salvati nel browser | Nessuno |
| Tastiera | Apertura con Invio, focus sul campo, Esc chiude e riporta il focus |
| Stato tra le pagine | Aperto ricordato, chiuso ricordato |
| Banner cookie | Assistente nascosto finché il banner è aperto |
| Menu mobile | Copre l'assistente |
| Scorrimento orizzontale | Nessuno a 375, 768 e 1440 px |
| Console | Nessun errore |

### Contrasti
| Elemento | Rapporto |
|---|---|
| Grafite su bianco (messaggi dell'assistente) | 18,9:1 |
| Bianco su grafite (messaggi del visitatore) | 18,9:1 |
| Bianco 72% su ink (avviso "assistente automatico") | 10,2:1 |
| Bianco su green-dark (WhatsApp, invio) | 6,01:1 |
| Green-dark su bianco (link) | 6,01:1 |
| Segnaposto grigio su bianco | 5,05:1 |
