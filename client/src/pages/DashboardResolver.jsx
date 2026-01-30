import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserDashboard from "./UserDashboard";
import OrganizerDashboard from "./OrganizerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardResolver() {
    const user = useSelector(state => state.auth.user);

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    switch (user.role) {
        case "user":
            return <UserDashboard />;

        case "organizer":
            return <OrganizerDashboard />;

        case "admin":
            return <AdminDashboard />;

        default:
            return <Navigate to="/" replace />;
    }
}