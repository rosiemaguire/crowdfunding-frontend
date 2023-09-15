import { Link, useParams } from "react-router-dom";
import useProject from "../../hooks/use-project";
import useAuth from "../../hooks/use-auth";
import useSelf from "../../hooks/use-self";
import "./ProjectPage.css";
import "../../main.css";

function ProjectPage() {
  const { auth } = useAuth();
  // Here we use a hook that comes for free in react router called `useParams`
  // to get the id from the URL so that we can pass it to our useProject hook
  const { id } = useParams();
  // console.log({id})
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);
  const { self, selfIsLoading, selfError } = useSelf();

  if (isLoading || selfIsLoading) {
    return <p>Loading...</p>;
  }

  if (error || selfError) {
    return <p>{error.message}</p>;
  }

  const dateCreated = new Date(project.date_created).toLocaleDateString();

  return (
    <div className="project-page">
      <img className="project-image centre-block-object" src={project.image} />
      <div className="advocat-button">
        <Link
          to={{ pathname: "/pledges/", search: `project=${id}` }}
          className={`button centre-block-object ${
            auth.token && project.is_open ? "" : "hidden"
          }`}>
          BE AN ADVOCAT
        </Link>
      </div>
      <article className="project-blurb">
        <h2>{project.title} </h2>
        <h5>Status: {`${project.is_open ? "Open" : "Closed"}`}</h5>
        <p>{project.description}</p>
        <small>Created at: {dateCreated}</small>
        <br></br>
        <br></br>
        <Link
          className={
            auth.token &&
            (self.username == project.owner ||
              `${self.first_name} ${self.last_name}` == project.owner)
              ? "button"
              : "hidden"
          }>
          UPDATE PROJECT
        </Link>
      </article>
      <article className="recent-pledges">
        <h3 className={project.pledges.length !== 0 ? "" : "hidden"}>
          Advocats
        </h3>
        {project.pledges.map((pledgeData, key) => {
          return (
            <ul key={key}>
              <li>
                ${pledgeData.amount} from{" "}
                {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter}
              </li>
              <li className={pledgeData.comment ? "" : "hidden"}>
                <q>{pledgeData.comment}</q>
              </li>
            </ul>
          );
        })}
      </article>
    </div>
  );
}

export default ProjectPage;