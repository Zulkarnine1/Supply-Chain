const VaccineChain = artifacts.require("VehicleColdChain");

module.exports = function (deployer) {
  deployer.deploy(VehicleColdChain);
};
