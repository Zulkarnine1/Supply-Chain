import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Web3Context from "../modules/Common/hooks/web3Context";
import ManufacturerHome from "../modules/Manufacturer/ManufacturerHome";
import InspectorHome from "../modules/Inspector/InspectorHome";
import SupplierHome from "../modules/Supplier/SupplierHome";
import ConsumerHome from "../modules/Consumer/ConsumerHome";
import OwnerHome from "../modules/Owner/OwnerHome";
import useWeb3UserHook from "../modules/Common/hooks/userAndWeb3Hook";
import Loader from "../components/common/Loader";

const PORTALS = ["MANUFACTURER", "INSPECTOR", "SUPPLIER", "CONSUMER", "OWNER"];

const PORTAL = PORTALS[0];

const renderPortal = (portal) => {
  switch (portal) {
    case "MANUFACTURER":
      return <ManufacturerHome />;
    case "INSPECTOR":
      return <InspectorHome />;
    case "SUPPLIER":
      return <SupplierHome />;
    case "CUSTOMER":
      return <ConsumerHome />;
    case "OWNER":
      return <OwnerHome />;
    default:
      return <></>;
  }
};

export default function Home() {
  const { account, loading } = useWeb3UserHook();

  return (
    <>
      {!loading ? (
        <div>
          <Head>
            <title>Velockchain</title>
            <link rel="icon" href="/faavicon.ico" />
          </Head>

          {/* write switch statement to check portal and return module */}
          {account ? renderPortal(account.mode) : null}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
