import { useRouter } from "next/navigation";
import {  LuUserCircle2 } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


import useCard from "@/app/hooks/useCard";

interface CompteProps {
handleMenu?: () => void;
}

const Compte: React.FC<CompteProps> = ({  }) => {
const { getData,handleClearCart,dataUser } = useCard();
const router = useRouter();
const HandleLogout = async () => {
    
    await fetch("http://localhost:8080/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    });
    localStorage.setItem("CartItem",JSON.stringify(null))        
    await getData();
    // handleMenu();
    await handleClearCart(dataUser)
    await router.push("/");

};

return (
    <div className="grid flex-row-6  gap-5  p-4">
    <div
        className="flex gap-4 cursor-pointer"
        onClick={() => {
        router.push("/profile");
        }}
    >
        <LuUserCircle2 size={30} />
        <p className="text-2xl">Profile</p>
    </div>
    <div className="flex gap-4 cursor-pointer"
        onClick={() => {
            router.push("/commandes");
            }}>
        <TbShoppingBagCheck size={30} />
        <p className="text-2xl">Mes Commandes</p>
    </div>
    {(dataUser?.role === "admin" || dataUser?.role === "restaurant_owner" )&&
    <div className="flex gap-4 cursor-pointer"
        onClick={() => {
            router.push("/admin");
            }}>
        <MdOutlineAdminPanelSettings size={30} />
        <p className="text-2xl">Espace Admin</p>
    </div>}
    <div className="flex gap-4" onClick={HandleLogout}>
        <RiLogoutCircleLine size={30} />
        <p className="text-2xl">Déconnexion</p>
    </div>
    </div>
);
};

export default Compte;
