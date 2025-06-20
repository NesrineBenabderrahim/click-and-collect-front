import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { diff } from "deep-object-diff";

import Button from "../form/Button";
import { card } from "@/app/utils/products";
import InputSupp from "../form/InputSupp";
import useCard from "@/app/hooks/useCard";
import { setIsValidation ,store} from "@/app/hooks/store";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";
import { formatPrice } from "@/app/utils/formatPrice";

interface ModalCommanderProps {
Open: boolean;
onClose: () => void;
img: any;
data: any;
CompList?: any;
}

const ModalCommander: React.FC<ModalCommanderProps> = ({
Open,
onClose,
img,
data,
CompList,
}) => {
if (!Open) return null;
const {isValidation}=useSnapshot(store)

const [loading, setLoading] = useState(false);
const [checkedItems, setCheckedItems] = useState({
CREMEFRAICHE: true,
FROMAGE: true,
OIGNON: true,
});
const [checkedDetail, setCheckedDetail] = useState({})

const {
handleAddProductToCart,
HandleCartQtyIncrease,
cartProducts,
dataUser,
cartTotalAmount,
getData,
getTotals
} = useCard();

// useEffect(() => {
// getData();
// const total = getTotals();
// console.log(total)
// }, []);

//created suppList in localStorage
const handleSuppChange = (item: any, SuppItems: any, newCount: any) => {
const newCheckedItems: any = { ...SuppItems };
if (
    newCheckedItems[item.title] === undefined ||
    newCheckedItems[item.title] > 0
) {
    newCheckedItems[item.title] = newCount;
}
localStorage.setItem("supList", JSON.stringify(newCheckedItems));
};

//on validate modal create ItemList{sup,checkedItems,data}
const handleValider = async () => {
    if (!checkedDetail || Object.keys(checkedDetail).length === 0) {
        alert('Please select at least one option.');
        return;
    }
let sup1: any =
    localStorage.getItem("supList") !== null
    ? JSON.parse(localStorage.getItem("supList") ?? "{}")
    : {};
let sup: any = {};
// ignore the item has 0 value
if (sup1 != null) {
    for (let item of Object.keys(sup1)) {
    if (sup1.hasOwnProperty(item) && sup1[item] !== 0) {
        sup[item] = sup1[item];
    }
    }
}

localStorage.setItem(
    "ItemList",
    JSON.stringify({ sup, checkedItems, data })
);
// console.log("Modal", cartProducts);
const Existingindex =
    cartProducts !== null
    ? cartProducts?.findIndex(
        (item: any) =>
            JSON.stringify(item.data.id) === JSON.stringify(data.id) && //same item
            Object.keys(diff(item.sup, sup)).length === 0 &&
            Object.keys(diff(item.checkedItems, checkedItems)).length === 0 &&
            Object.keys(diff(item.checkedDetail, checkedDetail)).length === 0

        )
    : -1; //same (composant de base )


//add to cart new item
if (Existingindex === -1 || cartProducts === null) {
    // let prixFirst: null | number
    // { cartProducts === null || typeof cartProducts === "undefined" ? prixFirst = data.price : prixFirst = total}
    handleAddProductToCart(
    { sup, checkedItems, checkedDetail ,data, quantity: 1 },
    dataUser,
    );
    localStorage.setItem("supList", JSON.stringify(null));
    localStorage.setItem("ItemList", JSON.stringify(null));
} else {

    //increase quantity
    HandleCartQtyIncrease(cartProducts[Existingindex], dataUser);
    localStorage.setItem("supList", JSON.stringify(null));
    localStorage.setItem("ItemList", JSON.stringify(null));
}

setLoading(true)
getData();
getTotals();
onClose()

toast.success("Votre plat est ajouté au pannier");
// setIsValidation(true)
setCheckedDetail({})
};
// {data && console.log("yy",data);}


return (
<>
    <Modal
    open={Open}
    title={data.title}
    onCancel={onClose}
    footer={[
        <Button
        label="Valider  "
        key="link"
        href=""
        disabled={loading}
        onClick={handleValider}
        />,
    ]}
    >
    <div className="flex w-full  justify-center overflow-y-auto h-[400px] font-semibold  text-center mt-8">
        <div className="w-full flex flex-col gap-2 ">
        <div className="flex w-full  justify-content justify-center">
            <Image height={450} width={450} src={img} alt="" />
        </div>
        <div className="text-left text-lg  ">
        <div className="flex gap-12 justify-center items-center ">
            {data && data.detail.price.map((item:any, index:any) => (
                <div key={index} className="flex justify-center items-center">
                {formatPrice(item)} 
                </div>
            ))}
            </div>
        <div className="flex gap-2 justify-center items-center  ">
            {data && data.detail.taille.map((item:any, index:any) => (
                <div key={index}>
                <Checkbox
                    checked={checkedDetail === item}  // Check if the current item is equal to the checkedDetail
                    onChange={(e) => setCheckedDetail(item)}  // Update checkedDetail when the checkbox is clicked
                />
                {item} 
                </div>
            ))}
            </div>
    

            <p className="pt-4">COMPOSITION DE BASE</p>
            <FormGroup className="flex gap-2">
            {Object.values(CompList).map((item: any) => (
                <FormControlLabel
                key={item.title}
                control={
                    <Checkbox
                    value={item.title}
                    onChange={(e) => {
                        const modifiedTitle = item.title
                        ? item.title.replace(/\s/g, "")
                        : "";
                        const newCheckedItems: any = { ...checkedItems };
                        if (
                        newCheckedItems[modifiedTitle] === undefined ||
                        e.target.checked
                        ) {
                        newCheckedItems[modifiedTitle] = true;
                        } else {
                        delete newCheckedItems[modifiedTitle];
                        }
                        setCheckedItems(newCheckedItems);
                    }}
                    defaultChecked
                    />
                }
                label={item.title}
                className="border-[1px] rounded-lg justify-content"
                />
            ))}
            </FormGroup>
        </div>
        <div className="text-left text-lg ">
            <p>PIZZA SUPPLEMENTS</p>
            <p className="text-sm">Choisissez jusqu'à 9</p>
            <FormGroup className="flex gap-2">
            {Object.values(card.SupplimentComposition)?.map(
                (item: any, index: number) => (
                <div key={index}>
                    <InputSupp
                    item={item}
                    index={index}
                    onchangeList={handleSuppChange}
                    />
                </div>
                )
            )}
            </FormGroup>
        </div>
        </div>
    </div>
    </Modal>
</>
);
};

export default ModalCommander;
