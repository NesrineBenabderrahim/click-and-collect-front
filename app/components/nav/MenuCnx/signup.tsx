"use client";
import { TiTick } from "react-icons/ti";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiLockKeyThin } from "react-icons/pi";

import Button from "../../form/Button";
import Input from "../../form/Input";
import { useState } from "react";

interface SignupProps {
handleMenuCnx: () => void;
isLoading: boolean;
setIsLoading: (val: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({
handleMenuCnx,
isLoading,
setIsLoading,
}) => {
const {
register: registerSignup,
handleSubmit: handleSubmitSignup,
formState: { errors: errorsSignup },
} = useForm<FieldValues>({
defaultValues: {
    nom: "",
    prénom: "",
    télephone: "",
    email: "",
    password: "",
},
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
setIsLoading(true);
const { password1, ...result } = data;
const res = await fetch("http://localhost:8080/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
});
console.log({ res });
const jsonData = await res.json();
setjsonData(jsonData);
console.log({ jsonData });
if (jsonData.message === "success") {
    handleMenuCnx();
}
};
return (
<>
    <Input
    id="nom"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="text"
    placeholder="Saisissez votre nom"
    label="Nom"
    Icon={FaUserCircle}
    />
    <Input
    id="prénom"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="text"
    placeholder="Saisissez votre prénom"
    label="Prénom"
    Icon={FaUserCircle}
    />
    <Input
    id="télephone"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="text"
    placeholder="06 12 34 56 78"
    label="Télephone"
    Icon={CiMobile3}
    />
    <Input
    id="email"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="email"
    placeholder="Saisissez votre e-mail"
    label="E-mail"
    Icon={MdOutlineMarkEmailRead}
    />
    <Input
    id="password"
    required
    register={registerSignup}
    errors={errorsSignup}
    type="password"
    placeholder="Saisissez votre mot de passe"
    label="Password"
    value={password}
    onChange={(e:any) => setPassword(e.target.value)}
    Icon={PiLockKeyThin}
    />
    <Input
    id="password1"
    register={registerSignup}
    errors={errorsSignup}
    type="password"
    placeholder="Comfirmez votre mot de passe"
    value={password1}
    onChange={(e:any) => setPassword1(e.target.value)}
    Icon={PiLockKeyThin}
    />
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

    <div className="w-full p-5">
    <Button
        label={isLoading ? "Loading" : "Je crée mon compte"}
        onClick={handleSubmitSignup(onSubmitSignup)}
        disabled={isButtonDisabled}
    />
    </div>
</>
);
};

export default Signup;
