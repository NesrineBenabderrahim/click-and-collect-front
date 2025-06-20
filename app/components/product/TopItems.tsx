import ProductCategorie from "@/app/components/categorie/ProductCategorie";
import useCard from "@/app/hooks/useCard";
import { Fade } from "react-awesome-reveal";

interface topItemProps{
    params:any
    showTop:any
}
const TopItem:React.FC<topItemProps> = ({params,showTop}) => {
const { fetchAllStat,stat, card, getDataCard,selectedShoplist } = useCard();

let sortedStat = [];
if (stat) {
sortedStat = [...stat].sort((a: any, b: any) => a.id - b.id);
}

const sorted7Stat = sortedStat.slice(-7);
// console.log({ sorted7Stat });

let category: any = {};
sorted7Stat.forEach((el: any) => {
Object.keys(el.information).forEach((key: any) => {
    if (!category[key]) {
    category[key] = Number(el.information[key].nbrFois);
    } else {
    category[key] += Number(el.information[key].nbrFois);
    }
});
});
console.log("yy",category)


    const sortedCategoryArray = Object.entries(category).sort(
        ([, a]: any, [, b]: any) => b - a
        );
        const sortedCategory = Object.fromEntries(sortedCategoryArray);
        
        // console.log({ sortedCategory });
        let top10Items:any = [];
        
        if (card) {
            Object.keys(sortedCategory).forEach(element => {
                const item = card.items.find((el:any) => el.title === element);
                if (item) {
                    // console.log(element);
                    top10Items.push(item);
                }
            });
        }
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
        <Fade
        direction={"up"}
        delay={500}
        cascade
        damping={1e-1}
        triggerOnce={true}
        >
        {top10Items.length > 0 &&
            top10Items.map((item: any,index:any) => (
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
    );
}

export default TopItem;