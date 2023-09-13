import { Link } from "react-router-dom";
import useProjects from "../../hooks/use-projects";
import useAuth from "../../hooks/use-auth";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./HomePage.css";
import "../../main.css";

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
      <div className={auth.token  ? "desktop-inline-buttons" : "desktop-single-button"}>
        {auth.token ? (
          <Link to="/new-project" className="button centre-block-object">
            Start Fundraising
          </Link>
        ) : (
          ""
        )}
        <Link to="/projects" className="button centre-block-object">
          More Projects to Advocat
        </Link>
      </div>
    </article>
  );
}

export default HomePage;
