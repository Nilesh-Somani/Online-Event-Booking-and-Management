import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileIcon, ProfileIcon } from "../components/Icon";

export default function OrganizerApplication() {
    return (
        <>
            <Navbar />
            <main className="pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Become an Event Organizer
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Join our platform as an event organizer and start hosting amazing
                            events. Please fill out the application form below with accurate
                            information.
                        </p>
                    </div>

                    <form className="space-y-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <ProfileIcon size={20} />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Business Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Type *
                                    </label>
                                    <select
                                        name="businessType"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">Select Business Type</option>
                                        <option>Individual</option>
                                        <option>LLC</option>
                                        <option>Corporation</option>
                                        <option>Partnership</option>
                                        <option>Non-Profit</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="businessAddress"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="businessPhone"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Email
                                    </label>
                                    <input
                                        type="email"
                                        name="businessEmail"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        placeholder="https://www.example.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Venue Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Venue Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="venueName"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue Type *
                                    </label>
                                    <select
                                        name="venueType"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="">Select Venue Type</option>
                                        <option>Indoor Venue</option>
                                        <option>Outdoor Venue</option>
                                        <option>Conference Center</option>
                                        <option>Restaurant/Bar</option>
                                        <option>Community Center</option>
                                        <option>Private Property</option>
                                        <option>Public Space</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="venueAddress"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Capacity (people) *
                                    </label>
                                    <input
                                        type="number"
                                        name="venueCapacity"
                                        min="1"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rental Cost (per day) *
                                    </label>
                                    <input
                                        type="number"
                                        name="venueCost"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue Description *
                                    </label>
                                    <textarea
                                        name="venueDescription"
                                        required
                                        rows="4"
                                        placeholder="Describe your venue, amenities, and facilities..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Experience & Event Types */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Experience & Event Types
                            </h2>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Event Types You Want to Organize *
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        "Music & Concerts",
                                        "Technology",
                                        "Sports & Fitness",
                                        "Arts & Culture",
                                        "Food & Drink",
                                        "Business",
                                        "Education",
                                        "Health & Wellness",
                                    ].map((type) => (
                                        <label key={type} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Previous Experience *
                                </label>
                                <textarea
                                    name="experience"
                                    required
                                    rows="4"
                                    placeholder="Describe your experience in event organization, management, or related fields..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Required Documents */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Required Documents
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FileIcon size={16} />
                                        Business License *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        PDF, JPG, or PNG format
                                    </p>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FileIcon size={16} />
                                        Insurance Document *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        PDF, JPG, or PNG format
                                    </p>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FileIcon size={16} />
                                        Identity Document *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Driver's License, Passport, or ID Card
                                    </p>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FileIcon size={16} />
                                        Venue Photos *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        multiple
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Multiple photos of your venue (JPG or PNG)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Additional Information
                            </h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Comments
                                </label>
                                <textarea
                                    name="additionalInfo"
                                    rows="4"
                                    placeholder="Any additional information you'd like to share..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                            <button
                                type="submit"
                                disabled
                                className="font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 opacity-50 cursor-not-allowed"
                            >
                                Submit Application
                            </button>
                            <p className="text-sm text-gray-500 mt-4">
                                By submitting this application, you agree to our terms and
                                conditions. We will review your application within 3–5 business
                                days.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}