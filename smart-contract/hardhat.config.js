require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require('dotenv').config();  

module.exports = {
  solidity: "0.8.19",  
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/cuhMx0yghWVeW_itx1TqMdKrBD25ezz7`,  
      accounts: [`${process.env.PRIVATE_KEY}`]  
    },
  },
};
