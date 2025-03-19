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
                            control: ({ isFocused }) => isFocused ? '!h-[38px] !w-full !text-white !bg-currentLine !border-[1px] !border-PURPLE !rounded-md outline-none text-white' : '!h-[38px] !w-full !bg-currentLine !text-white !border-[1px] !border-PURPLE !rounded-md outline-none text-white',
                            placeholder: () => "!text-white",
                            // input: () => "!text-white",
                            // valueContainer: () => "!text-white",
                            singleValue: () => "!text-white",
                            indicatorsContainer: () => "!text-white"
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