import Link from "next/link";
import Image from "next/image";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTrademarkCircle, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';



const Footer = () => {
    return (

        <div className="pt-10  max-w-8xl px-8 bg-gray-100 border-t-[1.5] border-slate-400">
            <div className=" grid md:grid-cols-2 lg:grid-cols-2 m-12">

                {/* COLUMN-1 */}

                <div className=' pt-4 '>
                    <div className="flex flex-shrink-0 items-center border-right ">
                        <Image src="/logo.png" alt="logo" width={56} height={56} />
                        <Link href="/" className='text-2xl font-semibold text-black ml-4'>
                            Pizza Time
                        </Link>
                    </div>
                    <div className="flex gap-8  p-4 pt-4">
                    <Link href="https://play.google.com/store/apps/details?id=com.softavera.pizzatime&hl=ln">
                        <Image  src="https://www.commande-pizzatime.fr/CESARWEB_WEB/play_store-icon.png"  alt="play_store"  width={"120"} height={"120"}  style={{ width: "auto", height: "auto" }}/>
                    </Link>
                    <Link href="https://apps.apple.com/us/app/pizza-time-france/id1556496063">
                        <Image  src="https://www.commande-pizzatime.fr/CESARWEB_WEB/app_store_icon.png"  alt="app_store"  width={"120"} height={"120"} style={{ width: "auto", height: "auto" }} />
                    </Link>
                    </div>
                
                </div>

                {/* CLOUMN-2/3/4 */}
                <div>
                <h3 className='text-textbl text-xs font-medium mt-5 mb-4 lg:mb-16'> Ouvrez un compte en quelques minutes et profitez d'un contrôle financier complet pour bien plus longtemps.</h3>
                                    <div className='flex gap-4  pt-2 '>

                                <div className='flex gap-1'>
                                <Link href="#">
                                        <MdFacebook size={24}/>
                                    </Link>
                                <Link href="#">
                                        <AiFillInstagram size={24}/>
                                    </Link>
                                    <Link href="#">
                                        <AiFillTwitterCircle size={24}/>
                                    </Link>
                                    <Link href="#">
                                        <AiFillYoutube size={24}/>
                                    </Link>
                                </div>

                                    </div>
                </div>



            </div>

            {/* All Rights Reserved */}

            <div className='py-10 md:flex items-center justify-between border-t border-t-bordertop'>
                <h4 className='text-darkgrey text-sm text-center md:text-start font-normal'>Tous droits réservés - &copy; {new Date().getFullYear()} V3.1</h4>
                
                <div className="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
                    <h4 className='text-darkgrey text-sm font-normal'><Link href="/" target="_blank">Privacy policy</Link></h4>
                    <div className="h-5 bg-bordertop w-0.5"></div>
                    <h4 className='text-darkgrey text-sm font-normal'><Link href="/" target="_blank">Terms & conditions</Link></h4>
                </div>
            </div>
        </div>
    )
}


export default Footer;
