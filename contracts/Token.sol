// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TokenLock.sol";

contract MRTLANDTOKEN is ERC20, Ownable {

    Tokenlock nglLock;
    uint public tokenTradesStart = block.timestamp + 604800;

    constructor(uint256 initialSupply, Tokenlock _nglLock) ERC20("Motherland Knight", "MRTLAND") {
        _mint(msg.sender, initialSupply);
        nglLock = _nglLock;
    }

    // how many decimals the contract has
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        validateTransfer(from);
        super.transferFrom(from, to, amount);

        return  true;
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        validateTransfer(msg.sender);
        super.transfer(to, amount);
        return true;
    }

    function setTradesStart(uint timestamp) onlyOwner public {
        tokenTradesStart = timestamp;
    }

    function validateTransfer(address addr) public view {
        bool status = nglLock.addressStatus(addr);
        if (status == true) {
            require(block.timestamp > tokenTradesStart);
        }
    }

}