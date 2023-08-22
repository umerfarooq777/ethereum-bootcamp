const express = require('express');

const port = 1225;

const app = express();
app.use(express.json());


//!======


const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list 
// const name = 'Norman Block';
// const index = niceList.findIndex(n => n === name);
// const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
// console.log( verifyProof(proof, name, root) ); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
//!======

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = root;

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {clientProof,name} = req.body;
  // console.log(body.clientProof);

  // TODO: prove that a name is in the list 
  // const isInTheList = false;
  if(verifyProof(clientProof, name, MERKLE_ROOT)) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
