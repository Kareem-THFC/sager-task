import { useMapStore } from "../../../store/mapStore";
import type { ProcessedDrone } from "../../../types/drone";
import DroneDetails from "./DroneDetails";

function DroneListItem({ drone }: { drone: ProcessedDrone }) {
  const { selectedDroneId, setSelectedDrone, centerOnDrone } = useMapStore();

  const handleDroneClick = () => {
    // Set as selected
    setSelectedDrone(drone.registration);

    // Center map on drone
    centerOnDrone(drone.currentPosition[0], drone.currentPosition[1]);
  };

  const isSelected = selectedDroneId === drone.registration;

  return (
    <div
      className={`border-t border-b border-[#070707] p-4 ${
        isSelected ? "bg-[#272727]" : ""
      }`}
      onClick={handleDroneClick}
    >
      <h3 className="text-white text-[16px] font-bold">
        {drone.properties.Name}
      </h3>

      <div>
        <DroneDetails drone={drone} />
      </div>
    </div>
  );
}

export default DroneListItem;
