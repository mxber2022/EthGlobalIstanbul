// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ParkPlaceDapp {
    address public owner;
    uint256 public parkingRate;
    mapping(address => uint256) public pendingPayments;
    mapping(address => uint256) public parkingStartTime;

    event PaymentPending(address indexed user, uint256 amount);
    event PaymentCompleted(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _parkingRate) {
        owner = msg.sender;
        setParkingRate(_parkingRate);
    }

    function setParkingRate(uint256 _parkingRate) public onlyOwner {
        parkingRate = _parkingRate;
    }

    function requestParking() external payable {
        require(msg.value > 0, "Sent value must be greater than 0");

        address user = msg.sender;

        // Store the payment as pending
        pendingPayments[user] += msg.value;
        parkingStartTime[user] = block.timestamp;

        emit PaymentPending(user, msg.value);
    }

    function provideParking() external onlyOwner {
        address user = msg.sender;
        uint256 userPendingPayment = pendingPayments[user];
        require(userPendingPayment > 0, "No pending payment for this user");

        uint256 elapsedTime = block.timestamp - parkingStartTime[user];
        uint256 totalPayment = elapsedTime * parkingRate;

        // Ensure the payment is not more than the pending amount
        uint256 actualPayment = totalPayment < userPendingPayment ? totalPayment : userPendingPayment;

        // Send the payment to the user
        payable(user).transfer(actualPayment);
        emit PaymentCompleted(user, actualPayment);

        // Deduct the payment from the pending amount
        pendingPayments[user] -= actualPayment;
    }

    function cancelParking() external {
        address user = msg.sender;
        uint256 userPendingPayment = pendingPayments[user];
        require(userPendingPayment > 0, "No pending payment for this user");

        // Refund the user
        payable(user).transfer(userPendingPayment);
        emit PaymentCompleted(user, userPendingPayment);

        // Clear the pending payment
        pendingPayments[user] = 0;
    }
}
