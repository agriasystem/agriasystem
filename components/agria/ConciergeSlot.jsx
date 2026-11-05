// Punto di innesto dell'assistente, in basso a destra (Prompt 15: l'assistente
// è components/agria/assistant/Assistant.jsx, montato nel layout).
//
// Il contenitore non intercetta i click (pointer-events: none): solo gli
// elementi interattivi del widget hanno pointer-events: auto.
//   - z-index 35: sotto header (50), velo dei pannelli (45) e menu mobile (40,
//     fixed: con 40 anche qui lo slot, che viene dopo nel DOM, lo coprirebbe),
//     sopra il contenuto;
//   - il banner cookie occupa il fondo pagina finché non viene chiuso: il widget
//     deve evitarne l'area o comparire dopo il consenso (lib/consent.js);
//   - sotto md sta sopra la barra contatti (--contact-bar, app/(site)/layout.jsx).
// Vedi docs/agria/09-interazioni.md.
export default function ConciergeSlot({ children = null }) {
  return (
    <div
      id="agria-concierge-root"
      data-concierge-slot=""
      className="pointer-events-none fixed bottom-[calc(1rem+var(--contact-bar,0px))] right-4 z-[35] sm:bottom-[calc(1.5rem+var(--contact-bar,0px))] sm:right-6"
    >
      {children}
    </div>
  );
}
