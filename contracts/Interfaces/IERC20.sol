// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IKeepCodingCoin is IERC20{

    function transferCoin(address _receiver, uint256 _amount) external;

}

