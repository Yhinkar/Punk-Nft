require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: process.env.Secret_url,
      accounts: [process.env.Secret_Key]
    },
  },

  etherscan:{
    apiKey: process.env.API_Key
  }
}
