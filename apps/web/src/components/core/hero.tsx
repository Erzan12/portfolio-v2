import HeroButton from "../ui/hero-button/hero-button";

export default function Hero() {
  return (
    <section className="py-28 text-center px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
          I build scalable backend systems & modern web platforms
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Full-stack developer specializing in ERP systems, APIs, and developer platforms — 
          focused on performance, clean architecture, and real-world scalability.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <HeroButton href="/projects" variant="primary">
            View Projects
          </HeroButton>
          <HeroButton
            href="https://erzan-docs.vercel.app/docs/architecture"
            variant="secondary"
            external
          >
            Engineering Docs
          </HeroButton>
        </div>
      </div>
    </section>
  );
}