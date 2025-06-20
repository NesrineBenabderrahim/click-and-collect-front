"use client";
import { Input, Space } from "antd";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface DoubleInputAppProps {
id: string;
data?: any;
required?: boolean;
register: UseFormRegister<FieldValues>;
errors: FieldErrors;
}
const DoubleInputApp: React.FC<DoubleInputAppProps> = ({
data,
required,
id,
register,
errors,
}) => {
return (
    <Space direction="vertical">
    <Input
        id={id}
        addonBefore={data.PostalCode}
        defaultValue={data.Address}
        {...register(id, { required })}
        
        className={`justify-content  ${errors[id]? 'focus:border-rose-400':'border-slate-300'}`}
    />
    </Space>
);
};

export default DoubleInputApp;
