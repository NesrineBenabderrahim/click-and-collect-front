"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "./Heading";
import Button from "../components/form/Button";
import { formatPrice } from "../utils/formatPrice";
import ItemCentent from "./ItemCentent";
import useCard from "../hooks/useCard";
import { useEffect, useState } from "react";
import Subscriptions from "../profile/Braintree";
import FormCnx from "../components/nav/MenuCnx/FormCnx";
import toast from "react-hot-toast";

interface CartClientProps {
data: any;
}
const CartClient: React.FC<CartClientProps> = ({ data }) => {
const {
handleClearCart,
cartTotalAmount,
cartProducts,
dataUser,
selectedCategorie,
getselectedCategorie,
} = useCard();
const [showPay, setShowPay] = useState(false);
const [showMenuCnx, setShowMenuCnx] = useState(false);
const [cartshow, setCartshow] = useState(false);
const [cmdPass, setCmdPass] = useState(false);

useEffect(() => {
getselectedCategorie();
}, []);

//console.log("xx",data)
const handleCheckout = async () => {
setShowPay(true);
setShowMenuCnx(true)
};
const handleEnAttente =async()=>{
    const url = `http://localhost:8080/api/panier/EnAttente/${dataUser.id}`;
    const requestOptions:any = {
        method: 'PUT',
    };
    await fetch(url, requestOptions)
        .then(response => {
            console.log({response})
        })
        .catch(error => {
            console.log(error)
        });
}

if (!cartProducts || cartProducts.length === 0) {

return (
    <div className="flex flex-col items-center">
    <div className="text-2xl">Pas des commande</div>
    <div>
        <Link
        href={`/menu/1`}
        className="text-slate-500 flex items-center gap-1 mt-2"
        >
        <MdArrowBack />
        <span>Poursuivre votre commande</span>
        </Link>
    </div>
    </div>
);
}

if (showPay) {
    toast.success('Hello, world!')
return (
    <div className="p-4">
        {showMenuCnx && <FormCnx setShowMenuCnx={setShowMenuCnx} showMenuCnx={showMenuCnx}/>}
        <div className="flex gap-8">
            <Button label="Espace" small outline onClick={ () =>{ handleEnAttente(); setCmdPass(true) ;handleClearCart(dataUser)  }} />
            <Button label="Cart" small outline onClick={() => setCartshow(true)} />
        </div>
        {cmdPass &&  <p>Votre Commande passé avec succes</p>}
    {cartshow && <Subscriptions />}
    </div>
);
}

return (
<>
    <Heading title="Ordering Cart" center />
    <div className="grid grid-cols-6 text-xs font-semibold gap-4 pb-2 items-center mt-8">
    <div className="col-span-2 justify-self-start">PRODUCT</div>
    <div className="justify-self-center">PRICE</div>
    <div className="justify-self-center">QUANTITY</div>
    <div className="justify-self-end">TOTAl</div>
    </div>
    <div>
    {cartProducts &&
        cartProducts.map((item: any) => {
        return <div key={item.id}><ItemCentent item={item} /></div> ;
        })}
    </div>
    <div className=" border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
    <div className="w-[90px]">
        <Button
        label="Rénitialiser"
        onClick={() => {
            handleClearCart(dataUser);
        }}
        small
        />
    </div>
    <div className="text-sm flex flex-col gap-1 items-start">
        <div className="flex justify-between w-full text-base font-semibold">
        <span>Total</span>
        <span>{formatPrice(cartTotalAmount)}</span>
        </div>
        <p className="text-slate-500">
        Frais de livraison et taxes calculés lors du paiement
        </p>
        {/* setShowPay(true) */}
        <Button label="Payer" onClick={handleCheckout} />
        <Link
        href={`/menu/1`}
        className="text-slate-500 flex items-center gap-1 mt-2"
        >
        <MdArrowBack />
        <span>Poursuivre votre commande</span>
        </Link>
    </div>
    </div>
</>
);
};

export default CartClient;
