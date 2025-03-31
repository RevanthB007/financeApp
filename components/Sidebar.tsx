"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Sidebar = ({user}:SiderbarProps) => {
    const pathName = usePathname();
    console.log(pathName); // Debugging: log current pathname

  return (
    <section className="sidebar">
        <nav className="flex flex-col gap4">
            <Link href="/" className="mb-12 cursor-pointer items-center flex gap-2">
            <Image
            src = "/icons/logo.svg"
            alt = "logo"
            width={30}
            height={30}
            className='size-[24px]
            max-xl:size-14'
            />
            <h1 className="sidebar-logo">
                Horizon
            </h1>
            </Link>
            
            {sidebarLinks.map((item) => {
                let isActive = false;
                if(pathName === "/" && item.route === "/"){
                     isActive = true;
                }else if(pathName.startsWith(item.route) && item.route !== "/"){
                     isActive =true
                }

                if(isActive) {
                    console.log(item.route); // Debugging: log current route
                }

                return (<Link className={cn('sidebar-link',{'bg-bank-gradient':isActive})} href={item.route} key={item.label}>
                    <div className="relative size-6">
                        <Image src={item.imgURL} alt={item.label} fill
                        className={cn({'brightness-[3] invert-0':isActive})}/>
                        
                    </div>
                    <p className={cn('sidebar-label',{'!text-white':isActive})}>{item.label}</p>
                </Link>)
            })}

            user
        </nav>
        Footer
    </section>
  )
}

export default Sidebar
