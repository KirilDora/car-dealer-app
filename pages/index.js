import { useState } from "react";
import Link from "next/link";

export default function Home({vehicleMakes}) {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 2015 + 1), (x, i) => 2015 + i);

  // Handle make selection
  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  // Handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Select Your Vehicle</h1>

        {/* Vehicle Make Dropdown */}
        <label htmlFor="make" className="block text-sm font-medium text-gray-700">
          Vehicle Make
        </label>
        <select
          id="make"
          value={selectedMake}
          onChange={handleMakeChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
        >
          <option value="">Select Make</option>
          {vehicleMakes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>

        {/* Model Year Dropdown */}
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mt-4">
          Model Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Next Button */}
        <div className="mt-6">
          <Link href={`/result/${selectedMake}/${selectedYear}`}>
            <button
              className={`w-full px-4 py-2 text-white font-bold rounded-lg focus:outline-none ${
                selectedMake && selectedYear
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedMake || !selectedYear}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`);
  const data = await res.json();

  return {
    props: {
      vehicleMakes: data.Results,
    },
  };
}