import { SearchOutlineIcon, CalendarOutlineIcon, LocationIcon, BookingsIcon, MusicIcon, TechnologyIcon, SportsIcon, ArtsIcon, FoodIcon, BusinessIcon, ArrowRightIcon } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div class="absolute inset-0">
          {/* Background */}
          <img alt="Hero Background" class="w-full h-full object-cover object-top" src="/hero-bg.jpg" />
          <div class="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/40"></div>
        </div>

        {/* Text */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="text-center text-white mb-12">
            <h1 class="text-5xl md:text-6xl font-bold mb-6">Discover Amazing
              <span class="block text-purple-400">Events Near You</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">Join thousands of people discovering and attending incredible events. From concerts to conferences, find your next unforgettable experience.</p>
          </div>

          {/* Search Bar */}
          <form class="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10 max-w-4xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div class="relative">
                  <LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input placeholder="Where?" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" type="text" value="" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div class="relative">
                  <CalendarOutlineIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" type="date" value="" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <div class="relative">
                  <BookingsIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm appearance-none">
                    <option value="all">All Events</option>
                    <option value="Music &amp; Concerts">Music &amp; Concerts</option>
                    <option value="Technology">Technology</option>
                    <option value="Sports &amp; Fitness">Sports &amp; Fitness</option>
                    <option value="Arts &amp; Culture">Arts &amp; Culture</option>
                    <option value="Food &amp; Drink">Food &amp; Drink</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Health &amp; Wellness">Health &amp; Wellness</option>
                  </select>
                </div>
              </div>
              <div class="flex items-end">
                <button type="submit" class="flex items-center gap-1 font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl px-6 py-3 text-base  w-full">
                  <SearchOutlineIcon className="mr-2" /> Search Events
                </button></div>
            </div>
          </form>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Browse by Category
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Explore events across different categories
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-10">
            {[
              "Music & Concerts",
              "Technology",
              "Sports & Fitness",
              "Arts & Culture",
              "Food & Drink",
              "Business",
            ].map((cat) => (
              <div
                key={cat}
                className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
              >
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full mb-3 flex items-center justify-center">
                  {cat === "Music & Concerts" && (<MusicIcon className="text-purple-600" />)}
                  {cat === "Technology" && (<TechnologyIcon className="text-purple-600" />)}
                  {cat === "Sports & Fitness" && (<SportsIcon className="text-purple-600" />)}
                  {cat === "Arts & Culture" && (<ArtsIcon className="text-purple-600" />)}
                  {cat === "Food & Drink" && (<FoodIcon className="text-purple-600" />)}
                  {cat === "Business" && (<BusinessIcon className="text-purple-600" />)}
                </div>
                <h4 className="font-semibold">{cat}</h4>
                <p className="text-sm text-gray-500 mt-1">Explore Events</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED EVENTS ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Events
              </h2>
              <p className="text-gray-500 mt-1">
                Don't miss these amazing upcoming events
              </p>
            </div>

            <button className="flex items-center gap-1 px-5 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50">
              View All Events <ArrowRightIcon />
            </button>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden
                     hover:shadow-lg transition-shadow"
              >

                {/* Image + Price */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
                    alt="Event"
                    className="w-full h-48 object-cover object-top"
                  />
                  <span className="absolute top-4 left-4 bg-purple-600 text-white
                             px-3 py-1 rounded-full text-sm font-medium">
                    $25
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-1">📅</span>
                    <span>7/15/2024 at 6:00 PM</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Summer Music Festival 2024
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-1">📍</span>
                    <span>Central Park, New York</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 font-medium">
                      Music & Concerts
                    </span>

                    <button
                      className="px-4 py-2 text-sm text-white rounded-lg
                           bg-linear-to-r from-purple-600 to-pink-600
                           hover:from-purple-700 hover:to-pink-700
                           shadow-lg hover:shadow-xl transition-all"
                    >
                      View Details
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <p className="text-gray-500 mt-2">Find events happening soon</p>

        <div className="flex justify-center gap-4 mt-6">
          {["Today", "This Week", "This Month"].map((t) => (
            <button
              key={t}
              className="px-6 py-2 rounded-lg border border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* STAY UPDATED */}
      <section className="bg-linear-to-r from-purple-500 to-pink-500 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Stay Updated</h2>
        <p className="mt-2">Get notified about the latest events</p>

        <div className="mt-6 flex justify-center gap-3">
          <input
            className="px-4 py-2 rounded-lg w-72 text-black bg-white"
            placeholder="Enter your email"
          />
          <button className="px-6 py-2 rounded-lg bg-white text-purple-600 font-medium">
            Subscribe
          </button>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10K+", "Events Hosted"],
            ["500K+", "Happy Attendees"],
            ["1K+", "Event Organizers"],
            ["50+", "Cities Covered"],
          ].map(([num, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-bold text-purple-600">{num}</h3>
              <p className="text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}