// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Tokenlock is Ownable {
    mapping(address => bool) allowed;

    function lockAddress(address _addr) public {
        allowed[_addr] = true;
    }

    function unlockAddress(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    function addressStatus(address _addr) public view returns(bool) {
        return allowed[_addr];
    }
}