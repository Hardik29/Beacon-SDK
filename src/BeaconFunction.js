import React, { useState } from "react";
import { DAppClient, NetworkType } from "@airgap/beacon-sdk";

function BeaconFunction() {
  const [state, setstate] = useState(false);

  const options = {
    name: "MyAwesomeDapp",
    preferredNetwork: NetworkType.MAINNET,
  };

  const dAppClient = new DAppClient(options);

  async function loadEdit() {
    const activeAccount = await dAppClient.getActiveAccount();
    if (activeAccount) {
      console.log(activeAccount);
      console.log("Already connected:", activeAccount.address);
      setstate(true);
    } else {
      const permissions = await dAppClient
        .requestPermissions()
        .then(permissions => {
          console.log("New connection:", permissions.address);
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(permissions );
    }
  }
  function load() {
    dAppClient.clearActiveAccount();
    setstate(false);
  }

  return (
    <div className="App">
      <div>
        <button onClick={loadEdit} className="connect" disabled={state}>
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
