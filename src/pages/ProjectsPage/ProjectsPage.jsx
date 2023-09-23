import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useProjects from "../../hooks/use-projects";
import useMyProjects from "../../hooks/use-myprojects";
import useAuth from "../../hooks/use-auth";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./ProjectsPage.css"

function ProjectsPage() {
  const { projects, isLoading, error } = useProjects();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search).get("projects")
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();
  
  useEffect(() => {
    if (searchParams=="my-projects" && !auth.token) {
      navigate(`/projects/`);
    }
  }, []);

  if (isLoading || myProjectsAreLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (myProjectsError) {
    return <p>{myProjectsError.message}</p>;
  }
  
  if (searchParams=="my-projects" && auth.token) {
    return (
      <main>
      <article id="my-projects" className={myProjects.length !== 0 ? "" : "hidden"}>
        <h2>My Causes</h2>
        <section id="project-list" >
          {myProjects.sort((a, b) => (b.id > a.id ? 1 : -1)).map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
          })}
        </section>
        <section className="desktop-inline-buttons">
          <Link to="/new-project" className="button centre-block-object">
            START FUNDRAISING
          </Link>
          <Link to="/projects" className="button centre-block-object">
            VIEW ALL CAUSES
          </Link>
        </section>
      </article>
      <article className={myProjects.length !== 0 ? "hidden" : ""}>
        <h2>My Causes</h2>
      <section id="no-projects"> 
        <p>You do not have any fundraisers at this time.</p>
        </section>
        <section className="desktop-inline-buttons">
          <Link to="/new-project" className="button centre-block-object">
            START FUNDRAISING
          </Link>
          <Link to="/projects" className="button centre-block-object">
            VIEW ALL CAUSES
          </Link>
        </section>
      </article>
      </main>
    );
  }
  return (
    <article id="all-projects">
      <section className="desktop-inline-buttons">
      {auth.token ? (
        <Link to="/new-project" className="button centre-block-object">
          START FUNDRAISING
        </Link>
      ) : (
        ""
      )}
      </section>
      <section id="project-list">
        {projects.sort((a, b) => (b.id > a.id ? 1 : -1)).map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </section>
    </article>
  );
}

export default ProjectsPage;
