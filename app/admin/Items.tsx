'use client'

import { MdDeleteForever } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import Comfirmation from "./ModaComfirmation";
import Update from "./ModalUpdate";
import useCard from "../hooks/useCard";

interface ItemContentProps{
    item:any
    onDelete:(id:any)=>void
    categorie:boolean
    plat:boolean
    shop:boolean
    user:boolean
}

const Items: React.FC<ItemContentProps> = ({ item, onDelete,categorie,plat,shop,user}) => {
    const {getAllUser,AllUser}=useCard()
    const [showModal, setShowModal] = useState(false);
    const onClose = () => {
    setShowModal(!showModal);
    };
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [email_owner, setEmail_owner] = useState("");
    useEffect(() => {
        if (shop) {
            getAllUser().then(() => {
                const owner = AllUser.find((one: any) => one.shop === item.id);
                if (owner) {
                    setEmail_owner(owner.email);
                }
            });
        }
    }, [shop, item.id, getAllUser, AllUser]);
    
    const onCloseUpdate = () => {
    setShowModalUpdate(!showModalUpdate);};
    
    return (
<div className="flex justify-between  border-b-[1px] gap-8  m-2 w-full ">
                        {(categorie || plat) &&
                        <div className="flex items-center justify-content w-full relative ">
                        <div className="h-20 w-20 m-1 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.imageUrl} alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="flex gap-4 mt-4 w-full justify-between text-base font-medium text-gray-900">
                            <h3>
                            <a href="#">{item.title}</a>
                            
                        </h3>
                        {/* <p className="">{formatPrice(item.price)}</p> */}
                        </div>
                        </div>
                        }
                        {shop &&
                        <div >
                        <div className="gap-4 mt-4 w-full justify-between text-base font-medium text-gray-900">
                            <h3>{item.Company}</h3>
                            <h3>{email_owner}</h3>
                        {/* <p className="">{formatPrice(item.price)}</p> */}
                        </div>
                        </div>
                        }
                        {user &&
                
                        <div className="flex items-center justify-between gap-6 w-full">
                            <div className="flex gap-2">
                                <FaUserCircle  size={25}/>
                                <div className="">
                                <span className="font-semibold">{item.email}</span>
                                <div className="">
                                <span className="font-semibold">{item.role}/</span>
                                <span className="font-semibold">{item.télephone}</span>
                                </div>
                                </div>
                            </div>
                            <span className="text-gray-500 text-xs">{item.createdAt.split("T")[0]}</span>
                        </div>
                        
                        }
                        <div className="grid grid-rows-2 justify-end ">
                            <FaRegPenToSquare  size={20} className="text-slate-800 m-2 text-green-700"onClick={()=>setShowModalUpdate(true)} />
                            <MdDeleteForever  size={25} className="text-red-800 m-1" onClick={()=>setShowModal(true)}/>
                        </div>
                        <Comfirmation onClose={onClose} Open={showModal} action={()=>{onDelete(item.id);}}/>
                        <Update  onClose={onCloseUpdate} Open={showModalUpdate} Data={item} categorie={categorie} plat={plat}  shop={shop} user={user}/>
            </div>
    );
}

export default Items;