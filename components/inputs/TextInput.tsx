import { Controller } from "react-hook-form";
import { FC } from "react";
import { ClassName, FormComponentProps } from "@/interfaces/publlicInterfaces";



interface IProps extends FormComponentProps {
    name: string,
    label?: string,
    placeholder?: string,
    type?: "text" | "email" | "password",
    classNames?: {
        classContainer?: ClassName,
        classInput?: ClassName,
        classError?: ClassName,
    }
}

const TextInput= ({ name = "", control, errors, placeholder = "", label = "", type = "text", classNames}:IProps) => {
    return (
        <div className={`${classNames?.classContainer}`}>
            {label.length > 0 && <p className="mb-2 font-normal text-base">{label}</p>}
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <input
                        type={type}
                        placeholder={placeholder}
                        className={`inputClass ${classNames?.classInput}`}
                        value={value || ''}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                    />
                )}
                name={name}
                control={control}
            />
            {errors[name] && <p className={`text-red-700 mt-1 ${classNames?.classError}`}>{errors[name]?.message}</p>}
        </div>
    )
}
export default TextInput