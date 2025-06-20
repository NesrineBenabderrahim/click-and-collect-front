import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TimePickerApp from '../form/TimePicker';
import Button from '../form/Button';
import useCard from '@/app/hooks/useCard';
import Input from '../form/Input';
import { IoIosPhonePortrait } from 'react-icons/io';
import { PiLockKeyThin } from 'react-icons/pi';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { BsFillSendCheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';

interface ModeRetraitModalProps {
    Open: boolean
    onClose: () => void
    data?: any
}

const ModeRetraitModal: React.FC<ModeRetraitModalProps> = ({ Open, onClose, data }) => {
    if (!Open) return null

    const {
        register: registerSMS,
        handleSubmit: handleSubmitSMS,
        formState: { errors: errorsSMS },
    } = useForm<FieldValues>({
        defaultValues: {
            télephone: "",
        },
    });

    const { dataUser } = useCard()
    const format = 'HH:mm';
    const [big, setBig] = useState(true)
    const [emporter, setEmporter] = useState(true)
    const [livrer, setLivrer] = useState(false)
    const [loading, setLoading] = useState(false);
    const [selectedTime, setSelectedTime] = useState(dayjs('12:00', format));
    const [ModeRetrait, setModeRetrait] = useState();
    const [adresse, setAdresse] = useState('');
    const [codeEnvoyé, setCodeEnvoyé] = useState(false);
    const [jsonData, setjsonData] = useState<any>(null);
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [codeVrai, setCodeVrai] = useState(false);
    const [codeFalse, setCodeFalse] = useState(false);
    const [inputcode, setInputCode] = useState();
    const [phone, setphone] = useState();

    if (dataUser?.error) {
        onClose()
        toast.error("Veuillez vous connecter");
    }


    const handleEmporter = () => {
        setEmporter(!emporter)
        setLivrer(false)
    }

    const handleLivrer = () => {
        setLivrer(!livrer)
        setEmporter(false)
    }

    const handleValider = () => {
        if ((livrer && !adresse) || (livrer && !codeVrai)) {
            toast.error("Veuillez compléter tous les champs obligatoires");
            return;
        }
        localStorage.setItem("ModeRetrait", JSON.stringify({ "Time": selectedTime.format(format), "emporter": emporter, "livrer": livrer, "adresse": adresse }));
        onClose()
        window.location.href = `/menu/1`
    }

    const handleTimeChange = (time: any) => {
        setSelectedTime(time);
    };

    useEffect(() => {
        setModeRetrait(localStorage.getItem("ModeRetrait") !== null ? JSON.parse(localStorage.getItem("ModeRetrait") ?? '{}') : {})
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setBig(false)
            } else {
                setBig(true)
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleVerifCode = (inputcode: any) => {
        if (code === inputcode) {
            setCodeVrai(true);
        } else {
            setCodeFalse(true);
        }
    };

    function genererCode(): string {
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10).toString();
        }
        return code;
    }

    const onSubmitSMS: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (codeVrai && dataUser.télephone !== phone) {
                setIsLoading(true);

                const savePhoneRes = await fetch(`http://localhost:8080/api/user/saveTel/${dataUser.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phoneNumber: data.télephone }),
                });

                const savePhoneData = await savePhoneRes.json();
                if (savePhoneData.message === "succès") {
                    console.log("Phone number updated successfully");
                } else {
                    console.error("Failed to update phone number", savePhoneData);
                }

                setIsLoading(false);
            }

            const code = genererCode();
            setCode(code);
            setIsLoading(true);

            const sendSMSRes = await fetch(`http://localhost:8080/api/user/send_SMS`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: data.télephone,
                    message: `Pour réinitialiser votre mot de passe, merci de copier le code suivant: ${code}`,
                }),
            });

            const sendSMSData = await sendSMSRes.json();
            setjsonData(sendSMSData);

            if (sendSMSData.message === "Message envoyé avec succès") {
                setphone(data.télephone);
                setCodeEnvoyé(true);
            } else {
                console.error("Failed to send SMS", sendSMSData);
            }
        } catch (error) {
            console.error("An error occurred", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal
                open={Open}
                title="Modes de retrait"
                onCancel={onClose}
                footer={[
                    <Button
                        label='Valider'
                        key="link"
                        href=""
                        disabled={loading || (livrer && !codeVrai) || jsonData?.message === "compte inexistant" || jsonData?.message === "numéro inexistant"}
                        onClick={handleValider}
                    />
                ]}
            >
                <div className="flex z-30 gap-14 w-full justify-content justify-center font-semibold text-center mt-8">
                    <div className="grid gap-2 justify-content justify-center" onClick={handleEmporter}>
                        <HiOutlineShoppingBag size={100} className={emporter ? "rounded-full bg-green-500 text-white p-2" : "rounded-full bg-gray-800 text-white p-2"} />
                        <h1 className={emporter ? "text-green-500" : ""}>À emporter</h1>
                    </div>
                    <div className="grid gap-2 justify-content justify-center" onClick={handleLivrer}>
                        <TbTruckDelivery size={100} className={livrer ? "rounded-full bg-green-500 text-white p-2" : "rounded-full bg-gray-800 text-white p-2"} />
                        <h1 className={livrer ? "text-green-500" : ""}>En livraison</h1>
                    </div>
                </div>
                {livrer &&
                    <>
                        <input
                            id='adresse'
                            required
                            value={adresse}
                            type='text'
                            className='border border-gray-300 pl-8 relative text-md w-full p-2 text-gray-700 mt-4 mb-4 rounded-md focus:ring-2 focus:ring-blue-500'
                            placeholder='Votre Adresse'
                            onChange={(e) => setAdresse(e.target.value)}
                        />
                        <div className="flex relative gap-2 w-full mb-4">
                            <div className="relative w-full">
                                <Input
                                    id="télephone"
                                    required
                                    register={registerSMS}
                                    errors={errorsSMS}
                                    type="text"
                                    placeholder="Saisissez votre télephone"
                                    label="Télephone"
                                    Icon={IoIosPhonePortrait}
                                />
                            </div>
                            <button
                                onClick={handleSubmitSMS(onSubmitSMS)}
                                className='flex items-center justify-center p-2 my-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
                            >
                                <BsFillSendCheckFill size={25} />
                            </button>
                        </div>
                        {codeEnvoyé && (
                            <p className="text-green-500 p-1">
                                Votre code a été envoyé avec succès
                            </p>
                        )}
                        <div className="p-2">
                            {jsonData?.message === "compte inexistant" && (
                                <p className="text-red-500">Enregistrer de nouveau votre numéro</p>
                            )}
                        </div>
        {codeEnvoyé && (
        <div className="flex relative gap-2 h-full mb-4">
        <PiLockKeyThin size={30} className="absolute left-3 top-3 text-gray-400" />
        <input
            required
            type="text"
            placeholder="Saisissez votre code"
            onChange={(e:any) => setInputCode(e.target.value)}
            className='border-b-2 border-gray-300 pl-12 text-md w-full p-2 text-gray-700 rounded-md focus:ring-2 focus:ring-blue-500'
        />
        <button 
            onClick={() => handleVerifCode(inputcode)}
            className='flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
        >
            <MdOutlineVerifiedUser size={30} />
        </button>
        </div>
        )}
        {codeFalse && <p className="text-red-500">Verifier votre code</p>}
        {codeVrai && (
        <p className="text-green-500 p-1">
            Votre code a été vérifié avec succès
        </p>
        )}
        {codeVrai && jsonData?.message === "compte inexistant" && (
        <p className="text-green-500 p-1">
            Inscription
        </p>
        )}

    </>
}

            <div className={big? "flex flex-col gap-8 mt-2 mb-8" : "flex flex-col" }>
                <label htmlFor="" className="relative mb-2 border-[1px] text-center p-2">Aujourd'hui</label>
                <TimePickerApp  handleTimeChange={handleTimeChange}/>
            </div>
        </Modal>
        </>
    );
    };

export default ModeRetraitModal;