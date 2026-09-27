// Parser minimale per markup inline nei paragrafi degli articoli blog:
// ***grassetto corsivo***, **grassetto**, *corsivo*/_corsivo_ e [testo](url)
// (percorso interno /…, indirizzo esterno https://… oppure mailto:…).
// Non introduce dipendenze da markdown/MDX: i paragrafi restano stringhe
// semplici in lib/data.js, solo un po' di markup leggero dentro al testo.

import { createElement, Fragment } from 'react';
import Link from 'next/link';

const INLINE_RE = /(\[(.+?)\]\((\/[^)]*|https:\/\/[^)]*|mailto:[^)]*)\)|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_)/g;

// classes: classi di link, grassetto e corsivo; predefinite quelle legacy,
// gli articoli Agria passano le proprie (RICH_TEXT_AGRIA).
const LEGACY = {
  link: 'text-forest font-semibold hover:text-brass underline underline-offset-2',
  strong: 'font-bold text-ink',
  em: 'italic',
};

export const RICH_TEXT_AGRIA = {
  link: 'font-medium text-agria-green-dark underline underline-offset-4 hover:text-agria-graphite rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agria-green-dark focus-visible:ring-offset-2',
  strong: 'font-semibold text-agria-graphite',
  em: 'italic',
};

export function renderRichText(text, classes = LEGACY) {
  if (!text) return text;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[2] !== undefined) {
      // link interni con next/link, esterni (https://) in una nuova scheda, mailto: diretti
      const external = match[3].startsWith('https://');
      parts.push(
        match[3].startsWith('mailto:')
          ? createElement('a', { key: key++, href: match[3], className: classes.link }, match[2])
          : external
          ? createElement('a', { key: key++, href: match[3], className: classes.link, target: '_blank', rel: 'noopener noreferrer' }, match[2])
          : createElement(Link, { key: key++, href: match[3], className: classes.link }, match[2])
      );
    } else if (match[4] !== undefined) {
      parts.push(createElement('strong', { key: key++, className: classes.strong }, createElement('em', null, match[4])));
    } else if (match[5] !== undefined) {
      parts.push(createElement('strong', { key: key++, className: classes.strong }, match[5]));
    } else if (match[6] !== undefined) {
      parts.push(createElement('em', { key: key++, className: classes.em }, match[6]));
    } else if (match[7] !== undefined) {
      parts.push(createElement('em', { key: key++, className: classes.em }, match[7]));
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return createElement(Fragment, null, ...parts);
}

// Un paragrafo che inizia con "> " viene reso come blockquote.
export function isBlockquote(text) {
  return typeof text === 'string' && text.startsWith('> ');
}

export function stripBlockquoteMarker(text) {
  return text.slice(2);
}
