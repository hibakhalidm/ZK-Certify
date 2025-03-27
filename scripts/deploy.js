const hre = require("hardhat");

async function main() {
  const ZKCertify = await hre.ethers.getContractFactory("ZKCertify");
  const zkCertify = await ZKCertify.deploy();

  console.log("Deployment transaction sent:", zkCertify.deploymentTransaction.hash);

  const receipt = await zkCertify.deploymentTransaction.wait();
  console.log("Deployment transaction mined:", receipt.transactionHash);
  console.log("Transaction receipt:", receipt);
  console.log("Contract Address from receipt:", receipt.contractAddress);

  await zkCertify.deployed(); // Ensure the contract is deployed

  console.log("ZKCertify deployed to:", zkCertify.address);
}

main()
  .then(() => process.exist(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
