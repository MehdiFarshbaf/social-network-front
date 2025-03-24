import { Controller } from "react-hook-form";
import {ClassName, FormComponentProps} from "@/interfaces/publlicInterfaces";


interface IProps extends FormComponentProps {
    name: string,
    label?: string,
    placeholder?: string,
    classNames?: {
        classContainer?: ClassName,
        classLabel?: ClassName,
        classInput?: ClassName,
        classError?: ClassName,
    }
}


const TextAreaInput = ({ name, control, errors, placeholder, label, classNames}:IProps) => {

    return (
        <div className={`container-input ${classNames?.classContainer}`}>
            {label && label?.length > 0 && <p className={`mb-2 font-normal text-base ${classNames?.classLabel}`}>{label}</p>}
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <textarea
                        placeholder={placeholder}
                        className={`text-area-input resize-none !min-h-10 ${classNames?.classInput}`}
                        value={value} rows={7}
                        onChange={onChange} // send value to hook form
                        onBlur={onBlur} // notify when input is touched
                    />
                )}
                name={name}
                control={control}
            />
            {/* {errors[name] && <p className={`text-red-700 ${classNames?.classError}`}>{errors[name]?.message}</p>} */}
            {errors[name] && <p className={`text-red-700 ${classNames?.classError}`}>{errors[name]?.message}</p>}
        </div>
    )
}
export default TextAreaInput