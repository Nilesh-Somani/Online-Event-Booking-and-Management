import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon, MoneyIcon, TotalBookingsIcon, EventsIcon, ChartIcon, EditIcon, DownloadIcon } from "../components/Icon"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Analytics() {
    const [selectedEvent, setSelectedEvent] = useState("all");
    const [timeFrame, setTimeFrame] = useState("7d");

    const events = [
        { id: 1, name: "Summer Music Festival" },
        { id: 2, name: "Tech Conference 2024" },
        { id: 3, name: "Art Gallery Opening" },
        { id: 4, name: "Food Festival" },
        { id: 5, name: "Marathon Championship" },
    ];

    return (
        <>
            <Navbar />
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                            <p className="text-gray-600 mt-2">Track your event performance and revenue</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">All Events</option>
                                {events.map((ev) => (
                                    <option key={ev.id} value={ev.id}>
                                        {ev.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={timeFrame}
                                onChange={(e) => setTimeFrame(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="7d">Last 7 days</option>
                                <option value="30d">Last 30 days</option>
                                <option value="90d">Last 90 days</option>
                                <option value="1y">Last year</option>
                            </select>
                            <button className="relative font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg px-6 py-3 flex items-center gap-2">
                                <DownloadIcon /> Export Report
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Revenue */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">$45,230</p>
                                <div className="flex items-center mt-2 text-sm text-green-600">
                                    <ArrowUpIcon className="w-4 h-4 mr-1" /> +12.5%
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
                                <MoneyIcon className="text-green-600" size={24} />
                            </div>
                        </div>

                        {/* Total Bookings */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">1,234</p>
                                <div className="flex items-center mt-2 text-sm text-green-600">
                                    <ArrowUpIcon className="w-4 h-4 mr-1" /> +8.2%
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
                                <TotalBookingsIcon className="text-green-600" size={24} />
                            </div>
                        </div>

                        {/* Active Events */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Events</p>
                                <p className="text-2xl font-bold text-gray-900">28</p>
                                <div className="flex items-center mt-2 text-sm text-green-600">
                                    <ArrowUpIcon className="w-4 h-4 mr-1" /> +3.1%
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
                                <EventsIcon className="w-6 h-6 text-green-600" />
                            </div>
                        </div>

                        {/* Conversion Rate */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                                <p className="text-2xl font-bold text-gray-900">3.4%</p>
                                <div className="flex items-center mt-2 text-sm text-red-600">
                                    <ArrowDownIcon className="w-4 h-4 mr-1" /> -0.5%
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-100">
                                <ChartIcon className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* Revenue Trend */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold">Revenue Trend</h3>
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button className="px-3 py-1 rounded-md text-sm bg-white shadow-sm">Revenue</button>
                                    <button className="px-3 py-1 rounded-md text-sm text-gray-600">Bookings</button>
                                    <button className="px-3 py-1 rounded-md text-sm text-gray-600">Events</button>
                                </div>
                            </div>
                            {/* Simple bar chart */}
                            <div className="h-64 flex items-end justify-between space-x-2">
                                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, idx) => {
                                    const heights = [40, 50, 60, 73, 83, 93];
                                    const values = ["$12,000", "$15,000", "$18,000", "$22,000", "$25,000", "$28,000"];
                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center group">
                                            <div className="relative w-full">
                                                <div
                                                    className="w-full bg-purple-500 rounded-t-md transition-all duration-300 hover:bg-purple-600 cursor-pointer"
                                                    style={{ height: `${heights[idx]}%`, minHeight: "8px" }}
                                                    title={`${month}: ${values[idx]}`}
                                                ></div>
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                                    {values[idx]}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-2">{month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Top Performing Events */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-6">Top Performing Events</h3>
                            <div className="space-y-4">
                                {events.map((ev, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-900">{ev.name}</h4>
                                            <p className="text-sm text-gray-600">{100 + idx * 20} bookings</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">${8500 + idx * 3000}</p>
                                            <p className="text-sm text-green-600">{(4 + idx * 1).toFixed(1)}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Traffic Sources, Categories, Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Traffic Sources */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-6">Traffic Sources</h3>
                            {[
                                { label: "Direct", color: "purple", percent: 45, visitors: 2340 },
                                { label: "Social Media", color: "blue", percent: 30, visitors: 1560 },
                                { label: "Search Engines", color: "green", percent: 15, visitors: 780 },
                                { label: "Email", color: "yellow", percent: 10, visitors: 520 },
                            ].map((source, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className={`w-3 h-3 bg-${source.color}-500 rounded-full mr-3`}
                                        ></div>
                                        <span className="text-sm text-gray-700">{source.label}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-medium">{source.percent}%</span>
                                        <p className="text-xs text-gray-500">{source.visitors} visitors</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Popular Categories */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-6">Popular Categories</h3>
                            {[
                                { label: "Music & Concerts", bookings: 456, revenue: 18200 },
                                { label: "Technology", bookings: 234, revenue: 15600 },
                                { label: "Sports & Fitness", bookings: 189, revenue: 8900 },
                                { label: "Arts & Culture", bookings: 123, revenue: 5400 },
                            ].map((cat, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{cat.label}</p>
                                        <p className="text-xs text-gray-500">{cat.bookings} bookings</p>
                                    </div>
                                    <span className="text-sm font-semibold text-purple-600">${cat.revenue}</span>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                            {[
                                { icon: TotalBookingsIcon, title: "New booking", event: "Summer Festival", time: "2 min ago" },
                                { icon: EventsIcon, title: "Event created", event: "Tech Meetup", time: "15 min ago" },
                                { icon: MoneyIcon, title: "Payment received", event: "Art Exhibition", time: "1 hour ago" },
                                { icon: EditIcon, title: "Event updated", event: "Food Festival", time: "2 hours ago" },
                            ].map((act, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                                        <act.icon className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">{act.title}</p>
                                        <p className="text-xs text-gray-600">{act.event}</p>
                                        <p className="text-xs text-gray-400">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}