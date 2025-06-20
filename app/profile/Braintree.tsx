import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import Button from '../components/form/Button';
import useCard from '../hooks/useCard';
import { formatPrice } from '../utils/formatPrice';

const Subscriptions = () => {
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const { cartTotalAmount,handleClearCart,dataUser,getData,getPanier,getTotals,getCartProducts } = useCard();
    const [inst,setInst]=useState<any>()
    let instance:any;


    const buy = async () => {
        try {
            // console.log("cc", cartTotalAmount.toFixed(2))
            const { nonce } = await inst.requestPaymentMethod();
            const res = await fetch('http://localhost:8080/api/user/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentMethodNonce: nonce, user_id: "1234", TotalAmount: cartTotalAmount.toFixed(2) })
            });

            const result = await res.json();
            if (result.result.result === "success") {
                
                    const url = `http://localhost:8080/api/panier/${dataUser.id}`;
                    const requestOptions:any = {
                        method: 'PUT',
                    };
                    fetch(url, requestOptions)
                        .then(async (response) => {
                            setPurchaseComplete(true);
                            handleClearCart(dataUser);
                            getPanier(dataUser)
                            getCartProducts()
                            

                        })
                        .catch(error => {
                            throw new Error('Failed to update shopping cart');
                        });
                        
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div>
            {purchaseComplete ? (
                <div>
                    <h1>Votre Commande passé avec succes</h1>
                </div>
            ) : (
                <div>  
                    <DropIn
                        options={{ authorization: "sandbox_q7nc2w95_6hjmcbvghc9srkkf" }}
                        onInstance={(inst) => {(instance = inst);setInst(inst)}}
                    />
                    <Button label={"Submit"} outline small onClick={buy} />
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
