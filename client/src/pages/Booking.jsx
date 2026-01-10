import { useLocation } from "react-router-dom";
import { useState } from "react";
import { AddIcon, MinusIcon, CardIcon, PaypalIcon, ApplePayIcon, SuccessIcon, DownloadIcon, SecureIcon, RefundIcon, VerifiedIcon, BookingsIcon, InfoIcon, MoneyIcon, ArrowLeftIcon, HomeOutlineIcon, } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Booking() {
    const location = useLocation();
    const { event, ticket: initialTicket, quantity: initialQty } = location.state || {};
    const [step, setStep] = useState(1); // 1: Tickets, 2: Details, 3: Payment, 4: Confirmation
    const [ticketType, setTicketType] = useState(initialTicket || event.tickets[0]);
    const [quantity, setQuantity] = useState(initialQty || 1);
    const [attendee, setAttendee] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        billing_address: "",
        city: "",
        state: "",
        zip_code: "",
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        saveCard: false,
        agreeTerms: false,
    });
    const [loading, setLoading] = useState(false);

    if (!event) {
        return (
            <>
                <Navbar />
                <div className="mt-32 text-center text-gray-600">Event not found</div>
                <Footer />
            </>
        );
    }

    const totalPrice = ticketType ? (ticketType.price * quantity).toFixed(2) : 0;
    const serviceFee = ticketType ? (ticketType.price * quantity * 0.1).toFixed(2) : 0;
    const tax = ticketType ? (ticketType.price * quantity * 0.08).toFixed(2) : 0;
    const grandTotal = ticketType ? (ticketType.price * quantity * 1.18).toFixed(2) : 0;

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };
    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleCompleteBooking = () => {
        setLoading(true);
        setTimeout(() => {
            setStep(4);
            setLoading(false);
        }, 1000); // 1-second animation
    };


    return (
        <>
            <Navbar />
            <div className="pt-20 pb-16">
                <div className="min-w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stepper */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center space-x-8">
                            {["Tickets", "Details", "Payment", "Confirmation"].map((label, index) => {
                                const active = step === index + 1;
                                const completed = step > index + 1;
                                const stepIcons = [
                                    <BookingsIcon />,
                                    <InfoIcon />,
                                    <MoneyIcon />,
                                    <SuccessIcon size={18} />,
                                ];
                                return (
                                    <div key={label} className="flex items-center">
                                        <div
                                            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${active || completed
                                                ? "bg-purple-600 border-purple-600 text-white"
                                                : "bg-white border-gray-300 text-gray-400"
                                                }`}
                                        >
                                            {stepIcons[index]}
                                        </div>
                                        <div className="ml-3">
                                            <div
                                                className={`text-sm font-medium ${active || completed ? "text-purple-600" : "text-gray-400"
                                                    }`}
                                            >
                                                {label}
                                            </div>
                                        </div>
                                        {index < 3 && (
                                            <div
                                                className={`w-16 h-0.5 ml-8 ${step > index + 1 ? "bg-purple-600" : "bg-gray-300"
                                                    }`}
                                            ></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side */}
                        <div className="lg:col-span-2">
                            {/* Step 1: Tickets */}
                            {step === 1 && (
                                <div className="bg-white rounded-lg border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Tickets</h2>
                                    <div className="space-y-4 mb-6">
                                        {event.tickets.map((t) => (
                                            <div
                                                key={t.id}
                                                onClick={() => setTicketType(t)}
                                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${ticketType.id === t.id
                                                    ? "border-purple-600 bg-purple-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{t.label}</h3>
                                                        <p className="text-gray-600 text-sm">{t.description}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-purple-600">${t.price}</div>
                                                        <input
                                                            type="radio"
                                                            value={t.id}
                                                            checked={ticketType.id === t.id}
                                                            readOnly
                                                            name="ticketType"
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <MinusIcon />
                                            </button>
                                            <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <AddIcon />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleNext}
                                            className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl px-6 py-3 text-base"
                                        >
                                            Continue to Details
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Details */}
                            {step === 2 && (
                                <div className="bg-white rounded-lg border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendee Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <span>First Name *</span>
                                            <input
                                                value={attendee.first_name}
                                                onChange={(e) =>
                                                    setAttendee({ ...attendee, first_name: e.target.value })
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <span>Last Name *</span>
                                            <input
                                                value={attendee.last_name}
                                                onChange={(e) =>
                                                    setAttendee({ ...attendee, last_name: e.target.value })
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <span>Email Address *</span>
                                            <input
                                                value={attendee.email}
                                                onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <span>Phone Number *</span>
                                            <input
                                                value={attendee.phone}
                                                onChange={(e) => setAttendee({ ...attendee, phone: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="font-semibold text-xl">Billing Address</div>
                                    <div>
                                        <span>Street Address *</span>
                                        <input
                                            value={attendee.billing_address}
                                            onChange={(e) =>
                                                setAttendee({ ...attendee, billing_address: e.target.value })
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <span>City *</span>
                                            <input value={attendee.city} onChange={e => setAttendee({ ...attendee, city: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                                        </div>
                                        <div>
                                            <span>State *</span>
                                            <input value={attendee.state} onChange={e => setAttendee({ ...attendee, state: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                                        </div>
                                        <div>
                                            <span>Zip Code *</span>
                                            <input value={attendee.zip_code} onChange={e => setAttendee({ ...attendee, zip_code: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={handleBack}
                                            className="flex items-center gap-2 font-medium rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3"
                                        >
                                            <ArrowLeftIcon />
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3"
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Payment */}
                            {step === 3 && (
                                <div className="bg-white rounded-lg border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                                    <div className="mb-6 flex space-x-4">
                                        <button type="button" className="flex-1 p-4 border-2 border-purple-600 bg-purple-50 rounded-lg flex items-center justify-center space-x-2">
                                            <CardIcon size={22} /><span>Credit Card</span>
                                        </button>
                                        <button type="button" className="flex-1 p-4 border-2 border-gray-200 rounded-lg flex items-center justify-center space-x-2 hover:border-gray-300">
                                            <PaypalIcon size={22} /><span>PayPal</span>
                                        </button>
                                        <button type="button" className="flex-1 p-4 border-2 border-gray-200 rounded-lg flex items-center justify-center space-x-2 hover:border-gray-300">
                                            <ApplePayIcon size={22} /><span>Apple Pay</span>
                                        </button>
                                    </div>
                                    <div>
                                        <span>Card Number *</span>
                                        <input
                                            placeholder="1234 5678 9012 3456"
                                            value={paymentInfo.cardNumber}
                                            onChange={(e) =>
                                                setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex gap-4 mb-4">
                                        <div>
                                            <span>Expiry Date *</span>
                                            <input
                                                placeholder="MM/YY"
                                                value={paymentInfo.expiry}
                                                onChange={(e) =>
                                                    setPaymentInfo({ ...paymentInfo, expiry: e.target.value })
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <span>CVV *</span>
                                            <input
                                                placeholder="123"
                                                value={paymentInfo.cvv}
                                                onChange={(e) =>
                                                    setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-3 rounded" checked={paymentInfo.saveCard} onChange={e => setPaymentInfo({ ...paymentInfo, saveCard: e.target.checked })} />
                                            <span className="text-sm text-gray-700">Save card for future bookings</span>
                                        </label>
                                    </div>

                                    <div className="mb-6">
                                        <label className="flex items-start">
                                            <input type="checkbox" required className="mr-3 mt-1 rounded" checked={paymentInfo.agreeTerms} onChange={e => setPaymentInfo({ ...paymentInfo, agreeTerms: e.target.checked })} />
                                            <span className="text-sm text-gray-700">I agree to the <a href="#" className="text-purple-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a></span>
                                        </label>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={handleBack}
                                            className="flex items-center gap-2 font-medium rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3"
                                        >
                                            <ArrowLeftIcon />
                                            Back
                                        </button>
                                        <button
                                            onClick={handleCompleteBooking}
                                            className="font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3"
                                        >
                                            {loading ? "Processing..." : "Complete Booking"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Confirmation */}
                            {step === 4 && (
                                <form>
                                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <SuccessIcon size={32} className="text-green-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                                        <p className="text-gray-600 mb-6">
                                            Your tickets have been booked successfully. A confirmation email has been sent to {attendee.email}.
                                        </p>

                                        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                                            <h3 className="text-center font-bold text-gray-900 mb-2">Booking Details</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span>Event:</span>
                                                    <span className="font-medium">{event.title}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Date:</span>
                                                    <span className="font-medium">{event.date}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Venue:</span>
                                                    <span className="font-medium">{event.location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Tickets:</span>
                                                    <span className="font-medium">{quantity} × {ticketType.label}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Total:</span>
                                                    <span className="font-medium">${grandTotal}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <button
                                                type="button"
                                                className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl px-6 py-3 text-base w-full flex items-center justify-center gap-2"
                                            >
                                                <DownloadIcon className="mr-2" />Download Tickets
                                            </button>
                                            <a href="/" data-discover="true">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-base w-full"
                                                >
                                                    <HomeOutlineIcon className="mr-2" />
                                                    Back to Home
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Right Side: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                    <div className="flex items-start space-x-4 mb-6">
                                        <img
                                            alt={event.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                            src={event.image}
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                                            <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                                            <p className="text-sm text-gray-600">{event.location}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mb-4">
                                        {ticketType && (
                                            <div className="flex justify-between items-center mb-2">
                                                <span>
                                                    {ticketType.label} × {quantity}
                                                </span>
                                                <span className="font-medium">${totalPrice}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Service Fee</span>
                                            <span className="font-medium">${serviceFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-medium">${tax}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Total</span>
                                                <span className="text-lg font-bold text-purple-600">${grandTotal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center space-x-4 text-green-600 text-sm">
                                        <div className="flex items-center">
                                            <SecureIcon className="mr-1" />
                                            <span>Secure</span>
                                        </div>
                                        <div className="flex items-center">
                                            <RefundIcon className="mr-1" />
                                            <span>Refundable</span>
                                        </div>
                                        <div className="flex items-center">
                                            <VerifiedIcon className="mr-1" />
                                            <span>Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}