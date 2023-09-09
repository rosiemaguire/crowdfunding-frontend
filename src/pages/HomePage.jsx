import { Link } from "react-router-dom";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <article>
      <section id="project-list">
        {projects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </section>
      <Link to="/new-project" className="button centrr-block-object">Start Fundraising</Link>
      <Link to="/projects" className="button centrr-block-object">Projects to Advocat</Link>
    </article>
  );
}

export default HomePage;
