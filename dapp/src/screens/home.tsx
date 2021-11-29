import * as React from 'react'
import { useMoralis } from "react-moralis";

const EnableWeb3 = () => {
    const {  enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()

    if(isWeb3Enabled){
        return null
    }

    return <div>
        {web3EnableError && web3EnableError.message}
        <button onClick={() => enableWeb3()} disabled={isWeb3EnableLoading}>Enable web3 via Metamask</button>
    </div>
}

export default function Home() {
    const { chainId,account,authenticate, isAuthenticated, user, logout } = useMoralis();

    if (!isAuthenticated) {
        return (
            <div>
                <button onClick={() => authenticate({ signingMessage: "Hello World!" })}>Giriş Yap</button>
            </div>
        );
    }

    return (
        <div>
            <EnableWeb3/>
            <h1>Welcome {user?.getUsername()}</h1>
            <h2>Your Account: {account}</h2>
            <h2>Chain Id: {chainId}</h2>
            <h2>Your email: {user?.getEmail()}</h2>
            <h2>Your session token: {user?.getSessionToken()}</h2>
            <button onClick={() => logout()}>Çıkış Yap</button>
        </div>
    );
}
