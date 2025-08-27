import { NavLink } from "react-router-dom";

export default function NavItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: any;
  label: string;
}) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <li
          className={`p-3 flex flex-col items-center hover:bg-[#272727] border-l-4 ${
            isActive ? "border-red-500 bg-[#272727]" : "border-transparent"
          }`}
        >
          <img src={Icon} alt={label} className="h-6 w-6 mb-1" />
          <span
            className={
              "text-[#65717C] text-sm" + (isActive ? " text-white" : "")
            }
          >
            {label}
          </span>
        </li>
      )}
    </NavLink>
  );
}
