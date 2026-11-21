/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Unico dominio remoto delle foto: images.unsplash.com (manifest
  // content/agria/image-credits.json). Quelle foto passano dal loader di
  // AgriaImage, direttamente dal CDN di Unsplash; l'ottimizzatore del sito
  // riceve solo file locali (verificato su tutte le pagine della sitemap,
  // Prompt 28). Prima la regola accettava qualunque dominio.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }],
  },
  // La configurazione ESLint versionata (.eslintrc.json) fa emergere errori
  // preesistenti (vedi docs/agria/05-infrastruttura.md) non corretti in questa
  // fase: disaccoppia il lint dalla build così `next build`/il deploy Vercel
  // non si interrompono. Il lint resta eseguibile a parte via `npm run lint`
  // e nella CI (non bloccante, vedi .github/workflows/ci.yml).
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Raggruppamento dei fogli di stile: in modalità "loose" (predefinita in
  // Next 14.2) il risultato cambiava da una build all'altra a codice identico,
  // e a volte metteva ContactForm e Contatti nel foglio di tutte le pagine
  // (+1,9 KB di CSS bloccante sulla home, +3,5 KB su /azienda). "strict" unisce
  // due moduli solo se nessuna pagina vede cambiare l'ordine dei suoi stili
  // (Prompt 28, Fase B).
  experimental: {
    cssChunking: 'strict',
  },
  // Redirect e 410 della migrazione: middleware.js con le regole di
  // lib/migration.js (serve il 410 e il vecchio dominio senza catene).
  // /soluzioni non ha una pagina indice (Prompt 23): rimanda a /servizi.
  // Questi redirect vengono prima del middleware: dal vecchio dominio
  // (OLD_HOSTS in lib/migration.js) si va subito al nuovo, senza catene.
  async redirects() {
    return [
      {
        source: '/soluzioni',
        has: [{ type: 'host', value: '(?:www\\.)?matteogaruzzo\\.com' }],
        destination: 'https://agriasystem.com/servizi',
        permanent: true,
      },
      { source: '/soluzioni', destination: '/servizi', permanent: true },
    ];
  },
};

module.exports = nextConfig;
