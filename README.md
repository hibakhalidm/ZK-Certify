# TrustSeal

**TrustSeal** is a privacy-preserving credential verification system that allows universities, training institutions, and certifying bodies to issue blockchain-based credentials. These credentials can be verified by employers, funding bodies, and accelerators using Zero-Knowledge Proofs (ZKPs), without revealing sensitive student information.

---

## 🌍 Problem It Solves
Young people in many African countries face:
- Difficulty accessing funding
- Lack of verifiable skills and credentials
- IP theft of their innovations

TrustSeal addresses this by providing:
- Verified credentials (on-chain)
- ZK-based proof of legitimacy
- Privacy-preserving verification
- Future integration for IP & crowdfunding support

---

## 🔧 Tech Stack
- **Blockchain**: Ethereum Holesky (current), soon Midnight/Cardano (via Lace Wallet)
- **ZK Proofs**: Noir (current), zkPass planned
- **Contracts**: Solidity (ERC-721 for credential NFTs)
- **Frontend**: Next.js, ethers.js, MUI
- **Storage**: IPFS/Arweave (for optional metadata)
- **Identity Verification**: See3
- **Fraud Detection (Planned)**: Flock

---

## 🚀 Features
- Connect MetaMask Wallet (will add Lace support)
- Issue ZK-protected academic credentials
- Verify credentials without revealing data
- Use AI/ZK to prevent fake issuers (via Gaia + Midnight/See3)

---

## ✅ Getting Started

```bash
# Clone the repo
https://github.com/hibakhalidm/ZK-Certify

# Install backend dependencies
cd ZK-Certify
npm install

# Compile and deploy smart contract (currently on Holesky)
npx hardhat compile
npx hardhat run scripts/deploy.js --network holesky

# Copy the contract address and ABI to frontend/contracts/ZKCertify.json

# Install frontend dependencies
cd zk-certify-frontend
npm install

# Run frontend
npm run dev

# Open localhost:3000 in your browser
```

---

## 🔄 Next Updates
- 🔁 Migrate contract to Midnight testnet
- ✅ Add Cardano Lace Wallet integration
- 🔒 Add zkPass for secure identity linking
- 🧠 Add See3 for AVS credential validation
- 🕵️ Integrate Flock for credential fraud detection

---

## 📋 License
MIT

---

## 📣 Contact
Team Lead: Hiba Khalid
GitHub: [@hibakhalidm](https://github.com/hibakhalidm)
Email: khalidhiba@gmail.com


---

## 🌟 Contribute
We welcome contributions. Please open issues or PRs to help build the future of verifiable skills in Africa.

---

> Built for the African Blockchain Championship 🏆

---