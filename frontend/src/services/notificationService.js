import api from "./api";

export const getNotifications = async () => {

    const response = await api.get(
        "/notifications"
    );

    return response.data;

};

export const markAsRead = async (id) => {

    const response = await api.patch(
        `/notifications/${id}/read`
    );

    return response.data;

};

export const clearNotifications = async () => {

    await api.patch(
        "/notifications/read-all"
    );

};

export const getUnreadCount = async () => {

    const response = await api.get(
        "/notifications/unread-count"
    );

    return response.data;

};