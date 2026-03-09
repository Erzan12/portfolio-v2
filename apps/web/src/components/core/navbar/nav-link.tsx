"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();

  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`hover:text-black dark:hover:text-white transition relative after:absolute after:left-0 after:-bottom-1 
            after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full ${
        active
          ? "text-black dark:text-white font-semibold"
          : "text-gray-600 dark:text-gray-400"
      }`}
    >
      {children}
    </Link>
  );
}