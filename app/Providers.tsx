'use client'

import { store } from "@/data/store"
import { FC, Fragment, ReactNode } from "react"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

interface IProps {
    children: ReactNode
}

const Providers: FC<IProps> = ({ children }) => {
    return (
        <Fragment>
            <Provider store={store}>
                <ColorSchemeScript />
                <MantineProvider>
                    {children}
                    <ToastContainer />
                </MantineProvider>
            </Provider>
        </Fragment>
    )
}

export default Providers