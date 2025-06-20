"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import useCard from "@/app/hooks/useCard";
import { Fade } from "react-awesome-reveal";

const ProductCart = () => {
  const router = useRouter();
  const { card, selectedShoplist } = useCard();

  let filteredCategories:any
  if (card) {
    filteredCategories = card.categories.filter((item: any) =>
      item.shopParent.includes(selectedShoplist.Company)
    );
  }

  const daysMap = ["DIMANCHE", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"];

  const getCurrentDayHoraires = (data:any) => {
    const currentDay = new Date().getDay(); // Get the current day as a number (0-6)
    const currentDayName = daysMap[currentDay]; // Map the number to the corresponding day name
    return data && data.horaire && data.horaire[currentDayName];
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

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-20'>
      <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
      {card && card.shoplist
          .sort((a:any, b:any) => a.id - b.id) 
          .map((data:any, i:any) => {
          const currentHoraires = getCurrentDayHoraires(data);
          const isCurrentlyOpen = currentHoraires && 
            (isOpen(currentHoraires.firstStart, currentHoraires.firstEnd) || 
            isOpen(currentHoraires.secondStart, currentHoraires.secondEnd));

          return (
            <div className='card-b relative rounded-3xl bg-gray-100' key={i}>
              <div className="flex flex-col gap-2 h-[400px] justify-between">
                <div className="aspect-square overflow-hidden relative w-full h-[50%] rounded-3xl">
                  <Image
                    fill
                    src={data.image}
                    alt=""
                    sizes="(max-width: 600px) 100vw, 600px"
                    onClick={() => {
                      localStorage.setItem("selectedShoplist", JSON.stringify(data));
                      router.push(`/menu/${filteredCategories[0].id}`);
                    }}
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2 justify-between text-[15px] font-semibold px-1 w-full text-green-600"></div>
                  <div className="text-[15px] font-semibold px-1 text-center">{data.Company}</div>
                  <div className={isCurrentlyOpen ? `text-[15px] font-semibold px-1 text-center text-green-600` : 'text-[15px] font-semibold px-1 text-center text-red-600'}>
                    {isCurrentlyOpen ? 'Ouvert' : 'Fermé'}
                  </div>
                  <div className="px-1 text-[15px] text-center">
                    <div>{data.Address}, {data.PostalCode} {data.town}</div>
                  </div>
                </div>
                <div className=''>
                  <div onClick={() => {
                    localStorage.setItem("selectedShoplist", JSON.stringify(data));
                    router.push(`/menu/1#about-section`);
                  }}>
                    <p className='flex items-center justify-center text-center text-lg font-medium text-red-500 p-4 cursor-pointer hover-scale-200'>
                      Consulter <ChevronRightIcon width={20} height={20} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Fade>
    </div>
  );
};

export default ProductCart;
