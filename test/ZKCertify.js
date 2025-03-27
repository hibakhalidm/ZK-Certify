const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZKCertify", function () {
    let ZKCertify, zkCertify, owner, addr1;

    beforeEach(async function () {
        ZKCertify = await ethers.getContractFactory("ZKCertify");
        [owner, addr1] = await ethers.getSigners();
        zkCertify = await ZKCertify.deploy();
        await zkCertify.deployed();
        console.log("Contract deployed to address:", zkCertify.address);
    });

    it("should add a verified university", async function () {
        await zkCertify.addVerifiedUniversity(addr1.address);
        expect(await zkCertify.verifiedUniversities(addr1.address)).to.be.true;
    });

    it("should issue a credential", async function () {
        await zkCertify.addVerifiedUniversity(owner.address);
        const studentHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("student1"));
        const universityID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("university1"));
        const degreeType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("degree1"));
        const graduationYear = 2025;
        const zkProof = "0x";
        const issuerSignature = "0x";

        await zkCertify.issueCredential(studentHash, universityID, degreeType, graduationYear, zkProof, issuerSignature);
        const credential = await zkCertify.credentials(studentHash);
        expect(credential.universityID).to.equal(universityID);
    });

    it("should revoke a credential", async function () {
        await zkCertify.addVerifiedUniversity(owner.address);
        const studentHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("student1"));
        const universityID = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("university1"));
        const degreeType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("degree1"));
        const graduationYear = 2025;
        const zkProof = "0x";
        const issuerSignature = "0x";

        await zkCertify.issueCredential(studentHash, universityID, degreeType, graduationYear, zkProof, issuerSignature);
        await zkCertify.revokeCredential(studentHash);
        const credential = await zkCertify.credentials(studentHash);
        expect(credential.revoked).to.be.true;
    });
});