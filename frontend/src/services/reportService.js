import api from "./api";

/*
    Report Complaint
*/
export const reportComplaint = async (formData) => {

    const response = await api.post(
        "/complaints",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/*
    My Complaints
*/
export const getReports = async () => {

    const response = await api.get("/complaints/my");

    return response.data;
};

/*
    Complaint Details
*/
export const getReportById = async (id) => {

    const response = await api.get(`/complaints/${id}`);

    return response.data;
};

/*
    Delete (Admin later)
*/
export const deleteReport = async (id) => {

    const response = await api.delete(`/admin/complaints/${id}`);

    return response.data;
};
/*
    Support Existing Complaint
*/

export const supportComplaint = async (id) => {

    const response = await api.post(
        `/complaints/${id}/support`
    );

    return response.data;

};