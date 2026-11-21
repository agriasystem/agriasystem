'use client';

import { useEffect, useRef, useState } from 'react';

// Contatore della lista "Quante ne riconoscete?": conta le caselle spuntate del
// form che lo contiene ("0 su 8", "1 su 8"…). Il form e le caselle sono resi dal
// server e funzionano anche senza JavaScript; qui c'è solo il numero.
// template: "{n} su {total}" (content/agria/home.js).
export default function ProblemCounter({ template, total, className = '' }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const form = ref.current?.closest('form');
    if (!form) return undefined;
    const update = () => setCount(form.querySelectorAll('input[type="checkbox"]:checked').length);
    update(); // scelte ripristinate dal browser tornando indietro
    form.addEventListener('change', update);
    return () => form.removeEventListener('change', update);
  }, []);

  return (
    <p ref={ref} className={className} aria-live="polite">
      {template.replace('{n}', String(count)).replace('{total}', String(total))}
    </p>
  );
}
