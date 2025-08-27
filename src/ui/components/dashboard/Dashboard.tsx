import { useDroneData } from "../../../hooks/useDroneData";
import { useDroneStore } from "../../../store/droneStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, Radio } from "lucide-react";
import DashboardDroneList from "./DashboardDroneList";

function Dashboard() {
  const { isConnected, connectionError } = useDroneData();
  const { totalDrones, unauthorizedDrones, getAltitudeAvarage } =
    useDroneStore();

  const avgAltitude = getAltitudeAvarage();

  if (!isConnected && connectionError) {
    return (
      <div className="text-white flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-red-500 text-lg mt-4">Error: {connectionError}</p>
        <Button className="mt-6 bg-red-600 hover:bg-red-700">
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-4xl font-bold mb-6">Drone Control Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#272727] border border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-400">
              <Activity className="text-green-400" /> Total Drones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{totalDrones}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#272727] border border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-400">
              <AlertTriangle className="text-yellow-400" /> Unauthorized
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {unauthorizedDrones}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#272727] border border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-400">
              <Radio className="text-blue-400" /> Avg. Altitude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {avgAltitude.toFixed(2)} m
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#272727] border border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-400">
              Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${
                  isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
              <span className="text-white">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <DashboardDroneList />
    </div>
  );
}

export default Dashboard;
