import { getImageProps } from 'next/image';
import { Container, Reveal, Section } from '@/components/agria/ui';
import { team } from '@/content/agria/home';
import { HomeIntro } from './parts';

// 10. Chi siamo: testo e persone a sinistra, la foto del team a destra (sotto
// lg, sotto il testo); poi tre righe con un filetto sopra ciascuna.
// Foto: 1600 px da md, 800 px sotto (picture + next/image).
function TeamPhoto() {
  const { image } = team;
  const common = { alt: image.alt, quality: 80, sizes: '(min-width: 1024px) 560px, 100vw' };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: image.src, width: image.width, height: image.height });
  const {
    props: { srcSet: narrow, ...rest },
  } = getImageProps({ ...common, src: image.mobileSrc, width: image.mobileWidth, height: image.mobileHeight });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wide} sizes={common.sizes} />
      <img
        {...rest}
        srcSet={narrow}
        alt={image.alt}
        className="h-auto w-full rounded-agria-card border border-agria-border object-cover"
      />
    </picture>
  );
}

export default function TeamSection() {
  return (
    <Section background="offwhite" aria-labelledby="home-team-title">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-[clamp(32px,5vw,72px)]">
          <div>
            <HomeIntro eyebrow={team.eyebrow} title={team.title} intro={team.text} titleId="home-team-title" />
            <Reveal>
              <ul className="mt-8 flex flex-col gap-5">
                {team.people.map((person) => (
                  <li key={person.name}>
                    <p className="font-agria-sans text-agria-body font-medium text-agria-graphite">{person.name}</p>
                    <p className="mt-0.5 font-agria-sans text-agria-md text-agria-grey">{person.role}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <TeamPhoto />
          </Reveal>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-x-8 md:mt-16 md:grid-cols-3">
          {team.principles.map((item) => (
            <li key={item.title} className="border-t border-agria-border py-6">
              <p className="font-agria-sans text-agria-md text-agria-grey">
                <strong className="font-medium text-agria-graphite">{item.title}</strong> {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
