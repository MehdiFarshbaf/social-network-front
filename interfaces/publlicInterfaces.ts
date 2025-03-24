import {HTMLProps, ReactNode} from "react";

export type ClassName = HTMLProps<HTMLElement>["className"]

export interface IClassName {
    className: HTMLProps<HTMLElement>["className"]
}
export type CallbackFunction  = (...args: any[]) => any;

export type ChildrenType = ReactNode

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