import { NextResponse } from 'next/server';
import { CANONICAL_ORIGIN, isOldHost, resolvePath } from '@/lib/migration';

// Migrazione degli indirizzi (regole in lib/migration.js):
// 1. percorso eliminato → 410 su entrambi i domini;
// 2. percorso reindirizzato → 301 alla destinazione finale (sul nuovo dominio
//    se la richiesta arriva dal vecchio);
// 3. vecchio dominio → 301 al nuovo, stesso percorso e parametri.
// Nessuna catena: ogni richiesta riceve una sola risposta definitiva.

const GONE_HTML = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Pagina rimossa | Agria System</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#080c0a;color:#fff;font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}main{max-width:36rem;padding:24px}h1{font-weight:300;font-size:2rem;margin:0 0 12px}p{color:rgba(255,255,255,.72);margin:0 0 24px}a{color:#7ae098}</style></head><body><main><h1>Questa pagina non esiste più.</h1><p>Il contenuto è stato rimosso dal sito di Agria System.</p><a href="${CANONICAL_ORIGIN}/">Vai alla homepage</a></main></body></html>`;

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const oldHost = isOldHost(request.headers.get('host'));
  const rule = resolvePath(pathname);

  if (rule?.type === 'gone') {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=3600' },
    });
  }
  if (rule?.type === 'redirect') {
    const target = oldHost ? new URL(rule.to, CANONICAL_ORIGIN) : new URL(rule.to, request.url);
    target.search = search;
    return NextResponse.redirect(target, 301);
  }
  if (oldHost) {
    const target = new URL(pathname, CANONICAL_ORIGIN);
    target.search = search;
    return NextResponse.redirect(target, 301);
  }
  return NextResponse.next();
}

// Esclusi solo i file interni di Next: tutto il resto passa dalle regole
// (anche file e immagini, per spostare per intero il vecchio dominio).
export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
