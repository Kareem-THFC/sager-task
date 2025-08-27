import { useState, useMemo } from "react";
import { useDroneStore } from "../../../store/droneStore";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMapStore } from "@/store/mapStore";

const PAGE_SIZE = 6;

export default function DashboardDroneList() {
  const navigate = useNavigate();
  const { drones } = useDroneStore();

  const { setSelectedDrone } = useMapStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredDrones = useMemo(() => {
    return Object.values(drones).filter((drone) =>
      drone.registration.toLowerCase().includes(search.toLowerCase())
    );
  }, [drones, search]);

  const totalPages = Math.ceil(filteredDrones.length / PAGE_SIZE);
  const paginatedDrones = filteredDrones.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search by registration number..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
          className="w-full max-w-md"
        />
        <span className="text-gray-400 text-sm ml-4">
          Showing {paginatedDrones.length} of {filteredDrones.length} drones
        </span>
      </div>

      {/* Drones List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedDrones.map((drone) => (
          <Card
            key={drone.registration}
            className="cursor-pointer hover:shadow-xl border border-black bg-[#272727] text-white transition rounded-xl"
            onClick={() => {
              // Now we navigate and pass the registration number in the state object.

              setSelectedDrone(drone.registration);
              navigate(`/map`);
            }}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{drone.registration}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    drone.isAuthorized
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {drone.isAuthorized ? "Authorized" : "Unauthorized"}
                </span>
              </div>

              <p className="text-sm text-gray-300">
                Altitude:{" "}
                <span className="font-medium">
                  {drone.properties.altitude} m
                </span>
              </p>
              <p className="text-sm text-gray-300">
                Pilot:{" "}
                <span className="font-medium">
                  {drone.properties.pilot || "Unknown"}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrones.length === 0 && (
        <p className="text-gray-500 text-center">No drones found</p>
      )}

      {/* Pagination controls */}
      {filteredDrones.length > PAGE_SIZE && (
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="text-black hover:bg-gray-400 cursor-pointer"
          >
            Previous
          </Button>
          <span className="text-gray-400 self-center">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="text-black hover:bg-gray-400 cursor-pointer"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
