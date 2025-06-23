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
        shopParent: []
    });
    const [selectedShop, setSelectedShop] = useState<string[]>([]);
    const theme = useTheme();

    const {
        register: registerSignup,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsSignup },
        reset
    } = useForm<FieldValues>({
        defaultValues: itemData,
    });

    useEffect(() => {
        if (update && Data) {
            setItemData(Data);
            setSelectedShop(Data.shopParent || []);
            reset(Data);
        }
    }, [update, Data, reset]);

    const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
        const updatedFormData = {
            ...formData,
            shopParent: selectedShop,
        };

        const endpoint = update
            ? `http://localhost:8080/api/categories/${Data.id}`
            : `http://localhost:8080/api/categories/Addcategories`;

        const method = update ? "PUT" : "POST";

        await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updatedFormData),
        });

        console.log(update ? "done Update" : "done Add");

        if (update && onCloseModalUpdate) {
            onCloseModalUpdate();
        }

        setItemData({ title: "", imageUrl: "", idCard: 1, shopParent: [] });
        setSelectedShop([]);
        getDataCard();
        reset({ title: "", imageUrl: "", idCard: 1, shopParent: [] });
    };

    const listshoplist = card?.shoplist.map((el: any) => el.Company) || [];

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

    const getStyles = (name: any, shopParent: any, theme: any) => ({
        fontWeight: shopParent.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    });

    const handleChange = (event: any) => {
        const { value } = event.target;
        setSelectedShop(value);
    };

    return (
        <Container>
            <div className="flex relative">
                <div className="border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl w-full relative">
                    <div className="flex justify-between">
                        <div className="flex p-2 gap-1">
                            <IoIosInformationCircleOutline size={25} />
                            <p>{update ? "Modifier un categorie" : "Ajouter un categorie"}</p>
                        </div>
                        <div className="p-2">
                            <MdSaveAs
                                onClick={handleSubmitUpdate(onSubmitUpdate)}
                                size={30}
                                className="bg-white text-gray-600 rounded-md cursor-pointer"
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
                            label="Title"
                            value={itemData.title}
                            placeholder="" 
                            onChange={(e: any) =>
                                setItemData({ ...itemData, title: e.target.value })
                            }
                        />
                        <InputProfile
                            id="imageUrl"
                            required
                            register={registerSignup}
                            errors={errorsSignup}
                            type="text"
                            label="Image URL"
                            placeholder="" 
                            value={itemData.imageUrl}
                            onChange={(e: any) =>
                                setItemData({ ...itemData, imageUrl: e.target.value })
                            }
                        />
                        <FormControl sx={{ m: 1, width: 250 }} error={!!errorsSignup.selectedShop}>
                            <InputLabel id="demo-multiple-chip-label">Shop Parent</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="selectedShop"
                                multiple
                                value={selectedShop}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Shop Parent" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected as string[]).map((value, index) => (
                                            <Chip key={index} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {listshoplist.map((name: string, index: number) => (
                                    <MenuItem
                                        key={index}
                                        value={name}
                                        style={getStyles(name, selectedShop, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errorsSignup.selectedShop && (
                                <p style={{ color: 'red', fontSize: "0.75rem" }}>
                                    veuillez compléter ce champ
                                </p>
                            )}
                        </FormControl>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FormAddCategorie;
