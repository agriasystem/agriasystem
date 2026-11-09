import Link from 'next/link';
import { Card, Container, Reveal, Section, TextLink } from '@/components/agria/ui';
import { HoverGroup } from '@/components/agria/motion';
import PreviewNote from '@/components/agria/preview/PreviewNote';
import PreviewPlayer from '@/components/agria/preview/PreviewPlayer';
import { previews } from '@/content/agria/anteprime';
import { services } from '@/content/agria/home';
import SectionIntro from './SectionIntro';

// Servizi: tre aree, ognuna collegata alla propria pagina, con l'anteprima animata
// di cosa produce (Prompt 25) sopra la card.
export default function ServiceCards() {
  return (
    <Section background="offwhite" aria-labelledby="home-servizi-title">
      <Container>
        <SectionIntro
          eyebrow={services.eyebrow}
          title={services.title}
          intro={services.intro}
          titleId="home-servizi-title"
        />
        {/* HoverGroup sugli li; Reveal dentro, così le due opacità non si sovrappongono */}
        <HoverGroup as="ul" className="mt-8 grid grid-cols-1 gap-[18px] md:mt-12 md:grid-cols-3">
          {services.items.map((service, index) => (
            <li key={service.key}>
              <Reveal delay={index * 70} className="h-full">
                <PreviewPlayer className="flex h-full flex-col" kind={service.key} label={previews[service.key].label}>
                  <Card
                    interactive
                    title={service.title}
                    textSize="md"
                    className="flex-1"
                    action={
                      <TextLink as={Link} href={service.href} aria-label={`${services.linkLabel}: ${service.title}`}>
                        {services.linkLabel}
                      </TextLink>
                    }
                  >
                    {service.text}
                  </Card>
                </PreviewPlayer>
              </Reveal>
            </li>
          ))}
        </HoverGroup>
        <PreviewNote />
      </Container>
    </Section>
  );
}
