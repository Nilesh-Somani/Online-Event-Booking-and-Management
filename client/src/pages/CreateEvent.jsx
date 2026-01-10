import { useState } from "react";
import { InfoIcon, FileIcon, BookingsIcon, SuccessIcon, AddIcon, DeleteIcon, ImageIcon, ArrowLeftIcon, ArrowRightIcon, } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreateEvent() {
    const [currentTab, setCurrentTab] = useState(0);
    const [tickets, setTickets] = useState([
        { name: "General Admission", price: "", quantity: "" },
    ]);

    const nextTab = () => {
        if (currentTab < 3) setCurrentTab(currentTab + 1);
    };

    const prevTab = () => {
        if (currentTab > 0) setCurrentTab(currentTab - 1);
    };

    const addTicket = () => {
        setTickets([...tickets, { name: "", price: "", quantity: "" }]);
    };

    return (
        <>
            <Navbar />

            <main className="pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
                        <p className="text-gray-600 mt-2">Fill in the details to create your event</p>
                    </div>

                    {/* Tab Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center">
                            {[
                                { label: "Basic Info", icon: <InfoIcon /> },
                                { label: "Details", icon: <FileIcon /> },
                                { label: "Tickets", icon: <BookingsIcon /> },
                                { label: "Review", icon: <SuccessIcon /> },
                            ].map((tab, idx) => (
                                <div key={tab.label} className="flex items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentTab >= idx
                                            ? "bg-purple-600 border-purple-600 text-white"
                                            : "border-gray-300 text-gray-400"
                                            }`}
                                    >
                                        {tab.icon}
                                    </div>
                                    <span
                                        className={`ml-2 text-sm font-medium ${currentTab >= idx ? "text-purple-600" : "text-gray-400"
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                    {idx < 3 && (
                                        <div
                                            className={`w-16 h-0.5 mx-4 ${currentTab > idx ? "bg-purple-600" : "bg-gray-300"
                                                }`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                        {/* ---------------- BASIC INFO ---------------- */}
                        {currentTab === 0 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                                    <input
                                        placeholder="Enter event title"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                        <option value="">Select a category</option>
                                        <option value="Music & Concerts">Music & Concerts</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Sports & Fitness">Sports & Fitness</option>
                                        <option value="Arts & Culture">Arts & Culture</option>
                                        <option value="Food & Drink">Food & Drink</option>
                                        <option value="Business">Business</option>
                                        <option value="Education">Education</option>
                                        <option value="Health & Wellness">Health & Wellness</option>
                                        <option value="Travel & Outdoor">Travel & Outdoor</option>
                                        <option value="Community">Community</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
                                    <textarea
                                        rows="6"
                                        placeholder="Describe your event..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <ImageIcon className="text-gray-400 mb-2" />
                                        <p className="text-gray-600 mb-2">Upload event image</p>
                                        <input accept="image/*" className="hidden" id="image-upload" type="file" />
                                        <label htmlFor="image-upload">
                                            <button
                                                type="button"
                                                className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 text-sm"
                                            >
                                                Choose File
                                            </button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ---------------- DETAILS ---------------- */}
                        {currentTab === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold mb-6">Event Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                                        <input
                                            type="time"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                                        <input
                                            placeholder="2"
                                            type="number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                                        <input
                                            placeholder="100"
                                            type="number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Name *</label>
                                    <input
                                        placeholder="Convention Center"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                    <input
                                        placeholder="123 Main Street, City, State"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        type="text"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="isPublic"
                                            type="checkbox"
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                            defaultChecked
                                        />
                                        <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                                            Make this event public
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="allowWaitList"
                                            type="checkbox"
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="allowWaitList" className="ml-2 text-sm text-gray-700">
                                            Allow wait list when sold out
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tickets tab */}
                        {currentTab === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Ticket Types</h2>
                                    <button
                                        type="button"
                                        onClick={addTicket}
                                        className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-base flex items-center gap-1"
                                    >
                                        <AddIcon className="mr-2" />Add Ticket Type
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {tickets.map((ticket, idx) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg relative">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-medium">Ticket Type {idx + 1}</h3>
                                                {tickets.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updated = tickets.filter((_, i) => i !== idx);
                                                            setTickets(updated);
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Name</label>
                                                    <input
                                                        placeholder="General Admission"
                                                        type="text"
                                                        value={ticket.name}
                                                        onChange={(e) => {
                                                            const updated = [...tickets];
                                                            updated[idx].name = e.target.value;
                                                            setTickets(updated);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                                    <input
                                                        placeholder="50"
                                                        type="number"
                                                        value={ticket.price}
                                                        onChange={(e) => {
                                                            const updated = [...tickets];
                                                            updated[idx].price = e.target.value;
                                                            setTickets(updated);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                                    <input
                                                        placeholder="100"
                                                        type="number"
                                                        value={ticket.quantity}
                                                        onChange={(e) => {
                                                            const updated = [...tickets];
                                                            updated[idx].quantity = e.target.value;
                                                            setTickets(updated);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Review tab */}
                        {currentTab === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Review Event</h2>

                                {/* Event Basic Info */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Basic Information</h3>
                                    <p><span className="font-semibold">Title:</span> {/* title state here */}</p>
                                    <p><span className="font-semibold">Category:</span> {/* category state here */}</p>
                                    <p><span className="font-semibold">Description:</span> {/* description state here */}</p>
                                    <p><span className="font-semibold">Event Image:</span> {/* filename or preview */}</p>
                                </div>

                                {/* Event Details */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Event Details</h3>
                                    <p><span className="font-semibold">Date:</span> {/* date state */}</p>
                                    <p><span className="font-semibold">Start Time:</span> {/* start time state */}</p>
                                    <p><span className="font-semibold">Duration:</span> {/* duration state */}</p>
                                    <p><span className="font-semibold">Capacity:</span> {/* capacity state */}</p>
                                    <p><span className="font-semibold">Location:</span> {/* location name + address state */}</p>
                                    <p><span className="font-semibold">Public Event:</span> {/* isPublic state */}</p>
                                    <p><span className="font-semibold">Allow Wait List:</span> {/* allowWaitList state */}</p>
                                </div>

                                {/* Tickets */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Tickets</h3>
                                    {tickets.map((ticket, idx) => (
                                        <div key={idx} className="border-b border-gray-200 py-2">
                                            <p><span className="font-semibold">Name:</span> {ticket.name}</p>
                                            <p><span className="font-semibold">Price:</span> ${ticket.price}</p>
                                            <p><span className="font-semibold">Quantity:</span> {ticket.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevTab}
                                disabled={currentTab === 0}
                                className={`font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 px-6 py-3 text-base ${currentTab === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600 hover:text-white"
                                    }`}
                            >
                                <ArrowLeftIcon className="mr-2" />Previous
                            </button>
                            <button
                                type="button"
                                onClick={nextTab}
                                className={`font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer px-6 py-3 text-base bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl`}
                            >
                                {currentTab < 3 ? "Next" : "Finish"}
                                <ArrowRightIcon className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}