// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SILVERToken is ERC20 {
    constructor() ERC20("SILVER", "SLV") {
        _mint(msg.sender, 10000*10*decimals());
    }
}