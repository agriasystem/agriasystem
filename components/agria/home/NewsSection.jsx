import Link from 'next/link';
import { Container, TextLink } from '@/components/agria/ui';
import ArticleCards from '@/components/agria/sections/ArticleCards';
import { blog } from '@/content/agria/home';
import { HomeIntro, HomeSection } from './parts';

// 12. Blog: tre articoli reali e il link a tutti gli articoli.
export default function NewsSection() {
  return (
    <HomeSection background="offwhite" aria-labelledby="home-news-title">
      <Container>
        <HomeIntro eyebrow={blog.eyebrow} title={blog.title} titleId="home-news-title" />
        <ArticleCards articles={blog.articles} className="mt-8 md:mt-12" />
        <div className="mt-8 md:mt-10">
          <TextLink as={Link} href={blog.allHref}>
            {blog.allLabel}
          </TextLink>
        </div>
      </Container>
    </HomeSection>
  );
}
