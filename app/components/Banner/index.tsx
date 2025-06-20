"use client";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCard from "@/app/hooks/useCard";
import ModalInfo from "../ModalInfo";
import { MdOutlinePayments } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import PhotoModeRetrait from "../PhotoModeRetrait";

const Banner = () => {
    const { card, selectedShoplist, getselectedShoplist, ModeRetrait, getModeRetrait } = useCard();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getselectedShoplist();
        console.log({ selectedShoplist });
    }, [getselectedShoplist]);

    const onClose = () => {
        setShowModal(!showModal);
    };

    const daysMap = ["DIMANCHE", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"];

    const getCurrentDayHoraires = () => {
        const currentDay = new Date().getDay(); // Get the current day as a number (0-6)
        const currentDayName = daysMap[currentDay]; // Map the number to the corresponding day name
        return selectedShoplist && selectedShoplist.horaire && selectedShoplist.horaire[currentDayName];
    };

    const isOpen = (start:any, end:any) => {
        if (!start || !end) return false;
        
        const now = new Date();
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
        
        const startTime = new Date();
        startTime.setHours(startHour, startMinute, 0, 0);
        
        const endTime = new Date();
        endTime.setHours(endHour, endMinute, 0, 0);
        
        return now >= startTime && now <= endTime;
    };

    const currentHoraires = getCurrentDayHoraires();
    const isCurrentlyOpen = currentHoraires && (isOpen(currentHoraires.firstStart, currentHoraires.firstEnd) || isOpen(currentHoraires.secondStart, currentHoraires.secondEnd));

    return (
        <div id="home-section" className="bg-gray-100 pt-28">
            <div className="mx-auto max-w-7xl sm:pb-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1 ">
                    {selectedShoplist && Object.values(selectedShoplist).length > 0 ? (
                        <div className="col-span-6 flex flex-col pt-10 justify-center">
                            <Fade direction={"up"} delay={400} cascade damping={1e-1} triggerOnce={true}>
                                <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                                    {selectedShoplist.Company}
                                </h1>
                            </Fade>
                            <Fade direction={"up"} delay={800} cascade damping={1e-1} triggerOnce={true}>
                                <div className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
                                    {selectedShoplist.Address}, {selectedShoplist.PostalCode} {selectedShoplist.town}
                                    <br />
                                    {selectedShoplist.etat} DE {currentHoraires ? currentHoraires.firstStart : 'N/A'} à {currentHoraires ? currentHoraires.firstEnd : 'N/A'}
                                    {currentHoraires && currentHoraires.secondStart && currentHoraires.secondEnd ? ` ET DE ${currentHoraires.secondStart} à ${currentHoraires.secondEnd}` : ""}
                                    <br />
                                    Actuellement: {isCurrentlyOpen ? 'Ouvert' : 'Fermé'}
                                    <br />
                                </div>
                            </Fade>
                            <Fade direction={"up"} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                                <div className="md:flex align-middle justify-center lg:justify-start">
                                    <ModalInfo Open={showModal} onClose={onClose} data={selectedShoplist} />
                                    <button
                                        className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-sm font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
                                        onClick={() => setShowModal(!showModal)}
                                    >
                                        INFORMATION UTILES
                                    </button>
                                </div>
                            </Fade>
                            <Fade direction={"left"} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                                <div className="pt-10 pb-4">
                                    {ModeRetrait && <PhotoModeRetrait data={selectedShoplist} />}
                                </div>
                            </Fade>
                        </div>
                    ) : (
                        <div className="col-span-6 flex flex-col justify-center">
                            <Fade direction={"up"} delay={400} cascade damping={1e-1} triggerOnce={true}>
                                <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                                    PIZZA TIME
                                </h1>
                                <br />
                                <h1 className="text-3xl lg:text-6xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                                    bienvenue chez nous
                                </h1>
                            </Fade>
                            <Fade direction={"up"} delay={800} cascade damping={1e-1} triggerOnce={true}>
                                <p className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
                                    Découvrez nos pizzas artisanales aux ingrédients frais et savoureux. Partagez des moments délicieux autour de la meilleure pizza en ville.
                                </p>
                            </Fade>
                            <Fade direction={"up"} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                                <div className="md:flex align-middle justify-center lg:justify-start">
                                    <button className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink">
                                        <Link href="#about-section">Explorez maintenant</Link>
                                    </button>
                                </div>
                            </Fade>
                        </div>
                    )}
                    <div className="col-span-6 flex justify-center -mt-4">
                        <Image src="/images/Banner/pizza2.png" alt="nothing" width={900} height={700} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
