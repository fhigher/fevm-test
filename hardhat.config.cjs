require("@nomicfoundation/hardhat-toolbox")
require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const LOTUS_API = process.env.LOTUS_API
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "calibration",
    networks: {
        calibration: {
            chainId: 314159,
            url: LOTUS_API,
            accounts: [PRIVATE_KEY],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
