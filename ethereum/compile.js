const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // removes the folder
fs.ensureDirSync(buildPath); // checks if directory exists, otherwise it creates it.
 
 
const contractPath = path.resolve(__dirname, "contracts", "Escrow.sol");
const source = fs.readFileSync(contractPath, "utf8");
 
const input = {
  language: "Solidity",
  sources: {
    "Escrow.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Escrow.sol"];
console.log(output);
 
for(let contract in output){
  console.log(contract);
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}