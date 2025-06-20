"use client"

import { IoMdClose } from "react-icons/io";

interface ModeRetraitProps{
    data:any
}


const ModeRetrait:React.FC<ModeRetraitProps> = ({data}) => {
    
    return ( 
    
        <div className="fixed  flex flex-col min-h-screen top-0 left-0 bg-white  h-screen z-50 w-[70%]  " >
        <div className="flex w-full  justify-content  justify-center py-3">
        <h1 className="text-2xl font-semibold  w-full text-center">Modes de retrait</h1>
        <button onClick={()=>{}} ><IoMdClose size={25} className="aspect-square bg-red-500 mr-4  border-red-700 rounded-sm text-white text sm p-1"/></button>
        </div> 
    </div>
    );
}

export default ModeRetrait;