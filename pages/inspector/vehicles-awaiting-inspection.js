import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/common/Navbar";
import CarList from "../../modules/Common/CarList";
import useWeb3UserHook from "../../modules/Common/hooks/userAndWeb3Hook";
import Web3Context from "../../modules/Common/hooks/web3Context";
import useAccountChangeListener from "../../modules/Common/hooks/accountChangeListener";

async function findVehiclesAwaitingInspection(web3, chainInstance, manufacturer) {
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

    if (!certs.length > 0) {
      fetchedCars.push({
        ...vehicle,
        certificates: certs,
        status: certs.length <= 0 ? "MANUFACTURED" : certs[certs.length - 1].status,
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

  async function approveHandler(vehicleId, manufacturer) {
    let inspector = address;
    const message = `Inspector (${inspector}) has inspected and certified the vehicle (${vehicleId})`;
    const signature = await web3.eth.sign(web3.utils.keccak256(message), inspector);
    await chainInstance.methods
      .issueCertificate(
        inspector,
        manufacturer,
        "INSPECTED",
        vehicleId,
        signature,
        "This vehicle was inspected",
        new Date().getTime()
      )
      .send({ from: inspector });
    router.push("/");
  }

  useEffect(async () => {
    if (account && account.mode !== "INSPECTOR") {
      router.push("/");
    } else {
      if (!loading) {
        // need a function to get all cars, need to update the contract as well

        let fetchedCars = await findVehiclesAwaitingInspection(web3, chainInstance);

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

        <CarList
          cars={cars}
          pageTitle={"Vehicles Awaiting Inspection"}
          mode={"INSPECTOR"}
          approveHandler={approveHandler}
        />
      </main>
    </div>
  );
}
