"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav-config";

function NavDot({ indicator, isActive }: { indicator: "blue" | "green"; isActive: boolean }) {
  const color = indicator === "blue" ? "bg-primary-blue" : "bg-primary-green";
  const inactive = indicator === "blue" ? "bg-primary-blue/20" : "bg-primary-green/20";

  return (
    <span
      className={`inline-block rounded-full transition-all duration-300 ${
        isActive ? `h-2 w-2 ${color}` : `h-1.5 w-1.5 ${inactive}`
      }`}
    />
  );
}

export default function NavbarDesktopLinks() {
  const pathname = usePathname();

  return (
    <div className="relative hidden md:block">
      <div className="relative flex items-center gap-2 rounded-full border border-border/40 bg-section-bg/50 p-1.5">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
            >
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full bg-white shadow-sm transition-all duration-300"
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <NavDot
                  indicator={link.indicator}
                  isActive={isActive}
                />
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
