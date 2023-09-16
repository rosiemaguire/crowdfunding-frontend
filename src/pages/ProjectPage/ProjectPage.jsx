import { Link, useParams } from "react-router-dom";
import useProject from "../../hooks/use-project";
import useAuth from "../../hooks/use-auth";
import useMyProjects from "../../hooks/use-myprojects";
import "./ProjectPage.css";
import "../../main.css";

function ProjectPage() {
  const { auth } = useAuth();
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();
  // Here we use a hook that comes for free in react router called `useParams`
  // to get the id from the URL so that we can pass it to our useProject hook
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

  if (isLoading || myProjectsAreLoading) {
    return <p>Loading...</p>;
  }

  if (error || myProjectsError) {
    return <p>{error.message}</p>;
  }

  const myProjectIds = [];
  for (let myProject in myProjects) {
    myProjectIds.push(myProjects[myProject]["id"]);
  }
  const dateCreated = new Date(project.date_created).toLocaleDateString();
  const isMyProject = myProjectIds.includes(project.id);
  const updateLink = `/update/project/${project.id}`;

  return (
    <div className="project-page">
      <img className="project-image centre-block-object" src={project.image} />
      <div className="advocat-button">
        <Link
          to={{ pathname: "/pledges/", search: `project=${id}` }}
          className={
            auth.token && project.is_open
              ? "button centre-block-object"
              : "hidden"
          }>
          BE AN ADVOCAT
        </Link>
      </div>
      <article className="project-blurb">
        
        <div className="">
          <Link to={updateLink} className={isMyProject ? "float-right button" : "hidden"}>
            UPDATE PROJECT
          </Link>
        </div>
        <h2>{project.title} </h2>
        <small>{project.owner} </small>

        <p>{project.description}</p>
        <small className="small">
          Status: {`${project.is_open ? "Open" : "Closed"}`}
        </small>
        <small className="small">Created at: {dateCreated}</small>
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
