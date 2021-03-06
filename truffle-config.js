require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },

    kovan: {
    provider: function(){
      return new HDWalletProvider(

        //Private key
        privateKeys.split(','),

        //URL for ethereum node
        `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        //kovan.infura.io/v3/e29c92e17ade4907b24eefb5240e1185
        )
    },

    gas: 5000000,
    gasPrice: 25000000000,
    network_id: 42
  }
  },


  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
