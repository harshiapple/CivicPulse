const notifications = [
  {
    id: 1,
    title: "Complaint Submitted",
    message: "Your pothole complaint has been submitted successfully.",
    type: "report",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    title: "Complaint Resolved",
    message: "Your street light complaint has been resolved.",
    type: "success",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    title: "Reward Earned",
    message: "You earned 20 Civic Points.",
    type: "reward",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    title: "Admin Update",
    message: "Your garbage complaint is under review.",
    type: "admin",
    time: "2 days ago",
    read: true,
  },
];

export default notifications;