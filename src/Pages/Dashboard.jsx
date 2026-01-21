import DashboardLayout from "../Component/dashboardlatout/DashboardLayout";
import DashboardContent from "../Component/dashboard/DashboardContent";

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