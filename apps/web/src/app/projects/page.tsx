"use client";

import { useState, useMemo } from "react"; //added useMemo for performance
import { motion } from "framer-motion";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { Search, X } from "lucide-react"; // for search bar icons
import { SystemCardSkeleton } from "@/components/core/system-design/system-card-skeleton";
import SystemCard from "@/components/core/system-design/system-card";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
};

//define how many items per page (3 columns x 3 rows = 9)
const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  const { repos, loading } = useGithubRepos();
  
  //add state for the current page
  const [currentPage, setCurrentPage] = useState(1);

  const techColors: Record<string, string> = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
      NextJS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
      TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
      NestJS: "bg-red-100 text-red-800 dark:bg-red-100 dark:text-red-100",
      Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
      PostgreSQL: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Docker: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Docusaurus: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
      Tailwind: "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
      PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
      Laravel: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
      CodeIgniter: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
  };

  // const sortedRepos = repos 
  //   ? [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
  //   : [];

  //search handler
  const [ searchQuery, setSearchQuery ] = useState(""); // search state

  //filter and sort logic
  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    
    //first, sort by date
    const sorted = [...repos].sort(
      (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

    //then, filter by search query (name or description)
    return sorted.filter((repo) => {
      const nameMatch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = repo.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const langMatch = repo.language?.toLowerCase().includes(searchQuery.toLowerCase()); //added language search
      return nameMatch || descMatch || langMatch;
    });
  }, [repos, searchQuery]);

    //pagination Math
  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  //slice the array to only get the 9 items for the current page
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  //reset to page 1 when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  //handlers for button clicks
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header with search bar */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground font-sans tracking-tight">
              Projects
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl font-sans leading-relaxed">
              This section highlights all my development projects.
            </p>
          </div>

          {/* search input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 rounded-full border border-border bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => {setSearchQuery(""); setCurrentPage(1);}}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {loading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <SystemCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : paginatedRepos.length > 0 ? (
            paginatedRepos.map((repo) => (
              <motion.div
                key={repo.id}
                layout //smoothly animate grid shifts
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SystemCard
                  title={repo.name}
                  description={repo.description ?? "No description provided"}
                  stars={repo.stars}
                  forks={repo.forks}
                  language={repo.language}
                  last_update={repo.pushed_at}
                  link={repo.html_url}
                  showArchitectureLink={false}
                  showRepositoryLink={true}
                  techColors={techColors}
                />
              </motion.div>
            ))
          ) : (
            /* no result state */
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground">No projects found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* pagination controls */}
        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
            >
              Previous
            </button>
            
            <span className="text-sm font-medium text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </main>
  );
}