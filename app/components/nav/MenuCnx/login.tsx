"use client";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";


import useCard from "@/app/hooks/useCard";
import Button from "../../form/Button";
import Input from "../../form/Input";
import { toast } from "react-toastify";



interface LoginProps {
handleMenu: () => void;
handleSignup: () => void;
isLoading: boolean;
setIsLoading: (val: boolean) => void;
setIsSignup: (val: boolean) => void;
setIsMotdepasseoublié: (val: boolean) => void;
setIsConditionsGénéralesUtilisation: (val: boolean) => void;
setIsConditionsGénéralesVente: (val: boolean) => void;
setIsPolitiqueConfidentialité: (val: boolean) => void;
setType: (val: string) => void;
email:string;
setEmail:Function
password:string
setPassword:Function
}
const Login: React.FC<LoginProps> = ({
handleMenu,
handleSignup,
isLoading,
setIsLoading,
setIsSignup,
setIsMotdepasseoublié,
setIsConditionsGénéralesUtilisation,
setIsConditionsGénéralesVente,
setIsPolitiqueConfidentialité,
setType,
email,
setEmail,
password,
setPassword,
}) => {




const {
register,
handleSubmit,
formState: { errors },
} = useForm<FieldValues>({
defaultValues: {
    email: "",
    password: "",
},
});
const { getData,dataUser } = useCard();
const[jsonData,setjsonData]=useState<any>(null)
  

async function handleGoogle(){
    try {
        const response = await fetch('http://localhost:8080/api/user/auth/google/callback', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            credentials: 'include', // Include cookies in the request
            });
        
            const data = await response.json();
        
            console.log(data);
        } catch (error) {
            console.error("get panier error", error);
        }
}




function handleMotdepasseoublié() {
    setIsMotdepasseoublié(true);
    setIsLoading(false);
    setType("Mot de passe oublié");
    }

function handleConditionsGénéralesUtilisation() {
    setIsConditionsGénéralesUtilisation(true);
    setIsLoading(false);
    setType("Conditions Générales d’Utilisation (CGU)");
    }

function handleConditionsGénéralesVente() {
    setIsConditionsGénéralesVente(true);
    setIsLoading(false);
    setType("Conditions Générales de vente (CGV)");
    }
function handlePolitiqueConfidentialité() {
    setIsPolitiqueConfidentialité(true);
    setIsLoading(false);
    setType("Politique de confidentialité");
    }


const onSubmit: SubmitHandler<FieldValues> = async (data) => {
setIsLoading(true);
const res = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
});
console.log({res})
const jsonData = await res.json();
setjsonData(jsonData)
console.log({jsonData})
if(jsonData.message === "success"){
    getData();
    handleMenu();
}
if(jsonData.message === "votre email est incorrecte"){
    toast.error("votre email est incorrecte")
}
if(jsonData.message === "votre email est incorrecte"){
    toast.error("votre mot de passe est incorrecte")
}

};



return (
<>
    <div>
    <div  className="p-2 border-b-[1px] items-center">
        <p className="text-center text-md" onClick={handleGoogle}>se connecter avec</p>
        <div className="flex gap-4 justify-center justify-content">
        <Link href="http://localhost:8080/api/user/google">
        <FcGoogle size={30} className="rounded-full m-4 cursor-pointer transition hover:scale-105" />
        </Link>
        <p className="pt-4">ou</p>
        <Link href="http://localhost:8080/api/user/facebook">
        <SiFacebook  size={30} className="rounded-full bg-bleu-200 m-4 cursor-pointer transition hover:scale-105 "/>
        </Link>
        </div>
    </div>
    <Input
    id="email"
        required
        register={register}
        errors={errors}
        type="email"
        value={email}
        onChange={(e:any)=>setEmail(e.target.value)}
        placeholder="Saisissez votre e-mail"
        label="E-mail"
        Icon={MdOutlineMarkEmailRead}
    />
    <Input
        id="password"
        required
        register={register}
        errors={errors}
        type="password"
        value={password}
        onChange={(e:any)=>setPassword(e.target.value)}
        placeholder="Saisissez votre mot de passe"
        label="Mot de passe"
        Icon={PiLockKeyThin}
    />
    {jsonData?.error  &&  <p className="text-red-500 px-2">{jsonData?.error.message}</p>}
    </div>
    <div className=" text-right  text-m text-black underline w-full">
    <button onClick={handleMotdepasseoublié} className="underline">
    Mot de passe oublié !
    </button>
    </div>
    <div className="w-full p-5">
    <Button
        label={isLoading ? "Loading" : "Connexion"}
        onClick={handleSubmit(onSubmit)}
    />
    </div>
    <h1 className="w-full text-center">Ou</h1>
    <div className=" text-center  text-xl p-2 text-black underline w-full">
    <button onClick={handleSignup} className="underline">
        Inscription
    </button>
    </div>

    <p className="text-sm text-black pl-2 pt-4">
    En continuant, vous acceptez nos :
    </p>
    <div className=" h-20 p-4  ">
    <p className="text-m text-black underline mt-2">
    <button onClick={handleConditionsGénéralesUtilisation} className="underline">
    Conditions Générales d'Utilisation
    </button>
        
    </p>
    <p className="text-m text-black underline mt-2">
    <button onClick={handleConditionsGénéralesVente} className="underline">
    Conditions Générales de Vente
    </button>
    </p>
    <p className="text-m text-black underline mt-2 mb-2">
    <button onClick={handlePolitiqueConfidentialité} className="underline">
    Politiques de Confidentialité
    </button>
    </p>
    </div>
</>
);
};

export default Login;
