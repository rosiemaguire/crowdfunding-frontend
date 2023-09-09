import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <section id="project-list">
      {projects.map((projectData, key) => {
        return <ProjectCard key={key} projectData={projectData} />;
      })}
    </section>
  );
}

export default ProjectsPage;
