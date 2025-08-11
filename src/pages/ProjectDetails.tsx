import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import _ from "lodash";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import TechnologyBox from "../components/TechnologyBox";

import { myProjects } from "@/projects";
import type { Project } from "@/types/project";

import { type CarouselApi } from "@/components/ui/carousel";

const ProjectDetails = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();
  const params = useParams();

  if (!params) navigate("/", { replace: true });

  useEffect(() => {
    const project = myProjects?.find(
      (project) => _.kebabCase(project.title) === params.project
    );
    if (project) {
      setProject(project);
      console.log(project);
    }
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleSelect = (index: number) => {
    api?.scrollTo(index);
  };

  const dotsArray = (n: number) => {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(i);
    }
    return result;
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      viewport={{ once: true, amount: 0.4 }}
      className="max-w-6xl mx-auto p-3 py-5 md:py-10"
    >
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="col-span-3 rounded-lg overflow-hidden relative">
          <Carousel
            className="max-w-full bg-gray-50"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            setApi={setApi}
          >
            <CarouselContent>
              {project?.images.slice(1).map((image, index) => (
                <CarouselItem
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsLightboxOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt="project image"
                    className="mx-auto h-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2" />
            <CarouselNext className="absolute right-2" />

            {/* Dots Navigation */}
            <div className="flex justify-center space-x-2 py-4">
              {api?.scrollSnapList() &&
                dotsArray(api?.scrollSnapList()?.length).map((index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      current - 1 === index ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => handleSelect(index)}
                  />
                ))}
            </div>
          </Carousel>
        </div>
        {project?.mobileApp && (
          <div className="hidden md:block">
            {project?.expoUrl && (
              <>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={project?.expoUrl}
                  viewBox={`0 0 256 256`}
                />
                <p className="text-center py-2 text-sm md:text-lg">
                  Scan to open in expo go
                </p>
              </>
            )}

            <button className=" bg-black w-full text-white py-4 my-2 rounded-lg hover:bg-black/85">
              <a
                href={project?.url}
                target="_blank"
                className="flex gap-2 items-center justify-center"
              >
                View Live
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
              </a>
            </button>
          </div>
        )}
      </div>
      <div className="my-5">
        <h3 className="text-lg font-semibold md:text-2xl">{project?.title}</h3>
        <p className="text-sm md:text-lg">{project?.subtitle}</p>
        <div className="bg-gray-50 rounded-xl my-5 p-5">
          <p className="font-semibold">Description</p>
          <p className="text-justify text-sm">{project?.description}</p>
          <p className="font-semibold mt-3">Technologies</p>
          <div className="my-2 flex gap-2 flex-wrap">
            {project?.technologies.map((tech, index) => (
              <TechnologyBox
                technology={tech}
                key={index}
              />
            ))}
          </div>
          <div className="my-5 md:hidden">
            {project?.mobileApp && project?.expoUrl && (
              <>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={
                    "https://expo.dev/preview/update?message=add+unilorin+logo&updateRuntimeVersion=1.0.0&createdAt=2025-08-06T15%3A14%3A06.016Z&slug=CISSA&projectId=78caa94b-cbe4-4587-ae49-e9854764d342&group=b32bceef-b51a-434a-b046-ce68539d6fdf"
                  }
                  viewBox={`0 0 256 256`}
                />
                <p className="text-center py-2 text-sm md:text-lg">
                  Scan to open in expo go
                </p>
              </>
            )}

            <button className="flex gap-2 items-center justify-center bg-black w-full text-white py-4 my-5 rounded-lg hover:bg-black/85">
              View Live
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
          {!project?.mobileApp && (
            <button className="md:flex gap-2 items-center justify-center max-w-40 bg-black w-full text-white py-4 mt-15 rounded-lg hidden hover:bg-black/85">
              View Live
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
          )}
        </div>
      </div>
      {project?.images && (
        <Lightbox
          index={currentImageIndex}
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={project?.images.map((image) => {
            return {
              src: image,
            };
          })}
        />
      )}
    </motion.div>
  );
};

export default ProjectDetails;
