import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSelf from "../../hooks/use-self";
import putUser from "../../api/put-user";

function UserUpdateForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const { self, isLoading, error } = useSelf();
  const [formData, setFormData ] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: ""
  });

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


  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    if (
      formData.first_name ||
      formData.last_name ||
      formData.email ||
      formData.username
    ) {
      putUser(
        self.id,
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.username
      )
        .then(() => {
          navigate(`/profile`);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("You must change one attribute to submit an update.");
    }
  };

  return (
    <form className="form">
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          defaultValue={self.first_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last_name">Surname:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          defaultValue={self.last_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className={formIsInvalid ? "error-message" : ""}>
          Email<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={self.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className={formIsInvalid ? "error-message" : ""}>
          Username<span className={formIsInvalid ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={self.username}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="button" onClick={handleSubmit}>
        Update Details
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

export default UserUpdateForm;
