import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Skills from "../components/sections/Skills";
import ProjectBox from "../components/ProjectBox";
import WorkExperience from "../components/sections/WorkExperience";
import About from "@/components/sections/About";

import { myProjects } from "@/projects";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <About />

      <Skills />

      <WorkExperience />

      <div className="min-h-100 py-5 px-5 md:max-w-6xl mx-auto">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-lg font-medium  mb-5 md:text-2xl"
          id="projects"
        >
          Here are some projects I've worked on
        </motion.h2>

        <div className="grid my-7 gap-5 md:gap-10 md:my-10 md:grid-cols-2">
          {myProjects.map((project, index) => (
            <ProjectBox
              key={index}
              project={project}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="flex gap-1 items-center bg-gray-200 text-sm px-3 py-4 rounded-lg mt-5 font-medium m-auto cursor-pointer hover:bg-gray-300"
            onClick={() => navigate("/projects")}
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-right-icon lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
