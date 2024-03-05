
import Image from "next/image";
import Container from "./components/Container";
import HomePhoto from "./components/HomePhoto";
import { card, products } from "./utils/products";
import ProductCart from "./components/product/ProductCart";
import LocationSearchForm from "./components/form/SearchForm";
import SearchInput from "./components/form/SearchInput";


export default function Home() {

  
  return (
    <div className="">
    <HomePhoto />
    <Container>
      <div className="grid grid-cols-1 p-4 item-center   gap-4 lg:gap-12 pt-2 item-center justify-between">
        <h1 className="text-[20px] ">Nos magasins à proximité</h1>
          <SearchInput />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* {Object.values(card.shoplist).map((item)=><div  key={item.Company}> <ProductCart  data={item} id={Object.keys(item)}/></div> )} */}

          {Object.values(card.shoplist).map((item:any)=><div  key={item.Company}> <ProductCart  data={item} /></div> )}
        
          
        S</div>
      </div>
      
    </Container>
    </div>
    
  );
}
