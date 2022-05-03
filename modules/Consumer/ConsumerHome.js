import Navbar from "../../components/common/Navbar";
import Link from "next/link";

const features = [
  {
    name: "Vehicles Available for Purchase",
    link: "/consumer/vehicles-for-purchase",
    description: "The collection of vehicles that passed inspection are available for purchase. ",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        height="90"
        width="90"
        enableBackground="new 0 0 345.021 345.021"
        version="1.1"
        viewBox="-50 -50 445.021 445.021"
        xmlSpace="preserve"
      >
        <g fill="#211915">
          <path
            fill="white"
            d="M324.064 160.721L268.3 118.614c-42.219-31.879-94.604-49.436-147.505-49.436H60.973c-16.835 0-31.795 10.082-38.113 25.686L8.004 131.547A108.942 108.942 0 000 172.634v33.125c0 20.816 15.408 38.098 35.417 41.05 4.261 16.671 19.407 29.035 37.387 29.035 17.817 0 32.845-12.143 37.262-28.585h124.962c4.417 16.442 19.445 28.585 37.262 28.585s32.846-12.143 37.263-28.585h25.468c5.522 0 10-4.478 10-10v-34.452c0-16.445-7.834-32.178-20.957-42.086zM91.388 237.259c0 10.248-8.337 18.585-18.584 18.585-10.248 0-18.585-8.337-18.585-18.585 0-10.247 8.337-18.584 18.585-18.584 10.247 0 18.584 8.337 18.584 18.584zm199.487 0c0 10.248-8.337 18.585-18.585 18.585-10.247 0-18.584-8.337-18.584-18.585 0-10.247 8.337-18.584 18.584-18.584 10.248 0 18.585 8.337 18.585 18.584zm34.146-10h-15.468c-4.417-16.442-19.446-28.584-37.263-28.584s-32.845 12.142-37.262 28.584H110.066c-4.417-16.442-19.445-28.584-37.262-28.584-17.527 0-32.352 11.751-37.036 27.784C26.691 223.942 20 215.627 20 205.759v-33.125a89.048 89.048 0 016.541-33.579l14.855-36.685c3.245-8.014 10.93-13.192 19.576-13.192h59.823c48.579 0 96.684 16.122 135.452 45.396l55.765 42.107c8.146 6.15 13.009 15.917 13.009 26.125v24.453z"
          ></path>
          <path
            fill="white"
            d="M242.465 148.17l-18.34-13.849c-25.719-19.42-57.631-30.115-89.857-30.115-5.522 0-10 4.478-10 10v44.3c0 5.522 4.478 10 10 10h102.171c5.522 0 10-4.478 10-10v-2.355a10.007 10.007 0 00-3.974-7.981zm-98.197-23.568c23.45 1.852 46.269 10.161 65.394 23.904h-65.394v-23.904z"
          ></path>
        </g>
      </svg>
    ),
  },
  {
    name: "Vehicles Purchased",
    link: "/consumer/vehicles-bought",
    description: "Vehicles that are now open to buy for consumers.",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 15 15">
        <path
          fill="white"
          fillRule="evenodd"
          d="M14.707 3L5.5 12.207.293 7 1 6.293l4.5 4.5 8.5-8.5.707.707z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
];

export default function ConsumerHome() {
  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={"Consumer"} />
      <main className="mx-auto w-full pt-20 px-4  bg-gray-50">
        <div className="text-center ">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Blockchain to enrich your</span>{" "}
            <span className="block text-indigo-600 xl:inline">automotive purchase</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We bring vehicles to you for purchase from manufacturers. Join our world of trusted and transparent supply
            chain.
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
                Vehicle Purchase Management
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
