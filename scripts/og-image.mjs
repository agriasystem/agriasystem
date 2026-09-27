#!/usr/bin/env node
// Genera l'immagine social predefinita di Agria System (1200×630):
// public/images/brand/agria-og.png. Marchio dal file del logo, fondo ink,
// nome e descrizione della homepage. Da rilanciare solo se cambiano marchio o testi:
//   node scripts/og-image.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ogDir = dirname(require.resolve('next/dist/compiled/@vercel/og/index.node.js'));
const { ImageResponse } = await import(join(ogDir, 'index.node.js'));

const svg = readFileSync(join(ROOT, 'public/images/brand/agria-logo-centered.svg'), 'utf8');
const mark = `data:image/png;base64,${svg.match(/base64,([A-Za-z0-9+/=]+)/)[1]}`;
const font = readFileSync(join(ogDir, 'noto-sans-v27-latin-regular.ttf'));

const h = (type, style, ...children) => ({ type, props: { style, children: children.length > 1 ? children : children[0] } });

const tree = h(
  'div',
  { width: '100%', height: '100%', display: 'flex', alignItems: 'center', background: '#080c0a', padding: '0 96px', fontFamily: 'Noto Sans' },
  { type: 'img', props: { src: mark, width: 300, height: 300, style: { marginRight: 40, marginTop: -36 } } },
  h(
    'div',
    { display: 'flex', flexDirection: 'column' },
    h('div', { display: 'flex', fontSize: 92, color: '#ffffff', letterSpacing: -2 }, 'Agria System'),
    h('div', { display: 'flex', fontSize: 34, color: 'rgba(255,255,255,0.72)', marginTop: 18, maxWidth: 620 }, 'Sistemi digitali per hospitality, cantine e frantoi'),
    h('div', { display: 'flex', width: 120, height: 6, background: '#7ae098', marginTop: 40, borderRadius: 3 })
  )
);

const image = new ImageResponse(tree, { width: 1200, height: 630, fonts: [{ name: 'Noto Sans', data: font, weight: 400 }] });
const out = join(ROOT, 'public/images/brand/agria-og.png');
writeFileSync(out, Buffer.from(await image.arrayBuffer()));
console.log('Scritto', out);
