// File di verifica IndexNow (https://www.indexnow.org): contiene la chiave
// INDEXNOW_KEY, che scripts/indexnow.mjs dichiara come keyLocation quando
// segnala a Bing e agli altri motori aderenti gli indirizzi cambiati.
// Senza chiave valida (8-128 caratteri: lettere, cifre, trattini) risponde 404.
const KEY = (process.env.INDEXNOW_KEY || '').trim();
const VALID = /^[a-zA-Z0-9-]{8,128}$/.test(KEY);

export function GET() {
  if (!VALID) return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  return new Response(KEY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
