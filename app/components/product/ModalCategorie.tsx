"use client"

import { useEffect, useState } from "react"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { IoMdClose } from "react-icons/io"
import { TbTruckDelivery } from "react-icons/tb"
import { generateTimeSlots } from "./generateTimeSlots"
import Button from "../form/Button"
import TimePicker from "../form/TimePicker"
import TimePickerApp from "../form/TimePicker"

interface ModalProps{
    isVisible:boolean,
    onClose:()=>void,
}

const Modal:React.FC<ModalProps>= ({isVisible,onClose}) => {
    if (!isVisible) return null
    

    const [taille, setTaille] = useState(0)
    const [small,setSmall]=useState(false)
    const [big,setBig]=useState(true)
    const[emporter,setEmporter]=useState(true)
        const[livrer,setLivrer]=useState(false)
    const handleEmporter =()=>{
        setEmporter(!emporter)
        setLivrer(false)
    }
    const handleLivrer=()=>{
        setLivrer(!livrer)
        setEmporter(false)
    }
    useEffect(() => {
        
        setTaille(window.innerWidth)
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setSmall(true)
                setBig(false)
                
            } else {
                setBig(true)
                setSmall(false)
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return ( 
    <div className={big?`fixed  top-14 left-10 bg-white  flex justify-content justify-center bg-white z-50 w-[450px] h-[500px]`:"fixed  flex flex-col  rounded-lg  min-h-screen top-0 left-0 bg-white  h-screen z-50 w-[450px]"} >
    <div className="flex rounded-lg flex-col w-full   justify-content  justify-center py-3">
        
        <div className="flex bg-white rounded-lg inset-0 ">
            <h1 className="text-3xl font-semibold  w-full text-center">Modes de retrait</h1>
            <button onClick={onClose}><IoMdClose size={25}  className="aspect-square bg-red-500 mr-4  border-red-700 rounded-sm text-white text sm p-1"/></button>
        </div>
        <div className={big? "flex flex-col mt-8 mb-8 " :"flex flex-col gap-10"}>
            <div className="flex  gap-14 w-full justify-content justify-center  font-semibold  text-center mt-8">
                <div className=" grid  gap-2 justify-content  justify-center" onClick={handleEmporter}>
                    <HiOutlineShoppingBag size={100} className={emporter?"rounded-full bg-green-500 text-white p-2":"rounded-full bg-gray-800 text-white p-2" } />
                    <h1 className={emporter?"text-green-500":""}>A emporter</h1>
                </div>
                <div className=" grid gap-2 justify-content   justify-center" onClick={handleLivrer}>
                    <TbTruckDelivery size={100} className={livrer?"rounded-full bg-green-500 text-white p-2":"rounded-full bg-gray-800 text-white p-2" }  />
                    <h1 className={livrer?"text-green-500":""}>En livraison</h1>
                </div>
            </div>
            <div className={big? "flex flex-col gap-8 mt-10 mb-8" : "flex flex-col" }>
                <label htmlFor="" className="relative mb-2 border-[1px] text-center p-2">Aujourd'hui</label>
                <TimePickerApp />
                {/* <select className="relative  h-[50px] border-[1px] text-center p-2">
                    {generateTimeSlots()}
                </select> */}
            </div>
            
        </div>
        
        
        <div className=" button-0 mt-8 ">
            <Button label="Valider" />
        </div>
        


    </div> 
    </div> );
}
 
export default Modal;