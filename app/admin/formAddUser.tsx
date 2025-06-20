import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineMarkEmailRead, MdSaveAs } from "react-icons/md";
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
import NativeSelect from "@mui/material/NativeSelect";
import Chip from '@mui/material/Chip';
import Input from "../components/form/Input";
import { FaUserCircle } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import Button from "../components/form/Button";

interface FormAddCategorieProps {
    update?: boolean;
    Data?: any;
    onCloseModalUpdate?: () => void;
}

const FormAddUser: React.FC<FormAddCategorieProps> = ({ update, Data, onCloseModalUpdate }) => {

    const { card,getAllUser } = useCard();
    const [itemData, setItemData]= useState<any>({
        nom: "",
        prénom: "",
        télephone: "",
        email: "",
        password: "",
        shop: 0,
        role:""// Initialize as an array for multi-select
    });
  
    const[selectedShop,setSelectedShop]=useState(null)
    const [selectedRole, setSelectedRole] = useState("");
    const[isLoading,setIsLoading]=useState(false)
    let listRole =["admin","client","restaurant_owner"]

    let listShop: any = card?.shoplist.map((el: any) => el);
    //console.log({ listshoplist });

    useEffect(() => {
        if (update && Data) {
            setItemData(Data);
            setSelectedShop(Data.shop)
            setSelectedRole(Data.role)
        }
    }, [update,Data]);

        const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: errorsSignup },
        } = useForm<FieldValues>({
        defaultValues: itemData,
        });

        const [jsonData, setjsonData] = useState<any>(null);
        const [password, setPassword] = useState("");
        const [password1, setPassword1] = useState("");
        
        const containsLowerAndUpper = (str:any) => {
            const lowerRegex = /[a-z]/;
            const upperRegex = /[A-Z]/;
            return lowerRegex.test(str) && upperRegex.test(str);
            };
            
        const isValidPasswordLowerAndUpper = containsLowerAndUpper(password);
        
        const containsDigit = (str:any) => {
            const digitRegex = /\d/;
            return digitRegex.test(str);
        };
        const isValidPasswordDigit = containsDigit(password);
        
        const isValidPasswordlength = password.length >= 8;
        const isPasswordValid = isValidPasswordLowerAndUpper && isValidPasswordDigit && isValidPasswordlength && password1 === password
        
        const isButtonDisabled = !isPasswordValid;
    const onSubmitSignup: SubmitHandler<FieldValues> = async (data) => {
        const shop = selectedShop;
        const role = selectedRole;

    // Include shop and role data
    setIsLoading(true);
    const { password1, ...result } = data;

    const updatedData = {
        ...result,
        shop: shop,
        role: role,
    };
    
    console.log(updatedData)

    if(update){
        await fetch(`http://localhost:8080/api/user/${Data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updatedData),
        });
        console.log("done Update");
        if (onCloseModalUpdate) {
            onCloseModalUpdate();
        }
    }else{
    const res = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    
    console.log({ res });
    const jsonData = await res.json();
    setjsonData(jsonData);
    console.log({ jsonData });
    if (jsonData.message === "success") {
    }
}
setItemData({
    nom: "",
    prénom: "",
    télephone: "",
    email: "",
    password: "",
    shop: 0,
    role:""
})
setSelectedShop(null)
setSelectedRole("")
getAllUser()

    };
console.log({itemData})
    return (
        <Container>
            <div className="flex justify-center">
                <div className="border-[1.2px] border-slate-200 bg-white shadow-md rounded-2xl m-4 w-full px-8">
                    <div className="flex justify-between">
                        <div className="flex p-2 gap-1">
                            <IoIosInformationCircleOutline size={25} />
                            
                            {!update ? <p>Ajouter un utilisateur</p>: <p>Modifier un utilisateur</p>}
                        </div>
                        <div className="p-2">
                            <MdSaveAs
                                onClick={handleSubmitSignup(onSubmitSignup)}
                                size={30}
                                className="bg-white text-gray-600 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="p-2 grid gap-2">
                    <InputProfile
    id="nom"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="text"
    placeholder="Saisissez votre nom"
    value={itemData.nom}
    label="Nom"
    Icon={FaUserCircle}
    onChange={(e: any) =>
        setItemData({
            ...itemData,
            nom: e.target.value,
        })
    }
/>

<InputProfile
    id="prénom"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="text"
    placeholder="Saisissez votre prénom"
    value={itemData.prénom}
    label="Prénom"
    Icon={FaUserCircle}
    onChange={(e: any) =>
        setItemData({
            ...itemData,
            prénom: e.target.value,
        })
    }
/>

<InputProfile
    id="télephone"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="text"
    placeholder="12 34 56 78"
    value={itemData.télephone}
    label="Téléphone"
    Icon={CiMobile3}
    onChange={(e: any) =>
        setItemData({
            ...itemData,
            télephone: e.target.value,
        })
    }
/>

<InputProfile
    id="email"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="email"
    placeholder="Saisissez votre e-mail"
    value={itemData.email}
    label="E-mail"
    Icon={MdOutlineMarkEmailRead}
    onChange={(e: any) =>
        setItemData({
            ...itemData,
            email: e.target.value,
        })
    }
/>
                        {!update && <> <InputProfile
                        id="password"
                        required
                        register={registerSignup}
                        errors={errorsSignup}
                        type="password"
                        placeholder="Saisissez votre mot de passe"
                        value={itemData.password}
                        label="Password"
                        Icon={PiLockKeyThin}
                        onChange={(e: any) =>
                            setItemData({
                                ...itemData,
                                password: e.target.value,
                            })
                            }
                        />
                        <InputProfile
                        id="password1"
                        register={registerSignup}
                        errors={errorsSignup}
                        type="password"
                        placeholder="Comfirmez votre mot de passe"
                        value={itemData.password}
                        Icon={PiLockKeyThin}
                        onChange={(e: any) =>
                            setItemData({
                                ...itemData,
                                password1: e.target.value,
                            })
                            }
                        /> </>}
                        <div>
                        {password1 !== "" && password1 !== password && (
                            <p className="text-red-500">Les mots de passe ne correspondent pas</p>
                        )}
                        {password1 === password  && password.length >0 && (
                            <p className="text-green-500 px-4">Les mots de passe correspondent</p>
                        )}{" "}
                        {password && (
                            <div>
                            
                            <p className={`text-${isValidPasswordLowerAndUpper ? 'green' : 'red'}-500 flex gap-1 px-4`}>
                                <TiTick
                                size={15}
                                className="rounded-2xl border-[1px] border-black mt-1"
                                />{" "}
                                1 Minuscule & 1 Majuscule
                            </p>
                            <p className={`text-${isValidPasswordDigit ? 'green' : 'red'}-500 flex gap-1 px-4`}>
                                <TiTick
                                size={15}
                                className="rounded-2xl border-[1px] border-black mt-1"
                                />{" "}
                                1 chiffre (0-9)
                            </p>
                            <p className={`text-${isValidPasswordlength ? 'green' : 'red'}-500 flex gap-1 px-4`}>
                                <TiTick
                                size={15}
                                className="rounded-2xl border-[1px] border-black mt-1 text-green-500"
                                />{" "}
                                8 caractères
                            </p>
                            </div>
                        )}

                        {jsonData?.error && (
                            <p className="text-red-500 px-2">{jsonData?.message}</p>
                        )}


                        </div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="category-parent-native">
                                Role
                            </InputLabel>
                            <NativeSelect
                                id="role"
                                value={selectedRole}
                                onChange={(e: any) => {
                                console.log(e.target.value);
                                setSelectedRole(e.target.value);
                                }}
                            >
                                <option value={""}></option>
                                {listRole.map((el: any, index: any) => (
                                <option key={index} value={el}>
                                    {el}
                                </option>
                                ))}
                            </NativeSelect>
                            </FormControl>
                        </Box>

                        { selectedRole === "restaurant_owner" &&
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="category-parent-native">
                                Shop
                            </InputLabel>
                            <NativeSelect
                                id="shop"
                                value={selectedShop}
                                onChange={(e: any) => {
                                console.log(e.target.value);
                                setSelectedShop(e.target.value);
                                }}
                            >
                                <option value={""}></option>
                                {listShop.map((el: any, index: any) => (
                                <option key={index} value={el.id}>
                                    {el.Company}
                                </option>
                                ))}
                            </NativeSelect>
                            </FormControl>
                        </Box>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FormAddUser;
