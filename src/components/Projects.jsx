import { projects } from "./MyProjectsData";
import ProjectsOrbit from "./ProjectsOrbit";

export default function Projects() {
  return <ProjectsOrbit projects={projects} title="My Portfolio Showcase" id="all-projects" />;
}
