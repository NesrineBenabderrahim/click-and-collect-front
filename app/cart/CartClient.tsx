'use client'

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "./Heading";
import Button from "../components/form/Button";
import { formatPrice } from "../utils/formatPrice";
import ItemCentent from "./ItemCentent";
import useCard from "../hooks/useCard";



const CartClient = () => {
    const {handleClearCart,cartTotalAmount,cartProducts} = useCard()
    const selectedProductId = localStorage.getItem("selectedProductId")!==null?JSON.parse(localStorage.getItem("selectedProductId")??'{}'):{}

    

    if (!cartProducts || cartProducts.length === 0){
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link href={`/product/${selectedProductId.Id}`} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Ordering</span>
                    </Link>
                </div>
            </div>
        );
    }

    
    return ( 
    <>
        <Heading  title="Ordering Cart" center />
        <div className="grid grid-cols-6 text-xs font-semibold gap-4 pb-2 items-center mt-8">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className="justify-self-center">PRICE</div>
            <div className="justify-self-center">QUANTITY</div>
            <div className="justify-self-end">TOTAl</div>
        </div>
        <div>
        {cartProducts && 
            cartProducts.map((item:any)=>{
                return <ItemCentent  item={item} />
            })}
        
        
        </div>
        <div className=" border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[90px]">
                <Button  label="Clear Cart"  onClick={()=>{handleClearCart()}} small  />

            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <p className="text-slate-500">
                        Taxes and shipping calculate at checkout
                    </p>
                    <Button label="Checkout" onClick={()=>{}} />
                    <Link href={`/product/${selectedProductId.Id}`} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
    </>
    );
}

export default CartClient;