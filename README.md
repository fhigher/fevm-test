## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Transfer FIL and ETH address 
```
node ./scripts/address.cjs cmd [addr]
cmd:
    help: Show this message
    etf:  Convert Eth address to Filecoin f410 address
    fte:  Convert Fil f410 address to Eth address
    fth:  Convert Fil f1/f3/f4 address to hex, used by fevm
```