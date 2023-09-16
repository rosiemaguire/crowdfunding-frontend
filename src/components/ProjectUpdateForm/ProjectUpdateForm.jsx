import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../../hooks/use-project";
import putProject from "../../api/put-project";

function ProjectUpdateForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  // Here we use a hook that comes for free in react router called `useParams`
  // to get the id from the URL so that we can pass it to our useProject hook
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);
  const [formData, setFormData] = useState(`${project}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  const inputs = document.querySelectorAll("input");
  if (project.is_open) {
    if (inputs.length > 0) {
      document.getElementById("title").disabled = false;
      document.getElementById("description").disabled = false;
      document.getElementById("goal").disabled = false;
      document.getElementById("image").disabled = false;
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    if (
      formData.title ||
      formData.description ||
      formData.goal ||
      formData.image ||
      formData.is_open ||
      formData.is_deleted
    ) {
      putProject(
        id,
        formData.title,
        formData.description,
        formData.goal,
        formData.image,
        formData.is_open,
        formData.is_deleted
      )
        .then(() => {
          navigate(`/project/${id}/`);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("You must change one attribute to submit an update.");
    }
  };

  return (
    <form className="form project-update-form">
      <div>
        <label htmlFor="title">Project Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={project.title}
          onChange={handleChange}
          disabled
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="What do you want to tell your advocats?"
          defaultValue={project.description}
          onChange={handleChange}
          disabled
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="float"
          id="goal"
          name="goal"
          placeholder="amount"
          defaultValue={project.goal}
          onChange={handleChange}
          disabled
        />
      </div>
      <img src={project.image}></img>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="https://image-link.advocat"
          defaultValue={project.image}
          onChange={handleChange}
          disabled
        />
      </div>
      <div>
        <label htmlFor="is_open">Status:</label>
        <select
          id="is_open"
          defaultValue={project.is_open}
          onChange={handleChange}>
          <option value="true">Open</option>
          <option value="false">Closed</option>
        </select>
      </div>
      <button type="submit" className="button" onClick={handleSubmit}>
        Update Project
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
