import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import {
    getDashboardStats,
    getAllReports,
    updateReportStatus,
    deleteReport,
    getCategoryStats,
    getMonthlyStats,
    getRecentComplaints,
    getTodaySummary,
    getAnalytics,
    exportComplaintsCsv
} from "../services/adminService";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaUsers,
    FaAward,
} from "react-icons/fa";


import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [categoryStats, setCategoryStats] = useState([]);
  const [todaySummary, setTodaySummary] = useState({});
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [priorityData, setPriorityData] = useState([]);

const [statusData, setStatusData] = useState([]);
      const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed"
];

const [monthlyStats, setMonthlyStats] = useState([]);

 useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {
  try {
    const dashboardData = await getDashboardStats();
    const reportData = await getAllReports();
    const categoryData = await getCategoryStats();
    const monthlyData = await getMonthlyStats();
    const todayData = await getTodaySummary();
    const recentData = await getRecentComplaints();
    const analyticsData = await getAnalytics();


    console.log(categoryData);
    console.log(monthlyData);
    setTodaySummary(todayData);
    setRecentComplaints(recentData);
    setAnalytics(analyticsData);
    const priorityChartData =
    analyticsData?.priorityStats
        ? Object.entries(
              analyticsData.priorityStats
          ).map(([name, value]) => ({
              name,
              value
          }))
        : [];

const statusChartData =
    analyticsData?.statusStats
        ? Object.entries(
              analyticsData.statusStats
          ).map(([name, value]) => ({
              name: name.replace("_", " "),
              value
          }))
        : [];

setPriorityData(priorityChartData);

setStatusData(statusChartData);

    setStats(dashboardData);
    setReports(reportData);

    setCategoryStats(
      Array.isArray(categoryData)
        ? categoryData
        : Object.entries(categoryData).map(([category, count]) => ({
            category,
            count,
          }))
    );

    setMonthlyStats(
      Array.isArray(monthlyData)
        ? monthlyData
        : Object.entries(monthlyData).map(([month, count]) => ({
            month,
            count,
          }))
    );
  } catch (err) {
    console.log(err);
  }
};
const handleStatusChange = async (
    id,
    status
) => {

    try {

        await updateReportStatus(
            id,
            status
        );

        await loadDashboard();

    } catch (error) {

        console.log(error);

    }

};
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Delete this complaint?"
    );

    if (!confirmDelete)
        return;

    try {

        await deleteReport(id);

        await loadDashboard();

        alert("Complaint deleted.");

    } catch (error) {

        console.log(error);

    }

};
const handleExportCSV = async () => {

    try {

        const response = await exportComplaintsCsv();

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "complaints.csv"
        );

        document.body.appendChild(link);

        link.click();

        link.remove();

    } catch (error) {

        console.error(error);

        alert("Failed to export CSV.");

    }

};

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || report.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-dashboard">

      <h1>🛠 Admin Dashboard</h1>

      <p>Monitor reports and platform activity.</p>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <FaClipboardList />
          <h2>{stats["Total Complaints"]}</h2>
          <p>Total Reports</p>
        </div>

        <div className="stat-card">
          <FaClock />
          <h2>{stats["Pending"]}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <FaClock />
          <h2>{stats["In Progress"]}</h2>
          <p>In Progress</p>
         </div>

        <div className="stat-card">
          <FaCheckCircle />
          <h2>{stats["Resolved"]}</h2>
          <p>Resolved</p>
        </div>
        {/* <div className="stat-card">
          <FaUsers />
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <FaAward />
          <h2>{stats.civicPoints}</h2>
          <p>Civic Points</p>
        </div>
         */}

      </div>

      {/* Quick Actions */}
      <div className="quick-actions">

          <button
              onClick={handleExportCSV}
          >
              📥 Export CSV
          </button>

      </div>



     
      <div className="analytics-grid">

    <div className="chart-card">

        <h2>Complaints by Category</h2>

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <BarChart data={categoryStats}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="count"
                    fill="#2563eb"
                />

            </BarChart>

        </ResponsiveContainer>

    </div>

    <div className="chart-card">

        <h2>Monthly Complaints</h2>

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <LineChart data={monthlyStats}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#16a34a"
                    strokeWidth={3}
                />

            </LineChart>

        </ResponsiveContainer>

    </div>

</div>
{analytics && (

<div className="extra-analytics">

    {/* Resolution Rate */}

    <div className="mini-card">

        <h3>📊 Resolution Rate</h3>

        <div className="resolution-circle">

            {analytics.resolutionRate}%

        </div>

    </div>

    {/* Priority Distribution */}

    <div className="mini-card">

        <h3>🔥 Priority Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>

            <PieChart>

                <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                >

                    {priorityData.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />

                    ))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    </div>

    {/* Status Distribution */}

    <div className="mini-card">

        <h3>📈 Status Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>

            <PieChart>

                <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={80}
                    label
                >

                    {statusData.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />

                    ))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    </div>

    {/* Top Locations */}

    <div className="mini-card">

        <h3>📍 Top Locations</h3>

        <ResponsiveContainer width="100%" height={250}>

            <BarChart
                layout="vertical"
                data={analytics.topLocations}
            >

                <XAxis type="number" />

                <YAxis
                    type="category"
                    dataKey="location"
                />

                <Tooltip />

                <Bar
                    dataKey="count"
                    fill="#2563eb"
                />

            </BarChart>

        </ResponsiveContainer>

    </div>

    {/* Most Supported */}

    <div className="mini-card">

        <h3>❤️ Most Supported Complaints</h3>

        <ResponsiveContainer width="100%" height={250}>

            <BarChart
                layout="vertical"
                data={analytics.mostSupportedComplaints}
            >

                <XAxis type="number" />

                <YAxis
                    type="category"
                    dataKey="title"
                    width={120}
                />

                <Tooltip />

                <Bar
                    dataKey="supportCount"
                    fill="#16a34a"
                />

            </BarChart>

        </ResponsiveContainer>

    </div>

</div>

)}


      {/* Bottom Section */}
      <div className="bottom-section">

        <div className="activity-card">

          <h2>Recent Activity</h2>

          <ul>

              {recentComplaints.map((complaint) => (

                  <li key={complaint.id}>

                      {complaint.status === "RESOLVED" && "✅"}

                      {complaint.status === "PENDING" && "📌"}

                      {complaint.status === "IN_PROGRESS" && "🚧"}

                      {" "}

                      <strong>{complaint.title}</strong>

                      {" - "}

                      {complaint.status.replace("_", " ")}

                  </li>

              ))}

          </ul>

      </div>
       <div className="summary-card">

              <h2>Today's Summary</h2>

              <p>📝 New Reports : {todaySummary.newReports || 0}</p>

              <p>✅ Resolved : {todaySummary.resolved || 0}</p>

              <p>⏳ Pending : {todaySummary.pending || 0}</p>

              <p>🚧 In Progress : {todaySummary.inProgress || 0}</p>

          </div>
      </div>
            {/* Search & Filter */}
      <div className="report-toolbar">

        <input
          type="text"
          placeholder="🔍 Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="toolbar-right">

        <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
        >
        <option value="All">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
        </select>
        </div>
      </div>
       {/* Reports Table */}
      <table className="report-table">

        <thead>

          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

        {filteredReports.length === 0 ? (

        <tr>

              <td colSpan="4">
        No complaints found.
        </td>

        </tr>

        ) : (

        filteredReports.map((report) => (
            <tr key={report.id}>

              <td>{report.title}</td>

              <td>{report.category}</td>

              <td>

            <select
                value={report.status}
                onChange={(e) =>
                    handleStatusChange(
                        report.id,
                        e.target.value
                    )
                }
            >

                <option value="PENDING">
                    Pending
                </option>

                <option value="IN_PROGRESS">
                    In Progress
                </option>

                <option value="RESOLVED">
                    Resolved
                </option>

            </select>

              </td>
                <td>

                {/* <Link
                    to={`/workspace/reports/${report.id}`}
                    className="view-btn"
                >
                    View
                </Link> */}

                <button
                    className="delete-btn"
                    onClick={() =>
                        handleDelete(report.id)
                    }
                >
                    Delete
                </button>

            </td>

            </tr>

          )))}

        </tbody>

      </table>

         

      

    </div>
  );
}

export default AdminDashboard;