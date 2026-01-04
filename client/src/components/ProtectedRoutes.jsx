import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles }) {
    const user = useSelector(state => state.auth.user);
    
    const location = useLocation();
    
    // Not logged in → remember where user wanted to go
    if (!user) {
        return (
            <Navigate
                to="/auth"
                replace
                state={{ from: location }}
            />
        );
    }

    // Role not allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}