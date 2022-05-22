import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Web3Context from "./web3Context";
import { web3 } from "@openzeppelin/test-helpers/src/setup";

async function modeMapper(mode) {
  switch (mode) {
    case "0":
      return "MANUFACTURER";
    case "1":
      return "INSPECTOR";
    case "2":
      return "SUPPLIER";
    case "3":
      return "CUSTOMER";
    case "4":
      return "OWNER";
    default:
      return null;
  }
}

export default function useWeb3UserHook() {
  const { address, chainInstance } = useContext(Web3Context);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (chainInstance) {
        const existingEntity = await chainInstance.methods.entities(address).call();
        existingEntity.id = await web3?.utils?.toChecksumAddress(existingEntity.id);
        if (existingEntity.id === address) {
          // check account mode and redirect to that page
          await setAccount({ ...existingEntity, mode: await modeMapper(existingEntity.mode) });
          setLoading(false);
        } else {
          let owner = await chainInstance.methods.owner().call();
          owner = await web3?.utils?.toChecksumAddress(owner);

          if (address === owner) {
            // the logged in user is the owner
            await setAccount({ id: owner, name: "ADMIN", mode: await modeMapper("4") });
            setLoading(false);
          } else {
            // direct user to register page
            if (web3.utils && chainInstance) {
              router.push("/register");
            }
          }
        }
      }
    })();
  }, [chainInstance, web3]);

  // Check for everyPage
  useEffect(() => {
    (async () => {
      window.ethereum
        ? ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (accounts) => {
              window.ethereum.on("accountsChanged", () => {
                window.location.href = "/";
              });
            })
            .catch((err) => console.log(err))
        : window.location.assign("https://metamask.io/download/");
    })();
  });

  return {
    account,
    loading,
  };
}
