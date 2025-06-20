"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDeleteForever} from "react-icons/md";
import useCard from "../hooks/useCard";
import ModeRetraitModal from "./categorie/ModalModeRetrait";
import { FaRegPenToSquare } from "react-icons/fa6";


interface PhotoModeRetraitProps {
    data?:any

}
const PhotoModeRetrait: React.FC<PhotoModeRetraitProps> = ({data}) => {

    const{ModeRetrait}=useCard()
    if (ModeRetrait === undefined || ModeRetrait=== null ) {
        // ModeRetrait is an empty object
        return null;
    }

    const currentDate = new Date();
    const options:any = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    let formattedDate = currentDate.toLocaleDateString('fr-FR', options);
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    const [isOpen,setIsOpen]=useState(false)
    const handleOpenModal =()=>{
        setIsOpen(true)
    }
    const handleModalClose = () => {
        setIsOpen(false);
    };
    
    return ( 
        <>
            <div className="sticky justify-content   justify-self-start text-slate cursor-pointer border-[1.2px] border-slate-200 bg-white rounded-lg  transition hover:scale-105 p-2  "> 
            <div className="flex justify-self-start flex-col   ">
                <div className="flex justify-between">
                    <div className="flex">
                    <Link href="/"  className="flex sticky absolute   " >           
                    <Image  src="/logo.png"  alt="logo"  width={80} height={80} style={{ width: "auto" }}/>
                    </Link>
                    <div className="flex flex-cols-4 text-sm  sm:text-md md:text-lg lg:text-lg gap-1 p-2 justify-self-start ">
                        {!ModeRetrait.livrer? "Commande sur place":" Commande en livraison"}{" "}
                        {formattedDate}{" "}à{" "}{ModeRetrait.Time}
                    </div>
                    </div>
                    <div className="grid grid-rows-2 justify-end ">
                    <FaRegPenToSquare  size={20} className="text-slate-800 m-2 text-green-700" onClick={handleOpenModal}/>
                    <MdDeleteForever  size={25} className="text-red-800 m-1" onClick={()=>{localStorage.removeItem("ModeRetrait"); window.location.reload();}}/>
                    </div>
                    <ModeRetraitModal Open={isOpen} onClose={handleModalClose} />
                    
                </div>
            </div> 
        </div>
    </>

);
}

export default PhotoModeRetrait;