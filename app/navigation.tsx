"use client";

import { useRef } from "react";

const navItems = [["Portfolio", "#portfolio"], ["The Group", "#group"], ["Contact", "#contact"]] as const;

export default function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }

  return <>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
    </nav>
    <details className="mobile-nav" ref={menu}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        {navItems.map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
      </nav>
    </details>
  </>;
}
