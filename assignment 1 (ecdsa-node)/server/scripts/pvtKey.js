const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");



const randomPvtKey = secp256k1.utils.randomPrivateKey();
const publickKey = secp256k1.getPublicKey(randomPvtKey);



// console.log("Private Key:==",toHex(randomPvtKey));
// console.log("Public Key:==",toHex(publickKey));




function getPublicKeyFromPrivateKey(pvtKeyArgs) {
  return secp256k1.getPublicKey(pvtKeyArgs);
}

module.exports = {getPublicKeyFromPrivateKey}


