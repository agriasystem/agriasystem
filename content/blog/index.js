// Indice degli articoli mantenuti dalla migration map (content/blog/kept.js):
// un file per articolo sotto ./posts. Gli articoli reindirizzati o eliminati
// non hanno più un file: i loro indirizzi li gestisce il middleware.
import post6 from './posts/ecommerce-vino-margini-vendita-diretta';
import post10 from './posts/agriturismo-booking-online-prenotazioni';
import post11 from './posts/chatbot-cantina-ai-customer-service';
import post12 from './posts/seo-locale-agroalimentare-google-maps';
import post13 from './posts/storytelling-vino-marketing-vendite';
import post16 from './posts/degustazioni-cantina-trasformare-visite-vendite';
import post18 from './posts/gestione-fiscale-ecommerce-vino-iva-fatturazione';
import post21 from './posts/vendita-internazionale-vino-dtc-export-estero';
import post26 from './posts/siti-web-per-cantine';
import post28 from './posts/software-per-cantine';
import post29 from './posts/siti-web-per-agriturismi';
import post30 from './posts/software-per-agriturismi';
import post31 from './posts/ecommerce-per-frantoi';

export const posts = [
  post6,
  post10,
  post11,
  post12,
  post13,
  post16,
  post18,
  post21,
  post26,
  post28,
  post29,
  post30,
  post31,
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
