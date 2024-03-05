'use client'
import Image from "next/image";
import Container from "../Container";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { useCallback, useState } from "react";
import FormCnx from "./FormCnx";
import CartCount from "./CartCount";

interface NavBarProps{
    isClick?:boolean
}
const NavBar : React.FC<NavBarProps> = ({isClick}) => {
    const[isClicked,setIsClicked]= useState(isClick)

    function handleMenu (){
        setIsClicked(true);
    }


    return ( 
        <>
        {isClicked ? <>
        <FormCnx /> 

</>
: 

        <div className='  top-0 w-full   border-b-[2px]  px-10  border-b-slate-200  shadow-sm flex item-center justify-between  md:gap-12  '>

                <Container>
                
                    <div className='grid grid-cols-3  w-full items-center justify-between gap-4  right-0 left-0'>
                        
                            <div >
                                <Link href="/"  >           
                                <Image  src="/logo.png"  alt="logo"  width={"120"} height={"120"} />
                                </Link>
                            </div>
                            <div className=" w-full mb-4  px-10">
                            <CartCount />
                            </div>
                            <button  onClick={handleMenu}>
                                <MdMenu size={35} className="border-[2px] mt-2  border-slate-800 cursor-pointer rounded-md p-0.8"/>
                            </button>
                    </div>
            </Container>
            </div>
}
        
        </>
    )
}

export default NavBar;