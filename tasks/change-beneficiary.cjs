const fa = require("@glif/filecoin-address");
const { BigNumber } = require("ethers");

// 1. lotus-miner actor propose-change-beneficiary --really-do-it t410f7plyozcac4sg3z2ejrrisxkvltk6a3tdhh653iy 100 999999 发起将受益人设为合约地址
// 2. 该合约 confirm 
task("change-beneficiary", "change miner beneficiary")
    //.addParam("miner", "changed the beneficiary of the miner eg. t01021")
    //.addParam("beneficiary", "new beneficiary address eg. 11804 (t011804)")
    .setAction(async () => {

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

        //create a Miner contract factory
        const Miner = await ethers.getContractFactory("Miner", wallet)

        const FILPrecision = 1000000000000000000n
        const PrecisionBigNumber = BigNumber.from(FILPrecision)
        //this is what you will call to interact with the deployed contract
        // 该合约已经是节点的beneficiary，并且未过期或额度未用完，则要修改新的合约受益人，必须现有受益人合约同意，然后新受益人再confirm
        // 如果已有受益人合约已过期或额度用完，则新受益人合约可以直接修改
        // 调用以前的合约，必须编译旧合约代码，才能调用
        /* const MinerContract = await Miner.attach("0xFbD787644017246DE7444C62895d555cD5E06e63") // 11804
        const res = await MinerContract.changeBeneficiary(1021, 14291, PrecisionBigNumber.mul(10), 425915) */
        
        // 新受益人confirm,只有部署合约时设置的admin才能调用成功
        const MinerContract = await Miner.attach("0x1e737b87F79B02Ef48d6656706421d2995f6Ba70") // 14291
        const res = await MinerContract.changeMinerBeneficiary(1021, 14291, PrecisionBigNumber.mul(10), 425915)
       
        console.log(res)
        const receipt = await res.wait()
        console.log(receipt)

    })
