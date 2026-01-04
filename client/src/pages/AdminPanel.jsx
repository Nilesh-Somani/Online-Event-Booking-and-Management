import { useState } from "react";
import { UsersIcon, DashboardEventsIcon, UserGroupIcon, RevenueIcon, SearchIcon, AddIcon, EditIcon, DeleteIcon } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ✅ MOVE THIS OUTSIDE */
function StatCard({ icon, bg, color, label, value }) {
    const Icon = icon; // ESLint now sees this as used

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
                <div
                    className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mr-4`}
                >
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            <Navbar />

            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Panel
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage users, events, and system settings
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={UsersIcon}
                            bg="bg-blue-100"
                            color="text-blue-600"
                            label="Total Users"
                            value="5"
                        />
                        <StatCard
                            icon={DashboardEventsIcon}
                            bg="bg-green-100"
                            color="text-green-600"
                            label="Total Events"
                            value="4"
                        />
                        <StatCard
                            icon={UserGroupIcon}
                            bg="bg-purple-100"
                            color="text-purple-600"
                            label="Active Organizers"
                            value="1"
                        />
                        <StatCard
                            icon={RevenueIcon}
                            bg="bg-yellow-100"
                            color="text-yellow-600"
                            label="Total Revenue"
                            value="$166,020"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-8">
                            {[
                                ["overview", "Overview"],
                                ["users", "Users Management"],
                                ["events", "Events Management"],
                                ["applications", "Applications"],
                            ].map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === key
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    {label}
                                    {key === "applications" && (
                                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                            1
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* OVERVIEW */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white border rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    System Summary
                                </h2>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• 2 new users joined this month</li>
                                    <li>• 1 organizer pending approval</li>
                                    <li>
                                        • Highest revenue event:{" "}
                                        <b>Marathon Championship</b>
                                    </li>
                                    <li>• No system alerts detected</li>
                                </ul>
                            </div>

                            <div className="bg-white border rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Admin Actions
                                </h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                                        Review Organizer Applications
                                    </button>
                                    <button className="w-full px-4 py-2 rounded-lg border hover:bg-gray-50">
                                        View System Logs
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* USERS */}
                    {activeTab === "users" && (
                        <>
                            <div className="bg-white border rounded-lg p-6 mb-6 flex flex-wrap gap-4 justify-between">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            placeholder="Search users..."
                                            className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                                        />
                                    </div>
                                    <select className="px-4 py-2 border rounded-lg text-sm">
                                        <option>All Roles</option>
                                        <option>Admin</option>
                                        <option>Organizer</option>
                                        <option>User</option>
                                    </select>
                                </div>

                                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
                                    <AddIcon className="w-5 h-5" />
                                    Add User
                                </button>
                            </div>

                            <div className="bg-white border rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3 text-left">User</th>
                                            <th className="px-6 py-3 text-left">Role</th>
                                            <th className="px-6 py-3 text-left">Status</th>
                                            <th className="px-6 py-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                Sarah Johnson
                                            </td>
                                            <td className="px-6 py-4">
                                                Organizer
                                            </td>
                                            <td className="px-6 py-4">
                                                Active
                                            </td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <EditIcon className="w-5 h-5 text-blue-600 cursor-pointer" />
                                                <DeleteIcon className="w-5 h-5 text-red-600 cursor-pointer" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* EVENTS */}
                    {activeTab === "events" && (
                        <div className="bg-white border rounded-lg p-6">
                            <p className="text-gray-600">
                                Event management table ready for backend integration.
                            </p>
                        </div>
                    )}

                    {/* APPLICATIONS */}
                    {activeTab === "applications" && (
                        <div className="bg-white border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Organizer Applications
                            </h2>
                            <p className="text-sm text-gray-600">
                                1 pending application awaiting review.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}