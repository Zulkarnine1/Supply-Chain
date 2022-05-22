import { useEffect } from "react";

export default function useAccountChangeListener() {
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

  return null;
}
