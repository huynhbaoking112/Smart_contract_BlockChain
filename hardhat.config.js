require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const {vars} =require("hardhat/config")



module.exports = {
  solidity: {
    compilers: [
      { version: "0.7.6" },
      { version: "0.8.10" },
    ],
  },
};