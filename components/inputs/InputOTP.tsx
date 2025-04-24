import { Controller } from "react-hook-form";
import { ClassName, FormComponentProps } from "@/interfaces/publlicInterfaces";
import { PinInput } from "@mantine/core";

interface IProps extends FormComponentProps {
  name: string;
  label?: string;
  disable?: boolean;
  placeholder?: string;
  classNames?: {
    classContainer?: ClassName;
    classInput?: ClassName;
    classError?: ClassName;
  };
}

const InputOTP = ({
  name = "",
  control,
  errors,
  placeholder = "",
  label = "",
  classNames,
  disable = false,setValue
}: IProps) => {
  return (
    <div className={`${classNames?.classContainer} flex-center flex-col`}>
      {label.length > 0 && (
        <p className="mb-2 font-normal text-base">{label}</p>
      )}
      <Controller
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <PinInput
            length={6}
            type="number"
            onChange={e=>{
              setValue(name,e)}}
            setValue={value}
            disable={disable}
            classNames={{ classInput: `inputClass ${classNames?.classInput}` }}
            onBlur={onblur}
          />
        )}
        name={name}
        control={control}
      />
      {errors[name] && (
        <p className={`text-red-700 mt-1 ${classNames?.classError}`}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};
export default InputOTP;
