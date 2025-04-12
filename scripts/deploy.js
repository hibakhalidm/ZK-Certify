const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CredentialManager = await hre.ethers.getContractFactory("CredentialManager");
  
  // Deploy the Verifier contract first
  const Verifier = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  
  console.log("Verifier deployed to:", verifier.address);
  
  // Deploy the CredentialManager contract
  const credentialManager = await CredentialManager.deploy(verifier.address);
  await credentialManager.deployed();
  
  console.log("CredentialManager deployed to:", credentialManager.address);
  
  // Authorize some initial issuers
  const issuers = [
    "0x1234567890123456789012345678901234567890", // University of Ghana
    "0x0987654321098765432109876543210987654321", // University of Lagos
    "0x1111111111111111111111111111111111111111"  // University of Nairobi
  ];
  
  for (const issuer of issuers) {
    await credentialManager.authorizeIssuer(issuer);
    console.log(`Authorized issuer: ${issuer}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
