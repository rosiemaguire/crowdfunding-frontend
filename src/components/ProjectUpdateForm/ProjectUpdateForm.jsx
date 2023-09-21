import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useProject from "../../hooks/use-project";
import putProject from "../../api/put-project";

function ProjectUpdateForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [formData, setFormData] = useState("");
  const { id } = useParams();
  const [project, isLoading, error] = useProject(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const deleteProject = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    const confirmation = confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmation) {
      project.is_deleted = true;
      putProject(
        project.id,
        formData.title,
        formData.description,
        formData.goal,
        formData.image,
        formData.is_open,
        project.is_deleted
      )
        .then(() => {
          alert("Project successfully deleted.");
          navigate(`/profile/`);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    }
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
      formData.is_open
    ) {
      putProject(
        project.id,
        formData.title,
        formData.description,
        formData.goal,
        formData.image,
        formData.is_open,
        project.is_deleted
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
          {...(project.is_open ? {} : { disabled: true })}
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
          {...(project.is_open ? {} : { disabled: true })}
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
          {...(project.is_open ? {} : { disabled: true })}
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
          {...(project.is_open ? {} : { disabled: true })}
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
      <button
        type="submit"
        id="is_deleted"
        className="delete-button"
        onClick={deleteProject}>
        Delete Project
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
