import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/common/Navbar";
import CarList from "../../modules/Common/CarList";
import useWeb3UserHook from "../../modules/Common/hooks/userAndWeb3Hook";
import Web3Context from "../../modules/Common/hooks/web3Context";
import useAccountChangeListener from "../../modules/Common/hooks/accountChangeListener";

async function statusMapper(status) {
  switch (status) {
    case "0":
      return "MANUFACTURED";
    case "1":
      return "INSPECTED";
    case "2":
      return "DELIVERING_TO_SUPPLIER";
    case "3":
      return "STORED";
    case "4":
      return "DELIVERING_TO_BUYER";
    case "5":
      return "DELIVERED";
    default:
      return null;
  }
}

async function findVehicles(web3, chainInstance, manufacturer) {
  const vehicleCount = await chainInstance.methods.getVehiclesCount().call();
  let fetchedCars = [];
  for (let i = 0; i < Number(vehicleCount); i++) {
    const vehicle = await chainInstance.methods.getVehicleByIndex(i).call();
    let certificateIds = [...vehicle.certificateIds.filter((cert) => cert != "0")];
    let certs = [];

    for (let j = 0; j < certificateIds.length; j++) {
      const certificate = await chainInstance.methods.certificates(certificateIds[j]).call();
      certs.push(certificate);
    }

    let stat;
    let lastIssuer;
    if (certs.length > 0) {
      stat = await statusMapper(certs[certs.length - 1].status);
      lastIssuer = certs[certs.length - 1].issuer.id;
    } else {
      stat = "MANUFACTURED";
    }

    if (
      web3?.utils?.toChecksumAddress(lastIssuer) === manufacturer &&
      certs.length > 0 &&
      (stat === "STORED" || stat === "DELIVERED")
    ) {
      fetchedCars.push({
        ...vehicle,
        certificates: certs,
        status: certs.length <= 0 ? "MANUFACTURED" : stat,
      });
    }
  }
  return fetchedCars;
}

export default function VehiclesAwaitingInspection() {
  const { account, loading } = useWeb3UserHook();
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const { web3, chainInstance, address } = useContext(Web3Context);
  useAccountChangeListener();

  useEffect(async () => {
    if (account && account.mode !== "SUPPLIER") {
      router.push("/");
    } else {
      if (!loading) {
        // need a function to get all cars, need to update the contract as well
        let manufacturer = await web3?.utils?.toChecksumAddress(address);
        let fetchedCars = await findVehicles(web3, chainInstance, manufacturer);

        setCars([...fetchedCars]);
      }
    }
  }, [account, loading]);

  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={account?.mode} />
      <main className="mx-auto w-full px-4 bg-gray-50">
        {/* Management options section */}

        <CarList cars={cars} pageTitle={"Sold Vehicles"} mode={"SUPPLIER"} />
      </main>
    </div>
  );
}
