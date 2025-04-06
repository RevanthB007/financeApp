"use client";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MobileNavProps } from "@/types";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathName = usePathname();
  console.log(pathName); // Debugging: log current pathname

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetHeader>
          <SheetTitle></SheetTitle> {/* This is required for accessibility */}
        </SheetHeader>
        <SheetContent side="left" className="border-none bg-white">
          <nav className="flex flex-col gap4">
            <Link
              href="/"
              className=" cursor-pointer items-center flex gap-1 px-4"
            >
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Horizon
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map((item) => {
                    const isActive =
                      pathName === item.route ||
                      pathName.startsWith(item.route);
                      if(isActive) {
                        console.log(item.route); // Debugging: log the route being checked
                      }

                    return (
                        <SheetClose asChild key={item.route}>
                            
                      <Link
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                        href={item.route}
                        key={item.label}
                      >
                     
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({
                              "brightness-[3] invert-0": isActive,
                            })}
                          />
                      
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                      </SheetClose>
                    );
                  })}
                  USER
                </nav>
              </SheetClose>
              <Footer user={user} type='mobile'/>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
