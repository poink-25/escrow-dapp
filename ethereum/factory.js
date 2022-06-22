import web3 from './web3';
import ContractFactory from './build/EscrowFactory.json';

const instance = new web3.eth.Contract(
    ContractFactory.abi,
    '0x2D03D8021B2B64D495378093bbd980B4BCD62523'
);

export default instance;
