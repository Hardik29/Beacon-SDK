import React, { useState } from "react";
import { DAppClient, NetworkType, SigningType } from "@airgap/beacon-sdk";

function BeaconFunction() {
  const [state, setstate] = useState(false);

  const options = {
    name: "MyAwesomeDapp",
    preferredNetwork: NetworkType.MAINNET,
  };

  const dAppClient = new DAppClient(options);

  async function loadEdit() {
    console.log(dAppClient);
    const activeAccount = await dAppClient.getActiveAccount();
    if (activeAccount) {
      console.log(activeAccount);
      console.log("Already connected:", activeAccount.address);
      setstate(true);
    } else {
      const permissions = await dAppClient
        .requestPermissions()
        .then((permissions) => {
          const response = dAppClient
            .requestSignPayload({
              signingType: SigningType.RAW,
              payload: "Hiii vhfghh",
            })
            .then((response) => {
              console.log(`Signature: ${response.signature}`);
              console.log("New connection:", permissions.address);
              setstate(true);
            })
            .catch((err) => {
              console.log(err);
              console.log("New connection:", permissions.address);
              setstate(true);
            })
            
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(permissions);
    }
  }
  async function load() {
    await dAppClient.clearActiveAccount();
    setstate(false);
  }

  return (
    <div className="App">
      <div>
        <button
          onClick={loadEdit}
          className={`${state ? "connected" : "connect "}`}
          disabled={state}
        >
          {state ? " Connected" : "Connect with tezos wallet"}
        </button>
      </div>
      <div>
        <button className="clear" onClick={load}>
          Clear With Tezos Wallet
        </button>
      </div>
    </div>
  );
}

export default BeaconFunction;
