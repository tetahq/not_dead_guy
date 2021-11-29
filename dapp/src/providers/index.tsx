import * as React from 'react'
import {ToastContainer} from 'react-toastify'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter} from 'react-router-dom'
import { MoralisProvider } from 'react-moralis'
import Config from '../config'

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <MoralisProvider appId={Config.moralis.appId} serverUrl={Config.moralis.serverUrl}>

        <BrowserRouter>
            <HelmetProvider>
                {children}

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    limit={3}
                />
            </HelmetProvider>
        </BrowserRouter>
        </MoralisProvider>
    )
}
