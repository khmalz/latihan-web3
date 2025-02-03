// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Savings {
    address payable public owner;
    uint private totalDeposited;

    event Deposit(address indexed depositor, uint amount, uint timestamp);
    event Withdrawal(uint amount, uint timestamp);

    struct DepositInfo {
        address depositor;
        uint amount;
        uint timestamp;
    }

    DepositInfo[] public deposits;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function deposit() public payable {
        require(msg.value > 0, "Must send some ETH");

        deposits.push(
            DepositInfo({
                depositor: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp
            })
        );

        totalDeposited += msg.value;

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public onlyOwner {
        uint amount = address(this).balance;
        require(amount > 0, "No funds available");

        owner.transfer(amount);
        totalDeposited = 0;

        emit Withdrawal(amount, block.timestamp);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getDeposits() public view returns (DepositInfo[] memory) {
        return deposits;
    }

    function getDeposit(uint index) public view returns (DepositInfo memory) {
        require(index < deposits.length, "Index out of bounds");
        return deposits[index];
    }

    function getTotalDeposited() public view returns (uint) {
        return totalDeposited;
    }

    receive() external payable {
        deposit();
    }
}
