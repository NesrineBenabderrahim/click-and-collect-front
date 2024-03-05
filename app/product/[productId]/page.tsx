"use client"

import { useEffect,useState } from "react";

import Container from "@/app/components/Container";
import HomePhoto from "@/app/components/HomePhoto";
import CategorieCart from "@/app/components/categorie/CategorieCart";
import MenuCategorie from "@/app/components/categorie/MenuCategorie";
import useCard from "@/app/hooks/useCard";
import { card } from "@/app/utils/products";


interface Iparams{
    productId?:string
}

const Product= ({params}:{params:Iparams}) => {
    const[selectedProductId ,setSelectedProductId ]=useState({})
    const[selectedProductData ,setSelectedProductData ]=useState({})

    const {getSelectedIdShopList} = useCard()
    
    useEffect(()=>{ 
        getSelectedIdShopList(params)
        setSelectedProductId(localStorage.getItem("selectedProductId")!==null?JSON.parse(localStorage.getItem("selectedProductId")??'{}'):{})
        setSelectedProductData(localStorage.getItem("selectedProductData")!==null?JSON.parse(localStorage.getItem("selectedProductData")??'{}'):{})
    },[])

    



    return ( 
    <div className="flex flex-col">
    <HomePhoto  data={selectedProductData }  />
    <MenuCategorie data={selectedProductData }  />
    <Container>
        <div className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-2 gap-8 m-8">
            {Object.values(card.categories).map((item:any)=><div key={item.id}  className="" > <CategorieCart  data={item} Id={selectedProductId}  /></div>)}
            
        </div>
    </Container>
    </div>
        );
}

export default Product;