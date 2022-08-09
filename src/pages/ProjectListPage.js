import { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";
 
const API_URL = "http://localhost:5005";
 
 
function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState(null)
 
  const getAllProjects = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/projects`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => setProjects(response.data))
      .catch((error) => {
        console.log(error);
        setErrorMessage("oops, something went wrong");
      });
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );
 
  
  return (
    <div className="ProjectListPage">

        <AddProject refreshProjects={getAllProjects} />

        {errorMessage && <h2>{errorMessage}</h2>}

        {projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
              
       
    </div>
  );
}
 
export default ProjectListPage;