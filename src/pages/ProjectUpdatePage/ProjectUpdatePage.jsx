import { useParams } from "react-router-dom";
import ProjectUpdateForm from "../../components/ProjectUpdateForm/ProjectUpdateForm";
import useMyProjects from "../../hooks/use-myprojects";
import isMyProject from "../../components/functions/isMyProject";
import NotFound404Page from "../../components/NotFound404Page/NotFound404Page";

function ProjectUpdatePage() {
  const { id } = useParams();
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();

  if (myProjectsAreLoading) {
    return <p>Loading...</p>;
  }

  if (myProjectsError) {
    return <p>{myProjectsError.message}</p>
  }

  if(!isMyProject(myProjects,Number(id))) {
    return <NotFound404Page/>
  }

  return <ProjectUpdateForm/>
}
export default ProjectUpdatePage;