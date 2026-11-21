// Etichetta con la freccia finale del testo approvato ("… →"): la freccia resta
// visibile ma fuori dal nome accessibile del pulsante. File a sé perché la usano
// anche componenti client (StickyCta) senza tirarsi dietro le altre utilità.
export default function ArrowLabel({ label }) {
  const match = label.match(/^(.*?)\s*→$/);
  if (!match) return label;
  return (
    <>
      {match[1]} <span aria-hidden="true">→</span>
    </>
  );
}
