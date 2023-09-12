import { Link } from "react-router-dom";
import { useState } from "react";
import postPledge from "../api/post-pledge";

function PledgeForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [pledgeDetails, setPledgeDetails] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project: 1,
  });

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
    console.log(checked,checkedName)
    //update the anonymous field only if checkbox input has been clicked
    if (checkedName == "anonymous") {
      pledgeDetails.anonymous = checked;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    console.log(pledgeDetails)
    if (pledgeDetails.amount) {
      postPledge(
        pledgeDetails.amount,
        pledgeDetails.comment,
        pledgeDetails.anonymous,
        pledgeDetails.project
      )
        .then(() => {
          return (
            <article>
              <h1>Thank you for your donation!</h1>
              <Link to="/projects">View other projects</Link>
            </article>
          );
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("Please enter an amount to Advocat this project.");
    }
  };

  return (
    <form>
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
      <div>
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
  );
}
export default PledgeForm;
