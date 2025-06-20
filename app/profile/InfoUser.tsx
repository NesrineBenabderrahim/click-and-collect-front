import { useEffect, useState } from "react";
import { CiCreditCard1, CiMobile3 } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Subscriptions from "./Braintree";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineMarkEmailRead, MdSaveAs } from "react-icons/md";
import InputProfile from "../components/form/inputprofile";
import { LuUserCircle2 } from "react-icons/lu";
import useCard from "../hooks/useCard";


const InfoUser = () => {
    const {
        dataUser,
        getData,
        } = useCard();

    const [formData, setFormData] = useState(dataUser);

    const {
        register: registerSignup,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsSignup },
        } = useForm<FieldValues>({
        defaultValues: {
            nom: "",
            prénom: "",
            télephone: "",
            email: "",
        },
        });

        const onSubmitUpdate: SubmitHandler<FieldValues> = async (formData) => {
            console.log({formData});
            
    

                await fetch(`http://localhost:8080/api/user/${dataUser?.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            getData();

            
            };

    return ( 
        <div className=" border-[1.2px] border-slate-200 bg-white shadow-md  rounded-2xl m-4  ">
        <div className="flex justify-between">
            <div className="flex p-2 gap-1">
            <IoIosInformationCircleOutline size={25} />
            <p className="">Informations générales</p>
            </div>
            <div className="p-2">
            <MdSaveAs
                onClick={handleSubmitUpdate(onSubmitUpdate)}
                size={30}
                className="bg-white text-gray-600 rounded-md"
            />
            </div>
        </div>
        <div className="p-2 grid md:grid-cols-2  gap-2">
            <InputProfile
            id="nom"
            required
            register={registerSignup}
            errors={errorsSignup}
            type="text"
            placeholder="Saisissez votre nom"
            label="Nom"
            Icon={LuUserCircle2}
            value={formData?.nom}
            onChange={(e: any) =>
                setFormData({
                ...formData,
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
            label="Prénom"
            Icon={LuUserCircle2}
            value={formData?.prénom}
            onChange={(e: any) =>
                setFormData({
                ...formData,
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
            placeholder="06 12 34 56 78"
            label="Télephone"
            Icon={CiMobile3}
            value={formData?.télephone}
            onChange={(e: any) =>
                setFormData({
                ...formData,
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
            label="E-mail"
            Icon={MdOutlineMarkEmailRead}
            value={formData?.email}
            onChange={(e: any) =>
                setFormData({
                ...formData,
                email: e.target.value,
                })
            }
            />
        </div>
        </div>
    );
}

export default InfoUser;