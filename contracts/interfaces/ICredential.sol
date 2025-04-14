// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ICredential {
    struct CredentialData {
        bytes32 credentialHash;
        address issuer;
        uint256 issueDate;
        bool isRevoked;
        string credentialType;
        bytes metadata;
    }

    event CredentialIssued(bytes32 indexed credentialHash, address indexed issuer, string credentialType);
    event CredentialVerified(bytes32 indexed credentialHash, bool isValid);
    event CredentialRevoked(bytes32 indexed credentialHash);
    event CredentialMetadataUpdated(bytes32 indexed credentialHash, bytes metadata);

    function issueCredential(
        bytes32 credentialHash,
        string calldata credentialType,
        bytes calldata metadata,
        bytes calldata proof
    ) external;

    function verifyCredential(
        bytes32 credentialHash,
        bytes calldata proof
    ) external returns (bool);

    function revokeCredential(bytes32 credentialHash) external;

    function updateCredentialMetadata(
        bytes32 credentialHash,
        bytes calldata metadata
    ) external;

    function getCredential(bytes32 credentialHash) external view returns (CredentialData memory);
} 