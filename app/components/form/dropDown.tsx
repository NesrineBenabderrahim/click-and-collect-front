"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface DropdownAppProps{
    items:any
    title?:string
}


export const DropdownApp:React.FC<DropdownAppProps> = ({items,title})=> {
    const router = useRouter()

    return (
        <Dropdown>
        <DropdownTrigger>
            <Button 
            variant="bordered" 
            className="text-lg"
            >
            {title} 
            </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="bg-slate-200  rounded-md overflow-y-auto  ">
            {items?.map((item:any)=> <DropdownItem key="item" onClick={()=>{router.push(`/menu/${item.id}`)}}>{item.title}</DropdownItem>)}
        </DropdownMenu>
        </Dropdown>
);
}
