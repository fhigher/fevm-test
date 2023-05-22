const { network } = require("hardhat")
require("hardhat-deploy")
require("hardhat-deploy-ethers")

const config = network.config
const private_key = config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

async function main() {
    console.log("Deploying by Wallet Ethereum Address:", wallet.address)
    console.log("ChainID: ", config.chainId)
    //deploy DealRewarder
    const m = await ethers.getContractFactory('Miner', wallet);
    console.log('Deploying Miner Contract...');
    const contract = await m.deploy("0x4c5c8B3DDB6844eB535C77caCC23C89429622574", "0x4c5c8B3DDB6844eB535C77caCC23C89429622574");
    await contract.deployed()
    console.log('contract address:', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});