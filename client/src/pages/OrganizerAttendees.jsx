import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    ArrowDownTrayIcon,
    EnvelopeIcon,
    UserGroupIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

export default function OrganizerAttendees() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar />
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Attendees Management</h1>
                            <p className="text-gray-600 mt-2">Manage and track event attendees</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-base flex items-center gap-2">
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    Export List
                                </button>
                                <div id="export-menu" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                                    <div className="py-1">
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <ArrowDownTrayIcon className="w-4 h-4" /> Export as CSV
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <ArrowDownTrayIcon className="w-4 h-4" /> Export as Excel
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <ArrowDownTrayIcon className="w-4 h-4" /> Export as PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl px-6 py-3 text-base flex items-center gap-2">
                                <EnvelopeIcon className="w-5 h-5" />
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <UserGroupIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Attendees</p>
                                <p className="text-2xl font-bold text-gray-900">8</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Confirmed</p>
                                <p className="text-2xl font-bold text-gray-900">5</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                <ClockIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">2</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Cancelled</p>
                                <p className="text-2xl font-bold text-gray-900">1</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 flex flex-wrap items-center gap-4">
                        <div className="flex-1 min-w-64 relative">
                            <input
                                type="text"
                                placeholder="Search attendees..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                            <option value="all">All Events</option>
                            <option value="1">Summer Music Festival</option>
                            <option value="2">Tech Conference 2024</option>
                            <option value="3">Art Gallery Opening</option>
                            <option value="4">Marathon Championship</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                            <option value="all">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                            <option value="name">Sort by Name</option>
                            <option value="event">Sort by Event</option>
                            <option value="date">Sort by Date</option>
                            <option value="amount">Sort by Amount</option>
                            <option value="status">Sort by Status</option>
                        </select>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" type="checkbox" />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Example row */}
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    className="w-10 h-10 rounded-full mr-4"
                                                    src="https://readdy.ai/api/search-image?query=professional%20headshot&width=80&height=80"
                                                    alt="Attendee"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">David Thompson</div>
                                                    <div className="text-sm text-gray-500">david.thompson@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Marathon Championship</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Runner</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">confirmed</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5/10/2024</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$75</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-purple-600 hover:text-purple-900 p-1" title="View Details">
                                                    <EyeIcon className="w-5 h-5" />
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-900 p-1" title="Send Email">
                                                    <EnvelopeIcon className="w-5 h-5" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-900 p-1" title="Download Ticket">
                                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Add more rows similarly */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}