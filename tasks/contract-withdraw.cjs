task("contract-withdraw", "withdraw from contract")
    .setAction(
        async (taskArgs) => {
        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
        console.log(wallet.getBalance())
        //create a Miner contract factory
        const Miner = await ethers.getContractFactory("Miner", wallet)
        //this is what you will call to interact with the deployed contract
        const MinerContract = await Miner.attach("0x1e737b87F79B02Ef48d6656706421d2995f6Ba70")
        const res = await MinerContract.withdraw("0x4c5c8B3DDB6844eB535C77caCC23C89429622574")
        console.log(await res.wait())
    })