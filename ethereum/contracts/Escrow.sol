// SPDX-License-Identifier: ISC

pragma solidity ^0.8.0;

contract EscrowFactory {
    address[] public contracts;

    function createContract(address payable freelancer, address arbiter) public{
        address newContract = address(new Escrow(payable(msg.sender), freelancer, arbiter));
        contracts.push(newContract);
    }

    function getDeployedContracts() public view returns (address[] memory) {
        return contracts;
    }
}

contract Escrow {

  address payable public client;
  address payable public freelancer;
  address public arbiter;
  
  constructor(address payable _client, address payable _freelancer, address _arbiter) {
    client = _client;
    freelancer = _freelancer;
    arbiter = _arbiter;
  }
  
  event Received(address, uint);
    receive() external payable {
      emit Received(msg.sender, msg.value);
    }

  function payoutToFreelancer() public {
    if(msg.sender == client || msg.sender == arbiter) {
      freelancer.transfer(address(this).balance);
    }
  }
  
  function refundToClient() public {
    if(msg.sender == freelancer || msg.sender == arbiter) {
      client.transfer(address(this).balance);
    }
  }
  
  function getBalance(
    ) public view returns(uint256) {
        return address(this).balance;
    }
}