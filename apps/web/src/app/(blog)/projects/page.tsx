/* eslint-disable react-refresh/only-export-components */
import { type Metadata } from "next";

import { Layout } from "@web/components";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I’ve made trying to put my dent in the universe.",
};

const ProjectsPage = async function ProjectsPage() {
  return <Layout.ProjectsPage />;
};

export default ProjectsPage;
