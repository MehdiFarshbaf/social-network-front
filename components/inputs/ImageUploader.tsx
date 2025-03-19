import { ClassName } from "@/interfaces/publlicInterfaces";
import {FC, FormEvent, useState} from "react";
import {Controller} from "react-hook-form";

import { MdOutlineCloudUpload } from "react-icons/md";


interface IProps {
    text?: string,
    name: string,
    control: any,
    errors: any,
    accept?: string,
    srcImage?: string,
    classNames?: {
        classContainer?: ClassName,
        classButton?: ClassName,
        classImage?: ClassName,
        classError?: ClassName,
    }
}

const ImageUploader: FC<IProps> = ({classNames, name, control, errors, srcImage,text}) => {

    const [preview, setPreview] = useState<any>(null)

    const loadImage = (e: any) => {
        const image = e.target.files[0]
        setPreview(URL.createObjectURL(image))
    }

    return (
        <div
            className={`w-full flex flex-col items-center justify-center rounded-xl ${classNames?.classContainer}`}>
            <div className="relative rounded-xl p-3 w-full min-h-[180px] border-dashed border-blue-500 border-[1px] flex justify-evenly items-center flex-col">
                {preview ? <img src={preview} alt="" className="w-[150px] h-[150px] object-cover" /> :
                   srcImage ? <img src={srcImage} alt="" className="w-[150px] h-[150px] object-cover" /> : <MdOutlineCloudUpload size="75" className="text-white" />}
                {srcImage?.length == 0  || !preview && <p className="text-white">{text}</p>}
                <Controller
                    render={({field: {onChange, onBlur, value, name, ref}}) => (
                        <label id='upload' className={`btn w-[120px] bg-[#2D68A2] px-6 mt-4 h-10 ${classNames?.classButton}`}>{preview ? "تغییر فایل":"انتخاب فایل"}
                            <input hidden id='upload' className="w-full h-full" type='file'
                                   accept="image/png, image/jpeg"
                                   onChange={(e: FormEvent<HTMLInputElement>) => {
                                       loadImage(e)
                                       //@ts-ignore
                                       onChange({ target: { value: e.target.files[0], name: name } })
                                   }}/>
                        </label>
                    )}
                    name={name}
                    control={control}
                />
            </div>
            {errors[name] && <p className={`text-red-700 ${classNames?.classError}`}>{errors[name].message}</p>}
        </div>
    )
}
export default ImageUploader