// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MinerTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/MinerTypes.sol";
import {CommonTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";
import {MinerAPI} from "@zondax/filecoin-solidity/contracts/v0.8/MinerAPI.sol";
import {BigInts} from "@zondax/filecoin-solidity/contracts/v0.8/utils/BigInts.sol";
import {FilAddresses} from "@zondax/filecoin-solidity/contracts/v0.8/utils/FilAddresses.sol";

contract Miner {
    address owner;

    constructor() payable {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // receives origin token
    function receives() public payable {}

    // withdraw from contract to other address
    function withdraw(address payable addr) public onlyOwner {
        addr.transfer(address(this).balance);
    }

    function changeBeneficiary(CommonTypes.FilActorId target, uint64 beneficiaryId, uint256 quota, CommonTypes.ChainEpoch expiration) public onlyOwner {
        MinerTypes.ChangeBeneficiaryParams memory changeParams = MinerTypes
            .ChangeBeneficiaryParams({
                new_beneficiary: FilAddresses.fromActorID(beneficiaryId),
                new_quota: BigInts.fromUint256(quota),
                new_expiration: expiration
            });
        MinerAPI.changeBeneficiary(target, changeParams);
    }
}
