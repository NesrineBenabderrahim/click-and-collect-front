'use client'

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/formatPrice";
import NumberControl from "../components/form/InputNumber";
import { useState } from "react";
import { divIcon } from "leaflet";

interface ItemCententProps{
    item:any
}
const ItemCentent:React.FC<ItemCententProps>= ({item}) => {
    
    const [showDetail,setShowDetail] =useState(false)
    const [count, setCount] =useState(0);

    const onCountChanged = (newCount: number) => {
        setCount(newCount);       
    };
    return (

        <div  className="grid grid-cols-4 text-xs md:text-sm
        gap-2 border-t-[1.5px] border-slate-200 py-4  items-center">
                <div className="justify-self-start flex-rows-2  md:flex lg:flex justify-content  gap-2 md:gap-4  ">
                    <div className="flex-rows-2 lg:flex gap-1  ">
                        <div  >
                        <Link href={`/product/${item.id}`}>
                        <Link href={``} className="font-bold text-md">{item.data.title}</Link>
                            <div className="relative w-[80px] aspect-square">
                                <Image  src={item.data.imageUrl.Default.urlDefault} alt={""} fill className="object-contain"/>
                            </div>
                        </Link>
                        <div className="flex gap-2">
                                <button className="text-slate-500 underline" onClick={()=>{}}>Remove</button>
                                <button className="text-slate-500 underline" onClick={()=>{setShowDetail(!showDetail)}}>{showDetail?"Voir moins" :"Voir plus..."}</button>
                        </div>
                        </div>
                        {showDetail?
                        <div className="flex flex-col justify-between">
                            <p className="font-semibold text-md">Composants de base : </p>
                            <div className="flex ">
                                {Object.keys(item.checkedItems).map((item)=><p key={item}>{item},</p>)}
                            </div>
                            {item.sup == null? "" :
                            <div>
                            <p className="font-semibold text-md">composant supplimentaire : </p>
                            <div className="flex ">
                                {JSON.stringify(item.sup)}
                            </div>
                            </div>
                            }
                            
                        </div> 
                        :""}
                        
                    </div>
                    
                    
                    
                </div>
                <div className="justify-self-center">{formatPrice(item.data.price.default)}</div>
                <div className="justify-self-center">
                <NumberControl  value={item.quantity} onChange={onCountChanged} data = {item} />
                </div>
                <div className="justify-self-end font-semibold"> {formatPrice(item.data.price.default)}</div>

        </div>
    );
}

export default ItemCentent;