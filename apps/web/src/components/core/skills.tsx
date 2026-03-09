"use client";

import { motion } from "framer-motion";

const techColors: Record<string, string> = {
  NestJS: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  Laravel: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
  CodeIgniter: "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50",
  React: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  "Next.js": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  PostgreSQL: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  MySQL: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
  Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
  Docker: "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
  Linux: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Git: "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
  Vercel: "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50",
};

export default function Skills() {
  const skills = {
    Backend: ["NestJS", "PHP", "Laravel", "CodeIgniter"],
    Frontend: ["React", "Next.js", "TypeScript"],
    Database: ["PostgreSQL", "MySQL", "Prisma"],
    DevOps: ["Docker", "Linux", "Git", "Vercel"],
  };

  // Framer Motion variants for staggered fade-up
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
          >
            <h3 className="font-semibold mb-4 text-lg">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <motion.span
                  key={skill}
                  className={`text-sm font-medium px-3 py-1 rounded-full transform transition-transform duration-200 hover:scale-105 hover:shadow-sm ${
                    techColors[skill] || "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                  variants={item}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}