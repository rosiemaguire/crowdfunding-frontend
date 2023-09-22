import { Link, useParams } from "react-router-dom";
import useProject from "../../hooks/use-project";
import useAuth from "../../hooks/use-auth";
import useMyProjects from "../../hooks/use-myprojects";
import useMyPledges from "../../hooks/use-mypledges";
import isMyProject from "../../components/functions/isMyProject";
import isMyPledge from "../../components/functions/isMyPledge";
import "./ProjectPage.css";
import "../../main.css";

function ProjectPage() {
  const { auth } = useAuth();
  const { id } = useParams();
  const [project, isLoading, error] = useProject(id);
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();
  const [myPledges] = useMyPledges();

  if (isLoading || myProjectsAreLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (myProjectsError) {
    return <p>{myProjectsError.message}</p>;
  }

  const dateCreated = new Date(project.date_created).toLocaleDateString();
  const updateLink = `/update/project/${project.id}`;

  project.amountRaised = 0;
  for (let i in project.pledges) {
    if (!project.pledges[i].is_deleted) {
      project.amountRaised += project.pledges[i].amount;
    }
  }

  return (
    <div className="project-page">
      <h2>{project.title}</h2>
      <section className="first-colummn">
        <img
          className="project-image centre-block-object"
          src={project.image}
        />
        <h4>${project.amountRaised.toFixed(2)} raised </h4>
        <h5>of my ${project.goal.toFixed(2)} goal</h5>
        <progress
          id="fundraising-progress"
          value={project.amountRaised}
          max={project.goal}></progress>
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
      </section>
      <div className="update-link">
        <Link
          to={updateLink}
          className={
            isMyProject(myProjects, project.id)
              ? "float-right button"
              : "hidden"
          }>
          UPDATE PROJECT
        </Link>
      </div>
        <article className="project-blurb">
          <small className="project-owner">by {project.owner}</small>
          <p>{project.description}</p>
          <small className="small status">
            Status: {`${project.is_open ? "Open" : "Closed"}`}
          </small>
          <small className="small created">Created at: {dateCreated}</small>
        </article>
        <article className="recent-pledges">
          <h3 className={project.pledges.length !== 0 ? "" : "hidden"}>
            Advocats
          </h3>
          {project.pledges.map((pledgeData, key) => {
            return (
              <ul key={key}>
                <li>
                  ${pledgeData.amount.toFixed(2)} from{" "}
                  {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter}
                  &emsp;
                  <Link
                    to={`/update/pledge/${pledgeData.id}/`}
                    className={
                      isMyPledge(myPledges, pledgeData.id)
                        ? "edit-pledge"
                        : "hidden"
                    }>
                    edit
                  </Link>
                </li>
                <li className={pledgeData.comment ? "" : "hidden"}>
                  <q>{pledgeData.comment} </q>
                </li>
              </ul>
            );
          })}
        </article>
    </div>
  );
}

export default ProjectPage;
