'use client'

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/formatPrice";
import { useEffect, useState } from "react";
import useCard from "../hooks/useCard";
import NumberControl from "../components/form/InputNumber";

interface ItemCententProps{
    item:any,
    
}
const ItemCententCmd:React.FC<ItemCententProps>= ({item}) => {
    const {calculateSuppPrice} =useCard()
    
    const [showDetail,setShowDetail] =useState(false)
    const [count, setCount] =useState(0);
    const [prixSupp, setPrixSupp] = useState(0);

    const onCountChanged = (newCount: number) => {
        setCount(newCount);       
    };
    //console.log( "xxx",item.data.price);
    
    let index=item.data.detail.taille.findIndex((el:any)=>el===item.checkedDetail)
    const updatePrixSupp = async (item: any) => {
        const calculatedSuppPrice = await calculateSuppPrice(item);
        setPrixSupp(calculatedSuppPrice);
        // console.log("Updated prixSupp:", calculatedSuppPrice);
    };

    useEffect(() => {
        updatePrixSupp(item);
    }, [item]);

    return (
<>
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src={item.data.imageUrl} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
            <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                <a href="#">{item.data.title} x {item.quantity}</a>
                
            </h3>
            <p className="ml-4">{formatPrice(item.data.detail.price[index] * item.quantity +prixSupp)}</p>
            </div>
            <div className="mt-1 text-sm text-gray-500">
            <button className="text-slate-500 underline" onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?"Voir moins" :"Voir plus..."}</button>
            {showDetail?
        <div className="flex flex-col gap-2 px-2">
            <p className="font-semibold text-md">Composants de base : </p>
            <div className="flex ">
                {Object.keys(item.checkedItems).map((item)=><p key={item}>{item},</p>)}
            </div>
            {item.sup == null|| Object.keys(item.sup).length === 0 ? "" :
            <div>
            <p className="font-semibold text-md">composant supplimentaire : </p>
            <div className="flex ">
            {Object.keys(item.sup).map(key => (
                    <p key={key}>{key} x {item.sup[key]} ,</p>
                ))}
            </div>
            </div>
            }
            
        </div> 
        :""}
            </div>
        </div>
    </div>
    </>
    );
}

export default ItemCententCmd;