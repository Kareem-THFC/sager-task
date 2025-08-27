import type { ProcessedDrone } from "../../../types/drone";

function DroneDetails({ drone }: { drone: ProcessedDrone }) {
  console.log("DroneDetails rendered:", drone);
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <span>
            <p className="text-[#cccccc] text-[11px]">Serial #</p>
            <p className="text-[#cccccc] text-[11px] font-bold">
              {drone.properties.serial}
            </p>
          </span>

          <span>
            <p className="text-[#cccccc] text-[11px]">Registration #</p>
            <p className="text-[#cccccc] text-[11px] font-bold">
              {drone.properties.registration}
            </p>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <span>
            <p className="text-[#cccccc] text-[11px]">Pilot</p>
            <p className="text-[#cccccc] text-[11px] font-bold">
              {drone.properties.pilot}
            </p>
          </span>

          <span>
            <p className="text-[#cccccc] text-[11px]">Organization</p>
            <p className="text-[#cccccc] text-[11px] font-bold">
              {drone.properties.organization}
            </p>
          </span>
        </div>
      </div>

      <div>
        {/* rounded circle with color green or red depends if its auth or not */}
        <span
          className={`block w-4 h-4 rounded-full border-2 border-white ${
            drone.isAuthorized ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </div>
    </div>
  );
}

export default DroneDetails;
