import { Link } from "react-router-dom";
import useProjects from "../../hooks/use-projects";
import useAuth from "../../hooks/use-auth";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Slider from "../../components/Slider/Slider";
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
    <article id="home-page">
      <h1>Advocat</h1>

      <section id="slider-project-list">
      <Slider slides={projects.filter((project) => project["is_open"] == true)
          .sort((a, b) => (b.id > a.id ? 1 : -1))
          .slice(0, 10)} />
          </section>
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
          <Link id="start-fundraising" to="/new-project" className="button centre-block-object">
            Start Fundraising
          </Link>
        ) : (
          ""
        )}
        <Link id="more-projects" to="/projects" className="button centre-block-object">
          More Causes to Advocat
        </Link>
      </div>
      <Link id="my-causes" to={{ pathname: "/projects/", search: `projects=my-projects` }} className={auth.token  ? "desktop-single-button button centre-block-object" : "hidden"}>My Causes</Link>
    </article>
  );
}

export default HomePage;
