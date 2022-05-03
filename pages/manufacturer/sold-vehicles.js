import Navbar from "../../components/common/Navbar";
import CarList from "../../modules/Common/CarList";

const cars = [
  {
    id: 1,
    manufactured_year: "2021",
    brand: "Toyota",
    model: "Premio",
    price: 100,
    status: "MANUFACTURED",
    package_grade: "G",
    vin: "22235678901234567",
    color: "silver",
    manufactured_city: "Chicago",
    manufactured_country: "USA",
    additional_comment: "This is a comment",
    certificates: [
      {
        name: "Certification of Inspection Pass",
        message: "This is to certify that the vehicle #101 has passed inspection.",
        issuer: "John Doe",
        prover: "BMW",
        date: "2022-01-01",
      },
    ],
  },
];

export default function VehiclesSold() {
  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={"Manufacturer"} />
      <main className="mx-auto w-full px-4 bg-gray-50">
        {/* Management options section */}

        <CarList cars={cars} pageTitle={"Sold Vehicles"} />
      </main>
    </div>
  );
}
