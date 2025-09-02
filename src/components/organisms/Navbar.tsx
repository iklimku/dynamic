"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import LogoBMKG from "@/../public/logo-bmkg.svg";
import navbarJson from "@/../public/data/navbar.json";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Data {
  title: string;
  subMenu: { title: string; href: string }[];
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const datas: Data[] = navbarJson;

  return (
    <nav className="bg-[var(--bmkggrey3)] shadow-lg sticky top-0 z-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={LogoBMKG} alt="Logo BMKG" height={48} />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold 2xl:text-sm">
              Badan Meteorologi, Klimatologi, dan Geofisika
            </span>
            <span className="text-xs text-muted-foreground pointer-events-none">
              Deputi Klimatologi
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-6 h-6 sticky top-0 z-100 text-[var(--bmkggreen1)]" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-1 ">
          <NavigationMenu>
            <NavigationMenuList>
              {datas.map((data) => (
                <NavigationMenuItem key={data.title}>
                  <NavigationMenuTrigger className="font-normal hover:text-[var(--bmkggreen1)] hover:font-semibold p-1">
                    {data.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 min-w-[400px] md:min-w-[500px] lg:min-w-[900px] border shadow-lg bg-white rounded-md z-50 ">
                    <ul className="grid gap-2 md:grid-cols-4">
                      {data.subMenu.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        ></ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isOpen && (
        <div className="xl:hidden px-4 pb-4 space-y-4 bg-white border-t">
          <Accordion type="multiple" className="w-full">
            {datas.map((data) => (
              <AccordionItem key={data.title} value={data.title}>
                <AccordionTrigger className="text-left text-[var(--bmkggreen1)] font-semibold">
                  {data.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {data.subMenu.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 hover:bg-[var(--bmkggreen3)] rounded-md transition"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="text-sm font-semibold">
                            {item.title}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[var(--bmkggreen3)] hover:font-semibold"
        >
          <div className="text-sm">{title}</div>
          <p className="text-xs text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Navbar;
