const fa = require("@glif/filecoin-address");
const { Address } = require('@zondax/izari-tools');

const args = process.argv.splice(2)

function main() {
    switch (args[0]){
        case "" | "help":
            printHelp()
            break
        case "etf":
            ethaddrTofiladdr(args[1])
            break
        case "fte":
            filaddrToethaddr(args[1])
            break
        case "ath":
            filaddrToHex(args[1])
            break
        default:
            printHelp()
    }
}

function printHelp() {
    const helpMsg = `
node ./scripts/address.cjs cmd [addr]
cmd:
    help: Show this message
    etf:  Convert Eth address to Filecoin f410 address
    fte:  Convert Fil f410 address to Eth address
    fth:  Convert Fil f1/f3/f4 address to hex, used by fevm
`
    console.log(helpMsg)    
}

// Convert Eth address to Filecoin f410 address
function ethaddrTofiladdr(address) {
    try {
        let f4Address = fa.delegatedFromEthAddress(address);
        console.log("f4address:", f4Address);
    } catch(e) {
        console.log(e)
    }
}

// Convert Filecoin f410 address to Eth address
function filaddrToethaddr(address) {
    try {
        let ethAddress = fa.ethAddressFromDelegated(address);
        console.log("ethAddress: ", ethAddress)
    } catch(e) {
        console.log(e)
    }
}

// Convert Fil f1/f3 address to hex, used by fevm
function filaddrToHex(address) {
    try {
        const destination = Address.fromString(address);
        console.log(destination.toBytes().toString('hex'));
    } catch(e) {
        console.log(e)
    }
}


main()