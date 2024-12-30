// src/pages/admin/Dashboard.jsx
import StatsCard from "../../components/Admin/StatsCard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Bookings" value="120" />
        <StatsCard title="Revenue" value="$15,000" />
        <StatsCard title="Top Destination" value="Paris" />
      </div>
    </div>
  );
};

export default Dashboard;
