import {Loader} from '@mantine/core';

interface IProps {
    type?: "bars" | "dots" | "oval",
    size?:number
}
const SpinnerButton=({type,size}:IProps)=>{
    return(
        <Loader color="inherit" size={size ? size : 20} type={type ? type : "oval"}/>
    )
}
export default SpinnerButton