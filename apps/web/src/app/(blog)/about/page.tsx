/* eslint-disable react-refresh/only-export-components */
import { type Metadata } from "next";

import { Layout } from "@web/components";

export const metadata: Metadata = {
  title: "About",
  description:
    "I’m Spencer Sharp. I live in New York City, where I design the future.",
};

const AboutPage = async function AboutPage() {
  return <Layout.AboutPage />;
};

export default AboutPage;
