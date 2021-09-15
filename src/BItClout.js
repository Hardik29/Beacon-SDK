import React from 'react'

function initLogin() {
   
    return new Promise(function (resolve, reject) {
        function login() {
          identityWindow = window.open('https://identity.bitclout.com/log-in?accessLevelRequest='+accessLevel, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
        }
    
        function handleInit(e) {
          if (!init) {
            init = true;
            console.log(e)
            for (const e of pendingRequests) {
              e.source.postMessage(e, "*");
            }
    
            pendingRequests = []
            pm_id = e.data.id
            source = e.source
          }
          respond(e.source, e.data.id, {})
        }
    
        function handleLogin(payload) {
          user = payload['users'][payload.publicKeyAdded]
          user['publicKey'] = payload.publicKeyAdded;
          if (identityWindow) {
            if (JWT === false) {
              identityWindow.close();
              identityWindow = null;
              resolve(user)
            } else {
              payload = {
                accessLevel: user.accessLevel,
                accessLevelHmac: user.accessLevelHmac,
                encryptedSeedHex: user.encryptedSeedHex
              };
              source.postMessage({
                id: pm_id,
                service: 'identity',
                method: 'jwt',
                payload: payload
              }, "*");
            }
          }
        }
    
        function handleJWT(payload) {
          user['jwt'] = payload['jwt'];
          if (identityWindow) {
            identityWindow.close();
            identityWindow = null;
          }
          resolve(user);
        }
    
        function respond(e, t, n) {
          e.postMessage({
            id: t,
            service: "identity"
          }, "*")
        }
    
        window.addEventListener('message', message => {
          const { data: { id, method, service, payload} } = message;
          console.log(id);
          console.log(method);
          console.log(payload);

          if (service !== "identity"){ return };
    
          if (method === 'initialize') {
            handleInit(message);
          } else if (method === 'login') {
            handleLogin(payload);
          } else if ('jwt' in payload) {
            handleJWT(payload);
          }
        });
    
        var init = false;
        var pm_id = ''
        var source = null;
        var user = null;
        var pendingRequests = [];
        var identityWindow = null;
        const accessLevel = 4;
        const JWT = true;
        login()
      });
    }
    
const BItClout = (props) => {
return (
        <>
        <button onClick={initLogin} >
        BitClout
        </button>
        </>
    )
}
export default BItClout