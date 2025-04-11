const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const provider = hre.ethers.provider; // Get the provider

    // ✅ Fix: Get balance using provider
    const accountBalance = await provider.getBalance(deployer.address);

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(accountBalance), "ETH");

    const TruthCheck  = await hre.ethers.getContractFactory("TruthCheck");
    const truthCheckContract = await TruthCheck.deploy();
    await truthCheckContract.waitForDeployment();
    console.log("Contract deployed to: ", await truthCheckContract.getAddress());
    
};

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
};

runMain();