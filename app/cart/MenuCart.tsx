"use client"
import ItemCentent from "./ItemCentent";
import useCard from "../hooks/useCard";
import { formatPrice } from "../utils/formatPrice";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Subscriptions from "../profile/Braintree";
import store, { setIsValidation } from "@/app/hooks/store";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";



const MenuCart:React.FC = () => {
const {isValidation}=useSnapshot(store)
const [show ,setShow]=useState(false)
const [showPay, setShowPay] = useState(false);
const [cartshow, setCartshow] = useState(false);
const [cmdPass, setCmdPass] = useState(false);
const {
  handleClearCart,
  cartTotalAmount,
  cartProducts,
  dataUser,
  calculateSuppPrice,
  getselectedCategorie,  
  } = useCard();

useEffect(() => {
getselectedCategorie();
}, []);

//console.log("xx",data)
const handleCheckout = async () => {
if(dataUser?.error ){
  setIsValidation(false)
  setShow(false)
  toast.error("Veuillez vous connecter");
}else{ 

  setShowPay(true)
}
};

const handlePassée =async()=>{
    const url = `http://localhost:8080/api/panier/CmdPassee/${dataUser.id}`;
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

        setCmdPass(true) 
    await handleClearCart(dataUser)
}


        useEffect(()=>{
          if(isValidation ){
            setShow(true)  
          }
        },[isValidation])

      

  const handleClose = ()=>{
    setIsValidation(false)
    setShowPay(false)
    setShow(false); 
    setCmdPass(false)
    // console.log({cartProducts})
    // console.log("close")

  }

    return ( 
        <>


    { show && <div className={
                " fixed z-30 overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (show
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 -translate-x-full  ")
            } aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

        <div className="pointer-events-auto w-screen max-w-md">
          
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

          {showPay ?
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Votre panier</h2>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"     
                    onClick={() => {handleClearCart(dataUser); }}>
                    Rénitialiser
                </span>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={handleClose}>
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                  <Fade
                direction={"up"}
                delay={400}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
              <div className="flex gap-2 p-4 items-center justify-center">
                <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={handlePassée}>
                Espèce
                  </button>
                  <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={() => setCartshow(true)}>
                  Carte bancaire
                  </button>
              </div>

{cmdPass &&  <p>Votre Commande passé avec succes</p>}
{cartshow && <Subscriptions />}
</Fade>
                  </ul>
                </div>
              </div>
            </div>

:
<>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Votre panier</h2>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"     
                    onClick={() => {handleClearCart(dataUser); }}>
                    Rénitialiser
                </span>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={handleClose}>
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                  <Fade
                direction={"up"}
                delay={400}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                  {cartProducts &&
        cartProducts.map((item: any,i:any) => {
        return <li className="flex py-6" key={i}><ItemCentent item={item} /></li> ;
        })}
        </Fade>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{formatPrice(cartTotalAmount)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Frais de livraison et taxes calculés lors du paiement</p>
              <div className="mt-6">
                <div onClick={handleCheckout} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Payer</div>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <div>
                  
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>setShow(false)}>
                    Poursuivre votre commande
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
</>
}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>}
</>
    );
}

export default MenuCart;