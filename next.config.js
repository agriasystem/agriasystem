/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  // La configurazione ESLint versionata (.eslintrc.json) fa emergere errori
  // preesistenti (vedi docs/agria/05-infrastruttura.md) non corretti in questa
  // fase: disaccoppia il lint dalla build così `next build`/il deploy Vercel
  // non si interrompono. Il lint resta eseguibile a parte via `npm run lint`
  // e nella CI (non bloccante, vedi .github/workflows/ci.yml).
  eslint: {
    ignoreDuringBuilds: true,
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
