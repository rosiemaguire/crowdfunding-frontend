import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../../hooks/use-project";
import putProject from "../../api/put-project";


function ProjectUpdateForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  

  // const { auth } = useAuth();
  // Here we use a hook that comes for free in react router called `useParams`
  // to get the id from the URL so that we can pass it to our useProject hook
  const { id } = useParams();
  // console.log({id})
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);
  const [projectDetails, setProjectDetails] = useState({project});
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  
  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    if (
      projectDetails.title ||
      projectDetails.description ||
      projectDetails.goal ||
      projectDetails.image ||
      projectDetails.is_open ||
      projectDetails.is_deleted
    ) {
      putProject(
        projectDetails.title,
        projectDetails.description,
        projectDetails.goal,
        projectDetails.image,
        projectDetails.is_open,
        projectDetails.is_deleted
      )
        .then((response) => {
          navigate(`/project/${response.id}/`);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("Please complete required fields.");
    }
  };

  return (
    <form className="form">
      <div>
        <label htmlFor="title" className={formIsInvalid ? "error-message" : ""}>
          Project Title<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={projectDetails.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className={formIsInvalid ? "error-message" : ""}>
          Description<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="What do you want to tell your advocats?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal" className={formIsInvalid ? "error-message" : ""}>
          Goal<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="float"
          id="goal"
          name="goal"
          placeholder="amount"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="https://image-link.advocat"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="button" onClick={handleSubmit}>
        Create Project
      </button>
      <div className="error-message">
        {Object.values(errorMessage).map((error, key) => (
          <p key={key}>Error: {error}</p>
        ))}
      </div>
      <p className="error-message">{formIsInvalid}</p>
    </form>
  );
}

export default ProjectUpdateForm;
