import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { motion } from "framer-motion";

import type { Project } from "@/types/project";

type ProjectBoxProps = {
  project: Project;
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ project }) => {
  const navigate = useNavigate();

  const { title, subtitle, images } = project;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.03, animationDuration: 0.2 }}
      className="bg-gray-50 flex flex-col border border-gray-300 p-3 md:p-5 rounded-xl"
    >
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={images[0]}
          alt="UTLAM"
        />
      </div>
      <div className="mt-5 flex flex-col justify-between flex-1">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm">{subtitle}</p>
        </div>
        <button
          className="bg-gray-200 px-3 text-sm py-4 rounded-lg mt-5 font-medium flex self-start gap-3 cursor-pointer hover:bg-gray-300"
          onClick={() => navigate(`/projects/${_.kebabCase(title)}`)}
        >
          View Project{" "}
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
    </motion.div>
  );
};

export default ProjectBox;
