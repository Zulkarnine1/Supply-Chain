const getContractInstance = async (web3, contractDef) => {
  const netId = await web3.eth.net.getId();

  const deployedAddress = contractDef.networks[netId].address;
  const instance = new web3.eth.Contract(contractDef.abi, deployedAddress);

  return instance;
};

export default getContractInstance;
