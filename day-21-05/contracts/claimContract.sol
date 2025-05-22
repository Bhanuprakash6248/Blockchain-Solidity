// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClaimContract {
    uint256 public value;
    uint256 public setTime;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

  
    function setValue(uint256 _number) public {
        value = _number;
        setTime = block.timestamp;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function claimValue() public view returns (uint256 result, string memory message) {
        require(setTime > 0, "Value not set");
        require(block.timestamp >= setTime + 2*60*60, "You can only claim after 2 hours");

        result = value * 2;
        message = "Returned value doubled";
        
    }
}
