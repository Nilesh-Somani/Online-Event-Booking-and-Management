import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    CalendarOutlineIcon,
    TimeIcon,
    LocationIcon,
    BreadcrumbArrowIcon,
    MinusIcon,
    AddIcon,
    SuccessIcon,
    FacebookIcon,
    TwitterIcon,
    LinkIcon,
} from "../components/Icon";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { fetchEventById, clearSelectedEvent } from "../store/events/eventsSlice";

export default function EventDetail() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedEvent: event, loading, error } = useSelector((state) => state.events);

    const [activeTab, setActiveTab] = useState("about");
    const [ticket, setTicket] = useState(null);
    const [qty, setQty] = useState(1);

    // Fetch event details on mount
    useEffect(() => {
        dispatch(fetchEventById(eventId));

        return () => {
            dispatch(clearSelectedEvent());
        };
    }, [dispatch, eventId]);

    // Update default ticket when event data arrives
    useEffect(() => {
        if (event?.tickets?.length) {
            setTicket(event.tickets[0]);
        }
    }, [event]);

    const handleBookNow = () => {
        if (!ticket) return;
        navigate("/booking", { state: { event, ticket, quantity: qty } });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="mt-32 text-center text-gray-600">Loading event details...</div>
                <Footer />
            </>
        );
    }

    if (error || !event) {
        return (
            <>
                <Navbar />
                <div className="mt-32 text-center text-red-500">
                    {error || "Event not found"}
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="relative h-72 lg:h-96 mt-16">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.images.cover.url})` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                <div className="absolute top-6 left-4 lg:left-6 z-10">
                    <nav className="flex items-center space-x-2 text-white/80 text-sm">
                        <Link to="/">Home</Link>
                        <BreadcrumbArrowIcon />
                        <Link to="/events">Events</Link>
                        <BreadcrumbArrowIcon />
                        <span>{event.title}</span>
                    </nav>
                </div>

                {/* DESKTOP BOOKING CARD */}
                <div className="absolute bottom-0 right-8 translate-y-1/2 z-20 hidden lg:block">
                    <div className="bg-white rounded-lg border w-96 p-6 shadow-2xl">
                        <div className="text-2xl font-bold mb-1">{new Date(event.date).toLocaleDateString()}</div>
                        <div className="text-gray-600 mb-4">
                            {event.startTime} • {event.locationName}
                        </div>

                        <select
                            className="w-full p-3 border rounded-lg mb-4"
                            value={ticket?.name || ""}
                            onChange={(e) =>
                                setTicket(event.tickets.find((t) => t.name === e.target.value))
                            }
                        >
                            {event.tickets?.map((t) => (
                                <option key={t.name} value={t.name}>
                                    {t.name} – ${t.price}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center space-x-3 mb-4">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-10 border rounded-full flex items-center justify-center"
                            >
                                <MinusIcon />
                            </button>
                            <span className="text-xl font-semibold">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-10 border rounded-full flex items-center justify-center"
                            >
                                <AddIcon />
                            </button>
                        </div>

                        <div className="flex justify-between font-bold mb-4">
                            <span>Total</span>
                            <span className="text-purple-600">
                                ${(ticket?.price * qty || 0).toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={handleBookNow}
                            className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-16 mt-40">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* LEFT */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6">{event.title}</h1>

                        {/* EVENT META */}
                        <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                            <span className="flex justify-center items-center gap-1">
                                <CalendarOutlineIcon /> {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <TimeIcon /> {event.startTime}
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <LocationIcon /> {event.locationName}
                            </span>
                        </div>

                        {/* TABS */}
                        <div className="border-b mb-8">
                            <nav className="flex space-x-6 overflow-x-auto">
                                {["about", "schedule", "location", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 border-b-2 whitespace-nowrap ${activeTab === tab
                                            ? "border-purple-500 text-purple-600"
                                            : "border-transparent text-gray-500"
                                            }`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* TAB CONTENT */}
                        {activeTab === "about" && (
                            <>
                                {event.description?.split("\n")
                                    .filter(Boolean)
                                    .map((p, i) => (
                                        <p key={i} className="text-gray-600 mb-4">{p}</p>
                                    ))}
                                <h3 className="text-xl font-semibold mt-6 mb-4">Highlights</h3>
                                <ul className="space-y-3">
                                    {event.highlights?.map((h, i) => (
                                        <li key={i} className="flex items-center">
                                            <SuccessIcon className="text-green-500 mr-3" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {activeTab === "schedule" && (
                            <div className="space-y-4">
                                {event.schedule?.map((item, i) => (
                                    <div key={i} className="flex justify-between border-b pb-3">
                                        <span className="font-medium">{item.time}</span>
                                        <span className="text-gray-600">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "location" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{event.venue?.name}</h3>
                                <p className="text-gray-600">{event.venue?.address}</p>
                                <p className="text-gray-600">Parking: {event.venue?.parking}</p>
                                <p className="text-gray-600">Entry: {event.venue?.entryNotes}</p>

                                <div className="mt-4 rounded-lg overflow-hidden border">
                                    <iframe
                                        title="map"
                                        className="w-full h-64"
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                                            event.venue?.address || ""
                                        )}&output=embed`}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                {event.reviews?.map((r) => (
                                    <div key={r.id} className="border-b pb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-semibold">{r.name}</h4>
                                            <span className="text-yellow-500">
                                                {"★".repeat(r.rating)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{r.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ORGANIZER */}
                        <div className="bg-white border rounded-lg p-6 mt-12">
                            <h3 className="text-xl font-semibold mb-4">Meet the Organizer</h3>
                            <h4 className="font-semibold">{event.organizer?.name}</h4>
                            <p className="text-gray-600 mt-2">{event.organizer?.bio}</p>
                            {event.organizer?.website && (
                                <a
                                    href={event.organizer.website}
                                    className="text-purple-600 mt-2 block"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Visit Website
                                </a>
                            )}
                        </div>

                        {/* POLICIES */}
                        <div className="bg-white border rounded-lg p-6 mt-6">
                            <h3 className="text-xl font-semibold mb-4">Event Policies</h3>
                            <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                <li>Refund: {event.policies?.refund}</li>
                                <li>Age Limit: {event.policies?.ageLimit}</li>
                                <li>Entry: {event.policies?.entry}</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white border p-4 rounded-lg text-center">
                                <p className="text-sm text-gray-600">
                                    Secure payment • Verified organizer
                                </p>
                            </div>

                            <div className="bg-white border p-4 rounded-lg">
                                <h4 className="font-semibold mb-3">Share Event</h4>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-2 flex items-center justify-center">
                                    <FacebookIcon className="mr-2" /> Facebook
                                </button>
                                <button className="w-full bg-sky-500 text-white py-3 rounded-lg mb-2 flex items-center justify-center">
                                    <TwitterIcon className="mr-2" /> Twitter
                                </button>
                                <button className="w-full bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center">
                                    <LinkIcon className="mr-2" /> Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MOBILE BOOK BAR */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center lg:hidden z-40">
                <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-lg font-bold text-purple-600">
                        ${(ticket?.price * qty || 0).toFixed(2)}
                    </div>
                </div>
                <button
                    onClick={handleBookNow}
                    className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg"
                >
                    Book Now
                </button>
            </div>

            <Footer />
        </>
    );
}