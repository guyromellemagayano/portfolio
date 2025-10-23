/* eslint-disable react-refresh/only-export-components */
import { type Metadata } from "next";

import { Layout } from "@web/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Spencer Sharp",
    default:
      "Spencer Sharp - Software designer, founder, and amateur astronaut",
  },
  description:
    "I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.",
  alternates: {
    types: {
      "application/rss+xml": `${globalThis?.process?.env?.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
};

const HomePage = async function HomePage() {
  return <Layout.HomePage />;
};

export default HomePage;
