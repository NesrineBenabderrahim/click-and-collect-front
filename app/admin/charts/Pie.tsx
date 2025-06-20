import useCard from "@/app/hooks/useCard";
import { PieChart } from '@mui/x-charts/PieChart';

const Pie = () => {
    
const {stat}= useCard()


const sortedStat = [...stat].sort((a, b) => a.id - b.id);
const sorted7Stat = sortedStat.map((el: any) => el).slice(-7);

console.log({sorted7Stat})

    let category:any= {};
sorted7Stat?.forEach((el:any) => {
    Object.keys(el.information).forEach((key:any) => {
        if (!category[key]) {
            category[key] =  Number(el.information[key].nbrFois);
        }else{
            category[key] = category[key] + Number(el.information[key].nbrFois);
        }
    });
});
console.log({category});

const data:any[] = Object.keys(category).map(key => ({
    label: key,
    value: category[key]
}));

console.log({data});
    return ( 
        <> 
        <PieChart
        series={[
            {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
        ]}
        height={200}
    /> 
    </>
    );
}
 
export default Pie;