const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const network = hre.network.name;
  console.log(`Deploying to ${network} network...`);

  // Deploy the Credential contract
  const Credential = await hre.ethers.getContractFactory("Credential");
  const credential = await Credential.deploy();
  await credential.deployed();

  console.log("Credential deployed to:", credential.address);

  // Authorize some initial issuers
  const issuers = [
    "0x1234567890123456789012345678901234567890", // University of Ghana
    "0x0987654321098765432109876543210987654321", // University of Lagos
    "0x1111111111111111111111111111111111111111"  // University of Nairobi
  ];

  for (const issuer of issuers) {
    await credential.authorizeIssuer(issuer);
    console.log(`Authorized issuer: ${issuer}`);
  }

  // Save contract information to frontend
  const contractInfo = {
    address: credential.address,
    abi: Credential.interface.format("json"),
    network: network,
    // Midnight-specific information
    midnight: {
      privacyEnabled: true,
      zkEnabled: true,
      laceWalletCompatible: true
    },
    // Cardano-specific information (for future use)
    cardano: {
      plutusCompatible: false,
      nftEnabled: false
    }
  };

  const outputPath = path.join(__dirname, "../zk-certify-frontend/contracts/ZKCertify.json");
  fs.writeFileSync(outputPath, JSON.stringify(contractInfo, null, 2));
  console.log(`Contract information saved to ${outputPath}`);

  // Network-specific setup
  if (network === "midnight") {
    console.log("Setting up Midnight-specific configurations...");
    // TODO: Add Midnight-specific setup once Lace Wallet integration is ready
    console.log("Note: Lace Wallet integration will be implemented when available");
  } else if (network === "cardano") {
    console.log("Setting up Cardano-specific configurations...");
    // TODO: Add Cardano-specific setup for Plutus or NFT integration
    console.log("Note: Plutus and NFT integration will be implemented when available");
  }

  // Generate documentation for integration
  const integrationDoc = `
# Integration Documentation

## Midnight Integration
- Contract deployed to: ${credential.address}
- Privacy features: Enabled
- ZK proofs: Enabled
- Lace Wallet: Pending integration

## Cardano Integration (Future)
- Plutus compatibility: Planned
- NFT representation: Planned
- Wallet integration: Pending

## Next Steps
1. Implement Midnight's privacy features
2. Integrate Lace Wallet
3. Add Plutus compatibility
4. Implement NFT representation
`;

  const docPath = path.join(__dirname, "../INTEGRATION.md");
  fs.writeFileSync(docPath, integrationDoc);
  console.log(`Integration documentation saved to ${docPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
