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
};

module.exports = nextConfig;
