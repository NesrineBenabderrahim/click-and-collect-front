import { useState } from "react";
import { MdSaveAs } from "react-icons/md";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import useCard from "../hooks/useCard";

const Address = () => {
const {dataUser}= useCard()
const [clicked, setClicked] = useState(false);
const [adresseData, setAdresseData] = useState<any>();



const onSubmitUpdate = async (AdresseData:any,dataUser:any) => {
    console.log({AdresseData});
    console.log(dataUser.id);
    
        await fetch(`http://localhost:8080/api/user/adresse/${dataUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"adresse":AdresseData}),
    });

    
    };

return (
<div className=" relative justify-content border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4 ">
    <div className="flex p-1 justify-between">
    <div className="flex  p-2 gap-1">
        <TfiLocationPin size={25} />
        <p className="">Adresse de domicile</p>
    </div>
    {clicked ? (
        <RiArrowDropUpLine size={50} onClick={() => setClicked(!clicked)} />
    ) : (
        <RiArrowDropDownLine size={50} onClick={() => setClicked(!clicked)} />
    )}
    </div>
    {clicked ? (<>
        <div className="flex justify-end p-4">
        <MdSaveAs
            onClick={()=>onSubmitUpdate(adresseData,dataUser)}
            size={30}
            className="bg-white text-gray-600 rounded-md  "
        />
        </div>
    <div className="grid grid-row p-2 gap-2 ">
        <input
        type="text"
        placeholder="Saisir votre adresse domicile"
        className="relative border-[1px] w-full p-2 rounded-md"
        onChange={(e: any) =>
            setAdresseData({
            ...adresseData,
            Address: e.target.value,
            })}
        />
        <div className="grid relative gap-2 border-[1px] w-full p-2 rounded-md">
        <p className="p-2">Complément d'informations</p>

        <div className="grid grid-cols-4 gap-2">
            <input
            type="text"
            placeholder="Batiment"
            className="relative border-[1px] w-full p-2 rounded-md"
            onChange={(e: any) =>
                setAdresseData({
                ...adresseData,
                Batiment: e.target.value,
                })}
            />
            <input
            type="text"
            placeholder="Etage"
            className="relative border-[1px] w-full p-2 rounded-md"
            onChange={(e: any) =>
                setAdresseData({
                ...adresseData,
                Etage: e.target.value,
                })}

            />
            <input
            type="text"
            placeholder="Code"
            className="relative border-[1px] w-full p-2 rounded-md"
            onChange={(e: any) =>
                setAdresseData({
                ...adresseData,
                Code: e.target.value,
                })}            />
            <input
            type="text"
            placeholder="Interphone"
            className="relative  border-[1px] w-full p-2 rounded-md"
            onChange={(e: any) =>
                setAdresseData({
                ...adresseData,
                Interphone: e.target.value,
                })}            />
        </div>
        <input
            type="text"
            placeholder="Remarque"
            className="relative border-[1px] w-full p-2 rounded-md"
            onChange={(e: any) =>
                setAdresseData({
                ...adresseData,
                Remarque: e.target.value,
                })}
        />
        </div>
    </div>
    </>
    ) : (
    ""
    )}
</div>
);
};

export default Address;
