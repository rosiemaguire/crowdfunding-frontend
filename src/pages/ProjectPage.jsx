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
      <img className="project-image centre-block-object" src={project.image} />
      {/* <h3>Created at: {project.date_created}</h3> */}
      <a href="#" className="button centre-block-object">BE AN ADVOCAT</a>
      <article className="project-blurb">
      <h2>{project.title}</h2>
        <h5>Status: {`${project.is_open ? "Open" : "Closed"}`}</h5>
        <p>{project.description}</p>
      </article>
      <article className="recent-pledges">
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
      </article>
    </div>
  );
}

export default ProjectPage;
