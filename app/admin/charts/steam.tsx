import useCard from '@/app/hooks/useCard';
import React from 'react';
import Chart, {Props} from 'react-apexcharts';

interface StatData {
   nbrFois: number;
   heures: string[];
 }
 
 interface StatDay {
   [key: string]: StatData;
 }



export const Steam = () => {

   const {stat}= useCard()
   // console.log({stat});
   const DayList: any[] = [];
   const sortedStat = [...stat].sort((a, b) => a.id - b.id);
   const sorted7Stat = sortedStat.map((el: any) => el).slice(-7);

let types:any={}
sorted7Stat.forEach((el:any,index:number)=>{
   Object.keys(el.information).forEach((el:any)=>{if(!Object.keys(types).includes((el))){
      types[el]={"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,}
   }})
   
   Object.keys(el.information).forEach((elt:any)=>{
      
   types[elt][(index+1).toString()]=types[elt][(index+1).toString()]+el.information[elt].nbrFois
})})
   




   const state: any = Object.keys(types).map((el) => ({
      name: el, // Extract the day label
      data: Object.values(types[el]) // Use nbrFoisList as data
}));

   const options: Props['options'] = {
   chart: {
      type: 'area',
      animations: {
         easing: 'linear',
         speed: 300,
      },
      sparkline: {
         enabled: false,
      },
      brush: {
         enabled: false,
      },
      id: 'basic-bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      stacked: true,
      toolbar: {
         show: false,
      },
   },

   xaxis: {
      categories: DayList,
      labels: {
         // show: false,
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
         },
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
      axisTicks: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
         },
      },
   },
   tooltip: {
      enabled: false,
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 0,
      position: 'back',
   },
   stroke: {
      curve: 'smooth',
      fill: {
         colors: ['red'],
      },
   },
   // @ts-ignore
   markers: false,
};
   
   return (
      <>
         <div className='border-box z-5'>
            <div id="chart">
               <Chart
                  options={options}
                  series={state}
                  type="area"
                  height={425}
               />
            </div>
         </div>
      </>
   );
};
