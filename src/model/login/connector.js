import { UAuthConnector } from '@uauth/web3-react'
import { InjectedConnector } from '@web3-react/injected-connector'
import UAuth from '@uauth/js'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
export const injected = new InjectedConnector({ supportedChainIds: [1] })


export const walletconnect = new WalletConnectConnector({
    infuraId: process.env.REACT_APP_INFURA_ID,
    qrcode: true,
})

export const uauth_recover = new UAuthConnector({
    uauth: new UAuth({
        clientID: process.env.REACT_APP_UD_CLIENT_ID,
        redirectUri: process.env.REACT_APP_UD_REDIRECT_URI,
        fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER,
        scope: 'openid wallet',
        connectors: { injected, walletconnect },
    }),
})

export const uauth = new UAuthConnector({
    clientID: process.env.REACT_APP_UD_CLIENT_ID,
    redirectUri: process.env.REACT_APP_UD_REDIRECT_URI,
    fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER,
    scope: 'openid wallet',
    connectors: { injected, walletconnect },
})

var connector = {
    uauth: uauth,
    injected: injected,
    walletconnect: walletconnect,
};

export default connector