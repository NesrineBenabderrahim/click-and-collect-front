import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';


import Button from '../form/Button';
import { card } from '@/app/utils/products';
import InputSupp from '../form/InputSupp';
import useCard from '@/app/hooks/useCard';


interface ProductModalAppProps{
    Open:boolean
    onClose:()=>void
    img:any
    data:any
    CompList?:any
    
}

const ProductModalApp: React.FC<ProductModalAppProps> = ({Open,onClose,img,data,CompList}) => {
    if (!Open) return null

    const [loading, setLoading] = useState(false);
    const [checkedItems, setCheckedItems] = useState({CREMEFRAICHE:true,FROMAGE:true,OIGNON:true});

    const{handleAddProductToCart,HandleCartQtyIncrease,cartProducts}=useCard()

//created suppList in localStorage
    const handleSuppChange=(item:any,SuppItems:any,newCount:any)=>
        {const newCheckedItems:any = {...SuppItems};
        if (newCheckedItems[item.title] === undefined || newCheckedItems[item.title] > 0  ) {
        newCheckedItems[item.title] = newCount;
        }
        localStorage.setItem("supList",JSON.stringify(newCheckedItems))}
        
    
//on validate modal create ItemList{sup,checkedItems,data}  
    const handleValider=()=>{
        let sup1:any=localStorage.getItem("supList")!==null?JSON.parse(localStorage.getItem("supList")??'{}'):{}
        let sup: any = {};
        // ignore the item has 0 value
        for (let item of Object.keys(sup1)) {
            if (sup1.hasOwnProperty(item) && sup1[item] !== 0) {
                sup[item] = sup1[item];
            }
        }

        localStorage.setItem("ItemList",JSON.stringify({sup,checkedItems,data}))
        const Existingindex =cartProducts?.findIndex((item:any)=>  JSON.stringify(item.data) === JSON.stringify(data) //same item
                                                                    && JSON.stringify(item.sup) === JSON.stringify(sup)  //same suppliment List
                                                                    && JSON.stringify(item.checkedItems) === JSON.stringify(checkedItems) ) //same (composant de base )
        
        //add to cart new item 
        if( Existingindex == -1 || cartProducts == null){
            handleAddProductToCart({sup,checkedItems,data,quantity:1})
            localStorage.setItem("supList",JSON.stringify(null))
            localStorage.setItem("ItemList",JSON.stringify(null))
        }else{
        //increase quantity
            HandleCartQtyIncrease(cartProducts[Existingindex])

        }
        setLoading(true)
        onClose()
        }


    return (
        <>
    
        <Modal
            open={Open}
            title= {data.title}
            onCancel={onClose}
            footer={[
        
            <Button
                label='Valider  '
                key="link"
                href=""
                disabled={loading}
                onClick={handleValider}
            />
            ]}
        >
            <div className="flex w-full  justify-center overflow-y-auto h-[400px] font-semibold  text-center mt-8">
                <div className='w-full flex flex-col gap-2 '>
                    <div className='flex w-full  justify-content justify-center'>
                        <Image
                            height={450}
                            width={450}
                            src={img}
                            alt=""
                            
                        />
                    </div>
                    <div className='text-left text-lg '>
                        <p>COMPOSITION DE BASE</p>
                        <FormGroup className='flex gap-2'>
                            {Object.values(CompList).map((item:any)=>
                            
                                <FormControlLabel key={item.title} control={
                                                                        <Checkbox value={item.title} 
                                                                        onChange={e => {
                                                                            const modifiedTitle = item.title ? item.title.replace(/\s/g, '') : '';
                                                                            const newCheckedItems:any = {...checkedItems};
                                                                            if (newCheckedItems[modifiedTitle] === undefined || e.target.checked) {
                                                                            newCheckedItems[modifiedTitle] = true;
                                                                            } else {
                                                                            delete newCheckedItems[modifiedTitle];
                                                                            }
                                                                            setCheckedItems(newCheckedItems);
                                                                        }}
                                                                        defaultChecked />}
                                                                    label={item.title} className='border-[1px] rounded-lg justify-content' />
                                )}
                        </FormGroup>
                    </div>
                    <div className='text-left text-lg '>
                        <p>PIZZA SUPPLEMENTS</p>
                        <p className='text-sm'>Choisissez jusqu'à 9</p>
                        <FormGroup className='flex gap-2'>
                            {Object.values(card.SupplimentComposition)?.map((item:any,index:number)=>
                                    <div key={index}>
                                        <InputSupp item={item} 
                                                index={index}
                                                onchangeList={handleSuppChange}
                                                />
                                    </div>
                                    
                                
                                )}
                        </FormGroup>
                    </div>
                    
                </div>
                
            
            </div>
        </Modal>
        </>
    );
    };

export default ProductModalApp;