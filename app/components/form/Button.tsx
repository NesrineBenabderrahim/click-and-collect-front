'use client'

import { IconType } from "react-icons";

interface ButtonProps{
    label:string,
    disabled?:boolean,
    outline?:boolean,
    small?:boolean,
    custom?:string,
    type?:string,
    href?:string,
    Icon?:IconType,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>) =>void
    
}
const Button :React.FC<ButtonProps> = ( 
    {label,
    disabled,
    outline,
    href,
    small,
    custom,

    onClick}) => {

    return ( <button
        onClick={onClick}
        disabled={disabled} 
        className={`disabled:opacity-70   disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-gray-700 flex item-center justify-center gap-2
            ${outline? "bg-white":"bg-gray-700"}
            ${outline? "text-slate-200": "text-white"} 
            ${small? "text-sm font-light":"text-md font-semibold"}
            ${small? "py-1 px-2 border-[1px]":"py-3 px-4 border-2"}
            ${custom? custom :''}
            `}>
        
        {label}
    </button> );
}

export default Button;