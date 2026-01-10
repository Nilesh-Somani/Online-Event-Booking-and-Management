import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CalendarOutlineIcon, TimeIcon, LocationIcon, BreadcrumbArrowIcon, MinusIcon, AddIcon, SuccessIcon, FacebookIcon, TwitterIcon, LinkIcon, } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EVENTS = {
    "1": {
        id: "1",
        title: "Summer Music Festival 2024",
        dateText: "Monday, July 15, 2024",
        date: "2024-07-15",
        time: "6:00 PM – 11:30 PM",
        location: "Central Park Amphitheater, New York",
        image:
            "/hero-bg.jpg",

        tickets: [
            {
                id: "general",
                label: "General Admission",
                price: 89,
                description: "Access to all stages and general festival areas",
            },
            {
                id: "vip",
                label: "VIP Experience",
                price: 178,
                description: "VIP lounge, premium stage view, complimentary drinks",
            },
            {
                id: "early",
                label: "Early Bird",
                price: 71.2,
                description: "Limited discounted tickets (limited availability)",
            },
        ],

        description: [
            "Summer Music Festival 2024 brings together world-class artists, stunning stage visuals, and an electrifying crowd for a night of unforgettable music.",
            "Set in Central Park Amphitheater, this open-air festival delivers immersive sound, beautiful lighting, and a vibrant summer atmosphere in the heart of New York City.",
        ],

        highlights: [
            "Live performances by top international & local artists",
            "High-fidelity sound and immersive lighting experience",
            "Food trucks, beverage stalls & merchandise booths",
            "VIP seating, lounges & express entry",
            "Wheelchair-friendly access & medical assistance",
        ],

        schedule: [
            { time: "6:00 PM", title: "Gates Open & Welcome Music" },
            { time: "6:45 PM", title: "Opening Act – Indie Pop Band" },
            { time: "8:00 PM", title: "Main Performance – Headliner Artist" },
            { time: "10:30 PM", title: "DJ After-Party & Closing Ceremony" },
        ],

        venue: {
            name: "Central Park Amphitheater",
            address: "5th Ave & 72nd St, New York, NY",
            parking: "Paid parking available nearby",
            entryNotes: "Gates open 90 minutes before event start",
        },

        reviews: [
            {
                id: 1,
                name: "Aarav Mehta",
                rating: 5,
                comment: "Absolutely amazing experience! Sound quality and vibe were unreal.",
            },
            {
                id: 2,
                name: "Sophia Williams",
                rating: 4,
                comment: "Great performances and well organized. VIP area was worth it!",
            },
        ],

        organizer: {
            name: "EventHub Productions",
            bio: "EventHub Productions is a leading event management company with 10+ years of experience delivering premium concerts, festivals, and live entertainment worldwide.",
            website: "https://eventhub.com",
        },

        policies: {
            refund: "Full refund available up to 48 hours before the event",
            ageLimit: "All ages welcome (18+ required for alcohol)",
            entry: "Valid ticket & government ID required",
        },
    },
};

export default function EventDetail() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const event = EVENTS[eventId];

    const [activeTab, setActiveTab] = useState("about");
    const [ticket, setTicket] = useState(event ? event.tickets[0] : null);
    const [qty, setQty] = useState(1);

    if (!event) {
        return (
            <>
                <Navbar />
                <div className="mt-32 text-center text-gray-600">Event not found</div>
                <Footer />
            </>
        );
    }

    const handleBookNow = () => {
        navigate("/booking", { state: { event, ticket, quantity: qty } });
    };


    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="relative h-72 lg:h-96 mt-16">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
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
                        <div className="text-2xl font-bold mb-1">{event.dateText}</div>
                        <div className="text-gray-600 mb-4">
                            {event.time} • {event.location}
                        </div>

                        <select
                            className="w-full p-3 border rounded-lg mb-4"
                            onChange={(e) =>
                                setTicket(event.tickets.find((t) => t.id === e.target.value))
                            }
                        >
                            {event.tickets.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.label} - ${t.price}
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
                                ${(ticket.price * qty).toFixed(2)}
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
                                <CalendarOutlineIcon className="mr-1" /> {event.date}
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <TimeIcon className="mr-1" /> {event.time}
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <LocationIcon className="mr-1" /> {event.location}
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
                                {event.description.map((p, i) => (
                                    <p key={i} className="text-gray-600 mb-4">
                                        {p}
                                    </p>
                                ))}
                                <h3 className="text-xl font-semibold mt-6 mb-4">Highlights</h3>
                                <ul className="space-y-3">
                                    {event.highlights.map((h, i) => (
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
                                {event.schedule.map((item, i) => (
                                    <div key={i} className="flex justify-between border-b pb-3">
                                        <span className="font-medium">{item.time}</span>
                                        <span className="text-gray-600">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "location" && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">{event.venue.name}</h3>
                                <p className="text-gray-600">{event.venue.address}</p>
                                <p className="text-gray-600">Parking: {event.venue.parking}</p>
                                <p className="text-gray-600">Entry: {event.venue.entryNotes}</p>

                                <div className="mt-4 rounded-lg overflow-hidden border">
                                    <iframe
                                        title="map"
                                        className="w-full h-64"
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                                            event.venue.address
                                        )}&output=embed`}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                {event.reviews.map((r) => (
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
                            <h4 className="font-semibold">{event.organizer.name}</h4>
                            <p className="text-gray-600 mt-2">{event.organizer.bio}</p>
                            <a
                                href={event.organizer.website}
                                className="text-purple-600 mt-2 block"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Visit Website
                            </a>
                        </div>

                        {/* POLICIES */}
                        <div className="bg-white border rounded-lg p-6 mt-6">
                            <h3 className="text-xl font-semibold mb-4">Event Policies</h3>
                            <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                <li>Refund: {event.policies.refund}</li>
                                <li>Age Limit: {event.policies.ageLimit}</li>
                                <li>Entry: {event.policies.entry}</li>
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
                        ${(ticket.price * qty).toFixed(2)}
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