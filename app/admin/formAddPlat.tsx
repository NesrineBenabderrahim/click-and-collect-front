import { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import Container from "../components/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCard from "../hooks/useCard";

interface FormAddPlatProps {
update?: boolean;
Data?: any;
onCloseModalUpdate?: Function;
}

const FormAddPlat: React.FC<FormAddPlatProps> = ({ update, Data, onCloseModalUpdate }) => {
const { card, getDataCard } = useCard();
const [selected, setSelected] = useState("");
const [itemData, setItemData] = useState<any>({
title: "",
imageUrl: "",
basicComposition: [],
detail: {},
categoryParent: "",
});
const [basicCompositions, setBasicCompositions] = useState<
{ id: number; title: string; }[]
>([{ id: 1, title: "" }]);
const [basicTaille, setBasicTaille] = useState<{
taille: string[];
price: number[];
}>({
taille: [""],
price: [0],
});

const InitialData = () => {
setItemData({
    title: "",
    imageUrl: "",
    basicComposition: [],
    detail: {},
    categoryParent: "",
});
setBasicCompositions([{ id: 1, title: "" }]);
setBasicTaille({ taille: [""], price: [0] });
setSelected("");
};

useEffect(() => {
if (update && Data) {
    setItemData(Data);
    setBasicCompositions(Data.basicComposition);
    setBasicTaille(Data.detail);
    setSelected(Data.categoryParent);
}
}, [update, Data]);

const {
register: registerSignup,
handleSubmit: handleSubmitUpdate,
formState: { errors: errorsSignup },
setValue,
} = useForm<FieldValues>({
defaultValues: itemData,
});

const handleAddComposition = (index: any) => {
const newComposition = { id: index, title: "" };
setBasicCompositions([...basicCompositions, newComposition]);
};

const handleRemoveComposition = (indexToRemove: any) => {
const updatedCompositions = basicCompositions.filter(
    (_: any, index: any) => index !== indexToRemove
);
setBasicCompositions(updatedCompositions);
};

const handleCompositionChange = (index: any, newValue: any) => {
const updatedCompositions = [...basicCompositions];
updatedCompositions[index] = { id: index, title: newValue };
setBasicCompositions(updatedCompositions);
};

const handleTailleChange = (
subIndex: number,
field: 'taille' | 'price',
value: string | number
) => {
setBasicTaille(prevState => {
    const newState = { ...prevState };
    if (field === 'taille') {
    newState.taille[subIndex] = value as string;
    } else if (field === 'price') {
    newState.price[subIndex] = value as number;
    }
    return newState;
});
};

const handleAddTaille = () => {
setBasicTaille(prevState => ({
    taille: [...prevState.taille, ""],
    price: [...prevState.price, 0],
}));
};

const handleRemoveTaille = (subIndex: number) => {
setBasicTaille(prevState => ({
    taille: prevState.taille.filter((_, idx) => idx !== subIndex),
    price: prevState.price.filter((_, idx) => idx !== subIndex),
}));
};

let listCategorie = card?.categories.map((el: any) => el.title);

const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
try {
    const item = basicCompositions;
    const detail = basicTaille;
    const categoryParent = selected;
    const updatedFormData = {
    ...formData,
    basicComposition: item,
    detail: detail,
    categoryParent: categoryParent,
    };

    if (update) {
    await fetch(`http://localhost:8080/api/items/${Data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
    });
    if (onCloseModalUpdate) {
        onCloseModalUpdate();
    }
    } else {
    await fetch(`http://localhost:8080/api/items/AddItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
    });
    }
        toast.success("plat ajouté avec succès");
        InitialData();
        getDataCard();
    } catch (error) {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
};
return (
<Container>
    <div className="flex  border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl  w-full relative">
    <div className=" w-full  ">
        <div className="flex justify-between">
        <div className="flex p-2 gap-1">
            <IoIosInformationCircleOutline size={25} />
            {!update ? <p>Ajouter un plat</p> : <p>Modifier un plat</p>}
        </div>
        <div className="p-2">
            <MdSaveAs
            onClick={handleSubmitUpdate(onSubmitUpdate)}
            size={30}
            className="bg-white text-gray-600 rounded-md"
            />
        </div>
        </div>
        <div className="p-2 grid gap-2">
        <InputProfile
            id="title"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Title"
            value={itemData.title}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                title: e.target.value,
            })
            }
        />
    
        <InputProfile
            id="imageUrl"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder=""
            label="Image URL"
            value={itemData.imageUrl}
            onChange={(e: any) =>
            setItemData({
                ...itemData,
                imageUrl: e.target.value,
            })
            }
        />
    
    <Box sx={{ minWidth: 120 }}>
    {basicTaille.taille.map((_, subIndex) => (
        <div className="flex" key={subIndex}>
            <div className="w-[100%]">
                <InputProfile
                    id={`basicTailleTitle ${subIndex}`}
                    required
                    register={registerSignup}
                    errors={errorsSignup}
                    type="text"
                    placeholder=""
                    label={`Taille ${subIndex + 1}`}
                    value={basicTaille.taille[subIndex]}
                    onChange={(e) =>
                        handleTailleChange(subIndex, "taille", e.target.value)
                    }
                />
            </div>
            <div className="w-[100%]">
                <InputProfile
                    id={`basicPriceTitle ${subIndex}`}
                    required
                    register={registerSignup}
                    errors={errorsSignup}
                    type="number"
                    placeholder=""
                    label={`Price ${subIndex + 1}`}
                    value={basicTaille.price[subIndex]}
                    onChange={(e) =>
                        handleTailleChange(subIndex, "price", parseFloat(e.target.value))
                    }
                />
            </div>
            <div className="grid grid-rows-2 items-center">
                {subIndex === basicTaille.taille.length - 1 && basicTaille.taille.length > 1 && (
                    <div onClick={() => handleRemoveTaille(subIndex)}>
                        <CiSquareMinus size={30} />
                    </div>
                )}
                {subIndex === basicTaille.taille.length - 1 && (
                    <div onClick={handleAddTaille}>
                        <CiSquarePlus size={30} />
                    </div>
                )}
            </div>
        </div>
    ))}
</Box>


{basicCompositions.map((composition: any, index: any) => (
    <div>
    <div className="flex" key={index}>
        <div className="w-[100%]">
            <InputProfile
                id={`basicCompTitle ${index}`}
                required
                register={registerSignup}
                errors={errorsSignup}
                type="text"
                placeholder=""
                label={`Composition de Base ${index + 1}`}
                value={basicCompositions[index]?.title}
                onChange={(e: any) =>
                    handleCompositionChange(index, e.target.value)
                }
            />
        
        </div>

        <div className="grid grid-rows-2 items-center">
            {index === basicCompositions.length - 1 && index !== 0 && (
                <div onClick={() => handleRemoveComposition(index)}>
                    <CiSquareMinus size={30} />
                </div>
            )}
            {index === basicCompositions.length - 1 && (
                <div className="top-0" onClick={() => handleAddComposition(index)}>
                    <CiSquarePlus size={30} />
                </div>
            )}
        </div>
    </div>
    </div>
))}


        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={!!errorsSignup.categoryParent}>
            <InputLabel variant="standard" htmlFor="category-parent-native">
                Category Parent
            </InputLabel>
            <NativeSelect
                id="categoryParent"
                value={selected}
                {...registerSignup("categoryParent", { required: true })}
                onChange={(e: any) => {
                setSelected(e.target.value);
                setValue("categoryParent", e.target.value);
                }}
            >
                <option value={""}></option>
                {listCategorie.map((el: any, index: any) => (
                <option key={index} value={el}>
                    {el}
                </option>
                ))}
            </NativeSelect>
            {errorsSignup.categoryParent && (
                <p style={{ color: 'red' , fontSize: "0.75rem"}}>veuillez compléter ce champ</p>
            )}
            </FormControl>
        </Box>
        </div>
    </div>
    </div>
    <ToastContainer />
</Container>
);
};

export default FormAddPlat;
