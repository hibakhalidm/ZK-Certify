require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    midnight: {
      url: process.env.MIDNIGHT_RPC_URL || "https://testnet.midnight.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1234,
      gas: "auto",
      gasPrice: "auto",
      privacyEnabled: true,
      zkEnabled: true
    },
    cardano: {
      url: process.env.CARDANO_RPC_URL || "https://testnet.cardano.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1097911063,
      plutusEnabled: false,
      nftEnabled: false
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      midnight: process.env.MIDNIGHT_API_KEY || "",
      cardano: process.env.CARDANO_API_KEY || ""
    }
  },
  midnight: {
    privacy: {
      enabled: true,
    },
    zk: {
      enabled: true,
    }
  },
  cardano: {
    plutus: {
      enabled: false,
    },
    nft: {
      enabled: false,
    }
  }
};
