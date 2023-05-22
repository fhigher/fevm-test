const fa = require("@glif/filecoin-address");
const { BigNumber } = require("ethers");

task("change-owner", "change miner owner")
    // .addParam("miner", "changed miner id eg. 1017  (f01017)")
    // .addParam("newowner", "new owner id")
    .setAction(async (taskArgs) => {

        // let target = fa.newIDAddress(taskArgs.minerID).bytes
        let target = fa.newIDAddress(1017).bytes
        // let _to = fa.newIDAddress(taskArgs.newID).bytes
        let _to = fa.newIDAddress(11711).bytes

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
        console.log(wallet.getBalance())

        //create a Miner contract factory
        const Miner = await ethers.getContractFactory("Miner", wallet)

        //this is what you will call to interact with the deployed contract
        const MinerContract = await Miner.attach("0x5Aa0BE80A8B645217015EF92f11BF073d98b0c6C")

        const res = await MinerContract.changeMinerOwner(target, _to)
        console.log(res)
        const receipt = await res.wait()
        console.log(receipt)

    })
