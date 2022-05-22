import "../styles/global.css";
import Layout from "../components/common/Layout";
import Web3Context from "../modules/Common/hooks/web3Context";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
let Web3 = require("web3");
import getContractInstance from "../lib/getContract";
import contractDef from "../build/contracts/VehicleColdChain.json";

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [chainInstance, setChainInstance] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      window.ethereum
        ? ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (accounts) => {
              let w3 = new Web3(ethereum);
              let addressCheckSummed = w3.utils.toChecksumAddress(accounts[0]);
              await setAddress(addressCheckSummed);
              setWeb3(w3);

              // check if account exists
              let chainInstanceTemp = await getContractInstance(w3, contractDef);
              await setChainInstance(chainInstanceTemp);

              // // should register user
              // const data = await chainInstance.methods
              //   .addEntity(accounts[0], "CUSTOMER", "John Doe")
              //   .send({ from: accounts[0] });
              // console.log(data);

              window.ethereum.on("accountsChanged", () => {
                window.location.reload();
              });
            })
            .catch((err) => console.log(err))
        : window.location.assign("https://metamask.io/download/");
    })();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        address,
        chainInstance,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Context.Provider>
  );
}

export default MyApp;
