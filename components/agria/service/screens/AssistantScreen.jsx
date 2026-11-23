import Icon from '@/components/agria/icons/Icon';
import { ACCENT, ACCENT_BG, Phone, Pill, ScreenLayout } from './ScreenFrame';

// Schermata "Come lavora un assistente" di Digital Automation (brochure, pagina
// 6): a sinistra il telefono con la chat dell'agriturismo inventato (i messaggi
// sono quelli della sezione 6 della home, pastiglia 1 sulla prima risposta) e in
// fondo la richiesta pronta da confermare (pastiglia 2); a destra lo schema
// della giornata (pastiglia 3 sulla recensione) e sotto le tre didascalie in
// colonna. Testi in content/agria/servizi-aree.js (screens[].mock).

function Day({ label, steps }) {
  return (
    <div>
      <p className="font-agria-mono text-[11px] uppercase tracking-[0.16em] text-agria-grey">{label}</p>
      <ol className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex md:items-stretch">
            {index === steps.length - 1 && <Pill n={3} className="-right-2 -top-3" />}
            <div className="flex w-full flex-col gap-2 rounded-2xl border border-agria-border bg-agria-white p-4">
              <span className="text-agria-graphite" aria-hidden="true">
                <Icon name={step.icon} size={20} />
              </span>
              <span className="font-agria-sans text-[15px] font-medium text-agria-graphite">{step.title}</span>
              <span className="font-agria-sans text-[12.5px] leading-snug text-agria-grey">{step.text}</span>
            </div>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="hidden w-6 shrink-0 items-center justify-center text-agria-grey md:flex">
                <Icon name="arrow-right" size={14} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function AssistantScreen({ screen, titleId, note }) {
  const { mock, captions } = screen;
  const firstReply = mock.messages.findIndex((message) => message.from === 'assistente');
  return (
    <ScreenLayout titleId={titleId} captions={captions} note={note} lead={<Day label={mock.day.label} steps={mock.day.steps} />} split>
      <div className="relative mx-auto w-full max-w-[300px]">
        <Phone time={mock.time}>
          <div className="flex items-center gap-3 border-b border-agria-border px-4 pb-3 pt-1.5">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-agria-sans text-[14px] font-medium text-agria-white ${ACCENT_BG}`}>
              {mock.brand.charAt(0)}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block font-agria-sans text-[12.5px] font-medium text-agria-graphite">
                {mock.brand} · {mock.kind}
              </span>
              <span className="block font-agria-sans text-[10.5px] text-agria-grey">{mock.status}</span>
            </span>
          </div>
          <div className="flex flex-col gap-2.5 bg-agria-offwhite px-3.5 pb-3.5 pt-4">
            {mock.messages.map((message, index) => {
              const guest = message.from === 'ospite';
              return (
                <p
                  key={message.text}
                  className={`relative max-w-[86%] rounded-2xl px-3.5 py-2.5 font-agria-sans text-[11.5px] leading-snug ${
                    guest ? `self-end rounded-br-md text-agria-white ${ACCENT_BG}` : 'self-start rounded-bl-md border border-agria-border bg-agria-white text-agria-graphite'
                  }`}
                >
                  {index === firstReply && <Pill n={1} className="-right-3 top-1/2 -translate-y-1/2" />}
                  {message.text}
                </p>
              );
            })}
            {/* la richiesta pronta, che aspetta la conferma di una persona */}
            <div className="relative mt-2 rounded-2xl border border-agria-border bg-agria-white p-3.5">
              <Pill n={2} className="-right-2 -top-3" />
              <p className={`flex items-center gap-1.5 font-agria-sans text-[11px] font-medium ${ACCENT}`}>
                <Icon name="clock" size={13} />
                {mock.request.title}
              </p>
              <p className="mt-1.5 font-agria-sans text-[11px] leading-snug text-agria-graphite">{mock.request.text}</p>
              <p className="mt-2.5 flex items-center gap-2 border-t border-agria-border pt-2.5 font-agria-sans text-[10.5px] text-agria-grey">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-agria-offwhite text-agria-grey">
                  <Icon name="users" size={12} />
                </span>
                <span>
                  <span className="font-medium text-agria-graphite">{mock.request.person}</span> · {mock.request.role}
                </span>
              </p>
            </div>
          </div>
        </Phone>
      </div>
    </ScreenLayout>
  );
}
