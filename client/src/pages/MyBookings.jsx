import { useSelector } from "react-redux";
import { BookingsIcon, CalendarOutlineIcon, MoneyIcon } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyBookings() {
    const { list, loading, error } = useSelector(
        (state) => state.bookings
    );

    const bookings = [...list].reverse();

    if (loading) {
        return <p className="pt-20 text-center">Loading bookings...</p>;
    }

    if (error) {
        return <p className="pt-20 text-center text-red-600">{error}</p>;
    }

    return (
        <>
            <Navbar />

            <main className="pt-20 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        My Bookings
                    </h1>

                    {bookings.length === 0 ? (
                        <p className="text-gray-600">No bookings found.</p>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((b) => (
                                <div
                                    key={b.id}
                                    className="bg-white border rounded-lg p-6 flex justify-between items-center"
                                >
                                    <div>
                                        <h2 className="flex items-center gap-2 font-semibold text-lg">
                                            <BookingsIcon />
                                            {b.eventTitle}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {b.ticketType} × {b.quantity}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <CalendarOutlineIcon size={14} />
                                            {b.date}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-purple-600 flex items-center gap-1 justify-end">
                                            <MoneyIcon size={16} />
                                            ${b.total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}