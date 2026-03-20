"use client";

import Hero from "@/components/core/hero";
import ProjectCard from "@/components/core/projects/project-card";

import Skills from "@/components/core/skills";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { projects } from "@/data/projects";

import Faq02 from "../components/core/faq/faq-02"
import ProjectsCarousel from "@/components/core/projects/projects-carousel";

export default function Home() {
  const repos = useGithubRepos();
  return (
    <main className="container mx-auto px-6 overflow-x-hidden">
      <Hero />
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight font-sans mb-8">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
          {/* <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <ProjectCard key={project.title} {...project}
                repos={repos} />
              ))}
          </div> */}
          <ProjectsCarousel
            projects={projects.filter((p) => p.featured)}
            repos={repos}
          />
        </div>
      </section>
      <Skills />
      {/* <Faq02 /> */}
    </main>
  )
}