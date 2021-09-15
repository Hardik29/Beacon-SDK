import React, { useEffect } from "react";
import { Keypair } from '@solana/web3.js';

const message = `To avoid digital dognappers,
sign below to authenticate with CryptoCorgis`;
 

const getProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open("https://phantom.app/", "_blank");
};

function PhantomWallet() {

  var provider= {};

  useEffect(() => {
    provider = getProvider();
  }, [])
   
  
  useEffect(() => {
    if (provider) {
      provider.on("connect", () => {
        signMessage();
        console.log(provider.publicKey?.toBase58());
      });
    
  }
  }, [provider]);
  
  if (!provider) {
    return <h2>Could not find a provider</h2>;
  }
  async function signMessage (){
    const data = new TextEncoder().encode(message);
    try {
      const msg = await provider.signMessage(data);
      console.log(msg);
    } catch (err) {
      console.warn(err);
    }
  };
  async function disProvider() {
    provider.disconnect();
  }
  return (
    <div>
      <button
        onClick={async () => {
          try {
            const res = await provider.connect();
          } catch (err) {
            console.warn(err);
          }
        }}
      >
        Connect to Phantom
      </button>
    </div>
  );
}

export default PhantomWallet;
