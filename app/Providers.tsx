'use client'

import { store } from "@/data/store"
import { FC, Fragment, ReactNode } from "react"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

interface IProps {
    children: ReactNode
}

const Providers: FC<IProps> = ({ children }) => {
    return (
        <Fragment>
            <Provider store={store}>
                {children}
                <ToastContainer />
            </Provider>
        </Fragment>
    )
}

export default Providers