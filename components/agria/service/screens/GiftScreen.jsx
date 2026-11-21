import { ACCENT, ACCENT_BG, ACCENT_BORDER, Brand, Browser, Notice, Pill, Product, ScreenLayout } from './ScreenFrame';
import { Cart, ShopNav } from './ShopScreen';

// Schermata "I buoni regalo e i pacchetti" di Digital Commerce (brochure,
// pagina 5): il buono regalo (pastiglia 1), un pacchetto da aggiungere
// (pastiglia 2), il carrello, i prodotti; appoggiata sopra la notifica del
// nuovo ordine (pastiglia 3). Come nella brochure, qui niente telefono.
// Testi in content/agria/servizi-aree.js (screens[].mock).

export default function GiftScreen({ screen, titleId, note }) {
  const { mock, captions } = screen;
  return (
    <ScreenLayout titleId={titleId} captions={captions} note={note}>
      <div className="relative lg:pb-24 lg:pr-[10%]">
        <Browser url={mock.url}>
          <div className="flex items-center justify-between gap-3 border-b border-agria-border px-5 py-4">
            <Brand name={mock.brand} kind={mock.kind} />
            <div className="flex items-center gap-4">
              <ShopNav items={mock.nav} active={mock.active} />
              <Cart label={mock.cart} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {/* il buono regalo */}
            <div>
              <p className="font-agria-sans text-[9px] uppercase tracking-[0.14em] text-agria-grey">{mock.card.label}</p>
              <div className="relative mt-4">
                <Pill n={1} className="-left-3 -top-3" />
              <div className={`relative overflow-hidden rounded-2xl p-4 text-agria-white ${ACCENT_BG}`}>
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/25" />
                <span aria-hidden="true" className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/25" />
                <p className="font-agria-sans text-[10px] uppercase tracking-[0.28em]">{mock.brand}</p>
                <p className="mt-4 font-agria-sans text-[10.5px] opacity-80">{mock.card.for}</p>
                <p className="font-agria-sans text-[22px] font-light leading-tight">{mock.card.name}</p>
                <p className="mt-4 flex items-baseline justify-between font-agria-sans text-[11px]">
                  {mock.card.item}
                  <span className="text-[14px] font-medium">{mock.card.price}</span>
                </p>
              </div>
              </div>
              <p className="mt-2 font-agria-sans text-[10.5px] text-agria-grey">{mock.message}</p>
              <div className="mt-2 flex gap-2">
                {mock.send.map((label, index) => (
                  <span
                    key={label}
                    className={`rounded-full border px-2.5 py-1 font-agria-sans text-[10px] ${
                      index === 0 ? `${ACCENT_BORDER} ${ACCENT} bg-[#a5563e]/[0.06]` : 'border-agria-border text-agria-graphite'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            {/* il pacchetto */}
            <div>
              <p className="font-agria-sans text-[9px] uppercase tracking-[0.14em] text-agria-grey">{mock.packagesLabel}</p>
              <div className="relative mt-2 overflow-hidden rounded-2xl border border-agria-border">
                <Pill n={2} className="left-3 top-3" />
                <div className="flex h-16 items-end justify-center gap-1 bg-[#efe7da] pb-2" aria-hidden="true">
                  <Product kind="rosso" className="h-11 w-11" />
                  <Product kind="bianco" className="h-9 w-9" />
                  <Product kind="rosato" className="h-10 w-10" />
                </div>
                <div className="p-3">
                  <p className="font-agria-sans text-[11.5px] font-medium text-agria-graphite">{mock.package.title}</p>
                  <p className="mt-1 font-agria-sans text-[10px] leading-snug text-agria-grey">{mock.package.text}</p>
                  <p className="mt-2 flex items-center justify-between font-agria-sans text-[11.5px] text-agria-graphite">
                    {mock.package.price}
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium text-agria-white ${ACCENT_BG}`}>{mock.package.add}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* il carrello */}
            <div className="rounded-2xl border border-agria-border bg-agria-offwhite p-3.5">
              <p className="font-agria-sans text-[12px] font-medium text-agria-graphite">{mock.cartBox.title}</p>
              <div className="mt-2 flex flex-col gap-1.5 font-agria-sans text-[10.5px] text-agria-graphite">
                {mock.cartBox.items.map(([name, price]) => (
                  <span key={name} className="flex justify-between gap-2">
                    {name}
                    <span className="shrink-0">{price}</span>
                  </span>
                ))}
              </div>
              <p className="mt-2 flex justify-between border-t border-agria-border pt-2 font-agria-sans text-[11.5px] font-medium text-agria-graphite">
                {mock.cartBox.total[0]}
                <span>{mock.cartBox.total[1]}</span>
              </p>
              <span className={`mt-3 block rounded-full py-2 text-center font-agria-sans text-[11px] font-medium text-agria-white ${ACCENT_BG}`}>
                {mock.cartBox.button}
              </span>
            </div>
          </div>
          {/* i prodotti */}
          <div className="px-5 pb-5">
            <p className="font-agria-sans text-[9px] uppercase tracking-[0.14em] text-agria-grey">{mock.productsLabel}</p>
            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:mr-[30%]">
              {mock.products.map((product) => (
                <li key={product.name} className="flex items-center gap-2 rounded-xl border border-agria-border px-2.5 py-2">
                  <Product kind={product.kind} className="h-8 w-8 shrink-0" />
                  <span className="font-agria-sans text-[10.5px] leading-tight text-agria-graphite">
                    {product.name}
                    <br />
                    {product.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Browser>
        {/* la notifica del nuovo ordine, appoggiata sopra */}
        <div className="relative mx-auto mt-6 w-full max-w-[300px] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[38%] lg:max-w-none">
          <Pill n={3} className="-left-3 -top-3" />
          <Notice icon="check" title={mock.notice.title}>
            <p>{mock.notice.meta}</p>
            <p className="mt-1 text-agria-graphite">{mock.notice.text}</p>
            <span className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] ${ACCENT_BORDER} ${ACCENT}`}>{mock.notice.badge}</span>
          </Notice>
        </div>
      </div>
    </ScreenLayout>
  );
}
