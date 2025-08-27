import NavItem from "./NavItem";
import Dashboard from "../../assets/icons/dashboard.svg";
import Map from "../../assets/icons/location.svg";

export default function Sidebar({ className = "" }) {
  return (
    <aside
      className={`bg-[#111111] flex flex-col gap-8 text-white ${className} pt-15`}
    >
      <ul className="flex flex-col gap-4">
        <NavItem to="/" icon={Dashboard} label="DASHBOARD" />
        <div className="w-1/2 mx-auto">
          <hr className="border-t border-[#65717C]" />
        </div>
        <NavItem to="/map" icon={Map} label="MAP" />
      </ul>
    </aside>
  );
}
