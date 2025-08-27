import Logo from "../../assets/logo.svg";
import Bell from "../../assets/icons/bell.svg";
import Globe from "../../assets/icons/globe.svg";
import Capture from "../../assets/icons/capture.svg";

const shortcuts = [
  { icon: <img src={Capture} alt="Profile" className="h-6 w-6" /> },
  {
    icon: <img src={Globe} alt="Settings" className="h-6 w-6 " />,
  },
  {
    icon: <img src={Bell} alt="Notifications" className="h-6 w-6 relative" />,
    notification: 8,
  },
];

const userData = {
  name: "Mohammed Omar",
  role: "Technical Support",
};

function Header({ className = "" }) {
  return (
    <header
      className={
        className + " bg-[#0B0B0B] p-4 flex items-center justify-between h-18"
      }
    >
      <img src={Logo} alt="Logo" className="h-6" />
      <div className="flex items-center">
        {/* Nav Icons */}
        <div className="ml-auto flex space-x-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="text-white relative cursor-pointer">
              {shortcut.notification && (
                <span className="bg-red-500 text-white rounded-full px-1.5 py-0.75 text-xs absolute -top-3 -right-2 z-10">
                  {shortcut.notification}
                </span>
              )}
              {shortcut.icon}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-l border-gray-800 h-6 mx-4" />

        {/* User Details */}
        <div className="text-white">
          <div className="text-sm">
            Hello, <span className="font-semibold">{userData.name}</span>
          </div>
          <div className="text-sm text-gray-500">{userData.role}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
