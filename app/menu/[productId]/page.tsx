"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSnapshot } from "valtio";
import { Fade } from "react-awesome-reveal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import CategorieCartsmall from "@/app/components/categorie/CategorieCartsmall";
import Container from "@/app/components/Container";
import Banner from "@/app/components/Banner";
import MenuCart from "@/app/cart/MenuCart";
import Gallery from "@/app/components/Gallery";
import { store } from "@/app/hooks/store";
import TopItem from "@/app/components/product/TopItems";

const Menu = () => {
const params = useParams();

const [data, setData] = useState<any>(null);
const { fetchAllStat,stat, card, getDataCard,selectedShoplist,dataUser,getPanier,getTotals} = useCard();
const [isSticky, setIsSticky] = useState(false);
const [showTop, setShowTop] = useState(false);
const { isValidation } = useSnapshot(store);
let filteredCategories :any = []
    if(card){
    filteredCategories = card.categories.filter((item: any) => item.shopParent.includes(selectedShoplist.Company));
}


useEffect(() => {

if (card && !showTop) {
    const selectedCat:any = card.categories.filter(
    (item: any) => item.id === Number(params.productId) 
    );
    setData(selectedCat);
    localStorage.setItem("selectedCategorie", JSON.stringify(selectedCat));
}
}, [params, card,showTop]);

useEffect(() => {
if (!card) {
    getDataCard();
}
}, [card]);


useEffect(() => {
    async ()=>{
        if (dataUser !== null || dataUser?.error?.length < 0 ) {
                    await getPanier(dataUser);
                await getTotals();
            }
    }
        

}, []);
useEffect(() => {
const handleScroll = () => {
    const offset = window.scrollY;
    setIsSticky(offset > 100 && !isValidation);
};

window.addEventListener('scroll', handleScroll);
return () => {
    window.removeEventListener('scroll', handleScroll);
};
}, [isValidation]);

const responsive = {
desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
},
tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3,
},
mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1,
},
};

// console.log({ stat });





return (
<div className="flex flex-col ">
    <Banner />
    <ToastContainer />
    <Container>
    <MenuCart />
    <div id="about-section">
        <div className={`${isSticky ? 'sticky top-[15%] z-10' : ''}`}>
        <div className="shadow-md shadow-rounded-lg shadow-black bg-white w-full">
            {card  && (
            <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {card && filteredCategories
                .sort((a: any, b: any) => a.id - b.id)
                .map((item: any) => (
                    <div key={item.id}>
                    <CategorieCartsmall data={item} setShowTop={setShowTop} />
                    </div>
                ))}
            </Carousel>
            )}
            <div className="text-center p-2 relative">
            <Fade
                direction={"up"}
                delay={400}
                cascade
                damping={1e-1}
                triggerOnce={true}
            >
                <h2 className="text-pink text-lg font-normal m-2 tracking-widest uppercase ls-51">
                Commander chez nous
                </h2>
                <h2 className="text-xl font-bold mb-2 tracking-widest uppercase ls-51">
                {data && data[0]?.title}
                </h2>
                <h2
                className="text-xl text-right font-semibold px-4"
                onClick={() => { setShowTop(true);  }}
                >
                Top 10
                </h2>
            </Fade>
            </div>
        </div>
        </div>
        {showTop ? 
        <TopItem params={params} showTop={showTop} /> : (
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-[15%]">
            <Fade
            direction={"up"}
            delay={500}
            cascade
            damping={1e-1}
            triggerOnce={true}
            >
            {data &&
                data[0].items?.map((item: any,index:any) => (
                <div key={index}>
                    <ProductCategorie
                    data={item}
                    selectedCatId={params.productId}
                    showTop={showTop}
                    />
                </div>
                ))}
            </Fade>
        </div>
        )}
    </div>
    <Gallery />
    </Container>
</div>
);
};

export default Menu;
