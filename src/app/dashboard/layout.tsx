"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobileBreakpoint = window.innerWidth < 768;
      setIsMobile(mobileBreakpoint);
      if (mobileBreakpoint) {
        setIsSidebarExpanded(false);
      }
    };

    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar container - desktop/tablet */}
      <div className={`transition-all duration-300 bg-gray-900 text-white ${
        isMobile ? 'hidden' : (isSidebarExpanded ? 'w-64' : 'w-16')
      }`}>
        <Sidebar 
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
          isMobile={isMobile}
        />
      </div>
  
      {/* Page Content */}
      <div className={`flex-1 p-6 ${isMobile ? 'pb-24' : ''}`}>
        {children}
      </div>

      {/* Mobile bottom navigation */}
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