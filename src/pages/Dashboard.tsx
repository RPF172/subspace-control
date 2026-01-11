import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DashboardLayout,
  DashboardProfilePanel,
  DashboardActivityPanel,
  DashboardMessagesPanel,
  DashboardDiscoveryPanel,
} from "@/components/dashboard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground-muted">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardProfilePanel />
      <div className="grid md:grid-cols-2 gap-6">
        <DashboardMessagesPanel />
        <DashboardDiscoveryPanel />
      </div>
      <DashboardActivityPanel />
    </DashboardLayout>
  );
};

export default Dashboard;
