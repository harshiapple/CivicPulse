import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReports, deleteReport } from "../services/reportService";
import "../styles/myReports.css";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
async function loadReports() {

    try{

        const data = await getReports();

        setReports(data);

        setFilteredReports(data);

    }

    catch(error){

        console.log(error);

    }

    finally{

        setLoading(false);

    }

}

    loadReports();
  }, []);

  useEffect(() => {
    let result = reports;

    if (status !== "All") {
      result = result.filter((r) => r.status === status);
    }

    if (search.trim()) {
      result = result.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === "Newest") {
  result = [...result].sort(
    (a, b) =>  new Date(b.createdAt)- new Date(a.createdAt)
  );
}

if (sortBy === "Oldest") {
  result = [...result].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
}

if (sortBy === "Priority") {

  const order = {
      HIGH:1,
      MEDIUM:2,
      LOW:3
  };

  result = [...result].sort(
    (a, b) => order[a.priority] - order[b.priority]
  );

}

    setFilteredReports(result);
 }, [search,status,sortBy,reports]);
    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Delete this complaint?"
    );

    if (!confirmDelete) return;

    await deleteReport(id);

    const data = await getReports();

    setReports(data);

    };
    if (loading) {
  return <h2>Loading reports...</h2>;
}

  return (
    <div className="reports-page">

      <h1>My Reports</h1>

    <div className="reports-toolbar">

        <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
            <option value="All">All</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
        </select>

        <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
        >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Priority</option>
        </select>

    </div>

<div className="reports-grid">

{filteredReports.length === 0 ? (

<div className="empty-state">

    <h2>📭 Nothing to show</h2>

    <p>
        We couldn't find any complaints matching your filters.
    </p>

</div>

) : (filteredReports.map((report) => (

          <div
            className="report-card-item"
            key={report.id}
          >

            <h2>{report.title}</h2>

            <p>{report.description}</p>

            {report.imageUrl && (

          <img
              src={report.imageUrl}
              className="report-image"
              alt={report.title}
          />

          )}

            <div className="report-meta">

                  <div className="report-tags">

          <span className="category-tag">

              🤖 {report.category}

          </span>

          <span className={`priority ${report.priority.toLowerCase()}`}>

              ⚡ {report.priority}

          </span>

      </div>

              <span>📍 {report.location}</span>

              <p>
                📅 {new Date(report.createdAt).toLocaleString()}
            </p>

            </div>

            <div className="report-footer">

              <span className={`priority ${report.priority.toLowerCase()}`}>
                {report.priority}
              </span>

              <span
                className={`status ${report.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {report.status}
              </span>

            </div>

                <p className="support-count">
        👍 {report.supportCount} Citizens Supported
    </p>
                <div className="report-actions">

            <Link
                to={`/workspace/reports/${report.id}`}
                className="view-btn"
            >
                View Details
            </Link>

            {/* <button className="edit-btn">
                Edit
            </button> */}

            {/* <button
                className="delete-btn"
                onClick={() => handleDelete(report.id)}
            >
                Delete
            </button> */}

            </div>

          </div>
          

        ))
)}

    
      </div>

    </div>
  ) ;
}

export default MyReports;