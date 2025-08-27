import { LucideX } from "lucide-react";
import DroneList from "./map/DroneList";
import { useState } from "react";

const tabs = ["Drones", "Flights History"];

function SidePanel({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState("Drones");

  return (
    <div className="absolute top-1 left-1 min-w-83 bg-[#111111] flex flex-col h-full">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-white font-semibold text-[20px]">Drones Flying</h2>
        <button
          className="text-white rounded-full p-1 bg-[#777777] cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <LucideX className="h-4 w-4 text-black" />
        </button>
      </div>

      {/* tabs */}
      <div className="flex ">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-[#65717C] text-[16px] py-2 px-4 ${
              activeTab === tab
                ? "text-white border-b-5 border-red-600"
                : "bg-transparent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "Drones" && <DroneList />}
        {activeTab === "Flights History" && (
          <div className="text-gray-400 p-4">History coming soon...</div>
        )}
      </div>
    </div>
  );
}

export default SidePanel;
