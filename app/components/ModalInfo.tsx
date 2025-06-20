import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { GoPencil } from "react-icons/go";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiMobile1 } from 'react-icons/ci';
import { TfiLocationPin } from 'react-icons/tfi';
import { MdAccessTime } from 'react-icons/md';


interface ModalCommanderProps{
    Open:boolean
    onClose:()=>void
    data:any
    
}

const ModalInfo: React.FC<ModalCommanderProps> = ({Open,onClose,data}) => {
    if (!Open) return null

const [selectedVille, setSelectedVille] = useState(1);
const handleVilleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVille(parseInt(event.target.value)); // Mettre à jour l'état avec la nouvelle valeur sélectionnée
};

const [activeTab, setActiveTab] = useState("general");

const handleTabChange = (tab: string) => {
    setActiveTab(tab);
};

const [selectedProductData, setSelectedProductData] = useState();

useEffect(()=>{
    setSelectedProductData(localStorage.getItem("selectedProductData")!==null?JSON.parse(localStorage.getItem("selectedProductData")??'{}'):{})
},[])
let ModeRetrait:any=localStorage.getItem("ModeRetrait")!==null?JSON.parse(localStorage.getItem("ModeRetrait")??'{}'):{}
console.log({ModeRetrait});

const currentDate = new Date();
const options:any = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
let formattedDate = currentDate.toLocaleDateString('fr-FR', options);
formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <>
    
        <Modal
            open={Open}
            title= "Information Utiles"
            onCancel={onClose}
            footer={null}
        >
        <div className='grid grid-cols-3 gap-2 justify-between mt-2'>
            <p onClick={() => handleTabChange("general")} className='border-b-[1px] p-2 text-md text-center '>Générales</p>
            <p onClick={() => handleTabChange("horaires")} className='border-b-[1px] p-2 text-md text-center'>Horaires</p>
            <p onClick={() => handleTabChange("livraison")} className='border-b-[1px] p-2 text-md text-center'>Villes de Livraison</p>
        </div>
    {activeTab === "general"&&

        <div className="grid  gap-2 mt-4">
            <div className="flex gap-2 h-[20%]">
                <div className=" flex gap-2">
                <TfiLocationPin size={25} />
                <p>
                    {data.Address}, {data.PostalCode} {data.town}
                </p>
                </div>
            </div>
            <div className="flex gap-2 h-[20%]">
                <div className=" flex gap-2"> 
                <CiMobile1 size={25} />
                <div>
                    <p>{data.tel}</p>
                </div>
                </div>
            </div>
            <div className="flex  gap-2">
                    <GoPencil  size={25} />
                    <div className="flex gap-1 p-1">
                        <div>{!ModeRetrait.livrer? "Commande sur place":" Commande en livraison"}</div>
                        <div>{formattedDate}</div>
                        <p>à</p>
                        <div>{ModeRetrait.Time}</div>
                    </div>
                    
            </div>
            <div className="flex  gap-2">
                <div className='flex'>
                <GiTakeMyMoney size={25} />
                <div className='flex gap-1 p-1'>
                <p>Espèce - </p>
                <p>Carte bancaire</p>
                </div>
                </div>
            </div>
        </div>
    
    }
    
    {activeTab === "horaires" && (
        <div className="tab-content active">
            <div className="flex gap-2 mt-4">
            <MdAccessTime size={25} />
            <p>Horaires d'ouverture :</p>
            </div>
            <div>
            {Object.entries(data.horaire).map(([day, times]:any) => (
                <p key={day}>
                {day} : {times.firstStart} - {times.firstEnd}{" "}
                {times.secondStart && times.secondEnd ? `, ${times.secondStart} - ${times.secondEnd}` : ""}
                </p>
            ))}
            </div>
        </div>)
        }
    {activeTab === "livraison"&& 
        <div
        className="tab-pane fade active show"
        id="third"
        role="tabpanel"
        aria-labelledby=" third-tab"
        >
            <div>
            <div className="col-12 d-flex justify-content align-items-center">
                <select
                id="selectville"
                className="w-full border-[1px] p-2  text-center rounded-md mt-2">
                <option selected value="1">
                    {data.villelivraison.ville1.nom}
                </option>
                </select>
            </div>
            <p>
                Frais de livraison : {data.villelivraison.ville1.fraislivraison}
            </p>
            <p>
                Minimum de commande :{data.villelivraison.ville1.mincommande}{" "}
            </p>
            </div>
        </div>
    }




        </Modal>
        </>
    );
    };

export default ModalInfo;