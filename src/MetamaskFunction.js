import React, { useState } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

export default function MetamaskFunction() {
    const [state, setstate] = useState(false)
    console.log(window)
    const { ethereum } = window;

    const  loadEdit = async () => {
        try {
          await ethereum.request({ method: 'eth_requestAccounts',
          params: [{ chainId: '2020', rpcUrls: "[https://api.roninchain.com/rpc" }]});
          console.error("sucess");
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <div>
             <button
          onClick={loadEdit}
          className={`${state ? "connectedm" : "connectm"}`}
          disabled={state}
        >
          {state ? " Connected" : "Connect with axe wallet"}
        </button>
        </div>
    )
}
