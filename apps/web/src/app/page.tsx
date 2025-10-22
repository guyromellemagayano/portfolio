import { logger } from "@guyromellemagayano/logger";

import {
  ArticleListItem,
  Container,
  Icon,
  Link,
  PhotoGallery,
  Resume,
} from "@web/components";
import { getAllArticles } from "@web/utils";

/** Home page component showcasing the portfolio and latest content. */
const HomePage = async function HomePage() {
  logger.info("Hey! This is the Web page.");

  const articles = await getAllArticles();

  const element = (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software designer, founder, and amateur astronaut.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Spencer, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link.Social href="#" aria-label="Follow on X" icon={Icon.X} />
            <Link.Social
              href="#"
              aria-label="Follow on Instagram"
              icon={Icon.Instagram}
            />
            <Link.Social
              href="#"
              aria-label="Follow on GitHub"
              icon={Icon.GitHub}
            />
            <Link.Social
              href="#"
              aria-label="Follow on LinkedIn"
              icon={Icon.LinkedIn}
            />
          </div>
        </div>
      </Container>
      <PhotoGallery />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles?.map((article) => (
              <ArticleListItem key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );

  return element;
};

export default HomePage;
