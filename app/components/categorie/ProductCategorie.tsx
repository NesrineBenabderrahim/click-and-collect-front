"use client"

import { useState } from "react";
import Image from "next/image";

import { formatPrice } from "@/app/utils/formatPrice";
import { card } from "@/app/utils/products";
import ProductModalApp from "./ProductModal";

interface ProductCategorieProps{
    data:any
}

const ProductCategorie:React.FC<ProductCategorieProps>= ({data}) => {
    let  selectedProduct:any

    for (let item in Object.keys(card.items)) {
        if (JSON.stringify((Object.keys(card.items)as any)[item]) === JSON.stringify(data) ) {
            selectedProduct  =  Object.values(card.items as any)[item]
        }
    }

    const [isOpen,setIsOpen]=useState(false)
    const handleOpenModal =()=>{
        setIsOpen(true)
    }
    const handleModalClose = () => {
        setIsOpen(false);
    };
    const compList:any[] =  selectedProduct.price.advancedPrice.originalKeyElements

    return ( 
        <div  className="flex flex-cols-2 gap-8 justify-center items-center m-4  text-[15px] cursor-pointer hover:scale-105">
            <div  onClick={handleOpenModal}>
                <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                    <Image
                        fill
                        src={selectedProduct.imageUrl.Default.urlDefault}
                        alt=""
                        
                    />
                </div>
                <div className="flex justify-between">
                    <div className="col-span-1 text-center ">{selectedProduct.title}</div>
                    <div className=" text-center ">{formatPrice(selectedProduct.price.default)}</div>
                </div>
            </div>
            <ProductModalApp  Open={isOpen} onClose={handleModalClose} data={selectedProduct} img={selectedProduct.imageUrl.Default.urlDefault} CompList={selectedProduct.basicComposition}/>
        </div>
    );
}

export default ProductCategorie ; 