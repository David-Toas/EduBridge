"use client";
import {
  BookOpenCheck,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (expanded: boolean) => void;
  isMobile: boolean;
}

const Sidebar = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
  isMobile,
}: SidebarProps) => {
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
    {
      name: "Lessons",
      href: "/dashboard/lessons",
      icon: <BookOpenCheck size={20} />,
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    window.location.href = "/";
  };

  return (
    <>
      {/* Desktop/Tablet sidebar */}
      {!isMobile && (
        <div className="flex flex-col h-full">
          {/* Hamburger menu at top */}
          <div className="py-4 flex items-center justify-between px-3">
            <button
              className="p-1 rounded-md hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              {isSidebarExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Logo container */}
          <div
            className={`flex justify-center items-center mb-8 ${
              isSidebarExpanded ? "mt-2" : "mt-4"
            }`}
          >
            {/* logo */}
            <div
              className={`bg-gray-700 rounded-full overflow-hidden ${
                isSidebarExpanded ? "w-24 h-24" : "w-10 h-10"
              } flex items-center justify-center`}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={isSidebarExpanded ? 80 : 32}
                height={isSidebarExpanded ? 80 : 32}
              />
            </div>
          </div>

          {/* Separator line */}
          <div className="border-t border-[#FACC15] mx-3 mb-6" />

          {/* Sidebar content */}
          <div className="flex-grow">
            <nav>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center ${
                        isSidebarExpanded
                          ? "justify-start mx-3"
                          : "justify-center"
                      } p-3 rounded-md ${
                        pathname === link.href
                          ? "bg-blue-500"
                          : "hover:bg-gray-700"
                      }`}
                      title={!isSidebarExpanded ? link.name : ""}
                    >
                      <span>{link.icon}</span>
                      {isSidebarExpanded && (
                        <span className="ml-2">{link.name}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="border-t border-[#FACC15] mx-3 mb-6" />
            {/* logout */}
            <div className="mt-8 px-3">
              <button
                onClick={handleLogout}
                className={`flex items-center ${
                  isSidebarExpanded
                    ? "justify-start space-x-2"
                    : "justify-center"
                } text-white transition duration-500 transform rounded-md shadow-sm hover:shadow-md bg-[#82239d] hover:bg-[#89CFF0] hover:text-black py-3 px-3 w-full font-medium`}
                title={!isSidebarExpanded ? "Logout" : ""}
              >
                <LogOut size={20} />
                {isSidebarExpanded && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="w-full bg-gray-800 border-t border-gray-700">
          <nav>
            <ul className="flex justify-around items-center p-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex flex-col items-center p-2 rounded-md ${
                      pathname === link.href
                        ? "text-blue-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span className="text-xs mt-1">{link.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center p-2 text-gray-400 hover:text-white"
                >
                  <LogOut size={24} />
                  <span className="text-xs mt-1">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
