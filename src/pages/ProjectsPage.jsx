import useProjects from "../hooks/use-projects";
import useAuth from "../hooks/use-auth";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
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
      {auth.token ? (
        <Link to="/new-project" className="button centre-inline-block-object">
          Start Fundraising
        </Link>
      ) : (
        ""
      )}
      <section id="project-list">
        {projects.sort((a, b) => (b.id > a.id ? 1 : -1)).map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </section>
    </article>
  );
}

export default ProjectsPage;
