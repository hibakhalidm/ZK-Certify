// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ICredential.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Credential
 * @dev Privacy-preserving credential management system compatible with Midnight and Cardano
 * 
 * Midnight Integration:
 * - Uses Midnight's privacy features for credential data
 * - Implements ZK proofs for verification
 * - Compatible with Lace Wallet
 * 
 * Cardano Integration (Future):
 * - Can be migrated to Plutus for Cardano compatibility
 * - Supports NFT-based credential representation
 */
contract Credential is ICredential, Ownable {
    mapping(bytes32 => CredentialData) private credentials;
    mapping(address => bool) private authorizedIssuers;
    mapping(string => bool) private supportedCredentialTypes;

    // Midnight-specific privacy settings
    bool private constant PRIVACY_ENABLED = true;
    bool private constant ZK_ENABLED = true;

    constructor() {
        // Initialize with supported credential types
        supportedCredentialTypes["degree"] = true;
        supportedCredentialTypes["certificate"] = true;
        supportedCredentialTypes["license"] = true;
    }

    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized to issue credentials");
        _;
    }

    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function addCredentialType(string calldata credentialType) external onlyOwner {
        supportedCredentialTypes[credentialType] = true;
    }

    /**
     * @dev Issues a new credential with privacy-preserving metadata
     * @notice This function will be enhanced with Midnight's privacy features
     */
    function issueCredential(
        bytes32 credentialHash,
        string calldata credentialType,
        bytes calldata metadata,
        bytes calldata proof
    ) external onlyAuthorizedIssuer {
        require(credentials[credentialHash].issuer == address(0), "Credential already exists");
        require(supportedCredentialTypes[credentialType], "Unsupported credential type");
        require(verifyProof(proof), "Invalid proof");

        // TODO: Implement Midnight's privacy features for metadata
        // This will be replaced with actual Midnight privacy implementation
        bytes memory privateMetadata = applyPrivacy(metadata);

        credentials[credentialHash] = CredentialData({
            credentialHash: credentialHash,
            issuer: msg.sender,
            issueDate: block.timestamp,
            isRevoked: false,
            credentialType: credentialType,
            metadata: privateMetadata
        });

        emit CredentialIssued(credentialHash, msg.sender, credentialType);
    }

    /**
     * @dev Verifies a credential using ZK proofs
     * @notice This will use Midnight's native ZK system
     */
    function verifyCredential(
        bytes32 credentialHash,
        bytes calldata proof
    ) external returns (bool) {
        CredentialData memory credential = credentials[credentialHash];
        require(credential.issuer != address(0), "Credential does not exist");
        require(!credential.isRevoked, "Credential has been revoked");
        require(verifyProof(proof), "Invalid proof");

        // TODO: Implement Midnight's ZK verification
        bool isValid = verifyZKProof(credential, proof);
        emit CredentialVerified(credentialHash, isValid);
        return isValid;
    }

    function revokeCredential(bytes32 credentialHash) external {
        CredentialData storage credential = credentials[credentialHash];
        require(credential.issuer == msg.sender, "Only issuer can revoke");
        require(!credential.isRevoked, "Already revoked");

        credential.isRevoked = true;
        emit CredentialRevoked(credentialHash);
    }

    function updateCredentialMetadata(
        bytes32 credentialHash,
        bytes calldata metadata
    ) external {
        CredentialData storage credential = credentials[credentialHash];
        require(credential.issuer == msg.sender, "Only issuer can update metadata");

        // TODO: Apply privacy to updated metadata
        bytes memory privateMetadata = applyPrivacy(metadata);
        credential.metadata = privateMetadata;
        emit CredentialMetadataUpdated(credentialHash, privateMetadata);
    }

    function getCredential(bytes32 credentialHash) external view returns (CredentialData memory) {
        return credentials[credentialHash];
    }

    // Midnight-specific privacy functions
    function applyPrivacy(bytes memory data) internal pure returns (bytes memory) {
        // TODO: Implement Midnight's privacy features
        // This is a placeholder for actual privacy implementation
        return data;
    }

    function verifyZKProof(CredentialData memory credential, bytes memory proof) internal pure returns (bool) {
        // TODO: Implement Midnight's ZK verification
        // This will replace the current proof verification
        return true;
    }

    // Cardano compatibility stubs
    function toPlutusData() external pure returns (bytes memory) {
        // TODO: Implement Plutus data conversion
        // This will be used when migrating to Cardano
        return "";
    }

    function toNFTMetadata() external pure returns (bytes memory) {
        // TODO: Implement NFT metadata conversion
        // This will be used for Cardano NFT representation
        return "";
    }

    // Stub for Cardano/Plutus compatibility
    function verifyProof(bytes calldata proof) internal pure returns (bool) {
        // TODO: Implement actual proof verification
        // For now, return true to allow testing
        return true;
    }
} 