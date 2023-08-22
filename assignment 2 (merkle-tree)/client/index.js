const axios = require('axios');

const serverUrl = 'http://localhost:1225';

//!======


const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
// const verifyProof = require('../utils/verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list 

//!===================================== uncomment on of the given name below
const name = 'Norman Block';
// const name = 'Sidney Kertzmannsiodsjs';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
// console.log( verifyProof(proof, name, root) ); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
//!======

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const clientProof = proof;

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    clientProof,name
  });

  console.log({ gift });
}

main();