import Navbar from "../../components/common/Navbar";
import CarList from "../../modules/Common/CarList";

const cars = [
  {
    id: 1,
    manufactured_year: "2020",
    brand: "Toyota",
    model: "Axio",
    price: 10,
    status: "MANUFACTURED",
    package_grade: "X",
    vin: "12345678901234567",
    color: "red",
    manufactured_city: "New York",
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
  {
    id: 2,
    manufactured_year: "2021",
    brand: "Mazda",
    model: "Axela",
    price: 11,
    status: "INSPECTED",
    package_grade: "15S Pro Active",
    vin: "44345678901234567",
    color: "black",
    manufactured_city: "Nagoya",
    manufactured_country: "Japan",
    additional_comment: "This is a comment",
    certificates: [
      {
        name: "Certification of Inspection Pass",
        message: "This is to certify that the vehicle #101 has passed inspection.",
        issuer: "John Doe",
        prover: "MAZDA",
        date: "2022-01-01",
      },
    ],
  },
];

export default function VehiclesAwaitingInspection() {
  return (
    <div className="bg-white">
      {/* <DottedDesign /> */}
      <Navbar portalName={"Manufacturer"} />
      <main className="mx-auto w-full px-4 bg-gray-50">
        {/* Management options section */}

        <CarList cars={cars} pageTitle={"Vehicles Awaiting Inspection"} />
      </main>
    </div>
  );
}
