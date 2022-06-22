import web3 from "./web3";
import Escrow from './build/Escrow.json';

const escrow = address => {
    return new web3.eth.Contract(
        Escrow.abi,
        address
    );
};
export default escrow;