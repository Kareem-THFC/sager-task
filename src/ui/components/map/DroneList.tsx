import { useState, useEffect } from "react";
import { useDroneStore } from "../../../store/droneStore";
import DroneListItem from "./DroneListItem";
import { useMapStore } from "../../../store/mapStore";

function DroneList() {
  const { drones } = useDroneStore();
  const droneArray = Object.values(drones);
  const { selectedDroneId, setSelectedDrone } = useMapStore();

  const ITEMS_PER_PAGE = 3;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(droneArray.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (selectedDroneId) {
      const index = droneArray.findIndex(
        (d) => d.registration === selectedDroneId
      );
      if (index !== -1) {
        const newPage = Math.floor(index / ITEMS_PER_PAGE);
        setPage(newPage);
      }
    }
  }, [selectedDroneId]);

  // get current page items
  const start = page * ITEMS_PER_PAGE;
  const currentDrones = droneArray.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="max-h-dvh-32 overflow-y-auto z-40">
      {droneArray.length === 0 && (
        <div className="text-white text-center py-4">Drones incoming</div>
      )}

      {/* Drones List */}
      {currentDrones.map((drone) => (
        <DroneListItem key={drone.registration} drone={drone} />
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center  gap-4">
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-3 py-1.5 rounded-xl border-2 border-red-600 text-white bg-black hover:bg-red-600 hover:text-black transition disabled:opacity-40 disabled:hover:bg-black disabled:hover:text-white cursor-pointer"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              ⬅ Prev
            </button>

            <span className="text-white font-semibold bg-red-600 px-4 py-1.5 rounded-xl shadow">
              Page {page + 1} / {totalPages}
            </span>

            <button
              className="px-3 py-1.5 rounded-xl border-2 border-red-600 text-white bg-black hover:bg-red-600 hover:text-black transition disabled:opacity-40 disabled:hover:bg-black disabled:hover:text-white cursor-pointer"
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next ➡
            </button>
          </div>

          {selectedDroneId && (
            <button
              className="px-3 py-1.5 rounded-xl border-2 border-red-600 text-white bg-black hover:bg-red-600 hover:text-black transition disabled:opacity-40 disabled:hover:bg-black disabled:hover:text-white cursor-pointer"
              onClick={() => {
                setSelectedDrone(null);
              }}
            >
              Remove Selected Drone
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DroneList;
