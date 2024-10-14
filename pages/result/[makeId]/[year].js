import SuspenseWrapper from '@/components/SuspenseWarapper';
import VehicleModelsList from '@/components/VehicleModelList';


export async function getStaticPaths() {
  const makes = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json').then(res => res.json());
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (2015 + i).toString());

  const paths = makes.Results.flatMap(make =>
    years.map(year => ({
      params: { makeId: make.MakeId.toString(), year },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { makeId, year } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const vehicleModels = await res.json();

  if (!vehicleModels.Results || vehicleModels.Results.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      vehicleModels: vehicleModels.Results,
    },
  };
}

export default function ResultPage ({ vehicleModels }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Vehicle Models</h1>
        <SuspenseWrapper>
          <VehicleModelsList vehicleModels={vehicleModels} />
        </SuspenseWrapper>
      </div>
    </div>
  );
};

