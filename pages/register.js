import Navbar from "../components/common/Navbar";
import { useContext, useState } from "react";

import Web3Context from "../modules/Common/hooks/web3Context";
import { useRouter } from "next/router";
import useAccountChangeListener from "../modules/Common/hooks/accountChangeListener";

export default function Register() {
  const [mode, setMode] = useState(null);
  const [name, setName] = useState("");
  const { web3, chainInstance, address } = useContext(Web3Context);
  const router = useRouter();
  useAccountChangeListener();

  async function handleSubmit() {
    const existingEntity = await chainInstance.methods.entities(address).call();
    existingEntity.id = await web3.utils.toChecksumAddress(existingEntity.id);
    let owner = await chainInstance.methods.owner().call();
    owner = await web3.utils.toChecksumAddress(owner);
    if (existingEntity.id !== address && owner !== address) {
      await chainInstance.methods.addEntity(address, mode, name).send({ from: address });
      router.push("/");
    } else {
      window.alert("Address already registered!");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-full flex">
        <div className="flex-1 flex  justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-22 w-auto" src="./assets/logo.png" alt="Workflow" />
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
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Register</h2>
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
                            Register as <span className="text-indigo-600">{mode}</span>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <p className="text-sm text-gray-500">Choose the mode you want to operate as...</p>
                            <div className="mt-4 space-y-4">
                              <div className="flex items-center">
                                <input
                                  id="push-everything"
                                  name="push-notifications"
                                  type="radio"
                                  value="CUSTOMER"
                                  onClick={(e) => {
                                    setMode(e.target.value);
                                  }}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor="push-everything"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  CUSTOMER
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="push-everything"
                                  name="push-notifications"
                                  type="radio"
                                  value="SUPPLIER"
                                  onClick={(e) => {
                                    setMode(e.target.value);
                                  }}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor="push-everything"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  SUPPLIER
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="push-everything"
                                  name="push-notifications"
                                  type="radio"
                                  value="MANUFACTURER"
                                  onClick={(e) => {
                                    setMode(e.target.value);
                                  }}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor="push-everything"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  MANUFACTURER
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                            Other Information
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2 border-gray-600 rounded-md"
                                  aria-describedby="email-description"
                                />
                              </div>
                              <p className="mt-2 text-sm text-gray-500" id="email-description">
                                {mode === "MANUFACTURER"
                                  ? "Name of the manufacturer"
                                  : mode === "SUPPLIER"
                                  ? "Name of the supplier"
                                  : "Name of the customer"}
                                . This is open to the public on the blockchain.
                              </p>
                            </div>
                          </div>
                        </div>
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
  );
}
