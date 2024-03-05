"use client"

import { IconType } from "react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface InputProps{
    id:string,
    type?:string ,
    placeholder:string
    label?:string,
    disabled?:boolean,
    required?:boolean,
    register: UseFormRegister<FieldValues>,
    errors :FieldErrors
    Icon?:IconType,
}
const Input :React.FC<InputProps>= ({
    id,type,placeholder,label, disabled,
    required,
    register,
    errors,
    Icon}) => {
    return ( 
        <div className=" px-2">
            <label  className="p-2 text-sm">{label}</label>
            <div className="flex relative gap-0 h-full">
                {Icon && <Icon size={30} className="absolute border-slate-200 p-1 mt-3"/>}
                <input 
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...register(id,{required})}
                type={type}
                placeholder={placeholder}
                className={` border-b-[2px] border-b-gray-200 pl-8 text-m w-full p-4 text-gray-200 mb-4 
                ${errors[id]? 'focus:border-rose-400':'border-slate-300'}`}
                

            />    
            </div>
        </div>
    );
}

export default Input;