import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate("/", { replace: true });
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-6xl font-bold text-purple-600 mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl font-semibold mb-2">
                        Page not found
                    </h2>

                    <p className="text-gray-600 mb-6">
                        You'll be redirected to the home page in{" "}
                        <span className="font-semibold text-purple-600">
                            {seconds}
                        </span>{" "}
                        seconds.
                    </p>

                    <button
                        onClick={() => navigate("/", { replace: true })}
                        className="px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium shadow hover:shadow-lg transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}