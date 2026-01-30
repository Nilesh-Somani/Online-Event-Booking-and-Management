import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../store/analytics/analyticsSlice";
import { ArrowUpIcon, ArrowDownIcon, MoneyIcon, TotalBookingsIcon, EventsIcon, ChartIcon, EditIcon, DownloadIcon } from "../components/Icon"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchEvents } from "../store/events/eventsSlice";
import PageLoader from "../components/PageLoader";

function KpiCard({ label, value, icon: Icon, color }) {
    const colorMap = {
        purple: "bg-purple-100 text-purple-600",
        green: "bg-green-100 text-green-600",
        blue: "bg-blue-100 text-blue-600",
        orange: "bg-orange-100 text-orange-600",
        pink: "bg-pink-100 text-pink-600",
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
            {Icon && (
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            )}
        </div>
    );
}

export default function Analytics() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const role = user?.role; // "user" | "organizer" | "admin"
    const { events, myEvents } = useSelector((state) => state.events);
    const eventOptions =
        role === "organizer"
            ? myEvents
            : events;
    const { snapshot, loading } = useSelector(state => state.analytics);

    const [selectedEvent, setSelectedEvent] = useState("all");
    const [timeFrame, setTimeFrame] = useState("7d");

    useEffect(() => {
        dispatch(fetchEvents());
        dispatch(fetchAnalytics({ timeFrame }));
    }, [dispatch, timeFrame]);

    return (
        <>
            <Navbar />
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {loading ? (
                        <PageLoader label="Loading analytics..." />
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {role === "admin" && "Platform Analytics"}
                                        {role === "organizer" && "Organizer Analytics"}
                                        {role === "user" && "My Activity"}
                                    </h1>
                                    <p className="text-gray-600 mt-2">
                                        {role === "admin" && "Monitor platform-wide performance"}
                                        {role === "organizer" && "Track your events, bookings and revenue"}
                                        {role === "user" && "View your event participation and bookings"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    {role !== "user" && (
                                        <select
                                            value={selectedEvent}
                                            onChange={(e) => setSelectedEvent(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="all">All Events</option>
                                            {eventOptions.map((ev) => (
                                                <option key={ev._id} value={ev._id}>
                                                    {ev.title}
                                                </option>
                                            ))}
                                        </select>
                                    )}
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

                            {/* KPI Summary */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                                {/* USER KPIs */}
                                {role === "user" && (
                                    <>
                                        <KpiCard label="Events Joined" value={snapshot?.metrics.eventsJoined ?? 0} icon={EventsIcon} color="purple" />
                                        <KpiCard label="Upcoming Events" value={snapshot?.metrics.upcomingEvents ?? 0} icon={EventsIcon} color="blue" />
                                        <KpiCard label="Tickets Purchased" value={snapshot?.metrics.ticketsPurchased ?? 0} icon={TotalBookingsIcon} color="green" />
                                        <KpiCard label="Total Spent" value={`$${snapshot?.metrics.totalSpent ?? 0}`} icon={MoneyIcon} color="pink" />
                                    </>
                                )}

                                {/* ORGANIZER KPIs */}
                                {role === "organizer" && (
                                    <>
                                        <KpiCard label="Total Revenue" value={`$${snapshot?.metrics.totalRevenue ?? 0}`} icon={MoneyIcon} color="green" />
                                        <KpiCard label="Total Bookings" value={snapshot?.metrics.totalBookings ?? 0} icon={TotalBookingsIcon} color="purple" />
                                        <KpiCard label="Events Created" value={snapshot?.metrics.eventsCreated ?? 0} icon={EventsIcon} color="blue" />
                                        <KpiCard label="Active Events" value={snapshot?.metrics.activeEvents ?? 0} icon={EventsIcon} color="orange" />
                                    </>
                                )}

                                {/* ADMIN KPIs */}
                                {role === "admin" && (
                                    <>
                                        <KpiCard label="Platform Revenue" value={`$${snapshot?.metrics.totalRevenue ?? 0}`} icon={MoneyIcon} color="green" />
                                        <KpiCard label="Total Bookings" value={snapshot?.metrics.totalBookings ?? 0} icon={TotalBookingsIcon} color="purple" />
                                        <KpiCard label="Total Users" value={snapshot?.metrics.totalUsers ?? 0} icon={EventsIcon} color="blue" />
                                        <KpiCard label="Total Events" value={snapshot?.metrics.totalEvents ?? 0} icon={EventsIcon} color="orange" />
                                    </>
                                )}
                            </div>

                            {/* Revenue Trend */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold">
                                            {role === "user" && "Event Participation Trend"}
                                            {role === "organizer" && "Revenue & Booking Trend"}
                                            {role === "admin" && "Platform Growth Trend"}
                                        </h3>
                                        {role !== "user" && (
                                            <div className="flex bg-gray-100 rounded-lg p-1">
                                                <button className="px-3 py-1 rounded-md text-sm bg-white shadow-sm">Revenue</button>
                                                <button className="px-3 py-1 rounded-md text-sm text-gray-600">Bookings</button>
                                                <button className="px-3 py-1 rounded-md text-sm text-gray-600">Events</button>
                                            </div>
                                        )}
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
                                    <h3 className="text-lg font-semibold mb-6">
                                        {role === "user" && "Your Recent Events"}
                                        {role === "organizer" && "Top Performing Events"}
                                        {role === "admin" && "Top Events on Platform"}
                                    </h3>
                                    <div className="space-y-4">
                                        {snapshot?.topEvents?.map((ev, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <h4 className="font-medium text-gray-900">{ev.title}</h4>
                                                <p className="text-sm text-gray-600">{ev.bookings} bookings</p>
                                                {role !== "user" && (
                                                    <p className="font-semibold text-gray-900">${ev.revenue}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            {/* Traffic Sources, Categories, Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-6">
                                        {role === "user" && "Categories You Attend"}
                                        {role === "organizer" && "Best Performing Categories"}
                                        {role === "admin" && "Top Categories Platform-Wide"}
                                    </h3>

                                    {snapshot?.topCategories?.map((cat, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-2">
                                            <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                                            <span className="text-sm font-semibold text-purple-600">
                                                {role === "user" ? `${cat.count} events` : `$${cat.revenue}`}
                                            </span>
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
                                                <p className="text-sm text-gray-900">
                                                    {role === "user" && "You joined an event"}
                                                    {role === "organizer" && act.title}
                                                    {role === "admin" && act.title}
                                                </p>
                                                <p className="text-xs text-gray-600">{act.event}</p>
                                                <p className="text-xs text-gray-400">{act.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Period Comparison */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        {role === "user" && "Participation Change"}
                                        {role === "organizer" && "Performance Change"}
                                        {role === "admin" && "Platform Change"}
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                {role === "user" && "Events Joined"}
                                                {role !== "user" && "Bookings"}
                                            </span>

                                            <div className="flex items-center text-green-600 text-sm font-medium">
                                                <ArrowUpIcon className="w-4 h-4 mr-1" />
                                                {snapshot?.comparison?.bookingsChange ?? 0}%
                                            </div>
                                        </div>

                                        {(role === "organizer" || role === "admin") && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Revenue</span>
                                                <div
                                                    className={`flex items-center text-sm font-medium ${(snapshot?.comparison?.revenueChange ?? 0) >= 0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                        }`}
                                                >
                                                    {(snapshot?.comparison?.revenueChange ?? 0) >= 0 ? (
                                                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                                                    ) : (
                                                        <ArrowDownIcon className="w-4 h-4 mr-1" />
                                                    )}
                                                    {Math.abs(snapshot?.comparison?.revenueChange ?? 0)}%
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-xs text-gray-500 pt-2">
                                            Compared to previous {timeFrame}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main >
            <Footer />
        </>
    );
}