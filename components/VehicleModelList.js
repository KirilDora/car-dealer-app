

const VehicleModelsList = ({ vehicleModels }) => {
  return (
    <ul>
      {vehicleModels.map((model) => (
        <li key={model.Model_ID}>{model.Model_Name}</li>
      ))}
    </ul>
  );
};

export default VehicleModelsList;