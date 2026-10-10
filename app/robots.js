import { CRAWLERS, DISALLOW_ALWAYS } from '@/lib/crawlers';
import { SITE_URL } from '@/lib/seo';

// robots.txt: una regola esplicita per ogni crawler di lib/crawlers.js (un
// agente con una propria regola ignora quella generica), poi la regola
// generica per tutti gli altri. Escluse sempre le API.
export default function robots() {
  const named = CRAWLERS.map(({ agent, allow }) =>
    allow ? { userAgent: agent, allow: '/', disallow: DISALLOW_ALWAYS } : { userAgent: agent, disallow: '/' }
  );
  return {
    rules: [...named, { userAgent: '*', allow: '/', disallow: DISALLOW_ALWAYS }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
