import Navbar from "../../components/common/Navbar";
import Link from "next/link";

const features = [
  {
    name: "Vehicles Awaiting Inspection",
    link: "/inspector/vehicles-awaiting-inspection",
    description:
      "The collection of your vehicles that are in queue of inspection. After inspection is complete it will be available for suppliers to buy/sell.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Vehicles Passed Inspection",
    link: "/inspector/vehicles-passed-inspection",
    description: "Vehicles that have passed inspection.",
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
  // {
  //   name: "Vehicles Failed Inspection",
  //   link: "inspector/vehicles-failed-inspection",
  //   description: "Vehicles that have failed inspection.",
  //   icon: () => (
  //     <svg
  //       width="25"
  //       height="25"
  //       xmlns="http://www.w3.org/2000/svg"
  //       x="0"
  //       y="0"
  //       enableBackground="new 0 0 490 490"
  //       version="1.1"
  //       viewBox="0 0 490 490"
  //       xmlSpace="preserve"
  //     >
  //       <path
  //         fill="white"
  //         d="M11.387 490L245 255.832 478.613 490 489.439 479.174 255.809 244.996 489.439 10.811 478.613 0 245 234.161 11.387 0 0.561 10.811 234.191 244.996 0.561 479.174z"
  //       ></path>
  //     </svg>
  //   ),
  // },
];

export default function InspectorHome() {
  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={"Inspector"} />
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
        </div>
        {/* Management options section */}
        <div className="mt-32 py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full lg:text-left">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Vehicle Inspection Management
              </h2>
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
