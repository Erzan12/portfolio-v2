"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./project-card";
import { Project } from "@/lib/types/project";

type Props = {
  projects: Project[];
  repos: any;
};

export default function ProjectsCoverflowCarousel({ projects, repos }: Props) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(360); 
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, [projects.length, isPaused]);

  useEffect(() => {
    const updateWidth = () => {
      // Made mobile card slightly smaller to fit better on screens like iPhone SE
      if (window.innerWidth < 640) setCardWidth(260);      
      else if (window.innerWidth < 1024) setCardWidth(320); 
      else setCardWidth(360);                               
    };

    updateWidth(); 
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Adjusted spacing for mobile. If it's a small card, reduce the gap.
  const SPACING = cardWidth < 300 ? cardWidth + 40 : cardWidth + 80; 
  const SCALE_SIDE = 0.75;
  const ROTATION = 25;

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  const getPosition = (i: number) => {
    let diff = i - index;
    if (diff > 1) diff = diff - projects.length;
    if (diff < -1) diff = diff + projects.length;

    if (diff === 0) return { x: 0, scale: 1, opacity: 1, rotateY: 0, zIndex: 10 };
    if (diff === 1) return { x: SPACING, scale: SCALE_SIDE, opacity: 0.7, rotateY: -ROTATION, zIndex: 5 };
    if (diff === -1) return { x: -SPACING, scale: SCALE_SIDE, opacity: 0.7, rotateY: ROTATION, zIndex: 5 };

    return { x: diff * SPACING, scale: 0.6, opacity: 0, rotateY: 0, zIndex: 0 };
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
      <div 
        // CHANGED: Force overflow-hidden on all screen sizes to prevent horizontal scroll
        className="relative w-full h-[440px] flex items-center justify-center perspective-[1200px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} // Added touch pause for mobile
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-4 z-20 bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronLeft size={24} className="md:w-7 md:h-7" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 md:right-4 z-20 bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronRight size={24} className="md:w-7 md:h-7" />
        </button>

        {/* Cards */}
        <div className="relative w-full flex justify-center items-center">
          {projects.map((project, i) => {
            const pos = getPosition(i);
            return (
              <motion.div
                key={project.title}
                animate={pos}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute h-[420px] origin-center"
                style={{ width: cardWidth, zIndex: pos.zIndex, perspective: 1200 }}
              >
                <ProjectCard {...project} repo={repos} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
              i === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}