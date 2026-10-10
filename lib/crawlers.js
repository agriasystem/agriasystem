// =====================================================================
//  Politica per i crawler (robots.txt, generato da app/robots.js).
//  Una riga per agente: per cambiare la politica di un crawler basta
//  impostare allow: false, che scrive Disallow: / per quell'agente senza
//  toccare gli altri. Vale per gli agenti che rispettano robots.txt: quelli
//  avviati da un utente possono non farlo (vedi le note), e si fermano solo
//  con una regola lato server o firewall. /api/ è sempre escluso per tutti.
//
//  purpose:
//  - 'ricerca': indicizza le pagine per i risultati di un motore di ricerca
//    o di un assistente AI, che le citano con il collegamento;
//  - 'utente': legge una pagina quando un utente lo chiede all'assistente;
//  - 'addestramento': raccoglie testi per addestrare modelli AI. Alcuni di
//    questi permessi governano anche l'uso nelle risposte (vedi le note).
//    Google-Extended e Applebot-Extended non sono crawler separati ma
//    permessi letti dai crawler di Google e Apple.
//
//  Politica attuale (Prompt 20): tutti consentiti.
// =====================================================================

export const CRAWLERS = [
  // motori di ricerca
  { agent: 'Googlebot', owner: 'Google (Search e AI Overviews)', purpose: 'ricerca', allow: true },
  { agent: 'Bingbot', owner: 'Microsoft (Bing, Copilot)', purpose: 'ricerca', allow: true },
  { agent: 'Applebot', owner: 'Apple (Siri, Spotlight)', purpose: 'ricerca', allow: true },
  { agent: 'DuckDuckBot', owner: 'DuckDuckGo', purpose: 'ricerca', allow: true },
  { agent: 'Amazonbot', owner: 'Amazon (Alexa)', purpose: 'ricerca', allow: true },

  // ricerca degli assistenti AI
  { agent: 'OAI-SearchBot', owner: 'OpenAI (ricerca di ChatGPT)', purpose: 'ricerca', allow: true },
  { agent: 'Claude-SearchBot', owner: 'Anthropic (ricerca di Claude)', purpose: 'ricerca', allow: true },
  { agent: 'PerplexityBot', owner: 'Perplexity', purpose: 'ricerca', allow: true },
  { agent: 'DuckAssistBot', owner: 'DuckDuckGo (risposte AI)', purpose: 'ricerca', allow: true },
  { agent: 'Meta-WebIndexer', owner: 'Meta (ricerca di Meta AI)', purpose: 'ricerca', allow: true },

  // letture su richiesta dell'utente
  // ChatGPT-User e Perplexity-User: secondo i fornitori robots.txt può non
  // essere applicato alle letture avviate dall'utente
  { agent: 'ChatGPT-User', owner: 'OpenAI', purpose: 'utente', allow: true },
  { agent: 'Claude-User', owner: 'Anthropic', purpose: 'utente', allow: true },
  { agent: 'Perplexity-User', owner: 'Perplexity', purpose: 'utente', allow: true },
  { agent: 'Meta-ExternalFetcher', owner: 'Meta', purpose: 'utente', allow: true },
  { agent: 'MistralAI-User', owner: 'Mistral AI', purpose: 'utente', allow: true },

  // addestramento dei modelli
  { agent: 'GPTBot', owner: 'OpenAI', purpose: 'addestramento', allow: true },
  { agent: 'ClaudeBot', owner: 'Anthropic', purpose: 'addestramento', allow: true },
  // Google-Extended governa anche il grounding (risposte con fonti) di Gemini e
  // Vertex AI; non incide su Google Search e AI Overviews, che usano Googlebot
  { agent: 'Google-Extended', owner: 'Google (Gemini)', purpose: 'addestramento', allow: true },
  { agent: 'Applebot-Extended', owner: 'Apple', purpose: 'addestramento', allow: true },
  { agent: 'CCBot', owner: 'Common Crawl', purpose: 'addestramento', allow: true },
  // uso misto: addestramento e indicizzazione per i prodotti Meta
  { agent: 'Meta-ExternalAgent', owner: 'Meta', purpose: 'addestramento', allow: true },
];

// Percorsi esclusi per tutti gli agenti (consentiti o no).
export const DISALLOW_ALWAYS = ['/api/'];
