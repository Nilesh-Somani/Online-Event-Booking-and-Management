import { useState, useEffect, useRef } from "react";
import { NotificationIcon, CreateEventIcon, TotalEventsIcon, AttendeesIcon, MoneyIcon, ViewIcon, EditIcon, AnalyticsIcon, SettingsIcon, EventsIcon, UsersIcon } from "../components/Icon";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    // Close notification popup on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(e.target)
            ) {
                setShowNotifications(false);
            }
        }

        if (showNotifications) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications]);

    return (
        <>
            <Navbar />

            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* ================= HEADER ================= */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 mt-2">
                                System overview & control center
                            </p>
                        </div>

                        <div className="flex items-center gap-4 relative">
                            {/* Notification Bell */}
                            <button
                                onClick={() => setShowNotifications(v => !v)}
                                className="relative p-2 text-gray-600 hover:text-gray-900"
                            >
                                <NotificationIcon size={22} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    2
                                </span>
                            </button>

                            {/* Notification Popup */}
                            {showNotifications && (
                                <div
                                    ref={notificationRef}
                                    className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                                >
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">
                                                Notifications
                                            </h3>
                                            <button className="text-sm text-purple-600">
                                                Mark all read
                                            </button>
                                        </div>
                                    </div>

                                    <div className="max-h-64 overflow-y-auto">
                                        {[
                                            ["New booking for Summer Music Festival", "2 minutes ago", true],
                                            ["Event Tech Conference approved", "1 hour ago", true],
                                            ["Art Gallery Opening starts soon", "3 hours ago", false],
                                        ].map(([text, time, unread]) => (
                                            <div
                                                key={text}
                                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${unread ? "bg-purple-50" : ""
                                                    }`}
                                            >
                                                <div className="flex items-start">
                                                    <div
                                                        className={`w-2 h-2 rounded-full mt-2 mr-3 ${unread
                                                            ? "bg-purple-500"
                                                            : "bg-gray-400"
                                                            }`}
                                                    ></div>
                                                    <div>
                                                        <p className="text-sm text-gray-900">
                                                            {text}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Manage Users */}
                            <Link to="/admin/users">
                                <button className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition">
                                    <UsersIcon className="mr-2" />
                                    Manage Users
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* ================= STATS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            ["Total Users", "5", <UsersIcon />, "bg-blue-100", "text-blue-600"],
                            ["Total Events", "4", <TotalEventsIcon />, "bg-green-100", "text-green-600"],
                            ["Active Organizers", "1", <AttendeesIcon />, "bg-purple-100", "text-purple-600"],
                            ["Total Revenue", "$166,020", <MoneyIcon />, "bg-orange-100", "text-orange-600"],
                        ].map(([label, value, IconEl, bgColor, tColor]) => (
                            <div key={label} className="bg-white border rounded-lg p-6">
                                <div className="flex items-center">
                                    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mr-4`}>
                                        <span className={tColor}>{IconEl}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* ===== LEFT ===== */}
                        <div className="lg:col-span-2">

                            {/* Quick Actions */}
                            <div className="bg-white border rounded-lg p-6 mb-8">
                                <h2 className="text-lg font-semibold mb-4">
                                    Quick Actions
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        ["Users", <UsersIcon />, "bg-blue-50", "hover:bg-blue-100", "text-blue-600", "text-blue-700", "/admin/users"],
                                        ["Events", <EventsIcon />, "bg-green-50", "hover:bg-green-100", "text-green-600", "text-green-700", "/admin/events"],
                                        ["Applications", <ViewIcon />, "bg-purple-50", "hover:bg-purple-100", "text-purple-600", "text-purple-700", "/admin/applications"],
                                        ["System Logs", <SettingsIcon />, "bg-gray-50", "hover:bg-gray-100", "text-gray-600", "text-gray-700", "/admin/logs"],
                                    ].map(([label, IconEl, bgColor, bgHColor, tIColor, tLColor, link]) => (
                                        <Link
                                            key={label}
                                            to={link}
                                            className={`flex flex-col items-center p-4 ${bgColor} rounded-lg ${bgHColor}`}
                                        >
                                            <span className={`${tIColor} mb-2`}>{IconEl}</span>
                                            <span className={`text-sm font-medium ${tLColor}`}>
                                                {label}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* My Events */}
                            <div className="bg-white border rounded-lg overflow-hidden">
                                <div className="p-6 border-b">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">
                                            My Events
                                        </h2>

                                        <div className="flex gap-4">
                                            <select className="px-3 py-2 border rounded-lg text-sm">
                                                <option>All Status</option>
                                                <option>Published</option>
                                                <option>Draft</option>
                                                <option>Cancelled</option>
                                            </select>

                                            <select className="px-3 py-2 border rounded-lg text-sm">
                                                <option>Sort by Date</option>
                                                <option>Title</option>
                                                <option>Attendees</option>
                                                <option>Revenue</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y">
                                    {[
                                        ["Tech Innovation Conference 2024", "draft", "180", "$12,300"],
                                        ["Art Gallery Opening Night", "published", "120", "$3,200"],
                                        ["Marathon Championship 2024", "published", "890", "$15,600"],
                                        ["Summer Music Festival 2024", "published", "450", "$8,500"],
                                    ].map(([title, status, attendees, revenue]) => (
                                        <div key={title} className="p-6 hover:bg-gray-50 flex justify-between">
                                            <div>
                                                <h3 className="font-medium text-lg">{title}</h3>

                                                {/* STATUS USED (warning fixed) */}
                                                <span
                                                    className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {status}
                                                </span>

                                                <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                                    <AttendeesIcon size={14} className="mr-1" />
                                                    {attendees} attendees
                                                </p>
                                                <p className="text-green-600 font-medium">{revenue}</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="flex items-center border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-600 hover:text-white">
                                                    <EditIcon className="mr-1" /> Edit
                                                </button>
                                                <button className="flex items-center border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-600 hover:text-white">
                                                    <ViewIcon className="mr-1" /> View
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ===== RIGHT SIDEBAR (UNCHANGED) ===== */}
                        <div className="space-y-6">
                            {/* Recent Admin Actions */}
                            <div className="bg-white border rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Recent Admin Actions
                                </h3>

                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li>✔ Approved Tech Conference event</li>
                                    <li>✏️ Updated category list</li>
                                    <li>🚫 Rejected organizer application</li>
                                    <li>🔐 Updated system permissions</li>
                                </ul>
                            </div>

                            {/* Pending Approvals */}
                            <div className="bg-white border rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">
                                        Pending Approvals
                                    </h3>
                                    <Link
                                        to="/admin/applications"
                                        className="text-sm text-purple-600 hover:underline"
                                    >
                                        View all
                                    </Link>
                                </div>

                                <ul className="space-y-3 text-sm">
                                    <li className="flex justify-between">
                                        <span>Organizer Application</span>
                                        <span className="text-yellow-600 font-medium">Pending</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Event Approval</span>
                                        <span className="text-yellow-600 font-medium">Pending</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Category Request</span>
                                        <span className="text-yellow-600 font-medium">Pending</span>
                                    </li>
                                </ul>
                            </div>

                            {/* System Alerts */}
                            <div className="bg-white border rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    System Alerts
                                </h3>

                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="text-red-600">
                                        ⚠️ High server load detected
                                    </li>
                                    <li>
                                        🛠 Maintenance scheduled tonight
                                    </li>
                                    <li>
                                        ✅ All payment gateways operational
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}