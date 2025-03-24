"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobileBreakpoint = window.innerWidth < 768;
      setIsMobile(mobileBreakpoint);
      if (mobileBreakpoint) {
        setIsSidebarExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex h-full relative">
      <div
        className={`transition-all duration-300  text-white ${
          isMobile ? "hidden" : isSidebarExpanded ? "w-64" : "w-16"
        }`}
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
          isMobile={isMobile}
        />
      </div>

      <div className={`flex-1 p-4 bg-[#D1D5DB] overflow-y-auto ${isMobile ? "pb-24" : ""}`}>
        {children}
      </div>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Sidebar
            isSidebarExpanded={false}
            setIsSidebarExpanded={setIsSidebarExpanded}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
}
