// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@midnight/compact/contracts/zk/Verifier.sol";

contract CredentialManager {
    struct Credential {
        bytes32 credentialHash;
        address issuer;
        uint256 issueDate;
        bool isRevoked;
    }

    mapping(bytes32 => Credential) public credentials;
    mapping(address => bool) public authorizedIssuers;
    Verifier public verifier;

    event CredentialIssued(bytes32 indexed credentialHash, address indexed issuer);
    event CredentialVerified(bytes32 indexed credentialHash, bool isValid);
    event CredentialRevoked(bytes32 indexed credentialHash);

    constructor(address _verifier) {
        verifier = Verifier(_verifier);
    }

    function authorizeIssuer(address issuer) external {
        authorizedIssuers[issuer] = true;
    }

    function issueCredential(
        bytes32 credentialHash,
        bytes calldata proof
    ) external {
        require(authorizedIssuers[msg.sender], "Not authorized to issue credentials");
        require(credentials[credentialHash].issuer == address(0), "Credential already exists");

        // Verify the ZK proof
        require(verifier.verify(proof), "Invalid proof");

        credentials[credentialHash] = Credential({
            credentialHash: credentialHash,
            issuer: msg.sender,
            issueDate: block.timestamp,
            isRevoked: false
        });

        emit CredentialIssued(credentialHash, msg.sender);
    }

    function verifyCredential(
        bytes32 credentialHash,
        bytes calldata proof
    ) external returns (bool) {
        Credential memory credential = credentials[credentialHash];
        require(credential.issuer != address(0), "Credential does not exist");
        require(!credential.isRevoked, "Credential has been revoked");

        bool isValid = verifier.verify(proof);
        emit CredentialVerified(credentialHash, isValid);
        return isValid;
    }

    function revokeCredential(bytes32 credentialHash) external {
        Credential storage credential = credentials[credentialHash];
        require(credential.issuer == msg.sender, "Only issuer can revoke");
        require(!credential.isRevoked, "Already revoked");

        credential.isRevoked = true;
        emit CredentialRevoked(credentialHash);
    }
} 