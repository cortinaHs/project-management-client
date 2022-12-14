import { useState } from "react";
import axios from "axios";
 
 
function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null)
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const requestBody = { title, description };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/projects`, 
        requestBody, 
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");

        props.refreshProjects();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("oops, something went wrong");
      });
  };
 
  
  return (
    <div className="AddProject">
      <h3>Add Project</h3>

      {errorMessage && <h4>{errorMessage}</h4>}

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>

  );
}
 
export default AddProject;
