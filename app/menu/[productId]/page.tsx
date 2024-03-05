"use client"

import { useEffect } from "react";

import MenuCategorie from "../../components/categorie/MenuCategorie";
import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import HomePhoto from "@/app/components/HomePhoto";


interface Iparams{
    productId?:string
}

const Menu = ({params}:{params?:Iparams}) => {
    
    const {selectedIdShopList,getSelectedIdCategorieList,selectedElCategorie} = useCard()

    useEffect(()=>{
        getSelectedIdCategorieList(params)
    },[])
    

    return ( 
    
    <div className="flex flex-col">
        <HomePhoto  data={selectedIdShopList}  />
        <MenuCategorie  />
        <div className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-2 gap-8 m-8">
            {(selectedElCategorie?.items)?.map((item:any)=> <div key={item}><ProductCategorie  data={item} /></div>)}
        </div>
    </div> 
    );
}

export default Menu;