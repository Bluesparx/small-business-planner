// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionService {
    address public owner;
    uint256 public subscriptionFee;
    uint256 public interval;
    
    struct Subscription {
        uint256 expiryTimestamp;
        bool isActive;
    }
    
    mapping(address => Subscription) public subscriptions;
    uint256 public totalSubscribers;

    event SubscriptionPurchased(address subscriber, uint256 expiryTimestamp);
    event SubscriptionRenewed(address subscriber, uint256 expiryTimestamp);
    event SubscriptionCancelled(address subscriber);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _subscriptionFee, uint256 _intervalInDays) {
        owner = msg.sender;
        subscriptionFee = _subscriptionFee;
        interval = _intervalInDays * 1 days;
    }

    function subscribe() external payable {
        require(msg.value >= subscriptionFee, "Insufficient payment");
        require(!subscriptions[msg.sender].isActive, "Subscription already active");
        
        subscriptions[msg.sender] = Subscription({
            expiryTimestamp: block.timestamp + interval,
            isActive: true
        });
        
        totalSubscribers++;
        emit SubscriptionPurchased(msg.sender, block.timestamp + interval);
    }

    function renewSubscription() external payable {
        require(msg.value >= subscriptionFee, "Insufficient payment");
        require(subscriptions[msg.sender].isActive, "No active subscription");
        
        subscriptions[msg.sender].expiryTimestamp = block.timestamp + interval;
        
        emit SubscriptionRenewed(msg.sender, block.timestamp + interval);
    }

    function cancelSubscription() external {
        require(subscriptions[msg.sender].isActive, "No active subscription");
        
        subscriptions[msg.sender].isActive = false;
        totalSubscribers--;
        
        emit SubscriptionCancelled(msg.sender);
    }

    function checkSubscription(address subscriber) external view returns (bool) {
        return subscriptions[subscriber].isActive && 
               block.timestamp <= subscriptions[subscriber].expiryTimestamp;
    }

    function getSubscriptionDetails(address subscriber) external view returns (
        bool isActive, 
        uint256 expiryTimestamp, 
        uint256 remainingTime
    ) {
        Subscription memory sub = subscriptions[subscriber];
        isActive = sub.isActive && block.timestamp <= sub.expiryTimestamp;
        expiryTimestamp = sub.expiryTimestamp;
        remainingTime = isActive ? sub.expiryTimestamp - block.timestamp : 0;
    }

    receive() external payable {}
}
