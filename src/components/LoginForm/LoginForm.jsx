import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post-login";
import useAuth from "../../hooks/use-auth.js";

function LoginForm() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth()
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    setFormIsInvalid("");
    setErrorMessage("");
    event.preventDefault();
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password)
        .then((response) => {
          window.localStorage.setItem("token", response.token);
          setAuth({
            token: response.token,
          });
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(`${[error.message]} \n `);
        });
    }
    else {
      setFormIsInvalid("Please enter username and password.");
    }
  };

  return (
    <form className="form">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="button" onClick={handleSubmit}>
        Login
      </button>
      <p className="error-message">{errorMessage}</p>
      <sub className={errorMessage ? "" : "hidden"}>Please check your username and password.</sub>
      <p>{formIsInvalid}</p>
    </form>
  );
}

export default LoginForm;
