import Icon from '@/components/agria/icons/Icon';
import { ACCENT, ACCENT_BG, ACCENT_BORDER, Brand, Browser, Notice, Phone, Pill, Product, ScreenLayout } from './ScreenFrame';

// Schermata "Lo shop" di Digital Commerce (brochure, pagina 4): lo shop di una
// cantina inventata con le categorie e sei prodotti (pastiglia 1 sul primo); sul
// telefono il carrello con la scelta tra spedizione e ritiro (pastiglia 2); sotto
// le didascalie la notifica del magazzino aggiornato (pastiglia 3).
// Testi in content/agria/servizi-aree.js (screens[].mock).

function Nav({ items, active }) {
  return (
    <ul className="hidden gap-4 font-agria-sans text-[11px] md:flex">
      {items.map((item) => (
        <li key={item} className={item === active ? `font-medium ${ACCENT}` : 'text-agria-graphite'}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Cart({ label }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-agria-border px-3 py-1 font-agria-sans text-[11px] text-agria-graphite">
      <Icon name="cart" size={13} />
      {label}
    </span>
  );
}

export { Nav as ShopNav };

export default function ShopScreen({ screen, titleId, note }) {
  const { mock, captions } = screen;
  const notice = (
    <div className="relative mt-6">
      <Pill n={3} className="-left-3 -top-3" />
      <Notice icon="file-text" title={mock.notice.title}>
        {mock.notice.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </Notice>
    </div>
  );

  return (
    <ScreenLayout titleId={titleId} captions={captions} aside={notice} note={note}>
      <div className="relative lg:pr-[24%]">
        <Browser url={mock.url}>
          <div className="flex items-center justify-between gap-3 border-b border-agria-border px-5 py-4">
            <Brand name={mock.brand} kind={mock.kind} />
            <div className="flex items-center gap-4">
              <Nav items={mock.nav} active={mock.active} />
              <Cart label={mock.cart} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-[110px_minmax(0,1fr)] lg:pr-[12%]">
            <div className="hidden sm:block">
              <p className="font-agria-sans text-[9px] uppercase tracking-[0.14em] text-agria-grey">{mock.categoriesLabel}</p>
              <ul className="mt-2 flex flex-col gap-1.5 font-agria-sans text-[11px]">
                {mock.categories.map((category, index) => (
                  <li key={category} className={index === 0 ? `font-medium ${ACCENT}` : 'text-agria-graphite'}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
              {mock.products.map((product, index) => (
                <li key={product.name} className="relative rounded-xl border border-agria-border">
                  {index === 0 && <Pill n={1} className="left-1/2 -top-1 -translate-x-1/2 -translate-y-1/2" />}
                  <div className="flex h-16 items-center justify-center rounded-t-xl bg-agria-offwhite">
                    <Product kind={product.kind} className="h-12 w-12" />
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="font-agria-sans text-[10.5px] leading-tight text-agria-graphite">{product.name}</p>
                    <p className="mt-0.5 font-agria-sans text-[10.5px] font-medium text-agria-graphite">{product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Browser>
        {/* il telefono: il carrello, con la scelta tra spedizione e ritiro */}
        <div className="relative mx-auto mt-8 w-full max-w-[250px] lg:absolute lg:right-0 lg:top-[14%] lg:mt-0 lg:w-[27%]">
          <Pill n={2} className="-right-3 -top-3" />
          <Phone time={mock.phone.time}>
            <div className="border-b border-agria-border px-4 py-2.5">
              <Brand name={mock.brand} small />
            </div>
            <div className="flex flex-col gap-2 px-3.5 pb-4 pt-3">
              <p className="font-agria-sans text-[14px] font-light text-agria-graphite">{mock.phone.title}</p>
              {mock.phone.options.map((option) => (
                <span
                  key={option}
                  className={`rounded-xl border px-3 py-2 font-agria-sans text-[11px] text-agria-graphite ${
                    option === mock.phone.active ? `${ACCENT_BORDER} bg-[#a5563e]/[0.06]` : 'border-agria-border'
                  }`}
                >
                  {option}
                </span>
              ))}
              <div className="mt-1 flex flex-col gap-1 border-t border-agria-border pt-2 font-agria-sans text-[10.5px] text-agria-graphite">
                {mock.phone.items.map(([name, price]) => (
                  <span key={name} className="flex justify-between">
                    {name}
                    <span>{price}</span>
                  </span>
                ))}
                <span className="flex justify-between font-medium">
                  {mock.phone.total[0]}
                  <span>{mock.phone.total[1]}</span>
                </span>
              </div>
              <span className={`mt-1 rounded-full py-2 text-center font-agria-sans text-[11.5px] font-medium text-agria-white ${ACCENT_BG}`}>
                {mock.phone.button}
              </span>
            </div>
          </Phone>
        </div>
      </div>
    </ScreenLayout>
  );
}
