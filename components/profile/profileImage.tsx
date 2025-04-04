'use client'

import {FormEvent, useEffect, useState} from "react";
import {useChangeProfileImageMutation} from "@/data/services/User";
import {showSuccessMessage} from "@/utils/notifications";

interface IProps {
    profileImage: string,
    enableEdit:boolean
}

const ProfileImage = ({profileImage,enableEdit}: IProps) => {


    const [changeImage,resultChangeImage]=useChangeProfileImageMutation()

    const [preview, setPreview] = useState<any>(null)
    const [file, setFile] = useState<File|null>(null)

    const loadImage = (e: any) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
        changeImage({image})
    }

    useEffect(() => {
        if(resultChangeImage?.data?.success === true){
            showSuccessMessage(resultChangeImage?.data?.message)
        }
    }, [resultChangeImage]);

    return (

        <div className="flex-center flex-col">
            <div className="relative w-[130px] h-[130px] rounded-full">
                <img
                    src={preview ? preview : profileImage}
                    alt="user image"
                    className="w-[130px] h-[130px] rounded-full object-cover"
                />
            </div>
            {enableEdit && <label id='upload' className={`btn flex-center text-xs mx-auto bg-blue-400 text-white px-6 mt-2 h-8`}>تغییر
                عکس
                <input hidden id='upload' className="w-full h-full" type='file'
                       accept="image/png, image/jpeg"
                       onChange={(e: FormEvent<HTMLInputElement>) => {
                           loadImage(e)
                           //@ts-ignore
                           onChange({target: {value: e.target.files[0], name: "image"}})
                       }}/>

            </label>}
        </div>
    )
}
export default ProfileImage