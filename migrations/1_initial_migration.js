const Migrations = artifacts.require("Migrations");
const VehicleColdChain = artifacts.require("VehicleColdChain");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VehicleColdChain);
};
