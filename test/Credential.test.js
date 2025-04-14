const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Credential", function () {
  let credential;
  let owner;
  let issuer;
  let verifier;

  beforeEach(async function () {
    [owner, issuer, verifier] = await ethers.getSigners();

    const Credential = await ethers.getContractFactory("Credential");
    credential = await Credential.deploy();
    await credential.deployed();

    // Authorize the issuer
    await credential.authorizeIssuer(issuer.address);
  });

  describe("Credential Management", function () {
    it("Should issue a credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const credentialType = "degree";
      const metadata = ethers.utils.toUtf8Bytes("Test metadata");
      const proof = "0x1234"; // Mock proof

      await expect(
        credential.connect(issuer).issueCredential(
          credentialHash,
          credentialType,
          metadata,
          proof
        )
      )
        .to.emit(credential, "CredentialIssued")
        .withArgs(credentialHash, issuer.address, credentialType);

      const credentialData = await credential.getCredential(credentialHash);
      expect(credentialData.issuer).to.equal(issuer.address);
      expect(credentialData.credentialType).to.equal(credentialType);
      expect(credentialData.isRevoked).to.be.false;
    });

    it("Should verify a credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const credentialType = "degree";
      const metadata = ethers.utils.toUtf8Bytes("Test metadata");
      const proof = "0x1234";

      await credential.connect(issuer).issueCredential(
        credentialHash,
        credentialType,
        metadata,
        proof
      );

      const isValid = await credential.verifyCredential(credentialHash, proof);
      expect(isValid).to.be.true;
    });

    it("Should revoke a credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const credentialType = "degree";
      const metadata = ethers.utils.toUtf8Bytes("Test metadata");
      const proof = "0x1234";

      await credential.connect(issuer).issueCredential(
        credentialHash,
        credentialType,
        metadata,
        proof
      );

      await expect(credential.connect(issuer).revokeCredential(credentialHash))
        .to.emit(credential, "CredentialRevoked")
        .withArgs(credentialHash);

      const credentialData = await credential.getCredential(credentialHash);
      expect(credentialData.isRevoked).to.be.true;
    });

    it("Should update credential metadata", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const credentialType = "degree";
      const metadata = ethers.utils.toUtf8Bytes("Test metadata");
      const newMetadata = ethers.utils.toUtf8Bytes("Updated metadata");
      const proof = "0x1234";

      await credential.connect(issuer).issueCredential(
        credentialHash,
        credentialType,
        metadata,
        proof
      );

      await expect(credential.connect(issuer).updateCredentialMetadata(credentialHash, newMetadata))
        .to.emit(credential, "CredentialMetadataUpdated")
        .withArgs(credentialHash, newMetadata);

      const credentialData = await credential.getCredential(credentialHash);
      expect(credentialData.metadata).to.equal(ethers.utils.hexlify(newMetadata));
    });
  });

  describe("Access Control", function () {
    it("Should not allow unauthorized issuer to issue credentials", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const credentialType = "degree";
      const metadata = ethers.utils.toUtf8Bytes("Test metadata");
      const proof = "0x1234";

      await expect(
        credential.connect(verifier).issueCredential(
          credentialHash,
          credentialType,
          metadata,
          proof
        )
      ).to.be.revertedWith("Not authorized to issue credentials");
    });

    it("Should not allow non-issuer to revoke credential", async function () {
      const credentialHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
      const credentialType = "degree";
      const metadata = ethers.utils.toUtf8Bytes("Test metadata");
      const proof = "0x1234";

      await credential.connect(issuer).issueCredential(
        credentialHash,
        credentialType,
        metadata,
        proof
      );

      await expect(
        credential.connect(verifier).revokeCredential(credentialHash)
      ).to.be.revertedWith("Only issuer can revoke");
    });
  });
}); 