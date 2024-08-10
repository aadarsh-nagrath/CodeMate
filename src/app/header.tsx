"use client";
import * as React from "react"
import { Check, ChevronsUpDown, LogOut } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import Image from "next/image";
import Link from "next/link";

export function Header(){
    const session = useSession();

    const [open, setOpen] = React.useState(false)

    return(
        <header className="bg-gray-100 dark:bg-gray-900 container mx-auto">
            <div className="flex justify-between items-center ">
                <div className="flex gap-2 items-center"><Link href="/"><Image src="/icon.png" width={35} height={35} alt="icon" />CODEMATE</Link></div>
                
                <div className="flex justify-between w-[240px]">
                    {session.data ? (
                        <div className="">
                          <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[180px]"
                            >
                            <Avatar className="right-2 ">
                              <AvatarImage src={session.data?.user?.image ?? "undefined"} alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {session.data?.user?.name}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[90px] p-0">
                          <Button variant="destructive" onClick={() => signOut()}>Sign Out <LogOut /></Button>
                          </PopoverContent>
                        </Popover>
                        </div>
                    ):(
                        <Button onClick={() => signIn("google")}>Sign In</Button>
                    )}
                    <ModeToggle/>
                </div>
                
            </div>

        </header>
    )
}