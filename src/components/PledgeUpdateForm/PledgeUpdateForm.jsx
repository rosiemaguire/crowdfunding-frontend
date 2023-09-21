import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import usePledge from "../../hooks/use-pledge";
import putPledge from "../../api/put-pledge";

function PledgeUpdateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pledge, isLoading, error } = usePledge(id);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [formData, setFormData] = useState({
    comment: "comment",
    anonymous: "",
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
    setFormData((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };
  console.log(formData.anonymous)

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    if (formData.comment || formData.anonymous) {
      putPledge(pledge.id, formData.comment, formData.anonymous)
        .then(() => {
          navigate(`/project/${pledge.project}/`);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("You must change one attribute to submit an update.");
    }
  };
  
  return (
    <form className="form pledge-update-form">
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="float" name="amount" id="amount" disabled value={`$${pledge.amount}`}/>
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          placeholder="comment"
          defaultValue={pledge.comment}
          onChange={handleChange}
        />
      </div>
      <div className="checkbox">
          <label htmlFor="anonymous">Be an anonymous Advocat?</label>
          <input
            type="checkbox"
            name="anonymous"
            id="anonymous"
            defaultChecked={pledge.anonymous}
            onChange={handleChange}
          />
        </div>
      <button type="submit" className="button" onClick={handleSubmit}>
        Update Pledge
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
export default PledgeUpdateForm;
