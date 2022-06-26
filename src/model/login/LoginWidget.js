import React, { useState } from 'react'
import { injected, uauth, uauth_recover } from './connector';
import { useWeb3React } from "@web3-react/core"

function LoginWidget(props) {
    const [isConnected, setIsConnected] = useState(false);
    const [domain, setDomain] = useState("");
    const [udLoginState, setUdLoginState] = useState(0);
    recoverLogin(isConnected, setDomain, setIsConnected);

    return isConnected ? (
        <div className='user-frame'>

            <div className='btn-user noselect' onClick={() => logout(props.web3ReactHook, setIsConnected, setDomain)}>
                <p>{domain}</p>
                <div className='icon-logout noselect'>
                    <img src='/images/icons/logout_ic.png' />
                </div>
            </div>
        </div>
    ) : (
        <img
            src={getUdLoginButton(udLoginState)}
            onMouseOver={() => setUdLoginState(1)}
            onMouseLeave={() => setUdLoginState(0)}
            onMouseDown={() => setUdLoginState(2)}
            className={["ud-login"].join(" ")}
            onClick={() => connectUD(props.web3ReactHook)}
        />
    );
}

async function connectUD(web3ReactHook) {
    injected.deactivate();
    web3ReactHook.activate(uauth, null, true).then(async (res) => {
        uauth.getAccount().then((account) => {
            uauth.uauth.user().then((user) => {
                window.location.href = "/gensound"
            });
        })
            .catch((e) => {
                alert(e);
                console.error(e);
            });
    })
        .catch((e) => {
            alert(e);
            console.error(e);
        });
}

function logout(web3ReactHook, setIsConnected, setDomain) {
    setIsConnected(false);
    setDomain("");
    uauth_recover.uauth.logout();
    web3ReactHook.deactivate();
    injected.deactivate();
    uauth.deactivate();
    localStorage.clear();
    window.location.reload(false);
    window.location.href = "/"
}

function withUseWeb3React(Component) {
    return function WrappedComponent(props) {
        const values = useWeb3React();
        return <Component {...props} web3ReactHook={values} />;
    };
}

function recoverLogin(isConnected, setDomain, setIsConnected) {
    uauth_recover.uauth
        .user()
        .then((data) => {
            if (data) {
                if (isConnected === false) {
                    setIsConnected(true);
                    setDomain(data.sub);
                }
            } else {
            }
        })
        .catch((_err) => { });
}

function getUdLoginButton(state) {
    switch (state) {
        case 0:
            return "/images/login/ud_default.png";
        case 1:
            return "/images/login/ud_hover.png";
        case 2:
            return "/images/login/ud_pressed.png";
    }
}

export default withUseWeb3React(LoginWidget);