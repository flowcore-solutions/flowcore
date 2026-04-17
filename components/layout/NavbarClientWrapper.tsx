"use client";

import dynamic from "next/dynamic";

const NavbarMobile = dynamic(() => import("./NavbarMobile"), {
  ssr: false,
});

const NavbarScrollHandler = dynamic(() => import("./NavbarScrollHandler"), {
  ssr: false,
});

export default function NavbarClientWrapper() {
  return (
    <>
      <NavbarScrollHandler />
      <NavbarMobile />
    </>
  );
}
