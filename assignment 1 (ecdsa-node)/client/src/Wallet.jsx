import { useEffect, useState } from "react";
import server from "./server";

import {toHex} from "ethereum-cryptography/utils";
import {secp256k1} from "ethereum-cryptography/secp256k1";

function Wallet({ address, setAddress, balance, setBalance }) {

  let PvtKeys = [
    "c10557edefff72dc0c873e52cf45301b87e9cb2f306db4fbbf42e9f0c7d73ff6",
    "765e8d6f2c4eec3e29cc21d85efa90e721631503c65e4b83afa49cbc8e49b8cf",
    "1ea4794725c6d08f8ce62a010eafafa91374ed79664ec3de720aa6e8442c35b2",
  ]
  
  useEffect(()=>{
    if (address) {
      
      // console.log("address",address);
      setPublicKey(toHex(secp256k1.getPublicKey(address)));
    }

  },[address])

 const [publicKey,setPublicKey] = useState("");


  async function onChange(evt) {
    const address = evt.target.value;

    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>Select Private Keys</label>

        <select className="pvtKey" value={address} onChange={onChange}>
          
          {
            PvtKeys.map((ele,key)=>{
              return <option key={key} className="pvtKey" value={ele}>Account {key+1} ({ele})</option>
            })
          }
      
        </select>
          {
            address?<><label>Public Key is: {publicKey}</label>
          <div className="balance">Balance: {balance}</div></> :null
          }
         
    </div>
  );
}

export default Wallet;
