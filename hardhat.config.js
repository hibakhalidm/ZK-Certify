require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: {
    version: "0.8.0", // Match the version in your Solidity files
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    holesky: {
      url: process.env.HOLESKY_RPC, // Holesky RPC from .env
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your private key (from .env)
      timeout: 200000, // Increase the timeout to 200 seconds
    },
  },
};
