import { prisma } from "@/lib/prisma/prisma";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for tailwind classes
import { Prisma } from "@prisma/client";

interface RecentPostsSidebarProps {
  currentSlug?: string;
}

type PostPreview = Prisma.PostGetPayload<{
  select: {
    title: true;
    slug: true;
  };
}>;

export async function RecentPostsSidebar({ currentSlug }: RecentPostsSidebarProps) {
  const posts: PostPreview[] = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 8, // Adjust based on how many you want to show
    select: {
      title: true,
      slug: true,
    },
  });

  return (
    <nav className="flex flex-col gap-8">
      {/* --- Breadcrumb / Back Link --- */}
      <Link 
        href="/blog" 
        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Mission Log
      </Link>

      {/* --- Recent Posts List --- */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 px-2">
          Recent Logs
        </h4>
        <ul className="flex flex-col gap-1">
          {posts.map((post) => {
            const isActive = currentSlug === post.slug;
            
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary" 
                      : "text-muted-foreground hover:bg-olive-about-card/30 hover:text-foreground"
                  )}
                >
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}