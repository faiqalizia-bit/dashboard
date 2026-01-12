import DashboardLayout from "../dashboardlatout/DashboardLayout";
import DashboardContent from "./DashboardContent";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex py-2 w-full">
        <DashboardContent />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;