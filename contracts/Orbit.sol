// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./ERC20/ERC20.sol";
import "./Stakeable.sol";

contract Orbit is ERC20, Stakeable {
    constructor() ERC20("Orbit", "ORB") {
        _setupDecimals(18);
        _mint(msg.sender, 10 * (10**uint256(decimals())));
    }

    function mint() public returns (bool) {
        _mint(msg.sender, 1000);
        return true;
    }

    /**
     * Stake amount and burn it
     *
     */
    function stake(uint256 _amount) public {
        // Make sure staker actually is good for it
        require(
            _amount < balanceOf(msg.sender),
            "Orbit: Cannot stake more than you own"
        );

        _stake(_amount);

        _burn(msg.sender, _amount);
    }

    /**
     * Unstake amount and mint it
     *
     */
    function unstake(uint256 _amount) public {
        // Make sure staked balance is bigger or equal to the withdraw amount
        require(
            _amount <= stakedBalanceOf(msg.sender),
            "Orbit: Cannot unstake more than your current staked amount"
        );

        _unstake(_amount);

        _mint(msg.sender, _amount);
    }
}
