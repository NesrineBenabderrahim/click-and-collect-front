"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { card } from "@/app/utils/products";
import { DropdownApp } from "../product/dropDown";
import CategorieCart from "./CategorieCart";


interface MenuCategorieProps{
    data?:any,
}


const MenuCategorie:React.FC<MenuCategorieProps>= ({data}) => {
    const [n,setN] = useState(4)
    const router = useRouter()
    const selectedProduct = localStorage.getItem("selectedProductId")!==null?JSON.parse(localStorage.getItem("selectedProductId")??'{}'):{}


    let listCategorie:any[]
    let ListDrop:any[]

    listCategorie =Object.values(card.categories).slice(1, n)
    ListDrop= Object.values(card.categories).filter((item:any)=>listCategorie.findIndex((el:any)=>el.title===item.title)===-1 )

    useEffect(() => {
        
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setN(4)
            } else {
                setN(Object.values(card.categories).length)
                
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    

    return (  
    <div className="flex justify-center justify-between shadow-md shadow-rounded-lg shadow-black gap-2  w-full justify-content p-4 ">
    <p className="text-xl cursor-pointer " onClick={() => router.push(`/product/${selectedProduct.Id}`)} >Menu</p>
    <div className="flex justify-center gap-2">
    {listCategorie.map((item)=><div  key={item.id} className=""><CategorieCart  data={item} isTitle={true}  /></div>)}
    </div>
    <DropdownApp items={ListDrop} title=" Voir plus ..."/>
    </div> );
}

export default MenuCategorie  ;