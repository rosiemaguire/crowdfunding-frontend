import { useNavigate } from "react-router-dom";
import { useState } from "react";
import postProject from "../api/post-project";

function ProjectForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
  });

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
      projectDetails.title &&
      projectDetails.description &&
      projectDetails.goal
    ) {
      postProject(
        projectDetails.title,
        projectDetails.description,
        projectDetails.goal,
        projectDetails.image
      )
        .then((response) => {
          console.log(response);
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
    // console.log(typeof(Object.values(errorMessage))),
    <form id="create-project-form">
      <div>
        <label htmlFor="title" className={formIsInvalid ? "error-message" : ""}>
          Project Title<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className={formIsInvalid ? "error-message" : ""}>
          Description<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="text"
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

export default ProjectForm;
