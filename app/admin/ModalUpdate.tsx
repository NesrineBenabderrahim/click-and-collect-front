import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';


import useCard from '@/app/hooks/useCard';
import Button from '../components/form/Button';
import FormAddPlat from './formAddPlat';
import FormAddCategorie from './formAddCategorie';
import FormAddShop from './formAddShop';
import FormAddUser from './formAddUser';



interface ComfirmationProps{
    Open:boolean
    onClose:()=>void
    Data?:any
    plat:boolean
    categorie:boolean
    shop:boolean
    user:boolean
}

const Update: React.FC<ComfirmationProps>= ({ Open,onClose,Data,categorie,plat,shop,user}) => {
    if (!Open) return null

    const [big,setBig]=useState(true)
    const [loading, setLoading] = useState(false);



    return (
        <>
        <Modal
            open={Open}
            // title="Update"
            onCancel={onClose}
            footer={[
        
            ]}
        >
<div className='w-full'>
{ plat && <FormAddPlat update={true} Data={Data} onCloseModalUpdate={()=>onClose()} /> } 
{ categorie && <FormAddCategorie update={true} Data={Data} onCloseModalUpdate={()=>onClose()}/> }        
{ shop && <FormAddShop update={true} Data={Data} onCloseModalUpdate={()=>onClose()}/> }        
{ user && <FormAddUser update={true} Data={Data} onCloseModalUpdate={()=>onClose()}/> }

</div>

</Modal>

    </>
    );
    };

export default Update;