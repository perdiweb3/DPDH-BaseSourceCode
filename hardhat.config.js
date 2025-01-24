require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");


const PROVIDER_URL = "https://polygon-amoy.g.alchemy.com/v2/lgWbt-rcdgnP1a3tL7W5GCKebQoFvth0"
const PRIVATE_KEY = "bb943836d0824c1e3e56619e739c792d73e2eb83d701e6fe91ad44ddaa8e1b8c"
const POLYGONSCAN_KEY = "V1DR2QPA1QRZY8G3H8V5MT85P3X6JHBURF"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    amoy:{
      url: PROVIDER_URL,
      accounts:[PRIVATE_KEY]
    },
  },
  etherscan:{
    apiKey:{
      polygonAmoy:POLYGONSCAN_KEY,
    }
  }
};

