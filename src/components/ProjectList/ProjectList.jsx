import { Link } from "react-router-dom";
import "./ProjectList.css"

function ProjectList(props) {
  const { projectData } = props;
  const projectLink = `/project/${projectData.id}`;

  return (
    <div id="my-project-list">
      <Link to={projectLink}>
        {projectData.title}
      </Link>
    </div>
  );
}

export default ProjectList;