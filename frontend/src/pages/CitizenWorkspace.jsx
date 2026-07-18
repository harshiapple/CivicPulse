import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import TipsCard from "../components/TipsCard";

import { getDashboard } from "../services/dashboardService";

function CitizenWorkspace() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!dashboard) {
        return <h2>Loading Dashboard...</h2>;
    }

    return (
        <>
            <h1 className="workspace-title">
                Citizen Workspace
            </h1>

            <p className="workspace-subtitle">
                Welcome back! Here's an overview of your civic activities.
            </p>

            <DashboardCards dashboard={dashboard} />

            <QuickActions />

            <div className="bottom-grid">

                <RecentActivity
                    complaints={dashboard.recentComplaints}
                />

                <TipsCard />

            </div>
        </>
    );
}

export default CitizenWorkspace;