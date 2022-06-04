import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Web3Context from "../../modules/Common/hooks/web3Context";
import useAccountChangeListener from "../../modules/Common/hooks/accountChangeListener";
import Navbar from "../../components/common/Navbar";
import Loader from "../../components/common/Loader";
import useWeb3UserHook from "../../modules/Common/hooks/userAndWeb3Hook";

export default function Register() {
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [price, setPrice] = useState(null);
  const [VIN, setVIN] = useState(null);
  const [color, setColor] = useState(null);
  const [manYear, setManYear] = useState(null);
  const [manCity, setManCity] = useState(null);
  const [manCountry, setManCountry] = useState(null);
  const [addComment, setAddComment] = useState(null);

  const { account, loading } = useWeb3UserHook();
  const router = useRouter();
  const { web3, chainInstance, address } = useContext(Web3Context);
  useAccountChangeListener();

  useEffect(() => {
    if (account && account.mode !== "MANUFACTURER") {
      router.push("/");
    }
    console.log(chainInstance);
  }, [account, loading]);

  async function handleSubmit() {
    if (account && account.mode === "MANUFACTURER") {
      const existingCar = await chainInstance.methods.vehicles(VIN).call();
      if (existingCar.id !== VIN) {
        try {
          let splitPrices = price.toString().split(".");
          let res = await chainInstance.methods
            .addVehicle(
              brand,
              address,
              model,
              Number(splitPrices[0]),
              Number(splitPrices[1]),
              VIN,
              color,
              manYear,
              manCity,
              manCountry,
              addComment
            )
            .send({ from: address });

          router.push("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/");
      }
    }
  }
  return (
    <>
      {!loading ? (
        <>
          <Navbar portalName={account?.mode} />
          <div className="min-h-full flex">
            <div className="flex-1 flex  justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                  <img className="h-22 w-auto" src="../../assets/logo.png" alt="Workflow" />
                </div>
                <div className="h-80"></div>
                <div className="h-80"></div>
                <div className="h-80"></div>
              </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
              <form className="mt-20 space-y-8 divide-y divide-gray-200 px-8">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div>
                    <div>
                      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Add Vehicle</h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                      <div className="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-notifications">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                            <div>
                              <div
                                className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                id="label-notifications"
                              >
                                Vehicle Information
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-baseline"></div>
                            <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-baseline"></div>
                            <CustomInput setter={setBrand} name={"Brand"} type={"text"} />
                            <CustomInput setter={setModel} name={"Model"} type={"text"} />
                            <CustomInput setter={setPrice} name={"Price"} type={"number"} details={"Price in ETH"} />
                            <CustomInput
                              setter={setVIN}
                              name={"VIN"}
                              type={"text"}
                              details={"Vehicle identification number. e.g Chasis no."}
                            />
                            <CustomInput setter={setColor} name={"Color"} type={"text"} />
                            <CustomInput setter={setManYear} name={"Manufactured Year"} type={"number"} />
                            <CustomInput setter={setManCity} name={"Manufacturing City"} type={"text"} />
                            <CustomInput setter={setManCountry} name={"Manufacturing Country"} type={"text"} />
                            <CustomInput setter={setAddComment} name={"Additional Comment"} type={"text"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="ml-3 inline-flex w-60 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

function CustomInput({ setter, name, details, type }) {
  return (
    <>
      <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-baseline"></div>
      <div className="sm:col-span-2">
        <div className="max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">{name}</label>
            <div className="mt-1">
              <input
                type={type}
                name="name"
                onChange={(e) => {
                  setter(e.target.value);
                }}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 border-gray-600 rounded-md"
                aria-describedby="email-description"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="email-description">
              {details}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
