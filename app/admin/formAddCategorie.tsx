import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import Container from "../components/Container";
import useCard from "../hooks/useCard";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

interface FormAddCategorieProps {
    update?: boolean;
    Data?: any;
    onCloseModalUpdate?: () => void;
}

const FormAddCategorie: React.FC<FormAddCategorieProps> = ({ update, Data, onCloseModalUpdate }) => {
    const { getDataCard, card } = useCard();
    const [itemData, setItemData] = useState<any>({
        title: "",
        imageUrl: "",
        idCard: 1,
        shopParent: [] // Initialize as an array for multi-select
    });
    const[selectedShop,setSelectedShop]=useState([])


    let listshoplist: any = card?.shoplist.map((el: any) => el.Company);
    //console.log({ listshoplist });

    useEffect(() => {
        if (update && Data) {
            setItemData(Data);
            setSelectedShop(Data.shopParent)
        }
    }, [update, Data]);

    const {
        register: registerSignup,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsSignup },
    } = useForm<FieldValues>({
        defaultValues: itemData,
    });

    const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
        const Shops:string[] = selectedShop;
// Include selectedShop in formData
        const updatedFormData = {
            ...formData,
            shopParent: Shops,
        };

console.log({ updatedFormData });
//         console.log({ formData });
        if (update) {
            await fetch(`http://localhost:8080/api/categories/${Data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updatedFormData),
            });

            console.log("done Update");
            if (onCloseModalUpdate) {
                onCloseModalUpdate();
            }
        } else {
            await fetch(`http://localhost:8080/api/categories/Addcategories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updatedFormData),
            });

            console.log("done Add");
        }
        setItemData({
            title: "",
            imageUrl: "",
            idCard: 1,
            shopParent: [] // Reset to an empty array
        });
        setSelectedShop([])
        getDataCard();
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name: any, shopParent: any, theme: any) {
        return {
            fontWeight:
                shopParent.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        console.log({value})
        setSelectedShop(value)
    };

    return (
        <Container>
            <div className="flex relative">
                <div className="border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl w-full relative ">
                    <div className="flex justify-between">
                        <div className="flex p-2 gap-1">
                            <IoIosInformationCircleOutline size={25} />
                            {!update ? <p >Ajouter un categorie</p>: <p>Modifier un categorie</p>}
                        </div>
                        <div className="p-2">
                            <MdSaveAs
                                onClick={handleSubmitUpdate(onSubmitUpdate)}
                                size={30}
                                className="bg-white text-gray-600 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="p-2 relative w-full grid gap-2">
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
                <FormControl sx={{ m: 1, width: 250 }} error={!!errorsSignup.selectedShop}>
            <InputLabel id="demo-multiple-chip-label">Shop Parent</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="selectedShop"
                multiple
                value={selectedShop}
                {...registerSignup("selectedShop", { required: true })}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Shop Parent" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: any, index: any) => (
                            <Chip key={index} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {listshoplist.map((name: any, index: any) => (
                    <MenuItem
                        key={index}
                        value={name}
                        style={getStyles(name, itemData.shopParent, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
            {errorsSignup.selectedShop && (
                <p style={{ color: 'red', fontSize: "0.75rem" }}>veuillez compléter ce champ</p>
            )}
        </FormControl>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FormAddCategorie;
