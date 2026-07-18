import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReportById } from "../services/reportService";
import "../styles/reportDetails.css";

function ReportDetails() {
  const { id } = useParams();

  const [report, setReport] = useState(null);

  useEffect(() => {
    async function loadReport() {
      const data = await getReportById(id);
      setReport(data);
    }

    loadReport();
  }, [id]);

  if (!report) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details-page">

      <div className="details-card">

        <h1>{report.title}</h1>

        <p>{report.description}</p>

        <hr />

        <h3>Category</h3>
        <p>{report.category}</p>

        <h3>Status</h3>
        <p className={`status ${report.status.toLowerCase()}`}>
        {report.status}
    </p>

        <h3>Priority</h3>
        <p>{report.priority}</p>

        <h3>Location</h3>
        <p>{report.location}</p>

        <h3>Date</h3>
        <p>{new Date(report.createdAt).toLocaleString()}</p>

        {report.imageUrl && (
    <>
        <h3>Image</h3>

        <img
            src={`http://localhost:8080/uploads/${report.imageUrl}`}
            alt="Complaint"
            className="complaint-image"
        />
    </>
)}
      <h3>Support Count</h3>

      <p>{report.supportCount}</p>

        <Link
          to="/workspace/reports"
          className="back-btn"
        >
          ← Back
        </Link>

      </div>

    </div>
  );
}

export default ReportDetails;