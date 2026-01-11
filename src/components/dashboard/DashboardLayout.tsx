import { ReactNode } from "react";
import { DashboardNav } from "./DashboardNav";
import { DashboardTopBar } from "./DashboardTopBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <DashboardTopBar />
      
      {/* Main content area */}
      <main className="pt-14 pb-20">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
