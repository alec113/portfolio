import { motion } from "framer-motion";

import ExperienceItem from "../ExperienceItem";

const WorkExperience = () => {
  const experiences = [
    {
      timeline: "2023-present",
      title: "Freelance Frontend Developer",
    },
    {
      timeline: "2024-present",
      title: "Frontend Developer",
      company: "Plethora",
      link: "#",
    },
  ];

  return (
    <motion.div
      id="experience"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className="md:my-15 py-10 px-5 md:max-w-6xl mx-auto"
    >
      <h2 className="text-lg font-medium mb-3 md:text-2xl">Work Experience</h2>

      <div>
        {experiences.map(({ timeline, title, company, link }) => (
          <ExperienceItem
            timeline={timeline}
            title={title}
            company={company}
            link={link}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WorkExperience;
