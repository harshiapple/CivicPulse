import api from "./api";

/*
    Dashboard Statistics
*/
export const getDashboardStats = async () => {

    const response = await api.get(
        "/admin/complaints/dashboard"
    );

    return response.data;
};

/*
    All Complaints
*/
export const getAllReports = async () => {

    const response = await api.get(
        "/admin/complaints"
    );

    return response.data;
};

/*
    Update Complaint Status
*/
export const updateReportStatus = async (
    id,
    status
) => {

    const response = await api.patch(
        `/admin/complaints/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};

/*
    Delete Complaint
*/
export const deleteReport = async (id) => {

    const response = await api.delete(
        `/admin/complaints/${id}`
    );

    return response.data;
};
/*
    Category Statistics
*/
export const getCategoryStats = async () => {
    const response = await api.get(
        "/admin/complaints/categories"
    );
    return response.data;
};

/*
    Monthly Statistics
*/
export const getMonthlyStats = async () => {
    const response = await api.get(
        "/admin/complaints/monthly"
    );

    return response.data;
};

export const getTodaySummary = async () => {

    const response = await api.get(
        "/admin/complaints/today-summary"
    );

    return response.data;
};

export const getRecentComplaints = async () => {

    const response = await api.get(
        "/admin/complaints/recent"
    );

    return response.data;

};
/*
    Complete Analytics
*/
export const getAnalytics = async () => {

    const response = await api.get(
        "/admin/complaints/analytics"
    );

    return response.data;

};
/*
    Export Complaints CSV
*/
export const exportComplaintsCsv = async () => {

    return await api.get(
        "/admin/complaints/export",
        {
            responseType: "blob"
        }
    );

};