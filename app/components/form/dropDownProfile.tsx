"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface DropdownAppProps{
    handleCommande:()=>void
    handleAddPlat:()=>void
    handleAddCategorie:()=>void
    title?:string
}


export const DropdownAppProfile:React.FC<DropdownAppProps> = ({title,handleCommande,handleAddCategorie,handleAddPlat})=> {
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
            <DropdownItem  onClick={handleCommande}>Liste de commande</DropdownItem>
            <DropdownItem  onClick={handleAddPlat}>Ajouter un plat</DropdownItem>
            <DropdownItem  onClick={handleAddCategorie}>Ajouter un categorie</DropdownItem>
        </DropdownMenu>
        </Dropdown>
);
}
