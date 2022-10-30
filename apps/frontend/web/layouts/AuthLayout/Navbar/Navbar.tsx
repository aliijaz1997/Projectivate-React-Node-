import React from "react";

import { MobileNavbar } from "./MobileNavbar";
import { WebNavbar } from "./WebNavbar";

export interface NavMenu {
  id: number;
  name: string;
  href: string;
}

const navMenus: NavMenu[] = [
  { id: 1, name: "Why us?", href: "/#Why us" },
  { id: 2, name: "Solutions", href: "/#Solutions" },
  { id: 3, name: "Resources", href: "/#Resources" },
  { id: 4, name: "Enterprise", href: "/#Enterprise" },
  { id: 5, name: "Pricing", href: "/#Pricing" },
];
export function Navbar() {
  return (
    <div>
      <div className="lg:hidden">
        <MobileNavbar navItems={navMenus} />
      </div>
      <div className="hidden lg:block">
        <WebNavbar navItems={navMenus} />
      </div>
    </div>
  );
}
