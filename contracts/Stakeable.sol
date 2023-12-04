// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

/**
 * @notice Stakeable is a contract who is ment to be inherited by other contract that wants Staking capabilities
 */
contract Stakeable {
    constructor() {
        // This push is needed so we avoid index 0 causing bug of index-1
        stakeholders.push();
    }

    struct Stakeholder {
        address user;
        uint256 amount;
        uint256 since;
    }

    Stakeholder[] internal stakeholders;
    mapping(address => uint256) internal stakes;

    event Staked(
        address indexed user,
        uint256 amount,
        uint256 index,
        uint256 timestamp
    );

    function _addStakeholder(address staker) internal returns (uint256) {
        // Push a empty item to the Array to make space for our new stakeholder
        stakeholders.push();
        // Calculate the index of the last item in the array by Len-1
        uint256 userIndex = stakeholders.length - 1;
        // Assign the address to the new index
        stakeholders[userIndex].user = staker;
        // Add index to the stakeHolders
        stakes[staker] = userIndex;
        return userIndex;
    }

    function _stake(uint256 _amount) internal {
        // Simple check so that user does not stake 0
        require(_amount > 0, "Cannot stake nothing");

        // Mappings in solidity creates all values, but empty, so we can just check the address
        uint256 index = stakes[msg.sender];
        // block.timestamp = timestamp of the current block in seconds since the epoch
        uint256 timestamp = block.timestamp;
        // See if the staker already has a staked index or if its the first time
        if (index == 0) {
            // This stakeholder stakes for the first time
            // We need to add him to the stakeHolders and also map it into the Index of the stakes
            // The index returned will be the index of the stakeholder in the stakeholders array
            index = _addStakeholder(msg.sender);
        }

        // Use the index to push a new Stake
        // push a newly created Stake with the current block timestamp.
        uint256 staked = stakeholders[index].amount;
        if (staked == 0) {
            staked = _amount;
        } else {
            staked = stakeholders[index].amount + _amount;
        }

        stakeholders[index].amount = staked;

        // Emit an event that the stake has occured
        emit Staked(msg.sender, _amount, index, timestamp);
    }

    function _unstake(uint256 _amount) internal {
        require(_amount > 0, "Cannot unstake nothing");
        uint256 userId = stakes[msg.sender];

        uint256 timestamp = block.timestamp;

        uint256 staked = stakeholders[userId].amount;

        stakeholders[userId].amount = staked - _amount;

        emit Staked(msg.sender, -_amount, userId, timestamp);
    }

    function stakedBalanceOf(address sender) public view returns (uint256) {
        uint256 userId = stakes[sender];

        return stakeholders[userId].amount;
    }
}
