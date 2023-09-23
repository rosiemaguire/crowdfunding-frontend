import useSelf from "../../hooks/use-self";
import useMyProjects from "../../hooks/use-myprojects";
// import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./UserProfilePage.css"
import { Link } from "react-router-dom";

function UserPage() {
  
  const { self, isLoading, error } = useSelf();
  const [myProjects, myProjectsAreLoading, myProjectsError] = useMyProjects();

  if (isLoading || myProjectsAreLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (myProjectsError) {
    return <p>{myProjectsError.message}</p>;
  }

  return (
    <div>
    <main id="profile-page" className={myProjects.filter((project) => project["is_open"] == true).length <= 1 ? "article justify-centre" : "article"}>
      <h2>Hi {`${self.first_name}${self.last_name}` ?`${self.first_name} ${self.last_name}`: self.username }!</h2>
      <section id="my-details">
      <h3>My Details</h3>
      <p>Username: {self.username}</p>
      <p>First name: {self.first_name}</p>
      <p>Surname: {self.last_name}</p>
      <p>Email: {self.email}</p>
      <br></br>
      <Link to="/profile/update" className="profile-update-button button">UPDATE MY DETAILS</Link>
      </section>
    <article id="my-projects" className={myProjects.filter((project) => project["is_open"] == true).length !== 0 ? "" : "hidden"}>
      <h3>My Recent Causes</h3>
      <section id={myProjects.filter((project) => project["is_open"] == true).length > 1 ? "my-project-list" : "my-project"}>
        {myProjects.filter((project) => project["is_open"] == true).sort((a, b) => (b.id > a.id ? 1 : -1)).slice(0, 3).map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </section>
      <br></br>
      <Link to={{ pathname: "/projects/", search: `projects=my-projects` }} className="profile-update-button button">VIEW ALL MY CAUSES</Link>
      </article>
    </main>      
    </div>

  );
}

export default UserPage;
