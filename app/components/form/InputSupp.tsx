"use client"

import { useState } from "react";

import { Checkbox, FormControlLabel } from "@mui/material";
import NumberControl from "./InputNumber";
import { formatPrice } from "@/app/utils/formatPrice";


interface InputSuppProps{
    item:any
    index?:number

    onchangeList:(item:any,SuppItems:any,newCount:any)=>any
}
const InputSupp:React.FC<InputSuppProps> = ( {item,index,onchangeList}) => {
    const [count, setCount] =useState(0);
    const [SuppItems, setSuppItems] = useState({});    
    

    const onCountChanged = (newCount: number) => {
        setCount(newCount);
        let sup:any=localStorage.getItem("supList")!==null?JSON.parse(localStorage.getItem("supList")??'{}'):{}
        setSuppItems(onchangeList(item,sup,newCount))
            
    };

    return ( 
        <div key={index} className='flex justify-content justify-between border-[1px] rounded-lg '>
                                        <FormControlLabel control={<Checkbox checked={count > 0} />} value={count} label={item.title}  />
                                        <NumberControl value={count} onChange={onCountChanged} />
                                        <p className='p-2'>{formatPrice(item.price * count)}</p>
                                    </div>
    );
}

export default InputSupp;