import { Container } from '@/components/agria/ui';
import Icon from '@/components/agria/icons/Icon';
import { assistantDemo } from '@/content/agria/home';
import { HomeIntro, HomeSection } from './parts';
import { buildingStage } from './Building';
import PlayOnView from './PlayOnView';
import styles from './HomeHero.module.css';

// 6. L'assistente al lavoro (fascia ink). Due finestre con la cornice delle
// anteprime e il testo in mono chiaro: a sinistra la chat, i cui messaggi
// compaiono uno alla volta; a destra la richiesta, i cui campi si riempiono
// quando la chat fornisce il dato (after = indice del messaggio). Una passata
// quando il blocco entra nello schermo (PlayOnView + HomeHero.module.css);
// senza JavaScript e con movimento ridotto si vede tutto subito.
// Sotto, due card bianche: cosa non fanno, e i tre impegni.

function Chrome({ bar }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="ml-2 truncate font-agria-mono text-[11px] uppercase tracking-[0.12em] text-agria-on-dark-muted">{bar}</span>
    </div>
  );
}

export default function AssistantSection() {
  const { eyebrow, title, intro, chat, request, note, limits, commitments } = assistantDemo;
  return (
    <HomeSection background="ink" aria-labelledby="home-assistente-title">
      <Container>
        <HomeIntro eyebrow={eyebrow} title={title} intro={intro} titleId="home-assistente-title" onDark />
        <PlayOnView className={`${buildingStage} mt-10 grid grid-cols-1 gap-[14px] md:mt-12 md:grid-cols-2`}>
          {/* la chat */}
          <div className="overflow-hidden rounded-agria-card border border-white/[0.12] bg-white/[0.03]">
            <Chrome bar={chat.bar} />
            <ol className="flex flex-col gap-3 p-5">
              {chat.messages.map((message, index) => {
                const guest = message.from === 'ospite';
                return (
                  <li
                    key={message.text}
                    className={`${styles.msg} flex max-w-[86%] flex-col gap-1 rounded-2xl px-4 py-3 ${
                      guest ? 'self-end rounded-br-md bg-white/[0.08]' : 'self-start rounded-bl-md border border-agria-green-bright/30'
                    }`}
                    style={{ '--m': index }}
                  >
                    <span className="font-agria-mono text-[10px] uppercase tracking-[0.12em] text-agria-green-bright">{message.from}</span>
                    <span className="font-agria-mono text-[13px] leading-relaxed text-agria-on-dark">{message.text}</span>
                  </li>
                );
              })}
            </ol>
          </div>
          {/* la richiesta che si compila */}
          <div className="overflow-hidden rounded-agria-card border border-white/[0.12] bg-white/[0.03]">
            <Chrome bar={request.bar} />
            <dl className="divide-y divide-white/10 px-5">
              {request.fields.map((field) => (
                <div key={field.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3.5" style={{ '--f': field.after }}>
                  <dt className="font-agria-mono text-[11px] uppercase tracking-[0.12em] text-agria-on-dark-muted">{field.label}</dt>
                  <dd className="relative font-agria-mono text-[13px] text-agria-on-dark">
                    <span aria-hidden="true" className={`${styles.fieldEmpty} absolute inset-x-0 top-1/2 border-t border-dashed border-white/20`} />
                    <span className={styles.fieldValue}>
                      {field.value}
                      {field.note && <em className="text-agria-on-dark-muted"> · {field.note}</em>}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </PlayOnView>
        <p className="mt-4 font-agria-mono text-agria-sm text-agria-on-dark-muted">{note}</p>

        {/* due card bianche, anche su ink */}
        <div className="mt-10 grid grid-cols-1 gap-[14px] md:mt-12 md:grid-cols-2">
          <div className="rounded-agria-card border border-agria-border border-l-2 border-l-agria-green-dark bg-agria-white p-8">
            <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{limits.title}</h3>
            <p className="mt-3 font-agria-sans text-agria-md text-agria-grey">{limits.text}</p>
          </div>
          <div className="rounded-agria-card border border-agria-border bg-agria-white p-8">
            <h3 className="font-agria-sans text-agria-h3 text-agria-graphite">{commitments.title}</h3>
            <ul className="mt-4 flex flex-col gap-4">
              {commitments.items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-agria-green-dark">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <p className="font-agria-sans text-agria-md text-agria-grey">
                    <strong className="font-medium text-agria-graphite">{item.title}</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </HomeSection>
  );
}
