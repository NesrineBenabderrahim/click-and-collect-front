    "use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import CategorieModalApp from "./CategorieModal";
import { useRouter } from "next/navigation";
import { card } from "@/app/utils/products";
import useCard from "@/app/hooks/useCard";


    interface CategorieCartProps{
        data:any
        isTitle?:boolean
        Id?:any
        
    }
    const CategorieCart:React.FC <CategorieCartProps> = ({data,isTitle,Id}) => {
        const[isClicked,setIsClicked]=useState(false)
        
        
        const router = useRouter()
    
        return ( 
        <div>
        {isTitle?
            <div className="flex flex-col gap-2 justify-content  text-[15px] cursor-pointer hover:scale-105  no-underline hover:underline decoration-black xl:decoration-font-semibold">
                    <div onClick={() =>  router.push(`/menu/${Id}`)} className="col-span-1 text-lg ">{data.title}</div>
                    
            </div>
        :<>

            <div className=" ">
                <div  className="flex flex-col gap-2 justify-center items-center  text-[15px] cursor-pointer hover:scale-105">
                    <div onClick={()=>{router.push(`/menu/${data.id}`)}}>
                        <div className="col-span-1 text-center font-semibold">{data.title} </div>
                        <div className="aspect-square overflow-hidden relative  rounded-md h-[280px] w-[300px]">
                            <Image
                                fill
                                src={data.imageUrl.Default.urlDefault}
                                alt=""
                                
                            />
                        </div>
                    </div>
                    
                    <CategorieModalApp data={data} />
                </div>
            </div>
            

        </>}
        
        </div>
        
        );
    }
    
    export default CategorieCart;