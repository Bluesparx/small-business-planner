const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SubscriptionService", function () {
  let owner, subscriber, subscriptionService;
  const subscriptionFee = ethers.parseUnits("0.1", "ether"); 
  const subscriptionDuration = 30 * 24 * 60 * 60; 

  beforeEach(async function () {
    [owner, subscriber] = await ethers.getSigners();
    const SubscriptionService = await ethers.getContractFactory("SubscriptionService");
    subscriptionService = await SubscriptionService.deploy(subscriptionFee, subscriptionDuration);
    // await subscriptionService.deployed();
  });

  it("Should allow a user to subscribe", async function () {
    const initialBalance = await ethers.provider.getBalance(subscriber.address);
    await subscriptionService.connect(subscriber).subscribe({ value: subscriptionFee });
    const subscriptionDetails = await subscriptionService.getSubscriptionDetails(subscriber.address);
    expect(subscriptionDetails.isActive).to.be.true;

    const finalBalance = await ethers.provider.getBalance(subscriber.address);
    
  });

  it("Should allow a user to renew their subscription", async function () {
   
    await subscriptionService.connect(subscriber).subscribe({ value: subscriptionFee });
    const initialExpiryTimestamp = (await subscriptionService.getSubscriptionDetails(subscriber.address)).expiryTimestamp;

    await ethers.provider.send("evm_increaseTime", [25 * 24 * 60 * 60]); 
    await ethers.provider.send("evm_mine");

    await subscriptionService.connect(subscriber).renewSubscription({ value: subscriptionFee });
    const { expiryTimestamp } = await subscriptionService.getSubscriptionDetails(subscriber.address);

    expect(expiryTimestamp).to.be.greaterThan(initialExpiryTimestamp);
  });

  it("Should allow a user to cancel their subscription", async function () {
    
    await subscriptionService.connect(subscriber).subscribe({ value: subscriptionFee });
    await subscriptionService.connect(subscriber).cancelSubscription();

    const subscriptionDetails = await subscriptionService.getSubscriptionDetails(subscriber.address);
    expect(subscriptionDetails.isActive).to.be.false;
  });
});
