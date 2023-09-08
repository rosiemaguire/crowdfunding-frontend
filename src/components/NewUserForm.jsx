import { useNavigate } from "react-router-dom";
import { useState } from "react";
import postNewUser from "../api/post-user";
import postLogin from "../api/post-login";

function NewUserForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetails.username && userDetails.password) {
      postNewUser(
        userDetails.username,
        userDetails.password,
        userDetails.email,
        userDetails.first_name,
        userDetails.last_name
      )
        .then(() => {
          postLogin(userDetails.username, userDetails.password).then(
            (response) => {
              window.localStorage.setItem("token", response.token);
              navigate("/");
            }
          );
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setErrorMessage("Please complete required fields.");
    }
  };

  return (
    <form id="create-user-form">
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last_name">Surname:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Surname"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="your email address"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className={errorMessage ? "error-message" : ""}>
          Username<span className={errorMessage ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className={errorMessage ? "error-message" : ""}>
          Password<span className={errorMessage ? "" : "hidden"}>*</span>:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create account
      </button>
      <p className="error-message">{errorMessage}</p>
    </form>
  );
}

export default NewUserForm;
