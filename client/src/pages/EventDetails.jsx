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
    ShareIcon,
} from "../components/Icon";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { fetchEventById, clearSelectedEvent } from "../store/events/eventsSlice";

export default function EventDetail() {
    const { user } = useSelector((state) => state.auth);
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedEvent: event, loading, error } = useSelector((state) => state.events);
    const locationMode = event?.location?.mode || "physical";

    const physicalLocation = event?.location?.physical?.venueSnapshot;
    const onlineLocation = event?.location?.online;

    const displayLocationName =
        physicalLocation?.name ||
        (locationMode === "online" ? "Online Event" : "Venue");

    const [activeTab, setActiveTab] = useState("about");
    const [selectedTicketName, setSelectedTicketName] = useState(null);
    const [qty, setQty] = useState(1);

    const [viewerImage, setViewerImage] = useState(null);

    const shareUrl = `${window.location.origin}/events/${event?._id}`;
    const shareText = `Check out this event: ${event?.title}`;
    const [toast, setToast] = useState(null);

    const hasCoordinates =
        physicalLocation?.coordinates?.lat &&
        physicalLocation?.coordinates?.lng;

    const mapQuery = hasCoordinates
        ? `${physicalLocation.coordinates.lat},${physicalLocation.coordinates.lng}`
        : null;

    const handleFacebookShare = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleTwitterShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleShareLink = async () => {
        try {
            if (navigator.share) {
                navigator.share({
                    title: event.title,
                    url: shareUrl,
                });
                return;
            }
        } catch {
            await navigator.clipboard.writeText(shareUrl);
            setToast("Event link copied to clipboard");
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setToast("Event link copied to clipboard");
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = shareUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setToast("Event link copied");
        }

        // Auto dismiss
        setTimeout(() => setToast(null), 2500);
    };

    // Derive ticket from selectedTicketName or default to first ticket
    const ticket = selectedTicketName
        ? event?.tickets?.find((t) => t.name === selectedTicketName)
        : event?.tickets?.[0];

    const handleBookNow = () => {
        if (!event || !ticket) {
            console.warn("Booking blocked: missing event or ticket");
            return;
        }
        navigate(`/booking/${event._id}`, { state: { event, ticket, quantity: qty } });
    };

    useEffect(() => {
        if (error === "Event not found") {
            setTimeout(() => {
                navigate("/");
            }, 7000);
        }
    }, [error, navigate]);

    // Fetch event details on mount
    useEffect(() => {
        dispatch(fetchEventById(eventId));

        return () => {
            dispatch(clearSelectedEvent());
        };
    }, [dispatch, eventId]);

    useEffect(() => {
        if (viewerImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [viewerImage]);

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
                <div className="mt-32 mb-32 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">404 – Event Not Available</h1>
                    <p className="text-gray-600 mb-6">
                        This event may have been removed or is no longer accessible.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg"
                    >
                        Go to Home
                    </Link>
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
                    className="absolute inset-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${event.images.cover.url})` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="absolute top-6 left-4 lg:left-6 z-10">
                    <nav className="flex items-center space-x-2 text-white/80 text-sm">
                        <Link to="/">Home</Link>
                        <BreadcrumbArrowIcon />
                        <Link to="/events">Events</Link>
                        <BreadcrumbArrowIcon />
                        <span className="wrap-break-word">{event.title}</span>
                    </nav>
                </div>

                {/* DESKTOP BOOKING CARD */}
                <div className="absolute bottom-0 right-8 translate-y-1/2 z-40 hidden lg:block">
                    <div className="bg-white rounded-lg border w-96 p-6 shadow-2xl pointer-events-auto">
                        <div className="text-2xl font-bold mb-1">{new Date(event.date).toLocaleDateString()}</div>
                        <div className="text-gray-600 mb-4 wrap-break-word">
                            {event.startTime} • {displayLocationName}
                        </div>

                        <select
                            className="w-full p-3 border rounded-lg mb-4 wrap-break-word"
                            value={ticket?.name || ""}
                            onChange={(e) =>
                                setSelectedTicketName(e.target.value)
                            }
                        >
                            {event.tickets?.map((t) => (
                                <option className="w-full p-3 border rounded-lg mb-4 wrap-break-word" key={t.name} value={t.name}>
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

                        {user ? (
                            <button disabled={!ticket} onClick={handleBookNow} className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg">
                                Book Now
                            </button>
                        ) : (
                            <Link to="/auth?mode=signin" className="block text-center text-purple-600 font-medium">
                                <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg">
                                    Sign in to Book
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* LEFT */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6 wrap-break-word">{event.title}</h1>

                        {/* EVENT META */}
                        <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                            <span className="flex justify-center items-center gap-1">
                                <CalendarOutlineIcon /> {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex justify-center items-center gap-1">
                                <TimeIcon /> {event.startTime}
                            </span>
                            <span className="flex items-center gap-1">
                                <LocationIcon className="shrink-0" />
                                <span className="break-all min-w-0">{displayLocationName}</span>
                            </span>
                        </div>

                        {/* TABS */}
                        <div className="border-b mb-8">
                            <nav className="flex space-x-6 overflow-x-auto">
                                {["about", "gallery", "schedule", "location", "reviews"].map((tab) => (
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
                                        <p key={i} className="text-gray-600 mb-4 wrap-break-word">{p}</p>
                                    ))}
                                <h3 className="text-xl font-semibold mt-6 mb-4">Highlights</h3>
                                <ul className="space-y-3">
                                    {event.highlights?.map((h, i) => (
                                        <li key={i} className="flex items-center">
                                            <SuccessIcon className="text-green-500 mr-3 shrink-0" />
                                            <span className="break-all">
                                                {h}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {activeTab === "gallery" && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {event.images?.gallery?.length > 0 ? (
                                    event.images.gallery.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.url}
                                            alt={img.alt || `Gallery ${i + 1}`}
                                            onClick={() => setViewerImage(img)}
                                            className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90"
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No gallery images available.</p>
                                )}
                            </div>
                        )}

                        {viewerImage && (
                            <div
                                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                                onClick={() => setViewerImage(null)}
                            >
                                <img
                                    src={viewerImage.url}
                                    alt={viewerImage.alt}
                                    onClick={(e) => e.stopPropagation()}
                                    className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
                                />
                            </div>
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
                            <div className="space-y-6">

                                {/* PHYSICAL LOCATION */}
                                {(locationMode === "physical" || locationMode === "hybrid") && physicalLocation && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold wrap-break-word">{physicalLocation.name}</h3>
                                        <p className="text-gray-600 wrap-break-word">{physicalLocation.address}</p>
                                        <p className="text-gray-500 text-sm wrap-break-word">
                                            {[physicalLocation.city, physicalLocation.state, physicalLocation.country]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>

                                        {physicalLocation.parking && (
                                            <p className="text-gray-600 wrap-break-word">
                                                Parking: {physicalLocation.parking}
                                            </p>
                                        )}

                                        {physicalLocation.entryNotes && (
                                            <p className="text-gray-600 wrap-break-word">
                                                Entry: {physicalLocation.entryNotes}
                                            </p>
                                        )}

                                        {hasCoordinates && (
                                            <div className="mt-4 rounded-lg overflow-hidden border">
                                                <iframe
                                                    title="map"
                                                    className="w-full h-64"
                                                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ONLINE LOCATION */}
                                {(locationMode === "online" || locationMode === "hybrid") && onlineLocation && (
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <h3 className="text-lg font-semibold mb-2">Online Event</h3>

                                        {onlineLocation.platform && (
                                            <p className="text-gray-600 wrap-break-word">
                                                Platform: {onlineLocation.platform}
                                            </p>
                                        )}

                                        {onlineLocation.accessNotes && (
                                            <p className="text-gray-600 mt-1 wrap-break-word">
                                                Access Notes: {onlineLocation.accessNotes}
                                            </p>
                                        )}

                                        <p className="text-sm text-gray-500 mt-3">
                                            Access details will be shared after booking.
                                        </p>
                                    </div>
                                )}

                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                {event.reviews?.length > 0 ? (
                                    event.reviews.map((r) => (
                                        <div key={r.id} className="border-b pb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold wrap-break-word">{r.name}</h4>
                                                <span className="text-yellow-500">
                                                    {"★".repeat(r.rating)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm wrap-break-word">{r.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">
                                            No reviews yet. Be the first to review this event!
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ORGANIZER */}
                        <div className="bg-white border rounded-lg p-6 mt-12">
                            <h3 className="text-xl font-semibold mb-4">Meet the Organizer</h3>
                            <h4 className="font-semibold wrap-break-word">{event.organizerSnapshot?.name}</h4>
                            <p className="text-gray-600 mt-2 wrap-break-word">{event.organizerSnapshot?.bio}</p>
                            {event.organizerSnapshot?.website && (
                                <a
                                    href={event.organizerSnapshot.website}
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
                            <ul className="text-gray-600 space-y-2 list-disc list-inside wrap-break-word">
                                <li>Refund: {event.policies?.refund}</li>
                                <li>Age Limit: {event.policies?.ageLimit}</li>
                                <li>Entry: {event.policies?.entry}</li>
                            </ul>
                        </div>

                        {/* MOBILE BOOKING SECTION */}
                        {(
                            <div className="bg-white border rounded-lg p-6 mt-6 lg:hidden">
                                <h3 className="text-lg font-semibold mb-4">Book Tickets</h3>

                                <select
                                    className="w-full p-3 border rounded-lg mb-4"
                                    value={ticket?.name || ""}
                                    onChange={(e) => setSelectedTicketName(e.target.value)}
                                >
                                    {event.tickets?.map((t) => (
                                        <option key={t.name} value={t.name}>
                                            {t.name} – ${t.price}
                                        </option>
                                    ))}
                                </select>

                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="w-10 h-10 border rounded-full flex items-center justify-center"
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="text-lg font-semibold">{qty}</span>
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
                                    disabled={!ticket}
                                    onClick={handleBookNow}
                                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg"
                                >
                                    Book Now
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="sticky lg:top-32 space-y-6 self-start z-30">
                        <div className="hidden lg:block h-35"></div>
                        <div className="bg-white border p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">
                                Secure payment • Verified organizer
                            </p>
                        </div>

                        <div className="bg-white border p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">Share Event</h4>
                            <button
                                onClick={handleFacebookShare}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg mb-2 flex items-center justify-center">
                                <FacebookIcon className="mr-2" /> Facebook
                            </button>
                            <button
                                onClick={handleTwitterShare}
                                className="w-full bg-sky-500 text-white py-3 rounded-lg mb-2 flex items-center justify-center">
                                <TwitterIcon className="mr-2" /> Twitter
                            </button>
                            <button
                                onClick={handleShareLink}
                                className="w-full bg-emerald-600 text-white py-3 rounded-lg mb-2 flex items-center justify-center">
                                <ShareIcon className="mr-2" /> Share Link
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="w-full bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center">
                                <LinkIcon className="mr-2" /> Copy Link
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100">
                    <div className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2">
                        <SuccessIcon className="text-green-400" />
                        {toast}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}