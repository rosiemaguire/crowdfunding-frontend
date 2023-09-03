import { oneProject } from "../data";
import "./ProjectPage.css"

function ProjectPage() {
  return (
    <div className="project-page">
      <h2>{oneProject.title}</h2>
      <h3>Created at: {oneProject.date_created}</h3>
      <h3>{`Status: ${oneProject.is_open}`}</h3>
      <h3>Pledges</h3>
      <ul>
        {oneProject.pledges.map((pledgeData, key) => {
          return (
            <l1 key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </l1>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;