import Navbar from "../../components/common/Navbar";
import Link from "next/link";

const features = [
  {
    name: "Add Inspector",
    link: "/owner/add-inspector",
    description: "Add inspectors who to validate the manufactured vehicles ",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 612 612">
        <path
          fill="white"
          d="M344.9 208.2c-2.9-13.4-8.2-26-15.5-37.2 8.3-9.8 10.1-26.3 1.1-35.3-9-9-25.6-7.2-35.3 1.1-11.2-7.2-23.8-12.5-37.2-15.5-1-12.8-11.5-25.7-24.2-25.7s-23.1 13-24.2 25.7c-13.4 2.9-26 8.2-37.2 15.5-9.8-8.3-26.3-10.1-35.3-1.1-9 9-7.2 25.6 1.1 35.3-7.2 11.2-12.5 23.8-15.5 37.2-12.8 1-25.7 11.5-25.7 24.2s13 23.1 25.7 24.2c2.9 13.4 8.2 26 15.5 37.2-8.3 9.8-10.1 26.3-1.1 35.3 9 9 25.6 7.2 35.3-1.1 11.2 7.2 23.8 12.5 37.2 15.5 1 12.8 11.5 25.7 24.2 25.7s23.1-13 24.2-25.7c13.4-2.9 26-8.2 37.2-15.5 9.8 8.3 26.3 10.1 35.3 1.1 9-9 7.2-25.6-1.1-35.3 7.2-11.2 12.5-23.8 15.5-37.2 12.8-1 25.7-11.5 25.7-24.2.1-12.7-12.9-23.1-25.7-24.2zm-111 83.9c-32.9 0-59.7-26.8-59.7-59.7 0-32.9 26.8-59.7 59.7-59.7 32.9 0 59.7 26.8 59.7 59.7 0 32.9-26.8 59.7-59.7 59.7z"
        ></path>
        <path
          fill="white"
          d="M495 464.5l-89.7-89.7c32.2-38.6 51.5-88.3 51.5-142.5 0-123-99.8-222.8-222.9-222.8S11.1 109.3 11.1 232.4 110.9 455.3 234 455.3c54.2 0 103.9-19.3 142.5-51.5l89.7 89.7c8 8 20.9 8 28.9 0 7.8-8.1 7.8-21-.1-29zm-261.1-50.1c-100.5 0-182-81.5-182-182s81.5-182 182-182 182 81.5 182 182-81.4 182-182 182z"
        ></path>
      </svg>
    ),
  },
];

export default function OwnerHome() {
  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={"Owner"} />
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
                Supply Chain System Management
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A simpler way to manage your system
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
