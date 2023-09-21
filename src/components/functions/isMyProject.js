export default function isMyProject(myProjects,projectId) {
  const myProjectIds = [];
  for (let myProject in myProjects) {
    myProjectIds.push(myProjects[myProject]["id"]);
  }
  const isMyProject = myProjectIds.includes(projectId);
  return isMyProject
}