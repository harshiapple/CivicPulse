import {
    FaClipboardList,
    FaHourglassHalf,
    FaCheckCircle,
    FaAward,
} from "react-icons/fa";

function DashboardCards({ dashboard }) {

    const cards = [
        {
            title: "Total Reports",
            value: dashboard.totalComplaints,
            icon: <FaClipboardList />,
            color: "#2563eb",
        },
        {
            title: "Pending",
            value: dashboard.pending,
            icon: <FaHourglassHalf />,
            color: "#f59e0b",
        },
        {
            title: "Resolved",
            value: dashboard.resolved,
            icon: <FaCheckCircle />,
            color: "#10b981",
        },
        {
            title: "Reward Points",
            value: dashboard.rewardPoints,
            icon: <FaAward />,
            color: "#8b5cf6",
        },
    ];

    return (
        <div className="dashboard-cards">
            {cards.map((card, index) => (
                <div
                    className="dashboard-card"
                    key={index}
                >
                    <div
                        className="card-icon"
                        style={{
                            backgroundColor: card.color,
                        }}
                    >
                        {card.icon}
                    </div>

                    <div>
                        <h4>{card.title}</h4>
                        <h2>{card.value}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DashboardCards;