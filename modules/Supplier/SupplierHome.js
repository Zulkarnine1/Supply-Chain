import Navbar from "../../components/common/Navbar";
import Link from "next/link";

const features = [
  {
    name: "Vehicles Available for Purchase",
    link: "/supplier/vehicles-for-purchase",
    description: "The collection of vehicles that passed inspection are available for purchase. ",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    name: "Vehicles Awaiting Sell",
    link: "/supplier/vehicles-awaiting-sell",
    description: "Vehicles that are now open to buy for consumers.",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="824" height="824" className="icon" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M704 288h131.072a32 32 0 0131.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 11-64 0v-96H384v96a32 32 0 01-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 01-31.808-35.2l57.6-576a32 32 0 0131.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 11-64 0V698.496l-73.344 73.344a32 32 0 11-45.248-45.248l128-128a32 32 0 0145.248 0l128 128a32 32 0 11-45.248 45.248z"
        ></path>
      </svg>
    ),
  },

  {
    name: "Sold Vehicles",
    link: "/supplier/sold-vehicles",
    description: "Vehicles that have been sold to consumers. ",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
];

export default function SupplierHome() {
  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={"Supplier"} />
      <main className="mx-auto w-full pt-20 px-4  bg-gray-50">
        <div className="text-center ">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Blockchain to enrich your</span>{" "}
            <span className="block text-indigo-600 xl:inline">automotive business</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We use blockchain to connect your vehicle business to the world. Join our world of trusted and transparent
            supply chain.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow"></div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"></div>
          </div>
        </div>
        {/* Management options section */}
        <div className="mt-32 py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full lg:text-left">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Vehicle Inventory Management
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A simpler way to sell your vehicles
              </p>
            </div>

            <div className="mt-16">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <Link key={feature.link} href={feature.link}>
                    <div className="relative cursor-pointer">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <feature.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  </Link>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
