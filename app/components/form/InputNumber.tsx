    import React, { useEffect } from 'react';
    import styled from '@emotion/styled';
    import useCard from '@/app/hooks/useCard';
    import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";


    interface NumberControlProps {
    value: number;
    onChange:(n:number)=>void
    data?:any
    }

    // Styled Components for customization if needed
    const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2px;
    `;


    export default function NumberControl({ value,onChange,data }: NumberControlProps): JSX.Element {
    const handleIncreaseClick = () => {
        const updatedValue = value + 1;
        onChange(updatedValue);
    };

    const handleDecreaseClick = () => {
        const updatedValue = Math.max(value - 1, 0);
        onChange(updatedValue);
    };

    const {HandleCartQtyIncrease,HandleCartQtyDecrease,getData,dataUser}=useCard()
    useEffect(()=>{
        getData(); 

    },[])
    
    return (
        <>
        <ButtonContainer>
            <FaSquareMinus  onClick={data===undefined?   handleDecreaseClick  :()=>{HandleCartQtyDecrease(data,dataUser)}} className='mt-2' size={25}/>
            <input
            type='number'
            style={{ width: '40px', textAlign: 'center' }}
            value={value}
            readOnly
            />
            <FaSquarePlus onClick={data===undefined? handleIncreaseClick :()=>{HandleCartQtyIncrease(data,dataUser)}} className='mt-2'  size={25} />
        </ButtonContainer>
        </>
    )
    }
