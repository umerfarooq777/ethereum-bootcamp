import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function AlwaysOpenExample({ transactions }) {

console.log(transactions);

  
  return (
    <div className="wrapper">
      <h3>Transactions:</h3>
      {transactions&&transactions.map((item,ind) => (
        <>
        <Card key={ind} style={{margin:"10px 0"}}>
      <Card.Header as="h5" style={{display:"flex",flexDirection:"column"}}>
<h6>Index: {item.transactionIndex}</h6>
<h6>Nonce: {item.nonce}</h6>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          From {item.from.slice(0,5)+"...."+item.from.slice(item.from.length-5,item.from.length)}
         {"===>"} 
          To {item.to.slice(0,5)+"...."+item.to.slice(item.to.length-5,item.to.length)
          }</Card.Title>
        <Card.Text>Value : {Number(item.value._hex?item.value._hex:0)} wei</Card.Text>
        <Card.Text>Gas Limit : {Number(item.gasLimit._hex?item.gasLimit._hex:0)} wei</Card.Text>
        <Card.Text>Gas Price : {Number(item.gasPrice._hex?item.gasPrice._hex:0)} wei</Card.Text>
        <Card.Text>Max Fee / Gas : {Number(item.maxFeePerGas?item.maxFeePerGas._hex:0)} wei</Card.Text>
        <Card.Text>Max Priority Fee / Gas : {Number(item.maxPriorityFeePerGas?item.maxPriorityFeePerGas._hex:0)} wei</Card.Text>
          {/* Gas Limit : {Number(item.gasLimit._hex)} wei
          Gas Price : {Number(item.gasPrice._hex)} wei
          Max Fee / Gas : {Number(item.maxFeePerGas._hex)} wei
          Max Priority Fee / Gas : {Number(item.maxPriorityFeePerGas._hex)} wei */}
        
      </Card.Body>
    </Card>
        </>
      ))}
     
    </div>
  );
}

export default AlwaysOpenExample;


