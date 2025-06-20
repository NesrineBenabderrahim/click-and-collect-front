"use client";

import React from "react";
import useCard from "../hooks/useCard";

interface DataProps{
    handleCommande:Function
    handleAddPlat:Function
    handleAddCategorie:Function
    handleStat:Function
    handleShop:Function
    handleUser:Function
    commande:boolean
    addplat:boolean
    addcategorie:boolean
    stat:boolean
    addshop:boolean
}

const Data:React.FC<DataProps> = ({
    handleCommande,
    handleAddPlat,
    handleAddCategorie,
    handleStat,
    handleShop,
    handleUser,
    commande,
    addplat,
    addshop,
    addcategorie,
    stat,}) => {
        const {dataUser}=useCard()
    return (
        <div className="">

        <p onClick={()=>handleCommande()} className={!commande ?'border-b-[1px] py-8 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer ':'border-b-[2px] border-b-slate-700 py-8 text-lg text-center text-slate-500 transition hover:scale-105 cursor-pointer '}>Gérer les commandes</p>
        <p onClick={()=>handleAddPlat()} className={!addplat ?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Gérer les plats</p>
        <p onClick={()=>handleAddCategorie()} className={!addcategorie?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Gérer les categories</p>
        <p onClick={()=>handleShop()} className={!addshop?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Gérer les restaurants</p>
{  dataUser?.role === "admin" &&      <p onClick={()=>handleUser()} className={!stat?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Gérer les utlisateurs</p>}
        <p onClick={()=>handleStat()} className={!stat?'border-b-[1px] py-8 text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer':'border-b-[2px] border-b-slate-700  py-8  text-lg text-center text-slate-500  transition hover:scale-105 cursor-pointer'}>Statistique</p>

    </div>
    );
}

export default Data;
