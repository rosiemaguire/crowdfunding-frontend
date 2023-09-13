import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import postPledge from "../../api/post-pledge";
import "./PledgeForm.css"

function PledgeForm() {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get("project");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [pledgeDetails, setPledgeDetails] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project: projectId,
  });
  console.log(pledgeDetails);
  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledgeDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
    // to find out if it's checked or not; returns true or false
    const checked = event.target.checked;

    // to get the checked name
    const checkedName = event.target.name;
    console.log(checked, checkedName);
    // update the anonymous field only if checkbox input has been clicked
    if (checkedName == "anonymous") {
      pledgeDetails.anonymous = checked;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    console.log(pledgeDetails);
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
        {/*<sub className={errorMessage ? "" : "hidden"}>Please check your username and password.</sub> */}
        <p>{formIsInvalid}</p>
      </form>
      <article className={isSubmitted ? "desktop-inline-buttons" : "hidden"}>
              <h1>Thank you for your donation!</h1>
              <Link to="/projects" className="button centre-block-object">View other projects</Link>
              <Link to={`/project/${projectId}`} className="button centre-block-object">Return to previous project</Link>
            </article>
    </section>
  );
}
export default PledgeForm;
