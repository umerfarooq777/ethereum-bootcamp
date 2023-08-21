const express = require("express");
const app = express();
const cors = require("cors");
// const { getPublicKeyFromPrivateKey } = require("./scripts/pvtKey");
const {toHex} = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const port = 3042;

app.use(cors());
app.use(express.json());

// Private Key:== c10557edefff72dc0c873e52cf45301b87e9cb2f306db4fbbf42e9f0c7d73ff6
// Public Key:== 025857e33fdecf4de265a5b493799343243678731f105e6534db8c69a6aa9a5779

// Private Key:== 765e8d6f2c4eec3e29cc21d85efa90e721631503c65e4b83afa49cbc8e49b8cf
// Public Key:== 039fd92871cafaede589ffc5df08f699c760494b824f7c8c5ebc2e42db73840169

// Private Key:== 1ea4794725c6d08f8ce62a010eafafa91374ed79664ec3de720aa6e8442c35b2
// Public Key:== 0348c6a59164ddf5cb3a8ca26975b5facbe6fa883d1aa560b8cc1e42e77b928c20

const balances = {
  "025857e33fdecf4de265a5b493799343243678731f105e6534db8c69a6aa9a5779": 100,
  "039fd92871cafaede589ffc5df08f699c760494b824f7c8c5ebc2e42db73840169": 50,
  "0348c6a59164ddf5cb3a8ca26975b5facbe6fa883d1aa560b8cc1e42e77b928c20": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  // const account = getPublicKeyFromPrivateKey(address)

  const account = toHex(secp256k1.getPublicKey(address));
  // console.log(address,account);
  const balance = balances[account] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
console.log(req.body);
  const publicKey = toHex(secp256k1.getPublicKey(sender));


  setInitialBalance(publicKey);
  setInitialBalance(recipient);

  if (balances[publicKey] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[publicKey] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[publicKey] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
