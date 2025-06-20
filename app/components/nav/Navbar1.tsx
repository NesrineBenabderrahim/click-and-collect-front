"use client";
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signindialog from './Signindialog';
import Image from 'next/image';
import CartCount from './CartCount';
import useCard from '@/app/hooks/useCard';
import { MdMenu } from 'react-icons/md';
import { useRouter } from 'next/navigation';




interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Accueil', href: '#home-section', current: false },
    { name: 'Nos restaurants', href: '#about-section', current: false },
    { name: 'Nos galerie', href: '#gallery-section', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const {dataUser} = useCard()
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter()

    return (
        <Disclosure as="nav" className="navbar ">
            <div className='fixed top-0 left-0 right-0 bg-white w-full h-[15%] shadow-md shadow-rounded-lg shadow-black z-20'>
                <div className=" mx-auto max-w-7xl p-3 md:p-6 lg:px-8">
                    <div className=" flex h-10 sm:h-15 items-center justify-between">
                        <div className="flex gap-2 sm:flex-1 md:flex-1  lg:flex-1 xl:flex-1  items-center justify-between">

                            {/* LOGO */}

                            <div className="flex sm:hidden flex-shrink-0 items-center border-right cursor-pointer" onClick={()=>router.push("/")}>

                                <Image src="/logo.png" alt="logo" width={80} height={80} style={{ width: "auto" }} />
                            </div>
                            <div className="hidden sm:flex  flex-shrink-0 items-center border-right cursor-pointer" onClick={()=>router.push("/")}>
                                <Image src="/logo.png" alt="logo" width={120} height={120} style={{ width: "auto" }} />
                            </div>

                            {/* LINKS */}

                            <div className="hidden lg:flex items-center border-right ">
                                <div className="flex justify-end space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-black' : 'navlinks hover:opacity-100',
                                                'px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links'
                                            )}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        <div className='pb-2' >
                        <CartCount  />
                        
                        </div>
                        {/* <button className='flex justify-end text-xl font-medium bg-bgpink text-pink py-4 px-4 lg:px-8 navbutton rounded-full hover:text-black'>Sign in</button> */}
                        <div>
                        {!dataUser?.error  ? 
                        ""
                        : 
                            <Signindialog />
                        }
                        </div>
                        </div>

                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}
                        {!dataUser?.error ? <>

                        <div className='' onClick={() => setIsOpen(true)}>
                                <MdMenu
                        size={50}
                        className="text-slate-400 mt-2   border-rounded  cursor-pointer rounded-md  "
                            />
                        </div>

                        {/* DRAWER LINKS DATA */}

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>

                        

                        </>


                        : "" }

                    </div>
                </div>
            </div>
        </Disclosure>
    )
}

export default Navbar;
