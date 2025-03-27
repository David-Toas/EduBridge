"use client";
import {
  BookOpenCheck,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Brain,
  NotebookPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [showMiniDropdown, setShowMiniDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
    if (!isSidebarExpanded) {
      setShowMiniDropdown(false);
    }
  };

  const toggleAcademics = () => {
    if (isSidebarExpanded) {
      setAcademicsOpen(!academicsOpen);
    } else {
      setShowMiniDropdown(!showMiniDropdown);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMiniDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const academicItems = [
    {
      name: "PRIMARY COURSES",
      href: "/dashboard/academics/primary",
      icon: <BookOpen size={16} />,
    },
    {
      name: "SECONDARY COURSES",
      href: "/dashboard/academics/secondary",
      icon: <GraduationCap size={16} />,
    },
    {
      name: "SOFT SKILLS",
      href: "/dashboard/academics/soft_skills",
      icon: <Brain size={16} />,
    },
  ];

  const links = [
    {
      name: "DASHBOARD",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "PROFILE",
      href: "/dashboard/profile",
      icon: <User size={20} />,
    },
    {
      name: "EXAM PREP",
      href: "/dashboard/exam_prep",
      icon: <NotebookPen size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const isAcademicsActive = (pathname ?? "").includes("/dashboard/academics");


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 640 && width < 768 && isSidebarExpanded) {
        setIsSidebarExpanded(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarExpanded, setIsSidebarExpanded]);

  return (
    <>
  {/* existing content */}
  {/* Desktop/Tablet sidebar */}
    <div className={`flex flex-col h-full ${isSidebarExpanded ? "w-64" : "w-16"} transition-width duration-300`}>

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
                width={isSidebarExpanded ? 350 : 32}
                height={isSidebarExpanded ? 350 : 32}
              />
            </div>
          </div>

          {/* Separator line */}
          <div className="border-t border-[#FACC15] mx-3 mb-6" />

          {/* Sidebar content */}
          
          <div className="flex-grow">
            <nav>
              <ul className="space-y-3">
                {/* Regular links */}
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
                        <span className="ml-2 truncate">{link.name}</span>
                      )}
                    </Link>
                  </li>
                ))}

                {/* Academics dropdown */}
                <li className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleAcademics}
                    className={`flex items-center w-full ${
                      isSidebarExpanded
                        ? "justify-between mx-3"
                        : "justify-center"
                    } p-3 rounded-md ${
                      isAcademicsActive ? "bg-blue-500" : "hover:bg-gray-700"
                    }`}
                    title={!isSidebarExpanded ? "ACADEMICS" : ""}
                  >
                    <div className="flex items-center">
                      <BookOpenCheck size={20} />
                      {isSidebarExpanded && (
                        <span className="ml-2 truncate">ACADEMICS</span>
                      )}
                    </div>
                    {isSidebarExpanded && (
                      <span>
                        {academicsOpen ? (
                          <ChevronDown size={16} className="mr-4"/>
                        ) : (
                          <ChevronRight size={16} className="mr-4"/>
                        )}
                      </span>
                    )}
                  </button>

                  {/* Dropdown items for expanded sidebar */}
                  {isSidebarExpanded && academicsOpen && (
                    <ul className="mt-2 space-y-1 ml-8 mr-3">
                      {academicItems.map((item) => (
                        <li key={item.href}>
                         <Link
  href={item.href}
  className={`flex items-center justify-start p-2 rounded-md truncate ${
    pathname === item.href
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-700 text-gray-300"
  }`}
>
  <span>{item.icon}</span>
  <span className="ml-2 text-sm truncate">{item.name}</span>
</Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Popup menu for collapsed sidebar */}
                  {!isSidebarExpanded && showMiniDropdown && (
                    <div className="absolute left-full ml-2 top-0 z-50 bg-gray-800 rounded-md shadow-lg border border-gray-700 w-48">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm text-white font-semibold border-b border-gray-700">
                          ACADEMICS
                        </div>
                        {academicItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-2 text-sm my-4 ${
                              pathname === item.href
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                            }`}
                          >
                            <span>{item.icon}</span>
                            <span className="ml-2">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>

            <div className="border-t border-[#FACC15] mx-3 my-8" />
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
</div>
      

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="w-full bg-gray-800 border-t border-gray-700">
          <nav>
            <ul className="flex justify-around items-center p-3">
              {/* Dashboard link */}
              <li>
                <Link
                  href="/dashboard"
                  className={`flex flex-col items-center p-2 rounded-md ${
                    pathname === "/dashboard"
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <LayoutDashboard size={24} />
                  <span className="text-xs mt-1">DASHBOARD</span>
                </Link>
              </li>

              {/* Academics link with mobile dropdown */}
              <li className="relative">
                <div
                  className={`flex flex-col items-center p-2 rounded-md ${
                    isAcademicsActive
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setShowMiniDropdown(!showMiniDropdown)}
                >
                  <BookOpenCheck size={24} />
                  <span className="text-xs mt-1 flex items-center">
                    ACADEMICS
                    {showMiniDropdown ? (
                      <ChevronDown size={12} className="ml-1" />
                    ) : (
                      <ChevronRight size={12} className="ml-1" />
                    )}
                  </span>
                </div>

                {/* Mobile dropdown */}
                {showMiniDropdown && (
<div className="absolute bottom-full left-0 right-0 mb-2 mx-auto bg-gray-800 rounded-md shadow-lg border border-gray-700 w-48 z-50" style={{maxWidth: "90vw", margin: "0 auto"}}>
                    <div className="py-2">
                      {academicItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center px-4 py-2 text-sm ${
                            pathname === item.href
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span className="ml-2">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {/* Profile link */}
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`flex flex-col items-center p-2 rounded-md ${
                    pathname === "/dashboard/profile"
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <User size={24} />
                  <span className="text-xs mt-1">PROFILE</span>
                </Link>
              </li>

              {/* Logout button */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center p-2 text-gray-400 hover:text-white"
                >
                  <LogOut size={24} />
                  <span className="text-xs mt-1">LOGOUT</span>
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
