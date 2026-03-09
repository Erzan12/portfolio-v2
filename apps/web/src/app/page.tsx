import Hero from "@/components/core/hero";
import ProjectCard from "@/components/core/projects-section/project-card";
import Skills from "@/components/core/skills";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="container mx-auto px-6">
      <Hero />

      <section className="py-16">
        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.featured) // now this works
            .map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
        </div>
      </section>
      
       <Skills />
    </main>
  )
}