import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import postPledge from "../../api/post-pledge";
import useProject from "../../hooks/use-project";
import "./PledgeForm.css"

function PledgeForm() {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get("project");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [project, isLoading, error] = useProject(projectId);
  const [pledgeDetails, setPledgeDetails] = useState({
    amount: "",
    comment: "",
    anonymous: "false",
    project: projectId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  const handleChange = (event) => {
    if (event.target.name == "anonymous" ) {
      document.getElementById("anonymous").value = event.target.checked
    }
    const { id, value } = event.target;
    setPledgeDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    if (pledgeDetails.amount) {
      postPledge(
        pledgeDetails.amount,
        pledgeDetails.comment,
        pledgeDetails.anonymous,
        pledgeDetails.project
      )
        .then(() => {
          setIsSubmitted(true);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("Please enter an amount to Advocat this project.");
    }
  };

  return (
    <section>  
      <form className= {isSubmitted ? "hidden" : "form"} >
      <h2 >{`Advocat for ${project.title}`}</h2>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="float"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="comment"
            onChange={handleChange}
          />
        </div>
        <div className="checkbox">
          <label htmlFor="anonymous">Be an anonymous Advocat?</label>
          <input
            type="checkbox"
            name="anonymous"
            id="anonymous"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button" onClick={handleSubmit}>
          Submit
        </button>
        <p className="error-message">{errorMessage}</p>
        <p>{formIsInvalid}</p>
      </form>
      <article className={isSubmitted ? "desktop-inline-buttons" : "hidden"}>
              <h1>Thank you for your donation!</h1>
              <Link to="/projects" className="button centre-block-object">View other projects</Link>
              <Link to={`/project/${projectId}`} className="button centre-block-object">{`Return to ${project.title}`}</Link>
            </article>
    </section>
  );
}
export default PledgeForm;
