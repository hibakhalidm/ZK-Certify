# Smart Contract Documentation

## Contract Architecture

### Credential.sol

The main contract for managing privacy-preserving credentials on both Midnight and Cardano networks.

#### State Variables
```solidity
mapping(bytes32 => CredentialData) private credentials;
mapping(address => bool) private authorizedIssuers;
mapping(string => bool) private supportedCredentialTypes;
```

#### Privacy Settings
```solidity
bool private constant PRIVACY_ENABLED = true;
bool private constant ZK_ENABLED = true;
```

### Key Functions

#### Credential Management
1. **issueCredential**
   - Issues new credentials with privacy-preserving metadata
   - Requires authorized issuer
   - Emits CredentialIssued event

2. **verifyCredential**
   - Verifies credentials using ZK proofs
   - Checks revocation status
   - Emits CredentialVerified event

3. **revokeCredential**
   - Revokes existing credentials
   - Only issuer can revoke
   - Emits CredentialRevoked event

4. **updateCredentialMetadata**
   - Updates credential metadata
   - Applies privacy features
   - Emits CredentialMetadataUpdated event

#### Privacy Functions
1. **applyPrivacy**
   - Applies Midnight's privacy features
   - Encrypts sensitive data
   - Returns privacy-preserving data

2. **verifyZKProof**
   - Verifies ZK proofs
   - Implements Midnight's ZK system
   - Returns verification result

#### Cardano Compatibility
1. **toPlutusData**
   - Converts data to Plutus format
   - Prepares for Cardano migration
   - Returns Plutus-compatible data

2. **toNFTMetadata**
   - Converts to NFT metadata format
   - Prepares for Cardano NFT representation
   - Returns NFT-compatible metadata

### Events
```solidity
event CredentialIssued(bytes32 indexed credentialHash, address indexed issuer, string credentialType);
event CredentialVerified(bytes32 indexed credentialHash, bool isValid);
event CredentialRevoked(bytes32 indexed credentialHash);
event CredentialMetadataUpdated(bytes32 indexed credentialHash, bytes metadata);
```

## Security Features

### Access Control
- Owner-only functions for critical operations
- Authorized issuer checks
- Role-based access control

### Privacy Protection
- Data encryption
- ZK proof verification
- Privacy-preserving metadata

### Error Handling
- Input validation
- State checks
- Custom error messages

## Testing

### Test Cases
1. Credential issuance
2. Credential verification
3. Credential revocation
4. Metadata updates
5. Privacy features
6. ZK proof verification

### Test Commands
```bash
npx hardhat test
npx hardhat test test/Credential.test.js
```

## Deployment

### Network Configuration
```javascript
midnight: {
  url: process.env.MIDNIGHT_RPC_URL,
  chainId: 1234,
  privacyEnabled: true,
  zkEnabled: true
}

cardano: {
  url: process.env.CARDANO_RPC_URL,
  chainId: 1097911063,
  plutusEnabled: false,
  nftEnabled: false
}
```

### Deployment Script
```bash
npx hardhat run scripts/deploy.js --network midnight
```

## Future Enhancements

1. **Midnight Integration**
   - Complete privacy features
   - Enhance ZK proof system
   - Improve Lace Wallet integration

2. **Cardano Integration**
   - Implement Plutus compatibility
   - Add NFT functionality
   - Enable cross-chain verification

3. **Security Improvements**
   - Add more access controls
   - Enhance privacy features
   - Implement additional security checks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes
4. Add tests
5. Submit pull request

## License

MIT License 