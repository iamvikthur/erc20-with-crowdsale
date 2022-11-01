require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://bsc-dataseed.binance.org/",
      }
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: ["0ae9be380d18a5418bf4d34d44d575c58b2ffa371cf4394444f37bccdf3f2ff7"],
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: ["0ae9be380d18a5418bf4d34d44d575c58b2ffa371cf4394444f37bccdf3f2ff7"],
      chainId: 56
    }
  },
  etherscan: {
    apiKey: {
      bsc: "MS1P67SGGQPX2ISWVXK1P9VKV5EEV1TNA4"
    }
  }
};
