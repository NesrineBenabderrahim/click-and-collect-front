"use client";
import { LuUserCircle2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { MdArrowBack} from "react-icons/md";
import { useRouter } from "next/navigation";

import Container from "../components/Container";
import useCard from "../hooks/useCard";
import Address from "./Address";
import Cartes from "./Cartes";
import { formatPrice } from "../utils/formatPrice";
import Commandes from "./Commandes";
import InputButton from "../components/form/InputButton";
import InfoUser from "./InfoUser";
import { Fade } from "react-awesome-reveal";

const Profile = () => {
const {
    selectedShoplist,
    dataUser,
    cartProducts,
    cartTotalAmount,
} = useCard();


const [selectedProductData, setSelectedProductData] = useState({});

const router = useRouter();
useEffect(() => {
    setSelectedProductData(
    localStorage.getItem("selectedProductData") !== null
        ? JSON.parse(localStorage.getItem("selectedProductData") ?? "{}")
        : {}
    );
}, []);

//console.log({ dataUser });

return (
    <div className="bg-gray-100 pt-[10%]  pb-32">
    {/* <Banner /> */}

    {/* <HomePhoto data={selectedProductData} /> */}
    <Container>
        <div className="flex justify-between p-2 " id="about-section">
        <div className="px-4 m-8">
            <Fade
            direction={"up"}
            delay={400}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
                <div className="flex gap-8 p-b-8">
                    <LuUserCircle2 size={50} />
                    <h3 className="text-3xl lg:text-5xl font-semibold text-lightgrey">
                        Bonjour {dataUser?.nom}
                    </h3>
                </div>
            
            </Fade>
        </div>
        </div>

        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="col-span-1  sm:w-[120%]  md:w-[130%] lg:w-[130%] xl:w-[130%]">
        <Fade
            direction={"up"}
            delay={500}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <InfoUser />
        </Fade>
        <Fade
            direction={"up"}
            delay={600}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <Address />
        </Fade>
        <Fade
            direction={"up"}
            delay={700}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <Cartes />
        </Fade>
        </div>
    
        <div className="col-span-1 w-[100%] justify-self-center sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%] md:justify-self-end lg:justify-self-end xl:justify-self-end ">
        <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <div className=" relative justify-content border-[1.2px] border-slate-400 bg-slate-800   text-white shadow-md  rounded-xl ml-4 mt-4 mr-4 mt-1  ">
            <div className="flex p-2 justify-between ">
                <div className="flex gap-1">
                <p className="w-[200px]">Total Commande</p>
                </div>
                <div>
                <span>{formatPrice(cartTotalAmount)}</span>
                </div>
            </div>
            </div>
        </Fade>
        <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <div className=" relative justify-content border-[1.2px]  border-slate-400 bg-slate-800   text-white shadow-md  rounded-t-xl ml-4 mr-4 mt-4 ">
            <div className="grid flex-row p-2 justify-between ">
                <div className="flex gap-1 ">
                <p className="">Panier</p>
                </div>
            </div>
            </div>
        </Fade>
        <Fade
            direction={"up"}
            delay={800}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            <div className=" relative justify-content border-b-[1.2px]  border-l-[1.2px] border-r-[1.2px] border-slate-400 bg-white  shadow-md  rounded-b-xl ml-4 mr-4 mb-4">
            <div className="grid flex-row p-2 justify-between ">
                {cartProducts ? (
                cartProducts.map((item: any, i:any) => {
                    return (
                    <div key={i}>
                        <Commandes item={item} />
                    </div>
                    );
                })
                ) : (
                <div className="p-2">
                    <div
                    onClick={() => {
                        selectedShoplist === undefined
                        ? router.push(`/`)
                        : router.push(`/menu/1`);
                    }}
                    className="text-slate-500 cursor-pointer flex items-center gap-1 mt-2"
                    >
                    <MdArrowBack />
                    <span>Start Ordering</span>
                    </div>
                </div>
                )}
            </div>
            </div>
        </Fade>
        </div>
        </div>
    </Container>
    </div>
);
};

export default Profile;
