// =====================================================================
//  PAGINE LEGALI AGRIA — privacy policy, cookie policy, termini e note
//  legali. Scritte sull'elenco dei trattamenti rilevati nel codice
//  (servizi, dati, luoghi): se cambia un servizio del sito, aggiornare
//  qui e la data di ultimo aggiornamento. Template: components/agria/legal/.
//  Paragrafi con markup leggero: **grassetto**, [testo](/percorso) o
//  [testo](https://…). Voci di elenco: array di stringhe (list).
// =====================================================================

import { site } from '@/content/site';

export const LAST_UPDATED = '2026-09-27';

const ADDRESS = `${site.address.street}, ${site.address.postalCode} ${site.address.city} (${site.address.province})`;
const MAIL = `[${site.email}](mailto:${site.email})`;
const CONTROLLER = `${site.founder}, ${site.legalForm}, P.IVA ${site.vat.replace(/^IT/, '')}, con sede in ${ADDRESS}, che opera con il marchio ${site.name}`;

// Infrastruttura verificata (27 settembre 2026). Se cambia la regione delle
// funzioni su Vercel, aggiornare VERCEL_FUNCTIONS_REGION, la frase sui
// trasferimenti al punto 6 della privacy ("funzioni di Vercel in Germania") e LAST_UPDATED.
const VERCEL_FUNCTIONS_REGION = 'Francoforte, Germania (regione fra1)';
const VERCEL_LOG_RETENTION = '1 giorno';
const RESEND_REGION = 'Irlanda (eu-west-1)';

const GOOGLE_PRIVACY = 'https://policies.google.com/privacy';
const GARANTE = 'https://www.garanteprivacy.it';

export const legalPages = {
  privacy: {
    meta: {
      title: 'Privacy policy | Agria System',
      description: 'Come Agria System tratta i dati personali di chi visita il sito e di chi ci scrive: titolare, finalità, fornitori, conservazione e diritti.',
      path: '/privacy-policy',
    },
    title: 'Privacy policy',
    lead: 'Come trattiamo i dati di chi visita il sito e di chi ci contatta, ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR).',
    sections: [
      {
        h2: '1. Titolare del trattamento',
        paragraphs: [
          `Il titolare del trattamento è ${CONTROLLER}.`,
          `Per qualsiasi domanda sui dati personali e per esercitare i diritti descritti sotto: ${MAIL}, telefono ${site.phone}.`,
        ],
      },
      {
        h2: '2. Quali dati trattiamo',
        paragraphs: ['**Dati di navigazione.** I sistemi che ospitano il sito registrano, per funzionamento e sicurezza, dati tecnici di ogni richiesta:'],
        list: ['indirizzo IP', 'tipo di browser e di dispositivo', 'pagina richiesta', 'data e ora'],
        after: [
          'Non usiamo strumenti di statistica o di profilazione.',
          '**Dati inviati con il modulo contatti.** Sono i dati che inserite nel modulo, più alcune informazioni tecniche:',
        ],
        list2: [
          'nome e cognome',
          'email e telefono',
          'azienda e settore',
          'servizio di interesse, tempistica e messaggio',
          'tipo di richiesta (informazioni o videocall)',
          'consenso al trattamento, con il testo accettato',
          'pagina di provenienza e indirizzo IP',
        ],
        after2: [
          '**Dati di sicurezza del modulo.** Alla prima interazione con il riquadro del modulo contatti, il servizio Google reCAPTCHA raccoglie dati tecnici del dispositivo e di interazione con la pagina, per distinguere le persone dai sistemi automatici (vedi il punto 5).',
          '**Dati che ci inviate per altri canali.** Email, telefonate e messaggi WhatsApp contengono i dati che scegliete di condividere. Se prenotate una videocall, i dati che inserite nel calendario (nome, email, orario scelto) sono raccolti tramite HubSpot.',
        ],
      },
      {
        h2: '3. Finalità e basi giuridiche',
        list: [
          '**Rispondere alla richiesta** e valutare con voi un possibile progetto. Base giuridica: misure precontrattuali adottate su vostra richiesta (art. 6, par. 1, lett. b GDPR).',
          '**Gestire la richiesta nel nostro CRM**: registrarla, assegnarla a un referente, ricordarci di ricontattarvi. Base giuridica: misure precontrattuali e nostro legittimo interesse a organizzare le richieste ricevute (art. 6, par. 1, lett. b e f).',
          '**Proteggere il sito e il modulo** da abusi e invii automatici, con reCAPTCHA, un limite alle richieste per indirizzo IP e i registri tecnici. Base giuridica: legittimo interesse alla sicurezza (art. 6, par. 1, lett. f).',
          '**Adempiere a obblighi di legge**, per esempio fiscali, se nasce un rapporto commerciale. Base giuridica: obbligo legale (art. 6, par. 1, lett. c).',
        ],
        after: ['Non inviamo newsletter né comunicazioni promozionali, e non cediamo i dati a terzi per finalità di marketing.'],
      },
      {
        h2: '4. Conferimento dei dati',
        paragraphs: [
          'I campi del modulo indicati come obbligatori servono a rispondere alla richiesta: senza, non possiamo ricontattarvi. Gli altri dati sono facoltativi.',
        ],
      },
      {
        h2: '5. Fornitori che trattano i dati per nostro conto',
        paragraphs: ['I dati sono trattati da persone autorizzate e da questi fornitori, nominati responsabili del trattamento dove previsto:'],
        list: [
          `**Vercel Inc.** (Stati Uniti): ospita il sito. Le funzioni che ricevono il modulo contatti girano a ${VERCEL_FUNCTIONS_REGION}; le pagine sono distribuite dalla rete di Vercel dal nodo più vicino al visitatore, che può trovarsi anche fuori dall'Unione europea. Tratta dati di navigazione e, per il tempo dell'invio, i dati del modulo.`,
          '**HubSpot** (HubSpot, Inc. e HubSpot Ireland Ltd.): CRM e ricezione del modulo, in cui registriamo contatti, aziende e richieste; il nostro account è ospitato nel data center europeo di HubSpot (eu1). Gestisce anche il calendario delle videocall.',
          `**Google** (Google Ireland Limited e Google LLC): servizio reCAPTCHA per la sicurezza del modulo, secondo la [privacy policy di Google](${GOOGLE_PRIVACY}).`,
          '**Google Workspace** (Google Ireland Limited): posta elettronica aziendale. Ospita le caselle @agriasystem.com, in cui riceviamo le email che ci inviate e le notifiche interne con i dati di ogni nuova richiesta dal modulo.',
          `**Resend** (Resend, Inc., Stati Uniti): invio delle email interne con cui il team riceve ogni nuova richiesta, dalla regione ${RESEND_REGION}.`,
          '**Unsplash** (Unsplash Inc.): distribuisce alcune fotografie del sito e, per consegnarle, riceve l\'indirizzo IP e i dati tecnici del browser.',
        ],
        after: [
          'Se ci scrivete su WhatsApp, il messaggio è trattato anche da WhatsApp (Meta) secondo le sue condizioni.',
        ],
      },
      {
        h2: '6. Trasferimenti fuori dall\'Unione europea',
        paragraphs: [
          'Vercel e Resend hanno sede negli Stati Uniti; HubSpot e Google appartengono a gruppi statunitensi. Anche quando i dati sono trattati in data center europei (funzioni di Vercel in Germania, invii di Resend in Irlanda, posta di Google Workspace, account HubSpot nel data center UE), questi fornitori possono accedervi dagli Stati Uniti, e la rete di distribuzione di Vercel può servire le pagine da nodi fuori dall\'Unione europea.',
          'Questi trasferimenti avvengono sulla base della decisione di adeguatezza della Commissione europea sul Data Privacy Framework UE-USA, per i fornitori certificati, oppure delle clausole contrattuali standard approvate dalla Commissione.',
        ],
      },
      {
        h2: '7. Per quanto tempo conserviamo i dati',
        list: [
          '**Richieste di contatto** senza un rapporto commerciale: 24 mesi dall\'ultimo contatto, poi cancellate.',
          '**Clienti**: per la durata del rapporto e, dopo, per i termini previsti dalla legge (per la documentazione contabile e fiscale, di norma 10 anni).',
          '**Email interne di notifica**: con gli stessi tempi della richiesta a cui si riferiscono.',
          '**Indirizzo IP per il limite alle richieste**: solo in memoria, per 10 minuti.',
          `**Registri tecnici del sito** (log di Vercel): ${VERCEL_LOG_RETENTION}.`,
        ],
      },
      {
        h2: '8. I vostri diritti',
        paragraphs: [
          `Potete chiedere in qualsiasi momento l'accesso ai vostri dati, la rettifica, la cancellazione, la limitazione del trattamento e la portabilità, e opporvi ai trattamenti basati sul legittimo interesse (articoli 15-21 GDPR). Basta scrivere a ${MAIL}: rispondiamo entro un mese.`,
          `Se ritenete che il trattamento violi il GDPR, potete proporre reclamo al [Garante per la protezione dei dati personali](${GARANTE}).`,
        ],
      },
      {
        h2: '9. Minori',
        paragraphs: ['Il sito è rivolto ad aziende e professionisti. Non raccogliamo consapevolmente dati di minori di 14 anni.'],
      },
      {
        h2: '10. Cookie e modifiche',
        paragraphs: [
          'Le tecnologie usate nel browser sono descritte nella [cookie policy](/cookie-policy).',
          'Questa informativa può essere aggiornata: la data dell\'ultima modifica è indicata in cima alla pagina.',
        ],
      },
    ],
  },

  cookie: {
    meta: {
      title: 'Cookie policy | Agria System',
      description: 'Cookie e memorie del browser usati dal sito di Agria System: solo tecnici, nessuna statistica e nessuna profilazione.',
      path: '/cookie-policy',
    },
    title: 'Cookie policy',
    lead: 'Il sito usa solo strumenti tecnici: nessuna statistica, nessuna pubblicità, nessuna profilazione.',
    sections: [
      {
        h2: '1. Cosa sono',
        paragraphs: [
          'I cookie e le memorie del browser (localStorage e sessionStorage) sono piccoli dati che un sito salva sul vostro dispositivo. Possono servire al funzionamento del sito (tecnici) oppure a misurare o profilare le visite: questo sito usa solo i primi.',
        ],
      },
      {
        h2: '2. Strumenti tecnici del sito',
        list: [
          '**Avviso sui cookie**: la memoria **mg_cookie_consent_v1** (localStorage) ricorda per 90 giorni che avete chiuso l\'avviso, poi l\'avviso ricompare.',
          '**Assistente**: la memoria di sessione (sessionStorage) ricorda se il pannello dell\'assistente è aperto; si cancella chiudendo la scheda o la finestra.',
        ],
        after: ['Sono necessari al funzionamento del sito e non richiedono consenso.'],
      },
      {
        h2: '3. Sicurezza del modulo contatti: Google reCAPTCHA',
        paragraphs: [
          `Alla prima interazione con il riquadro del modulo contatti (un clic o un campo selezionato), e solo allora, il sito carica Google reCAPTCHA, che protegge il modulo da invii automatici. reCAPTCHA può leggere e impostare cookie di Google e raccoglie dati tecnici del dispositivo e di interazione con la pagina. Lo usiamo per la sicurezza del modulo, sulla base del nostro legittimo interesse; i dati sono trattati secondo la [privacy policy di Google](${GOOGLE_PRIVACY}). Se non interagite con il modulo, reCAPTCHA non viene caricato.`,
        ],
      },
      {
        h2: '4. Contenuti e pagine di terze parti',
        list: [
          '**Fotografie Unsplash**: il caricamento delle foto trasmette a Unsplash l\'indirizzo IP e i dati tecnici del browser, necessari a consegnare l\'immagine.',
          '**Calendario delle videocall**: se scegliete di fissare una videocall, si apre la pagina di prenotazione di HubSpot, che usa i propri cookie.',
          '**WhatsApp e Google Maps**: si aprono solo se cliccate i rispettivi collegamenti, con le condizioni dei rispettivi servizi.',
        ],
      },
      {
        h2: '5. Statistiche e profilazione',
        paragraphs: [
          'Il sito non usa strumenti di statistica, pixel pubblicitari o cookie di profilazione. Se in futuro ne attivassimo uno, lo faremmo solo con il vostro consenso, tramite il banner.',
        ],
      },
      {
        h2: '6. Come gestire le preferenze',
        paragraphs: [
          'Potete riaprire l\'avviso in qualsiasi momento dal collegamento "Preferenze cookie" in fondo a ogni pagina, e cancellare cookie e memorie dalle impostazioni del browser.',
          `Titolare: ${CONTROLLER}. Contatti: ${MAIL}. Maggiori informazioni nella [privacy policy](/privacy-policy).`,
        ],
      },
    ],
  },

  terms: {
    meta: {
      title: 'Termini e condizioni | Agria System',
      description: 'Condizioni di uso del sito di Agria System: contenuti, proprietà intellettuale, servizi di terze parti, responsabilità e legge applicabile.',
      path: '/termini-e-condizioni',
    },
    title: 'Termini e condizioni',
    lead: 'Le condizioni di uso di questo sito.',
    sections: [
      {
        h2: '1. Oggetto',
        paragraphs: [
          `Questo sito (il "Sito") è gestito da ${CONTROLLER}. Il Sito presenta i servizi di ${site.name} per strutture ricettive, cantine e frantoi e permette di inviare una richiesta di contatto. Non è un negozio online: sul Sito non si concludono acquisti né contratti. Navigando il Sito accettate questi termini.`,
        ],
      },
      {
        h2: '2. Contenuti',
        paragraphs: [
          'I contenuti del Sito, compresi gli articoli, hanno scopo informativo e non costituiscono consulenza né offerta vincolante. Ogni proposta commerciale viene formalizzata per iscritto, separatamente, dopo un\'analisi delle esigenze. Le anteprime per settore sono illustrative. Curiamo l\'accuratezza dei contenuti, ma non possiamo garantire che siano sempre completi o aggiornati.',
        ],
      },
      {
        h2: '3. Proprietà intellettuale',
        paragraphs: [
          `Testi, grafiche, marchio ${site.name} e codice del Sito appartengono al titolare o sono usati su licenza, e sono protetti dalla normativa sul diritto d'autore e sulla proprietà industriale. Non è consentita la riproduzione, anche parziale, senza autorizzazione scritta.`,
          'Le fotografie provenienti da Unsplash sono pubblicate con la licenza Unsplash; autori e collegamenti sono nella pagina [crediti fotografici](/crediti-immagini).',
        ],
      },
      {
        h2: '4. Servizi di terze parti',
        paragraphs: [
          'Alcune funzioni del Sito si appoggiano a servizi di terze parti: HubSpot per la ricezione delle richieste e il calendario delle videocall, Google reCAPTCHA per la sicurezza del modulo, WhatsApp per il contatto diretto. Il loro uso è regolato anche dai rispettivi termini e informative.',
        ],
      },
      {
        h2: '5. Limitazione di responsabilità',
        paragraphs: [
          'Nei limiti consentiti dalla legge, il titolare non risponde di danni indiretti derivanti dall\'uso del Sito o dall\'impossibilità di usarlo, salvi i casi di dolo o colpa grave e quanto non derogabile per legge.',
        ],
      },
      {
        h2: '6. Collegamenti a siti terzi',
        paragraphs: ['Il Sito contiene collegamenti a siti di terze parti, sui quali non abbiamo controllo e dei cui contenuti e trattamenti di dati non siamo responsabili.'],
      },
      {
        h2: '7. Legge applicabile e foro competente',
        paragraphs: [
          'Questi termini sono regolati dalla legge italiana. Per le controversie relative all\'uso del Sito è competente il Foro di Perugia, salvo il foro inderogabile del consumatore previsto dalla legge.',
        ],
      },
      {
        h2: '8. Modifiche e contatti',
        paragraphs: [
          'Questi termini possono essere aggiornati: la data dell\'ultima modifica è indicata in cima alla pagina.',
          `Per domande: ${MAIL}, telefono ${site.phone}.`,
        ],
      },
    ],
  },

  notes: {
    meta: {
      title: 'Note legali | Agria System',
      description: 'Dati del titolare del sito di Agria System: titolare, partita IVA, sede e contatti.',
      path: '/note-legali',
    },
    title: 'Note legali',
    lead: 'I dati di chi gestisce questo sito.',
    sections: [
      {
        h2: 'Titolare del sito',
        list: [
          `**Titolare**: ${site.founder}, ${site.legalForm}`,
          `**Marchio**: ${site.name}`,
          `**P.IVA**: ${site.vat.replace(/^IT/, '')}`,
          `**Sede**: ${ADDRESS}, Italia`,
          `**Email**: ${MAIL}`,
          `**Telefono**: ${site.phone}`,
        ],
      },
      {
        h2: 'Hosting',
        paragraphs: [`Il sito è ospitato da Vercel Inc. (Stati Uniti); le funzioni server girano a ${VERCEL_FUNCTIONS_REGION}.`],
      },
      {
        h2: 'Diritti',
        paragraphs: [
          `I contenuti del sito sono protetti dal diritto d'autore; le condizioni d'uso sono nei [termini e condizioni](/termini-e-condizioni). Autori delle fotografie: [crediti fotografici](/crediti-immagini). Trattamento dei dati: [privacy policy](/privacy-policy) e [cookie policy](/cookie-policy).`,
        ],
      },
    ],
  },
};
