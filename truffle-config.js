module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 0x1fffffffffffff,
    },
  },
  compilers: {
    solc: {
      version: ">=0.7.0 <0.9.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
