"use client";
import { Fade } from "react-awesome-reveal";
import Container from "./components/Container";
import ProductCart from "./components/product/ProductCart";
import Map from "./components/Map";
import Banner from "./components/Banner";
import Gallery from "./components/Gallery";
import MenuCart from "./cart/MenuCart";
import { Chatbox } from "./components/Chat Bot/base";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <MenuCart />
      <Chatbox />
      <Map />
      <Container>
        <div className="grid grid-cols-1 item-center lg:gap-12 item-center justify-between">
          <div>
            <div className="mx-auto max-w-7xl py-2 px-6 pt-[6%]" id="about-section">
              <div className="px-4 mb-4">
                <Fade direction={"up"} delay={400} cascade damping={1e-1} triggerOnce={true}>
                  <h3 className="text-3xl lg:text-5xl font-semibold text-lightgrey">
                    Nos restaurants à proximité
                  </h3>
                </Fade>
              </div>
              <ProductCart />
            </div>
          </div>
        </div>
        <Gallery />
      </Container>
    </div>
  );
}
