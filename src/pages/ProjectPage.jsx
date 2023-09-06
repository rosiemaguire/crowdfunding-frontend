import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css";

function ProjectPage() {
  // Here we use a hook that comes for free in react router called `useParams`
  // to get the id from the URL so that we can pass it to our useProject hook
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="project-page">
      
      <img src={project.image} />
      {/* <h3>Created at: {project.date_created}</h3> */}

      <article className="project-blurb">
      <h2>{project.title}</h2>
        <h3>Status:</h3> <p>{`${project.is_open ? "Closed" : "Open"}`}</p>
        {project.description}
      </article>
      <section className="recent-pledges">
        <h3>Advocats</h3>
        <ul>
          {project.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                {pledgeData.amount} from {pledgeData.supporter}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default ProjectPage;
