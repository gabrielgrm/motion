'use client'

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSplashScreen = pathname === "/";

  return (
    <>
      {!isSplashScreen && <Header />}

      <div className={`flex min-h-screen ${isSplashScreen ? "" : "border-2"}`}>
        {!isSplashScreen && <Sidebar />}

        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {children}
        </div>
      </div>

      {!isSplashScreen && <Toaster position="top-center" />}
    </>
  );
}