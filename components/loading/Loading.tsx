import {Loader} from '@mantine/core';

interface IProps {
    message?: string,
    type?: "bars" | "dots" | "oval",
    size?:number
}

const Loading = ({message,type,size}: IProps) => {
    return (
        <div className="w-full flex-center flex-col gap-5">
            <h2 className="font-bold text-white">{message ? message : "دریافت اطلاعات ..."}</h2>
            <Loader color="blue" size={size ? size : 30} type={type ? type : "oval"}/>
        </div>
    )
}
export default Loading