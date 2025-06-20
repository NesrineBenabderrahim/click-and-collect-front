"use client"

import { useEffect, useState } from "react";

import { DropdownApp } from "../form/dropDown";
import CategorieCart from "./CategorieCart";
import useCard from "@/app/hooks/useCard";


interface MenuCategorieProps{
    data?:any
}


const MenuCategorie:React.FC<MenuCategorieProps>= ({data}) => {
    const [n,setN] = useState(4)
    
    const {selectedShoplist,card,getDataCard} = useCard()  
    
// useEffect(()=>{
//     if(card === "undefined"){
//         getDataCard()
//     console.log({card});
//     }
    
// },[])

    let listCategorie:any[]
    let ListDrop:any[]
    // console.log({card});

    listCategorie =card?.categories?.slice(0 , n)
    ListDrop= card?.categories?.filter((item:any)=>listCategorie.findIndex((el:any)=>el.title===item.title)===-1 )
    


    useEffect(() => {
        
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setN(4)
            } else {
                setN(card?.categories?.length)
                
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    

    return (  
    <div className="flex justify-center justify-between shadow-md shadow-rounded-lg shadow-black gap-2  w-full justify-content p-4 ">
    <p className="text-xl cursor-pointer " onClick={() => window.location.href = `/product/${selectedShoplist[0].id}`} >Menu</p>
    <div className="flex justify-center gap-2">
    {listCategorie && listCategorie.map((item)=><div  key={item.id} className="" ><CategorieCart  data={item} isTitle={true}  /></div>)}
    </div>
    <DropdownApp items={ListDrop} title=" Voir plus ..."/>
    </div> );
}

export default MenuCategorie  ;