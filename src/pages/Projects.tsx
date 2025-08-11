import ProjectBox from "../components/ProjectBox";

import { myProjects } from "@/projects";

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid my-7 gap-5 px-5 md:gap-10 md:my-10 md:grid-cols-2">
        {myProjects.map((project, index) => (
          <ProjectBox
            key={index}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
