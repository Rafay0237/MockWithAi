"use client"

import UserButton from "./UserButton" 
import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"

const Header = ({user}) => {
  const path= usePathname()
 
  
  return (
    <div className='flex justify-between p-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 to-gray-200'>
      <Image width={30} height={30}
      src={"/logo.svg"} alt="logo"/>

      <ul className="hidden sm:flex gap-5 pt-2.5">
        <li className={"hover:cursor-pointer text-sm sm:text-[16px]  h-6 "+(path==='/dashboard'?"border-orange-600 border-b-2 ":"hover:text-orange-600 ")}>
        <Link href={"/dashboard"}>
        Dashboard
        </Link>
        </li>
        <Link href={"/dashboard/contact"}>
        <li className={"hover:cursor-pointer text-sm sm:text-[16px]  h-6 "+(path==='/dashboard/contact'?"border-orange-600 border-b-2":"hover:text-orange-600")}>
        Contact Us</li>
        </Link>
        <Link href={"/dashboard/howItWorks"}>
        <li className={"hover:cursor-pointer text-sm sm:text-[16px]  h-6 "+(path==='/dashboard/howItWorks'?"border-orange-600 border-b-2":"hover:text-orange-600")}>
        How it Works?</li>
        </Link>
      </ul>

      <div className="flex gap-4 sm:hidden">
      <DropdownMenu >
        <DropdownMenuTrigger><MenuIcon/></DropdownMenuTrigger>
        <DropdownMenuContent>
        <Link href={"/dashboard"}>
          <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
          </Link>
          <DropdownMenuSeparator />
          <Link href={"/dashboard/contact"}>
          <DropdownMenuItem>Contact Us</DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/howItWorks"}>
          <DropdownMenuItem>How it Works?</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserButton  user={user}/>
      </div>
        
      <div className="hidden sm:block">
      <UserButton  user={user}/>
      </div>
    </div>
  )
}

export default Header
