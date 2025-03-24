import { ClassName, FormComponentProps, OptionSelect } from "@/interfaces/publlicInterfaces";
import { FC } from "react"

import { Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";

interface IProps extends FormComponentProps {
    name: string,
    label?: string,
    placeholder?: string,
    isLoading?: boolean,
    list: OptionSelect[],
    classNames?: {
        classContainer?: ClassName,
        classInput?: ClassName,
        classError?: ClassName,
    }
}


const SelectInput: FC<IProps> = ({ classNames, name, list, control, isLoading, placeholder, label, errors }) => {
    return (
        <div className={`${classNames?.classContainer}`}>
            {label?.length > 0 && <p className="mb-2 font-normal text-base">{label}</p>}
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Select options={list} classNamePrefix="select"
                        components={{
                            IndicatorSeparator: null
                        }}
                        onChange={(value: SingleValue<OptionSelect>) => onChange(value?.value)}
                        value={list.find(ele => ele.value === value)}
                        placeholder={placeholder}
                        classNames={{
                            control: ({ isFocused }) => isFocused ? '!h-[38px] !w-full  !border-[1px]  !rounded-md outline-none ' : '!h-[38px] !w-full  !border-[1px]  !rounded-md outline-none ',
                            // placeholder: () => "!text-white",
                            // input: () => "!text-white",
                            // valueContainer: () => "!text-white",
                            // singleValue: () => "!text-white",
                            // indicatorsContainer: () => "!text-white",
                            menu:()=>"!text-black"
                        }}
                        isLoading={isLoading}
                    />
                )}
                name={name}
                control={control}
            />
            {errors[name] && <p className={`text-red-700 ${classNames?.classError}`}>{errors[name]?.message}</p>}
        </div>
    )
}
export default SelectInput