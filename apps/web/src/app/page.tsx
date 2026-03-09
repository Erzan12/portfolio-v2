import Hero from "@/components/core/hero";
import ProjectCard from "@/components/core/project-card";
import Skills from "@/components/core/skills";
import ThemeToggle from "@/components/dark-mode-toggle/theme-toggle";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="container mx-auto px-6">
      <Hero />

      <section className="py-16">
        <h2 className="text-2x1 font-bold mb-8">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.featured)
            .map((projects) => (
              <ProjectCard key={projects.title} {...projects} />
            ))}
        </div>
      </section>
      
       <Skills />
    </main>
  )
}