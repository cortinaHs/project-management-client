import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const API_URL = "http://localhost:5005";

// We are deconstructing the props object directly in the parentheses of the function
function TaskCard({ _id, title, description, done }) {

    const [ checked, setChecked ] = useState(done);
    const [ errorMessage, setErrorMessage ] = useState(null)

    const navigate = useNavigate(); 

    const handleCheckbox = () => {  
        
        setChecked(!checked);

        // Create an object representing the body of the PUT request
        const requestBody = { done: !checked };

        const storedToken = localStorage.getItem('authToken');
     
        // Make a PUT request to update the project
        axios
          .put(
            `${API_URL}/api/tasks/${_id}`, 
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
          .then((response) => {
            // Once the request is resolved successfully and the project
            // is updated we navigate back to the details page
            navigate(`/projects/${response.data.project}`)
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage("oops, something went wrong");
          });
      };

    return (
      <div className="TaskCard card">

        {errorMessage && <h4>{errorMessage}</h4>}   

        <input
          type="checkbox" 
          className='checkbox' 
          name="done"
          defaultChecked={done}
          onChange={handleCheckbox}
        />

        <h3>{title}</h3>
        <h4>Description:</h4>
        <p>{description}</p>
        
        <Link to={`/tasks/edit/${_id}`}>
            <button>Edit Task</button>
        </Link>  
      </div>
      
    );
  }
   
  export default TaskCard;