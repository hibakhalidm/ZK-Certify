const { expect } = require("chai");
config = require("./hardhat.config.js");

// filepath: c:\Users\USER\Documents\GitHub\ZK-Certify\hardhat.config.test.js

describe("Hardhat Configuration", function () {
  let config;

  before(function () {
  });

  it("Should have the correct Solidity version", function () {
    expect(config.solidity.version).to.equal("0.8.19");
  });

  it("Should have the optimizer enabled with 200 runs", function () {
    expect(config.solidity.settings.optimizer.enabled).to.be.true;
    expect(config.solidity.settings.optimizer.runs).to.equal(200);
  });

  it("Should have the Midnight network configured correctly", function () {
    const midnight = config.networks.midnight;
    expect(midnight.url).to.be.a("string").and.to.include("https://testnet.midnight.network");
    expect(midnight.chainId).to.equal(1234);
    expect(midnight.accounts).to.be.an("array");
  });

  it("Should have the Hardhat network configured correctly", function () {
    const hardhat = config.networks.hardhat;
    expect(hardhat.chainId).to.equal(31337);
  });

  it("Should have the correct paths configured", function () {
    const paths = config.paths;
    expect(paths.sources).to.equal("./contracts");
    expect(paths.tests).to.equal("./test");
    expect(paths.cache).to.equal("./cache");
    expect(paths.artifacts).to.equal("./artifacts");
  });

  it("Should have Mocha timeout set to 40000ms", function () {
    expect(config.mocha.timeout).to.equal(40000);
  });
});