# escrow-dapp

A decentralized escrow web application using React and Next designed to work on the Ethereum Rinkeby test network.
This is my first blockchain project.

Each contract is created by the client and has a freelancer and arbiter address linked to it.
The client can send ether to the contract and then call a method to pay the freelancer.
The freelancer has the option to refund the client. The arbiter can do both.

Only works with Metamask on Rinkeby test network. Rinkeby test ether is required.
The app uses a pre-deployed factory contract. You can create and manage contracts associated with it.
To re-deploy factory, add your wallet mnemonic to .env file and run deploy script. Replace contract address in factory.js
