import { useEffect, useState } from "react";
import {
    getNotifications,
    markAsRead,
    clearNotifications,
} from "../services/notificationService";

import "../styles/notifications.css";

import {
    FaBell,
    FaCheckCircle,
    FaTrophy,
    FaUserShield,
} from "react-icons/fa";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {

        try {

            const data = await getNotifications();
            setNotifications(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleRead = async (id) => {

        try {

            await markAsRead(id);
            await loadNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const handleMarkAllRead = async () => {

        try {

            await clearNotifications();
            await loadNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const unreadCount = notifications.filter(
        notification => !notification.isRead
    ).length;

    const filteredNotifications =
        filter === "all"
            ? notifications
            : notifications.filter(
                  notification => !notification.isRead
              );

    const getIcon = (type) => {

        switch (type) {

            case "reward":
                return <FaTrophy />;

            case "admin":
                return <FaUserShield />;

            case "success":
                return <FaCheckCircle />;

            default:
                return <FaBell />;

        }

    };

    return (

        <div className="notifications-page">

            <div className="notification-header">

                <div>

                    <h1>🔔 Notifications</h1>

                    <p>
                        Stay updated with your reports.
                    </p>

                </div>

                <div className="notification-actions">

                    <span className="count">

                        Unread : {unreadCount}

                    </span>

                    <button
                        onClick={handleMarkAllRead}
                    >
                        Mark All Read
                    </button>

                </div>

            </div>

            <div className="filters">

                <button
                    className={
                        filter === "all"
                            ? "active"
                            : ""
                    }
                    onClick={() => setFilter("all")}
                >
                    All
                </button>

                <button
                    className={
                        filter === "unread"
                            ? "active"
                            : ""
                    }
                    onClick={() => setFilter("unread")}
                >
                    Unread
                </button>

            </div>

            {filteredNotifications.length === 0 ? (

                <div className="empty-state">

                    <h2>No Notifications</h2>

                    <p>You're all caught up!</p>

                </div>

            ) : (

                filteredNotifications.map(notification => (

                    <div
                        key={notification.id}
                        className={`notification-card ${
                            notification.isRead
                                ? "read"
                                : "unread"
                        } report`}
                    >

                        <div className="notification-content">

                            <div className="notification-icon">

                                {getIcon("report")}

                            </div>

                            <div>

                                <h3>Notification</h3>

                                <p>
                                    {notification.message}
                                </p>

                            </div>

                        </div>

                        <div className="notification-meta">

                            <span>

                                {new Date(
                                    notification.createdAt
                                ).toLocaleString()}

                            </span>

                            {!notification.isRead && (

                                <button
                                    className="read-btn"
                                    onClick={() =>
                                        handleRead(notification.id)
                                    }
                                >
                                    Mark Read
                                </button>

                            )}

                            {!notification.isRead && (

                                <span className="unread-dot"></span>

                            )}

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default Notifications;