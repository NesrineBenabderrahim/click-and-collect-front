import React from 'react';
import { Modal } from 'antd';
import Button from '../components/form/Button';



interface ComfirmationProps{
    Open:boolean
    onClose:()=>void
    data?:any
    action:()=>void
}

const Comfirmation: React.FC<ComfirmationProps>= ({ Open,onClose,action,data}) => {
    if (!Open) return null

    return (
        <>
        <Modal
            open={Open}
            title="Modes de retrait"
            onCancel={onClose}
            footer={[
        
            <Button
                label='Valider  '
                key="link"
                href=""
                onClick={()=>{action();onClose()}}
            />
            ]}
        >
        <div>Supprimer cet element</div>
        </Modal>
        </>
    );
    };

export default Comfirmation;