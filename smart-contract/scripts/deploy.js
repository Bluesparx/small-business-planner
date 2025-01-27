async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);

    const SubscriptionService = await ethers.getContractFactory("SubscriptionService");
    const subscriptionService = await SubscriptionService.deploy(
      ethers.parseUnits("0.1", "ether"),
      30 
    );
  
    console.log("SubscriptionService contract deployed to:", subscriptionService.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  