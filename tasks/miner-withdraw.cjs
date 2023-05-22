const { BigNumber } = require("ethers");

// miner的owner或beneficiary地址为合约时，从miner提到合约地址
task("miner-withdraw", "withdraw from miner")
    .setAction(async (taskArgs) => {

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
        console.log(wallet.getBalance())

        //create a SimpleCoin contract factory
        const Miner = await ethers.getContractFactory("Miner", wallet)
        //create a SimpleCoin contract instance 
        //this is what you will call to interact with the deployed contract
        const MinerContract = await Miner.attach("0x1e737b87F79B02Ef48d6656706421d2995f6Ba70")

        // let target = fa.newIDAddress(1021).bytes

        const FILPrecision = 1000000000000000000n
        const PrecisionBigNumber = BigNumber.from(FILPrecision)
        let res = await MinerContract.withdrawBalance(1021, PrecisionBigNumber.mul(1))

        const receipt = await res.wait()
        console.log(receipt)

    })