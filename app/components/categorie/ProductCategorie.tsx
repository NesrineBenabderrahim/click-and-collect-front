"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/app/utils/formatPrice";
import ModalCommander from "./ModalCommander";
import useCard from "@/app/hooks/useCard";
import ModeRetraitModal from "./ModalModeRetrait";
import { Fade } from "react-awesome-reveal";
import Slider from "react-slick";


interface ProductCategorieProps{
    data:any
    selectedCatId:any
    showTop?:boolean
}

const ProductCategorie:React.FC<ProductCategorieProps>= ({data,selectedCatId,showTop}) => {
    // console.log({data})
    const {selectedCategorie,getselectedCategorie,card,ModeRetrait} = useCard()
    useEffect(()=>{
        getselectedCategorie()
        //console.log({selectedCategorie});

    },[])
    //{card && console.log({data})}
    let  selectedProduct :any

if(!showTop){
    selectedProduct  = card?.items?.find((item:any)=> item.id === Number(data) )
}else{
    selectedProduct = data
}
    //console.log({card})

    //{card && console.log({selectedProduct})}
    //console.log("xx",data)

    const [isOpen,setIsOpen]=useState(false)
    const [isOpenModeRetrait,setIsOpenModeRetrait]=useState(false)

    
    const handleCommande =()=>{
        if(ModeRetrait === null || Object.keys(ModeRetrait).length === 0 ){
            setIsOpenModeRetrait(true)
        }else{
            setIsOpen(true)
        }

    }
// console.log({selectedProduct});



    return ( 
<>
        {card && <div  onClick={handleCommande}>
                                {/* <div className='m-3 py-14 my-10 text-center'>
                                    <div className="relative">
                                        <Image src={selectedProduct?.imageUrl} alt="gaby" width={362} height={262} className="inline-block m-auto" />
                                    </div>
                                    <h3 className='text-2xl font-semibold text-lightblack'>{selectedProduct?.title}</h3>
                                    <h4 className='text-lg font-normal text-lightblack pt-4 pb-2 opacity-50'>A partir de {formatPrice(selectedProduct?.price)}</h4>
                                </div> */}

                            <div className='card-b p-4  rounded-3xl   py-4  text-center' >
                                <div className='work-img-bg  rounded-full flex justify-center  top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] left-[0%]'>
                                    <Image src={selectedProduct?.imageUrl} alt={selectedProduct?.imageUrl} width={510} height={10}  />
                                </div>
                                <div className='text-2xl text-black font-semibold text-center '>{selectedProduct?.title}</div>
                                <div className='text-lg font-normal text-black text-center text-opacity-50 pb-20'>A partir de {formatPrice(selectedProduct?.detail.price[0])}</div>
                    
                            </div>
                                
        </div>
        }

            <ModalCommander  Open={isOpen} onClose={()=>setIsOpen(false)} data={selectedProduct} img={selectedProduct?.imageUrl} CompList={selectedProduct?.basicComposition}/>
            <ModeRetraitModal Open={isOpenModeRetrait} onClose={()=>setIsOpenModeRetrait(false)} data={selectedCatId} />

        </>
    );
}

export default ProductCategorie ; 