"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { card } from "../utils/products";
import toast from "react-hot-toast";

type  CartContextType={
    selectedElCategorie:any,
    selectedIdShopList:any,
    IdShopList:string,
    IdCategorieList:string,
    IdCategorieEl:string,
    CategorieObject:any,
    cartTotalQty :number;
    cartTotalAmount:number;
    cartProducts:any;
    setSelectedIdShopList:()=>any
    setSelectedIdCategirie:()=>any
    getSelectedIdShopList:(params:any)=>any
    getIdShopList:(el:any)=>any
    getIdCategorieList:(el:any)=>any
    getSelectedIdCategorieList:(params:any)=>any
    getCategorieById:(id:any)=>any
    handleAddProductToCart:(product:any)=>void
    handleClearCart:()=>void
    HandleCartQtyIncrease:(product:any)=>void
    HandleCartQtyDecrease:(product:any)=>void
    
}

export const CardContext = createContext<CartContextType| null >(null);


export const CardProvider = (props:any)=>{
    const [selectedElCategorie,setSelectedElCategorie]=useState()
    const [selectedIdShopList,setSelectedIdShopList]=useState()
    const [IdShopList,setIdShopList]=useState<string|undefined>()
    const [IdCategorieList,setIdCategorieList]=useState<string|undefined>()
    const [IdCategorieEl,setIdCategorieEl]=useState<string|undefined>()
    const [cartProducts,setCartProducts]=useState<any[] | null>(null)
    const[CategorieObject,setCategorieObject]=useState()
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartTotalAmount,setCartTotalAmount]=useState(0)

//get List of item in cart
    useEffect(()=>{
        const cartItems: any = localStorage.getItem('CartItem')
        const cProducts: any[] | null = JSON.parse(cartItems)
    
        setCartProducts(cProducts)
    },[])
//get  totalAmount and total quantity
    useEffect(()=>{
        
        const getTotals =()=>{
            if(cartProducts){
                const {total,qty} = cartProducts?.reduce((acc, item)=>{
                const itemTotal = item.data.price.default * item.quantity
                acc.total += itemTotal 
                acc.qty +=item.quantity
                return acc
            },{
                total:0,
                qty:0
            })
            setCartTotalQty(qty)
            setCartTotalAmount(total)
        }
        }
        getTotals()
    },[cartProducts])

//get id and product from params (shoplist)
    const getSelectedIdShopList=useCallback((params:any)=>{
                for (let item in Object.keys(card.shoplist)) {
                    let  selectedProduct:any
                    if (JSON.stringify((Object.keys(card.shoplist)as any)[item]) === JSON.stringify(params.productId) ) {
                        selectedProduct  =  Object.values(card.shoplist as any)[item]
                        setSelectedIdShopList(selectedProduct)
                        localStorage.setItem("selectedProductData",JSON.stringify(selectedProduct))
                    }
                }
                setIdShopList(params.productId)
                localStorage.setItem("selectedProductId",JSON.stringify({"Id":params.productId}))
            },[selectedIdShopList]) 

//get id and product from params (categorielist)
    const getSelectedIdCategorieList=useCallback((params:any)=>{
                for (let item in Object.keys(card.categories)) {
                    let  selectedCategorie:any
                    if (JSON.stringify((Object.keys(card.categories)as any)[item]) === JSON.stringify(params?.productId) ) {
                        selectedCategorie  =  Object.values(card.categories as any)[item]
                        setSelectedElCategorie(selectedCategorie)
                        localStorage.setItem("selectedCategorieData",JSON.stringify(selectedCategorie))
                    }
                }
                setIdCategorieList(params.productId)
                localStorage.setItem("selectedCategorieId",JSON.stringify({"Id":params.productId}))
            },[selectedElCategorie]) 

// get id from object (shopList)
        const getIdShopList=useCallback((el:any)=>{
                let id:string
                for (let item of Object.keys(card.shoplist)) {
                    if (JSON.stringify((card.shoplist as any)[item]) === JSON.stringify(el)) {
                    id = item;
                    setIdShopList(id)
                    }
                }
                
            },[IdShopList])


        // const getIdCategorieList=useCallback((el:any)=>{
        //         console.log({el});
        //         let id:string
        //         for (let item of Object.keys(card.categories)) {
        //             if (JSON.stringify((card.categories as any)[item]) === JSON.stringify(el)) {
        //             setIdCategorieEl(item)
        //             console.log("id",item);
        //             }
        //         }
                
        //     },[IdCategorieList])

//getObject from Id
            const getCategorieById=useCallback((id:any)=>{
                let el:any
                for (let item of Object.keys(card.categories)) {
                    if (item === id) {
                    el = (card.categories as any)[item];
                    setCategorieObject(el)
                    }
                }
                
            },[CategorieObject])

//add product to cart

            const handleAddProductToCart = useCallback((product:any) => {
                setCartProducts((prev:any) => {
            
                    let updatedCart;
                    if (prev) {
                        updatedCart = [...prev, product];
                    }else{
                        updatedCart= [product]
                    }
            
                    toast.success("Product added to cart");
                    localStorage.setItem('CartItem', JSON.stringify(updatedCart));
                    return updatedCart;
                });
            }, []);
            


// Increase quantity
            const HandleCartQtyIncrease = useCallback((product:any)=>{
                console.log({product});
                

                let updatedCart;
        
                if(product.quantity===99){
                    return toast.error("Ooop! Maximum reached")
                }
        
                if(cartProducts){
                    updatedCart  = [...cartProducts]
                
                    const Existingindex =cartProducts.findIndex((item)=> item.data.id === product.data.id 
                                                                    && item.sup === product.sup 
                                                                    && item.checkedItems=== product.checkedItems)
                    if(Existingindex > -1 ){
                        updatedCart[Existingindex].quantity = ++updatedCart[Existingindex].quantity
                    }
                    setCartProducts(updatedCart)
                }
        
                localStorage.setItem('CartItem',JSON.stringify(updatedCart))
                return updatedCart ;
        
            },[cartProducts])
        
// Decrease quantity
            const  HandleCartQtyDecrease = useCallback((product:any)=>{
                let updatedCart;
                console.log({product});
                
                if(product.quantity=== 1){
                    return toast.error("Ooop! Manimum reached")
                }
        
                if(cartProducts){
                    
                    updatedCart  = [...cartProducts]
                    const Existingindex =cartProducts.findIndex((item)=> item.data.id === product.data.id)
                    if(Existingindex > -1 ){
                        updatedCart[Existingindex].quantity = --updatedCart[Existingindex].quantity
                    }
                    setCartProducts(updatedCart)
                }
        
                localStorage.setItem('CartItem',JSON.stringify(updatedCart))
                return updatedCart ;
        
            },[cartProducts])


//clear Cart
            const handleClearCart =useCallback(()=>{
                
                setCartProducts(null)
                setCartTotalQty(0)
                localStorage.setItem("supList",JSON.stringify(null))
                localStorage.setItem("ItemList",JSON.stringify(null))
                localStorage.setItem('CartItem',JSON.stringify(null))
        
            },[cartProducts])
        
        
            
    const value = { 
        selectedElCategorie,
        selectedIdShopList,
        IdShopList,
        //IdCategorieList,
        CategorieObject,
        IdCategorieEl,
        cartTotalQty ,
        cartTotalAmount,
        cartProducts,
        getCategorieById,
        getIdShopList,
        getSelectedIdShopList,
        getSelectedIdCategorieList,
        handleAddProductToCart,
        handleClearCart,
        HandleCartQtyIncrease,
        HandleCartQtyDecrease,
        };
    return <CardContext.Provider  value={value}  {...props} />
}


const useCard = () => {
    const context =useContext(CardContext);

    if(context === null ){
        throw new Error("useCard must used within a CardContextProvider")
    }
    return context
}

export default useCard ;