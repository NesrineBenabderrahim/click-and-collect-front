"use client";

import {  GoogleMap, InfoWindowF, LoadScript, Marker, MarkerF,Autocomplete} from "@react-google-maps/api";
import Container from "../components/Container";
import useLocation from "@/app/hooks/useLocation";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from 'leaflet';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import isEqual from 'fast-deep-equal';
import useCard from "../hooks/useCard";

interface AutocompleteProps {
    options: {
        types?: string[];
        componentRestrictions?: google.maps.places.ComponentRestrictions;
    };
    onPlaceChanged?: (place: any) => void;
}
type place=
{ id:number; town: string; image: string; Nature: string; shopid: number; Address: string; Company: string; Country: string; PostalCode: string; latitude: number; longitude: number; Responsible: string; etat: string; } | undefined
type CustomSize ={ width: number; height: number; equals: (other: CustomSize) => boolean}
const Map = () => {

const ContainerStyle ={
    width:"100%",
    height:"100vh"
}
const cordinate = {lat:44.620720 ,lng: 4.390880}
const {userLocation}= useLocation()



// console.log("locationx",userLocation)

const customPinView:any= new L.Icon({
    icon: FaMapMarkerAlt, // Specify the path to your icon image
    iconSize: [50, 50],
        // Set the size of the icon
});


const pixelOffset: CustomSize = {
    width: 0,
    height: 0,
    equals: function (other: CustomSize): boolean {
    return this.width === other.width && this.height === other.height;
    },
};

const [selectedPlace,setSelectedPlace]=useState<place>()
const router = useRouter();


// console.log("locationaaa",userLocation)
const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

// Use a useEffect to set googleMapsLoaded when the Google Maps API is loaded
useEffect(() => {
if (typeof window !== 'undefined' && window.google && window.google.maps) {
setGoogleMapsLoaded(true);
}
}, []);


// const [inputValue, setInputValue] = useState<string>('');
//     const [Place, setPlace] = useState<any>(null);
// const handlePlaceChanged = () => {
//         if (autocomplete.current !== null) {
//           setPlace(autocomplete.current.getPlace());
//         } else {
//           console.error('Autocomplete is not loaded yet!');
//         }
//       };
    
//     const autocomplete:any  = useRef<google.maps.places.Autocomplete>(null);
const [showMap,setShowMap]=useState(false)
const {card}=useCard()
    
return (
   <>
{showMap===true?
    <div className="">
      
    
        <LoadScript
        googleMapsApiKey="AIzaSyA27Qr71arQ8MrgCZf7q73bgGfs5x43XbI"
        onLoad={() => setGoogleMapsLoaded(true)}
        libraries={["places"]} 
        />


    {googleMapsLoaded && (<> 
    {/* <Autocomplete onLoad={(auto:any) => (autocomplete.current = auto)} onPlaceChanged={handlePlaceChanged}  
                >
          <input
            type="text"
            placeholder="Enter a location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </Autocomplete> */}
        
        <GoogleMap
        mapContainerStyle={ContainerStyle}
        center={cordinate}
        zoom={4}
        >

                            <MarkerF
                        key="myLocation"
                        icon={customPinView}
                        position={userLocation}
                            />

                {Object.values(card.shoplist).map((place:any)=>(
                    <MarkerF
                    key={`${place.Address}-${place.Company}-${place.latitude}-${place.longitude}`}
                    onClick={()=>{
                        place === selectedPlace
                        ? setSelectedPlace(undefined)
                        : setSelectedPlace(place)
                    }}
                    icon={customPinView}
                    position={{lat:place.latitude ,lng: place.longitude}}
                        />

                ))}
                {/* {Place && (
          <Marker
            position={{
              lat: Place.geometry.location.lat(),
              lng: Place.geometry.location.lng()
            }}
          />
        )} */}
                {selectedPlace && (
                    <InfoWindowF 
                    position={{
                        lat: selectedPlace.latitude,
                        lng: selectedPlace.longitude
                    }}
                    zIndex={1}
                    options={{
                        pixelOffset: pixelOffset,
                    }}
                    onCloseClick={()=>setSelectedPlace(undefined)}
                    >
                        <div>
                        <div className="aspect-square overflow-hidden relative w-full rounded-md h-[180px]">
                                <Image
                                fill
                                src={selectedPlace.image}
                                alt=""
                                onClick={() => {
                                    localStorage.setItem("selectedShoplist",JSON.stringify(selectedPlace));
                                    router.push(`/menu/1#about-section`)
                                }}                            />
                            </div>
                        
                            <h3>{selectedPlace.Company}</h3>
                            <div className=" text-[15px] flex gap-1 ">
                            <div>{selectedPlace.Address},</div>
                            <div>{selectedPlace.PostalCode}</div>
                            <div>{selectedPlace.town}</div>
                            </div>
                        </div>
                    </InfoWindowF>
                )}

        </GoogleMap>
        </>
    )}
    </div>
    :null}
    <div className="flex justify-between px-2 ">
        <div className="w-[30%] " >
        </div>
        <div  onClick={()=>{ setShowMap(!showMap)}}  className=" flex gap-2   border-b-[2px] border-l-[2px] border-r-[2px] p-2 border-red-800 transition hover:scale-105 cursor-pointer rounded-b-lg text-lg text-white bg-red-800 justify-center " >
          <FaMapMarkerAlt size={20}/>
          <p>Retrouvez nous sur la carte</p> 
          </div>
        </div>
    </>
);
}

export default Map;