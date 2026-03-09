import { Github } from "lucide-react";

type Props = {
  title: string;
  description: string;
  stack: string[];
  github: string;
};

export default function ProjectCard({ title, description, stack, github }: Props) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-300">
      
      {/* Project Title */}
      <h3 className="text-xl font-semibold text-black dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Stack badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-medium border border-gray-300 dark:border-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={github}
        target="_blank"
        className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <Github size={16} />
        View Repository
      </a>
    </div>
  );
}