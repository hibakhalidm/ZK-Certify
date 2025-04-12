# ZK-Certify: Privacy-Preserving Credential Verification for African Development

## Overview
ZK-Certify is a blockchain-based system designed to combat academic and professional credential fraud in Africa using Zero-Knowledge Proofs (ZKPs). The solution enables trusted issuance and verification of credentials while protecting user privacy and ensuring authenticity.

## Bounty Compliance

| Bounty | Status | Deliverable |
|--------|--------|-------------|
| **Midnight ($7k)** | ✅ | ZK-proof credential issuance/verification on Midnight testnet |
| **zkPass ($3k)** | ✅ | Ghana Card verification via zkPass schema |
| **See3/Nameless ($1k)** | ✅ | Anonymous credential proof generation |

## UNDP Impact Mapping

| SDG | Impact | Implementation |
|-----|--------|----------------|
| **SDG 4 (Education)** | Combat academic fraud | Secure credential verification |
| **SDG 16 (Governance)** | Promote transparency | Immutable credential records |
| **SDG 8 (Work)** | Validate skills for employers | Privacy-preserving verification |

## Technical Stack

- **Smart Contracts**: Midnight's Compact language
- **Identity Verification**: zkPass SDK
- **Anonymous Proofs**: Nameless SDK
- **AI Component**: ML-based fraud detection
- **Frontend**: Next.js with Lace Wallet integration

## Setup Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Midnight testnet access
- zkPass API credentials
- Nameless SDK access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hibakhalidm/ZK-Certify
cd ZK-Certify
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the development server:
```bash
npm run dev
```

### Test Accounts
- University: `university@test.com`
- Student: `student@test.com`
- Employer: `employer@test.com`

## Project Structure

```
zk-certify/
├── contracts/          # Smart contracts
├── frontend/          # Next.js frontend
├── scripts/           # Deployment scripts
├── test/             # Test files
└── ai/               # Fraud detection models
```

## Development

### Smart Contracts
- Located in `contracts/`
- Written in Midnight's Compact language
- Includes credential issuance and verification logic

### Frontend
- Next.js application in `frontend/`
- Integrates zkPass for identity verification
- Implements Nameless SDK for anonymous proofs

### AI Component
- Fraud detection models in `ai/`
- Trained on synthetic credential data
- Flags suspicious patterns in credentials

## Demo Video
A 3-minute walkthrough demonstrating:
1. Credential issuance
2. Identity verification
3. Anonymous proof generation

## License
MIT License

## Contact
For questions or support, please open an issue in the repository. 