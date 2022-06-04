/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SmallLoader from "../../components/common/SmallLoader";
import CheckVer from "../../components/common/CheckVer";

async function verifyHandler({ setVerifying, setVerStatus }) {
  setVerifying(true);
  setTimeout("", 3000);
  setTimeout(function () {
    setVerifying(false);
    setVerStatus(true);
  }, 5000);
}

export default function CarList({ pageTitle, cars, mode, approveHandler }) {
  const [open, setOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verStatus, setVerStatus] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleViewClick = async (car) => {
    await setSelectedCar(car);
    await setOpen(true);
  };

  return (
    <div className="mt-12 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:text-left">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Vehicle Supply Management</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{pageTitle}</p>
        </div>

        <div className="mt-16">
          <div>
            {/* <form class="mt-12 sm:max-w-lg sm:flex">
              <div class="min-w-0 flex-1">
                <input
                  id="cta-email"
                  type="email"
                  class="block w-full border border-gray-200 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500"
                  placeholder="Search"
                />
              </div>
              <div class="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  class="block w-full rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:px-10"
                >
                  Search
                </button>
              </div>
            </form> */}
          </div>
          <div className="bg-white mt-16">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <li key={car.id} className="col-span-1 bg-white rounded-lg shadow-custom divide-y divide-gray-200">
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-lg font-medium truncate">#{car.id}</h3>
                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                          Year: {car.manufactured_year}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">
                        {car.brand} - {car.model}
                      </p>

                      <p className="mt-1 text-gray-500 text-sm truncate">{car.location}</p>
                      <p className="mt-3 text-indigo-600 border rounded border-purple-500 text-sm w-36 text-center ">
                        {car.status}
                      </p>
                    </div>
                    <p className="mt-1 text-indigo-600 text-xl truncate flex-shrink-0">
                      <EthIcon></EthIcon>
                      <p className="inline-block">{Number(car.pricePreDecimal + "." + car.pricePostDecimal)}</p>
                    </p>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="-ml-px w-0 flex-1 flex">
                        <button
                          onClick={() => {
                            handleViewClick(car);
                          }}
                          className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-indigo-600"
                        >
                          <span className="ml-3">View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Modal Code */}
      {selectedCar && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-top bg-white rounded-lg px-4  pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-7xl  sm:p-6">
                  <div>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full mx-auto">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">Vehicle Information</h3>
                      </div>
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 ">Vehicle ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">#{selectedCar.id}</dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-indigo-600 sm:mt-0 sm:col-span-2">{selectedCar.status}</dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Brand</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedCar.brand}</dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Model</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedCar.model}</dd>
                          </div>

                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Vehicle Price in ETH</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {Number(selectedCar.pricePreDecimal + "." + selectedCar.pricePostDecimal)}
                            </dd>
                          </div>

                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">VIN/Chasis no.</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedCar.id}</dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Color</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedCar.color}</dd>
                          </div>

                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Year of Manufacture</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {selectedCar.manufactured_year}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Vehicle Origin</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {selectedCar.manufactured_city + `, ` + selectedCar.manufactured_country}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Additional comment</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {selectedCar.additional_comment}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 bg-white shadow overflow-x-scroll sm:rounded-lg w-full mx-auto">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-2xl leading-6 font-medium text-gray-900">Certificates</h3>
                    </div>
                    <div>
                      {selectedCar.certificates.map((certificate, index) => (
                        <div className="certificate-container">
                          <div className="certificate">
                            <div className="water-mark-overlay"></div>
                            <div className="certificate-header">
                              <img
                                src="https://i.pinimg.com/736x/c7/7e/f4/c77ef4b3280ab151621459a95c094af1.jpg"
                                className="logo"
                                alt=""
                              />
                            </div>
                            <div className="certificate-body">
                              <p className="certificate-title">
                                <strong>Velockchain Certification</strong>
                              </p>
                              <h1 className="student-name">{certificate.name}</h1>

                              <div className="certificate-content">
                                <div className="text-center">
                                  <p className="topic-description text-muted mt-20">{certificate.message}</p>
                                </div>
                              </div>
                              <div className="certificate-footer text-muted mt-20">
                                <div className="row">
                                  <div className="col-md-6 text-left">
                                    <p>Issuer: {certificate.issuer}</p>
                                    <p>Prover: {certificate.prover}</p>
                                    <p>Date: {new Date(Number(certificate.timestamp)).toLocaleDateString()}</p>
                                    {verStatus ? (
                                      <CheckVer />
                                    ) : !verifying ? (
                                      <button
                                        className="inline-flex items-center px-6 py-1 my-4 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => verifyHandler({ setVerifying, setVerStatus })}
                                      >
                                        Verify
                                      </button>
                                    ) : (
                                      <SmallLoader />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 text-center">
                    {mode === "INSPECTOR" && selectedCar.certificates.length <= 0 ? (
                      <>
                        <button
                          type="button"
                          className="inline-flex max-w-lg justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm mx-auto"
                          onClick={() => {
                            approveHandler(selectedCar.id, selectedCar.manufacturer);
                            setOpen(false);
                          }}
                        >
                          Approve
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mt-5 sm:mt-6 text-center">
                    <button
                      type="button"
                      className="inline-flex max-w-lg justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm mx-auto"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
}

function EthIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 1045 1277.39"
      className="inline-block w-4"
    >
      <g>
        <g fillRule="nonzero">
          <path fill="#343434" d="M392.07 0L383.5 29.11 383.5 873.74 392.07 882.29 784.13 650.54z"></path>
          <path fill="#8C8C8C" d="M392.07 0L0 650.54 392.07 882.29 392.07 472.33z"></path>
          <path fill="#3C3C3B" d="M392.07 956.52L387.24 962.41 387.24 1263.28 392.07 1277.38 784.37 724.89z"></path>
          <path fill="#8C8C8C" d="M392.07 1277.38L392.07 956.52 0 724.89z"></path>
          <path fill="#141414" d="M392.07 882.29L784.13 650.54 392.07 472.33z"></path>
          <path fill="#393939" d="M0 650.54L392.07 882.29 392.07 472.33z"></path>
        </g>
      </g>
    </svg>
  );
}
