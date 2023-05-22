// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {MinerTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/MinerTypes.sol";
import {CommonTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";
import {MinerAPI} from "@zondax/filecoin-solidity/contracts/v0.8/MinerAPI.sol";
import {BigInts} from "@zondax/filecoin-solidity/contracts/v0.8/utils/BigInts.sol";
import {FilAddresses} from "@zondax/filecoin-solidity/contracts/v0.8/utils/FilAddresses.sol";

contract Miner {
    address contractAdmin; // 部署合约权限
    address changeMinerOwnerAdmin; // 确认修改miner owner权限
    address changeBeneficiaryAdmin; // 确认修改beneficiary和提现权限

    constructor(address minerOwnerAdmin, address beneficiaryAdmin) payable {
        contractAdmin = msg.sender;
        changeBeneficiaryAdmin = beneficiaryAdmin;
        changeMinerOwnerAdmin = minerOwnerAdmin;
    }

    modifier onlyContractAdmin() {
        require(msg.sender == contractAdmin);
        _;
    }

    modifier onlyMinerOwnerAdmin() {
        require(msg.sender == changeMinerOwnerAdmin);
        _;
    }

    modifier onlyBeneficiaryAdmin() {
        require(msg.sender == changeBeneficiaryAdmin);
        _;
    }

    // receives origin token
    function receives() public payable {}

    // withdraw from contract to other address
    function withdraw(address payable addr) public onlyBeneficiaryAdmin {
        addr.transfer(address(this).balance);
    }

    function changeMinerOwner(uint64 target, bytes memory addr) public onlyMinerOwnerAdmin {
        CommonTypes.FilAddress memory _addr;
        _addr = CommonTypes.FilAddress(addr);
        CommonTypes.FilActorId _target;
        _target = CommonTypes.FilActorId.wrap(target);
        MinerAPI.changeOwnerAddress(_target, _addr);
    }

    function changeMinerBeneficiary(CommonTypes.FilActorId target, uint64 beneficiaryId, uint256 quota, CommonTypes.ChainEpoch expiration) public onlyBeneficiaryAdmin {
        MinerTypes.ChangeBeneficiaryParams memory changeParams = MinerTypes
            .ChangeBeneficiaryParams({
                new_beneficiary: FilAddresses.fromActorID(beneficiaryId),
                new_quota: BigInts.fromUint256(quota),
                new_expiration: expiration
            });
        MinerAPI.changeBeneficiary(target, changeParams);
    }

    // withdraw from miner to beneficiary address
    function withdrawBalance(uint64 target, uint256 params) public onlyBeneficiaryAdmin {
        CommonTypes.FilActorId _target;
        _target = CommonTypes.FilActorId.wrap(target);
        CommonTypes.BigInt memory bg;

        bg = BigInts.fromUint256(params);
        MinerAPI.withdrawBalance(_target, bg);
    }
}
