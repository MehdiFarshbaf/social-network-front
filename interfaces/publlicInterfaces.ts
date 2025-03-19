import {HTMLProps} from "react";

export type ClassName = HTMLProps<HTMLElement>["className"]

export interface IClassName {
    className: HTMLProps<HTMLElement>["className"]
}

export interface ResponseApi {
    success: boolean,
    message: string
}

export interface ID {
    _id: string
}




export interface FormComponentProps {
    control?: any
    errors?: any,
    setValue?: Function,
    getValues?: any
}

export type OptionSelect = { value: string, label: string }