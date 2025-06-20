'use client';

import { MdArrowBack } from "react-icons/md";
import useCard from "../hooks/useCard";
import { useEffect, useState } from "react";
import Subscriptions from "../profile/Braintree";
import Heading from "../cart/Heading";
import ItemCommande from "./ItemCommande";
import Search from "../components/form/searchBar";

interface CartCommandeProps {
    Passée: boolean;
    EnCoursPrep: boolean;
    EnCoursLiv: boolean;
    Expédié: boolean;
    profile:boolean;
    filtredCommande:any;
    setSearch:Function
    setIdUserSearch:Function
}

const CartCommande: React.FC<CartCommandeProps> = ({ 
    Passée,
    EnCoursPrep,
    EnCoursLiv,
    Expédié ,
    profile,
    filtredCommande,
    setSearch,
    setIdUserSearch
}) => {
    const { dataCommande } = useCard();
    const [showPay, setShowPay] = useState(false);
    const [commandePassée, setCommandePassée] = useState<any[]>([]);
    const [commandeEnCoursPrep, setCommandeEnCoursPrep] = useState<any[]>([]);
    const [commandeEnCoursLiv, setCommandeEnCoursLiv] = useState<any[]>([]);
    const [commandeExpédié, setCommandeExpédié] = useState<any[]>([]);

    useEffect(() => {

        if (dataCommande && !profile && dataCommande.length > 0) {
            setCommandePassée(dataCommande.filter((item: any) => item.etat_Commande === 'Passée'));
            setCommandeEnCoursPrep(dataCommande.filter((item: any) => item.etat_Commande === 'En cours de préparation'));
            setCommandeEnCoursLiv(dataCommande.filter((item: any) => item.etat_Commande === 'En cours de livraison'));
            setCommandeExpédié(dataCommande.filter((item: any) => item.etat_Commande === 'Expédié'));
        }
        if(profile && filtredCommande){
            setCommandePassée(filtredCommande.filter((item: any) => item.etat_Commande === 'Passée'));
            setCommandeEnCoursPrep(filtredCommande.filter((item: any) => item.etat_Commande === 'En cours de préparation'));
            setCommandeEnCoursLiv(filtredCommande.filter((item: any) => item.etat_Commande === 'En cours de livraison'));
            setCommandeExpédié(filtredCommande.filter((item: any) => item.etat_Commande === 'Expédié'));
        }

    }, [dataCommande]);

const sortedCommandePassée = [...commandePassée].sort((a, b) => b.id - a.id);
const sortedCommandeEnCoursPrep = [...commandeEnCoursPrep].sort((a, b) => b.id - a.id);
const sortedCommandeEnCoursLiv = [...commandeEnCoursLiv].sort((a, b) => b.id - a.id);
const sortedCommandeExpédié = [...commandeExpédié].sort((a, b) => b.id - a.id);

    if (!dataCommande || dataCommande.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <div className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Ordering</span>
                    </div>
                </div>
            </div>
        );
    }

    if (showPay) {
        return (
            <div className="p-4">
                <Subscriptions />
            </div>
        );
    }

    return (
        <>
        {profile ? 
            <>
            <Heading title="Liste de Commandes" center />
            <Search  setIdUserSearch={setIdUserSearch} setSearch={setSearch}/>
            </>:
            <Heading title="Mes Commandes" center />

            }
        
            <div>
            {Passée &&
            sortedCommandePassée.map((item: any, index: number) => (
                <div key={index}><ItemCommande index={sortedCommandePassée.length - index } item={item} profile/></div>
            ))}
            {EnCoursPrep &&
                sortedCommandeEnCoursPrep.map((item: any, index: number) => (
                    <div key={index}><ItemCommande index={sortedCommandeEnCoursPrep.length - index} item={item} profile/></div>
                ))}
            {EnCoursLiv &&
                sortedCommandeEnCoursLiv.map((item: any, index: number) => (
                    <div key={index}><ItemCommande index={sortedCommandeEnCoursLiv.length - index} item={item} profile/></div>
                ))}
            {Expédié &&
                sortedCommandeExpédié.map((item: any, index: number) => (
                    <div key={index}><ItemCommande index={sortedCommandeExpédié.length - index} item={item} profile/></div>
                ))}
            </div>
        </>
    );
};

export default CartCommande;
