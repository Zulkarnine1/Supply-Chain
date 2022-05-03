import Head from "next/head";
import { useState } from "react";

import ManufacturerHome from "../modules/Manufacturer/ManufacturerHome";
import InspectorHome from "../modules/Inspector/InspectorHome";
import SupplierHome from "../modules/Supplier/SupplierHome";
import ConsumerHome from "../modules/Consumer/ConsumerHome";
import OwnerHome from "../modules/Owner/OwnerHome";

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
    case "CONSUMER":
      return <ConsumerHome />;
    case "OWNER":
      return <OwnerHome />;
    default:
      return <></>;
  }
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Velockchain</title>
        <link rel="icon" href="/faavicon.ico" />
      </Head>

      {/* write switch statement to check portal and return module */}
      {renderPortal(PORTAL)}
    </div>
  );
}
