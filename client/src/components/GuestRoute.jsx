import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }) {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    /**
     * If user is already logged in
     * → send them back to where they came from
     */
    if (user) {
        const from = location.state?.from;

        if (from) {
            return (
                <Navigate
                    to={from.pathname}
                    replace
                    state={from.state}
                />
            );
        }

        // fallback (only if no previous page)
        return <Navigate to="/" replace />;
    }

    /**
     * If NOT logged in
     * → allow Auth page to open
     * → but remember public page (events, categories, etc.)
     */
    return children;
}