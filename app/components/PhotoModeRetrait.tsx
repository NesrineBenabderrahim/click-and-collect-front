"use client"

import DoubleInputApp from "./form/doubleInput";
import DoubleInputAppDT from "./form/doubleInputDT";

interface PhotoModeRetraitProps {
    data:any
}
const PhotoModeRetrait: React.FC<PhotoModeRetraitProps> = ({data}) => {

    let ModeRetrait:any=localStorage.getItem("ModeRetrait")!==null?JSON.parse(localStorage.getItem("ModeRetrait")??'{}'):{}
    console.log({ModeRetrait});
    
    return ( 
    <div className="sticky justify-content  z-30 items-left w-[80%] xs:w-[100%] sm:w-[100%]  md:w-[80%]  m-2    text-slate cursor-pointer border-[1.2px] border-slate-200 bg-white rounded-lg  transition hover:scale-105  "> 
        <div className="flex  flex-col m-2 px-4  ">
            <div className="flex  gap-2">
            <select className="justify-content border-[2px] rounded-md p-1">
                <option value="emporter"  selected={!ModeRetrait.livrer}>A emporter</option>
                <option value="livraison" selected={ModeRetrait.livrer} >En livraison</option>
            </select>
                <DoubleInputApp data={data}  />
                <DoubleInputAppDT  ModeRetrait={ModeRetrait} />
            </div>

        </div> 
    </div>
);
}

export default PhotoModeRetrait;