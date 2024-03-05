"use client"
import Image from "next/image";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import PhotoModeRetrait from "./PhotoModeRetrait";

interface HomePhotoProps{
    data?:any
}
const HomePhoto:React.FC<HomePhotoProps> = ({ data }) => {
    return (
        
        <div className=' h-[250px] relative z-20  px-10 p-1'>
            {data  && 
            <div className=" absolute grid grid-rows-2 sticky z-30 w-[100%]">
                <div className="items-center w-[350px]  xs:w-[100%] sm:w-[100%]  md:w-[350px]  m-2    text-slate cursor-pointer border-[1.2px] border-slate-200 bg-white rounded-3xl  transition hover:scale-105  "> 
                    <div className="flex  flex-col m-2 px-4  ">
                        <div className="flex flex-col gap-2">
                            <div className="text-lg  font-semibold">{data.Company}</div>
                            <div className="  text-[15px] flex gap-1  text-xs">
                                <div>{data.Address},</div>
                                <div>{data.PostalCode}</div>
                                <div>{data.town}</div>
                            </div>
                            <div className="text-green-600 text-xs font-semibold "> {data.etat} DE 11:00 à 14:30 ET DE 18:00 à 23:00 </div>
                            <p className="text-xs  underline"> INFORMATION UTILES</p>
                        </div>
                        <div className="flex gap-2 px-2 pt-2 ">
                            <MdOutlinePayments
                            size={30}
                            className="rounded-3xl p-1 bg-green-600 text-white "
                            />
                            <LuBadgeDollarSign
                            size={30}
                            className="rounded-3xl p-1 bg-green-600 text-white"
                            />
                            <LuBadgeDollarSign
                            size={30}
                            className="rounded-3xl p-1 bg-green-600 text-white"
                            />
                        </div>
                    </div>
                </div>
                <div className="row-span-2 w-full items-left ">
                    <PhotoModeRetrait  data={data}  /> 
                </div>
            </div>
            }

        <Image src="https://www.commande-pizzatime.fr/CESARWEB_WEB//repimage/listsection/96/img_headerTaille2.jpg" alt="logo" fill />
        
    </div>


);
}

export default HomePhoto;