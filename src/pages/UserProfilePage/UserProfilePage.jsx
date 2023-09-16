import useSelf from "../../hooks/use-self";
import useMyProjects from "../../hooks/use-myprojects";
import ProjectList from "../../components/ProjectList/ProjectList";
import "./UserProfilePage.css"
// import { Link } from "react-router-dom";

function UserPage() {
  
  const { self, isLoading, error } = useSelf();
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();

  if (isLoading || myProjectsAreLoading) {
    return <p>Loading...</p>;
  }

  if (error || myProjectsError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
    <article className="article">
      <h1>Hi {`${self.first_name}${self.last_name}` ?`${self.first_name} ${self.last_name}`: self.username }!</h1>
      <section id="my-details">
      <h3>My Details</h3>
      <p>Username: {self.username}</p>
      <p>First name: {self.first_name}</p>
      <p>Surname: {self.last_name}</p>
      <p>Email: {self.email}</p>
      {/* <Link className="button">Update My Details</Link> */}
      </section>
      <br></br>
      <h4 className="centre-text">More profile info coming soon!</h4>
    <article id="my-projects" className={myProjects.length !== 0 ? "" : "hidden"}>
      <h3>My Projects</h3>
      <section id="my-project-list">
        {myProjects.sort((a, b) => (b.id > a.id ? 1 : -1)).map((projectData, key) => {
          return <ProjectList key={key} projectData={projectData} />;
        })}
      </section>
      </article>
    </article>      
    </div>

  );
}

export default UserPage;
