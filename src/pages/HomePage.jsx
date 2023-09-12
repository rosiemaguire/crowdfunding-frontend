import { Link } from "react-router-dom";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import useAuth from "../hooks/use-auth";
import "./HomePage.css";

function HomePage() {
  const { projects, isLoading, error } = useProjects();
  const { auth } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <article>
      <section id="project-list">
        {projects
          .filter((project) => project["is_open"] == true)
          .sort((a, b) => (b.id > a.id ? 1 : -1))
          .slice(0, 3)
          .map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
          })}
      </section>
      {auth.token ? (
        <Link to="/new-project" className="button centre-inline-block-object">
          Start Fundraising
        </Link>
      ) : (
        ""
      )}
      <Link to="/projects" className="button centre-inline-block-object">
        More Projects to Advocat
      </Link>
    </article>
  );
}

export default HomePage;
