import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams  } from "react-router-dom";

import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
 
function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);
 
  const { projectId } = useParams();

  const getProject = () => {  
      // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("oops, something went wrong");
      });
  };
  
  
  useEffect(()=> { 
    getProject();
  }, [] );
 

  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      {errorMessage && <h2>{errorMessage}</h2>}

      <AddTask refreshProject={getProject} projectId={projectId} />
 
      { project && project.tasks.map((task) => (
        <TaskCard key={task._id} {...task} projectId={projectId}/> 
      ))} 
 
      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>   
    </div>
  );
}
 
export default ProjectDetailsPage;