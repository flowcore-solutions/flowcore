export type NavIndicator = "blue" | "green";

export interface NavLink {
  href: string;
  label: string;
  indicator: NavIndicator;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home", indicator: "blue" },
  { href: "/about", label: "About", indicator: "green" },
  { href: "/applications", label: "Applications", indicator: "blue" },
  { href: "/products", label: "Products", indicator: "blue" },
  { href: "/contact#inquiry-form", label: "Contact", indicator: "green" },
] as const;
