import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';

import TimePickerApp from '../product/TimePicker';
import Button from '../form/Button';
import { useRouter } from 'next/navigation';


interface CategorieModalAppProps{
    data:any
}

const CategorieModalApp: React.FC<CategorieModalAppProps>= ({data}) => {

    const format = 'HH:mm';


    const [big,setBig]=useState(true)
    const[emporter,setEmporter]=useState(true)
    const[livrer,setLivrer]=useState(false)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(dayjs('12:00', format));
    const [ModeRetrait, setModeRetrait] = useState();
    const router = useRouter()


    const handleEmporter =()=>{
        setEmporter(!emporter)
        setLivrer(false)
    }
    const handleLivrer=()=>{
        setLivrer(!livrer)
        setEmporter(false)
    }

    const handleValider= ()=>{
        localStorage.setItem("ModeRetrait",JSON.stringify({"Time":selectedTime.format(format),"emporter":emporter,"livrer":livrer}))
        router.push(`/menu/${data.id}`)
    }
    const handleTimeChange = (time:any) => {
        setSelectedTime(time);
    };

    useEffect(()=>{
        setModeRetrait(localStorage.getItem("ModeRetrait")!==null?JSON.parse(localStorage.getItem("ModeRetrait")??'{}'):{})
    },[])
    
    
    useEffect(() => {
        
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setBig(false)
                
            } else {
                setBig(true)
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <>
        <Button label='Commander'  onClick={()=>setOpen(true)}   />
        <Modal
            open={open}
            title="Modes de retrait"
            onCancel={()=>setOpen(false)}
            footer={[
        
            <Button
                label='Valider  '
                key="link"
                href=""
                disabled={loading}
                onClick={handleValider}
            />
            ]}
        >
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
                <TimePickerApp ModeRetrait={ModeRetrait}  handleTimeChange={handleTimeChange}/>
            </div>
        </Modal>
        </>
    );
    };

export default CategorieModalApp;