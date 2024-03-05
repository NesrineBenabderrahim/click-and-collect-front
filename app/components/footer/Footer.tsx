
import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'
import {MdFacebook} from "react-icons/md";
import { AiFillInstagram, AiFillTrademarkCircle, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='bg-gray-800 text-slate-200 text-sm '>
        <Container>
            <div className='  justify-between  pt-5 pb-2'>
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Téléchargez notre application</h3>
                        <Link href="https://play.google.com/store/apps/details?id=com.softavera.pizzatime&hl=ln">
                            <Image  src="https://www.commande-pizzatime.fr/CESARWEB_WEB/play_store-icon.png"  alt="play_store"  width={"120"} height={"120"} />
                        </Link>
                        <Link href="https://apps.apple.com/us/app/pizza-time-france/id1556496063">
                            <Image  src="https://www.commande-pizzatime.fr/CESARWEB_WEB/app_store_icon.png"  alt="app_store"  width={"120"} height={"120"} />
                        </Link>
                    <h3 className='text-base  mb-2'>Mentions légales</h3>
                    <h3 className=''>Politique de confidentialité</h3>
                    <h3 className=''>CGV</h3>
                    <h3 className=''>CGU</h3>   
                </FooterList>
                <FooterList>
                    <h3 className='text-base font-bold mb-2'>Suivez-nous</h3>
                    <div className='flex gap-1'>
                        <Link href="#">
                            <MdFacebook size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillInstagram size={24}/>
                        </Link>
                    </div>
                    
                        <p>Tous droits réservés - &copy; {new Date().getFullYear()} V3.1</p>
                        <p className='text-sm'>Softavera N°1 des solutions d'encaissement, caisse tactile, borne de commande, click & collect site web commande en ligne...,plus d’infos :</p><Link href="www.softavera.fr">www.softavera.fr</Link>

                </FooterList>

                
            </div>
        </Container>
        </div>
    )
}

export default Footer
