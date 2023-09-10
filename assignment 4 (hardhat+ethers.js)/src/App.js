import { Alchemy, Network } from 'alchemy-sdk';
import React,{ useEffect, useState } from 'react';
// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
// } from '@chakra-ui/react'
import './App.css';
import AlwaysOpenExample from './components/accordian.js';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setTransactions] = useState(null);
  const [numberInput, setNumberInput] = useState(0); // Set initial value to 0

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    

    getTransactions(blockNumber);
  
  },[blockNumber]);

  async function getTransactions(num) {
    if (blockNumber>0) {
      setTransactions(null)
      setTransactions(await alchemy.core.getBlockWithTransactions(num));
    }

  }



  const handleNumberChange = event => {
    const newValue = parseInt(event.target.value, 10); 
    setNumberInput(newValue);
    getTransactions(newValue);
    
  };

  return (<>
  
  <div className="App">
    Block Number: { numberInput || blockNumber}</div>
    <input
        type="number"
        value={numberInput||blockNumber}
        onChange={handleNumberChange}
      />
    {
      block ?
<AlwaysOpenExample transactions={block&&block.transactions.length>0&&block.transactions}/>:<p>NO BLOCK FOUND</p>
    }
    

  </>
    );
}

export default App;
