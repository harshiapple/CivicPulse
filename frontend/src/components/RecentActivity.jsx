import {
    FaCheckCircle,
    FaClock,
    FaTools,
} from "react-icons/fa";

function RecentActivity({ complaints }) {

    const getIcon = (status) => {

        if (status === "RESOLVED")
            return <FaCheckCircle />;

        if (status === "IN_PROGRESS")
            return <FaTools />;

        return <FaClock />;
    };

    return (
        <div className="activity-card">

            <h2>Recent Activity</h2>

            {complaints.length === 0 ? (
                <p>No complaints yet.</p>
            ) : (
                complaints.map((item) => (

                    <div
                        key={item.id}
                        className="activity-item"
                    >

                        <div className="activity-icon">
                            {getIcon(item.status)}
                        </div>

                        <div>

                            <h4>{item.title}</h4>

                            <p>
                                {item.status.replace("_", " ")}
                            </p>

                        </div>

                    </div>

                ))
            )}

        </div>
    );
}

export default RecentActivity;