"use client";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaUserCircle } from "react-icons/fa";
import useCard from "@/app/hooks/useCard";
import toast from 'react-hot-toast';
import Compte from './MenuCnx/compte';
import Signup from './MenuCnx/signup';
import Login from './MenuCnx/login';
import Motdepasseoublié from './MenuCnx/Motdepasseoublié';
import ConditionsGénéralesUtilisation from './MenuCnx/ConditionsGénéralesd\'Utilisation';
import ConditionsGénéralesdevente from './MenuCnx/Conditions Généralesdevente';
import PolitiqueConfidentialité from './MenuCnx/Politiquedeconfidentialité';
import { MdMenu } from 'react-icons/md';


interface FormCnxProps{
    setShowMenuCnx?:Function  |undefined
    showMenuCnx?:boolean
}

const Signin:React.FC<FormCnxProps> = ({setShowMenuCnx,showMenuCnx}) => {
    let [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState("Connexion");
const [isSignup, setIsSignup] = useState(false);
const [isMotdepasseoublié, setIsMotdepasseoublié] = useState(false);
const [isModifierMotdepass, setIsModifierMotdepass] = useState(false);
const [isConditionsGénéralesUtilisation, setIsConditionsGénéralesUtilisation] = useState(false);
const [isConditionsGénéralesVente, setIsConditionsGénéralesVente] = useState(false);
const [isPolitiquesConfidentialité, setIsPolitiquesConfidentialité] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isClicked, setIsClicked] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { dataUser } = useCard();

useEffect(() => {
    if (dataUser) {
        setType("Mon compte");
    }
    }, [dataUser]);


//close inscription Menu to connex
function handleMenuCnx() {
    setIsSignup(false);
    setIsMotdepasseoublié(false)
    setIsModifierMotdepass(false)
    setIsConditionsGénéralesUtilisation(false)
    setIsConditionsGénéralesVente(false)
    setIsPolitiquesConfidentialité(false)
    setIsLoading(false);
    setType("Connexion");
    
    }
    
    toast.error("Veuillez vous connecter");
    
    function handleSignup() {
        setIsSignup(true);
        setIsLoading(false);
        setType("Inscription");
        }
    

    const handleMenu = () => {
        setIsOpen(false)
        if (typeof showMenuCnx !== 'undefined' && showMenuCnx) {
            {setShowMenuCnx && setShowMenuCnx(false)}
        }
    }
    const openModal = () => {
        setIsOpen(true)
        
    }


    return (
        <>
            {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className='hidden md:block'>
                    <button type="button" className='flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink' onClick={openModal}>
                    <MdMenu
                size={50}
                className="text-slate-400 mt-2   border-rounded  cursor-pointer rounded-md  "
                    />
                    </button>
                </div>
            </div> */}
            <div className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className=''>
                    <button type="button" className='flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink' onClick={openModal}>
                        Se connecter
                    </button>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={handleMenu}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">

                                {isClicked &&
                                <div  className='' >
        <div className="flex w-full justify-content py-3">
        <button
            onClick={type === "Inscription" || type === "Mot de passe oublié" || type === "Conditions Générales d’Utilisation (CGU)" || type === "Conditions Générales de vente (CGV)"|| type === "Modifier votre Mot de passe"
            ? handleMenuCnx : handleMenu}
        >
            <FaChevronLeft size={20} className="pt-1 mt-1" />
        </button>
        <h1 className="text-2xl font-semibold w-full text-center">
            {type}
        </h1>
        </div>
        <hr className="w-[100%] my-2 " />
        <div className="flex-grow  justify-content-between">
        {!dataUser?.error ? (
            <Compte handleMenu={handleMenu} />
        ) : (
            <>
            {isSignup && (
                <Signup
                handleMenuCnx={handleMenuCnx}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                />
            )} 
            {!isSignup && !isMotdepasseoublié &&  !isConditionsGénéralesUtilisation && !isConditionsGénéralesVente && !isPolitiquesConfidentialité && (
                <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleMenu={handleMenu}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleSignup={handleSignup}
                setIsSignup={setIsSignup}
                setIsMotdepasseoublié={setIsMotdepasseoublié}
                setIsConditionsGénéralesUtilisation={setIsConditionsGénéralesUtilisation}
                setIsConditionsGénéralesVente={setIsConditionsGénéralesVente}
                setIsPolitiqueConfidentialité={setIsPolitiquesConfidentialité}
                setType={setType}
                />
            )}
            {isMotdepasseoublié && (
                <Motdepasseoublié
                handleSignup={handleSignup}
                handleMenuCnx={handleMenuCnx}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setemail={setEmail}
                setPassword={setPassword}
                />
            )}
            {isConditionsGénéralesUtilisation && (<ConditionsGénéralesUtilisation />)}
            {isConditionsGénéralesVente && (<ConditionsGénéralesdevente />)}
            {isPolitiquesConfidentialité && (<PolitiqueConfidentialité />)}

            </>
        )}
        </div>
        <div className=" bg-white  h-[10%]  w-full opacity-75  text-center p-2 ">
        <p className=" flex text-sm  underline  justify-center p-2">
            <Link href="">Mention légales</Link>
        </p>
        </div>
    </div>}
    </div></div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Signin;
