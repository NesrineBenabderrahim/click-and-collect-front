"use client"
import { useRouter } from "next/navigation";
import { MdGpsFixed } from "react-icons/md";

const SearchInput = () => {
    const router= useRouter()
    return ( 
    <div className="flex gap-0 w-full">
    <input className="border-[1px] border-slate-400  w-full rounded-sm  text-sm p-2 item-center justify-center  md:item-center" type="text" placeholder="Saisisser votre adresse,code postale ou ville"/>
    <MdGpsFixed size={40}  className="border-[1px]  bg-slate-300 w-[10%] rounded-md p-2 "  onClick={()=>router.push("/map")}/>
</div> );
}

export default SearchInput;