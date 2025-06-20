"use client";
import Image from "next/image";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

import FormCnx from "./MenuCnx/FormCnx";
import CartCount from "./CartCount";

interface NavBarProps {
isClick?: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ isClick }) => {
const [isClicked, setIsClicked] = useState(isClick);

function handleMenu() {
    setIsClicked(true);
}

return (
    <>
    {isClicked ? (
        <>
        <FormCnx />
        </>
    ) : (
        <div className="w-full border-b-[2px]  border-b-slate-200 shadow-sm  md:gap-12  ">
        <div className="grid grid-cols-3 items-center justify-between w-full  px-10">
            <div className=" flex  justify-center">
            <Link href="/">
                <Image
                src="/logo.png"
                alt="logo"
                width={"120"}
                height={"120"}
                />
            </Link>
            </div>
            <div className="flex  justify-center w-full mb-4  ">
            <CartCount />
            </div>
            <div className="flex justify-center">
            <MdMenu
                size={35}
                onClick={handleMenu}
                className="border-[2px] mt-2  border-slate-800 cursor-pointer rounded-md  "
            />
            </div>
        </div>
        </div>
    )}
    </>
);
};

export default NavBar;
