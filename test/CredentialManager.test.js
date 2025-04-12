const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CredentialManager", function () {
  let credentialManager;
  let verifier;
  let owner;
  let issuer;
  let verifierAddress;

  beforeEach(async function () {
    [owner, issuer] = await ethers.getSigners();

    // Deploy Verifier contract
    const Verifier = await ethers.getContractFactory("Verifier");
    verifier = await Verifier.deploy();
    await verifier.deployed();
    verifierAddress = verifier.address;

    // Deploy CredentialManager contract
    const CredentialManager = await ethers.getContractFactory("CredentialManager");
    credentialManager = await CredentialManager.deploy(verifierAddress);
    await credentialManager.deployed();
  });

  describe("Issuer Authorization", function () {
    it("Should authorize an issuer", async function () {
      await credentialManager.authorizeIssuer(issuer.address);
      expect(await credentialManager.authorizedIssuers(issuer.address)).to.be.true;
    });

    it("Should not allow unauthorized issuer to issue credentials", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await expect(
        credentialManager.connect(issuer).issueCredential(credentialHash, proof)
      ).to.be.revertedWith("Not authorized to issue credentials");
    });
  });

  describe("Credential Management", function () {
    beforeEach(async function () {
      await credentialManager.authorizeIssuer(issuer.address);
    });

    it("Should issue a credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await credentialManager.connect(issuer).issueCredential(credentialHash, proof);
      
      const credential = await credentialManager.credentials(credentialHash);
      expect(credential.issuer).to.equal(issuer.address);
      expect(credential.isRevoked).to.be.false;
    });

    it("Should not allow duplicate credential issuance", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await credentialManager.connect(issuer).issueCredential(credentialHash, proof);
      
      await expect(
        credentialManager.connect(issuer).issueCredential(credentialHash, proof)
      ).to.be.revertedWith("Credential already exists");
    });

    it("Should revoke a credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await credentialManager.connect(issuer).issueCredential(credentialHash, proof);
      await credentialManager.connect(issuer).revokeCredential(credentialHash);
      
      const credential = await credentialManager.credentials(credentialHash);
      expect(credential.isRevoked).to.be.true;
    });

    it("Should not allow non-issuer to revoke credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await credentialManager.connect(issuer).issueCredential(credentialHash, proof);
      
      await expect(
        credentialManager.revokeCredential(credentialHash)
      ).to.be.revertedWith("Only issuer can revoke");
    });
  });

  describe("Credential Verification", function () {
    beforeEach(async function () {
      await credentialManager.authorizeIssuer(issuer.address);
    });

    it("Should verify a valid credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await credentialManager.connect(issuer).issueCredential(credentialHash, proof);
      
      const isValid = await credentialManager.verifyCredential(credentialHash, proof);
      expect(isValid).to.be.true;
    });

    it("Should not verify a non-existent credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await expect(
        credentialManager.verifyCredential(credentialHash, proof)
      ).to.be.revertedWith("Credential does not exist");
    });

    it("Should not verify a revoked credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const proof = "0x1234"; // Mock proof

      await credentialManager.connect(issuer).issueCredential(credentialHash, proof);
      await credentialManager.connect(issuer).revokeCredential(credentialHash);
      
      await expect(
        credentialManager.verifyCredential(credentialHash, proof)
      ).to.be.revertedWith("Credential has been revoked");
    });
  });
}); 