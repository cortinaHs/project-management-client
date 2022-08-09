import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
 
const API_URL = "http://localhost:5005";
 
function EditTaskPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const { taskId } = useParams();
  const navigate = useNavigate();  
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {                                 
    axios
      .get(`${API_URL}/api/tasks/${taskId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneTask = response.data;
        setTitle(oneTask.title);
        setDescription(oneTask.description);
        setProjectId(oneTask.project);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("oops, something went wrong");
      });
    
  }, [taskId]);
  

  const handleFormSubmit = (e) => {  
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };
 
    // Make a PUT request to update the project
    axios
      .put(
        `${API_URL}/api/tasks/${taskId}`, 
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
        )
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/projects/${projectId}`)
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("oops, something went wrong");
      });
  };

  const deleteTask = () => {    
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/api/tasks/${taskId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate(`/projects/${projectId}`);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("oops, something went wrong");
      });
  };  

  return (
    <div className="EditTaskPage">
      <h3>Edit Task</h3>

      {errorMessage && <h4>{errorMessage}</h4>}

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Task</button>
      </form>

      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
}
 
export default EditTaskPage;