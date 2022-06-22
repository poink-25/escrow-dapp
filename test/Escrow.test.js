const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/EscrowFactory.json');
const compiledEscrow = require('../ethereum/build/Escrow.json');

let accounts;
let factory;
let escrowAddress;
let escrow;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000'});
    
    await factory.methods.createContract(accounts[1], accounts[2]).send({
        from: accounts[0],
        gas: '1000000'
    });
    
    [escrowAddress] = await factory.methods.getDeployedContracts().call();
    escrow = await new web3.eth.Contract(
        compiledEscrow.abi,
        escrowAddress
    );
});

describe('Factory and escrow deployment', () => {
    it('deploys a factory and an escrow', () => {
        assert.ok(factory.options.address);
        assert.ok(escrow.options.address);
    });
    
    it('has a correct client address', async () => {
      const clientAddress = await escrow.methods.client().call();
      assert.equal(clientAddress, accounts[0]);
    });
    it('has a correct freelancer address', async () => {
      const freelancerAddress = await escrow.methods.freelancer().call();
      assert.equal(freelancerAddress, accounts[1]);
    });
    it('has a correct arbiter address', async () => {
      const arbiterAddress = await escrow.methods.arbiter().call();
      assert.equal(arbiterAddress, accounts[2]);
    });
});

describe('Escrow payment', () => {
    it('receives payment', async () => {
        await web3.eth.sendTransaction({ from: accounts[0], to: escrow.options.address, gas: '1000000', value: web3.utils.toWei("0.05", "ether")});
    });
    it('returns balance', async () => {
        await web3.eth.sendTransaction({ from: accounts[0], to: escrow.options.address, gas: '1000000', value: web3.utils.toWei("0.05", "ether")});
        const currentBalance = await escrow.methods.getBalance().call();
        assert.equal(currentBalance, web3.utils.toWei("0.05", "ether"));
    });
});
    
describe('Escrow interaction', () => {
    it('pays freelancer by client', async () => {
        await escrow.methods.payoutToFreelancer().send({ from: accounts[0] });
    });
    it('refunds client by freelancer', async () => {
        await escrow.methods.refundToClient().send({ from: accounts[1] });
    });
    it('pays freelancer by arbiter', async () => {
        await escrow.methods.payoutToFreelancer().send({ from: accounts[2] });
    });
    it('refunds client by arbiter', async () => {
        await escrow.methods.refundToClient().send({ from: accounts[2] });
    });
});
