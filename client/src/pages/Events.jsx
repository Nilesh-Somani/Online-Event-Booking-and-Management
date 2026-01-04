import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiSearch, HiViewGrid, HiViewList } from "react-icons/hi";

import events from "../data/events";
import EventGridCard from "../components/events/EventGridCard";
import EventListCard from "../components/events/EventListCard";

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL query params
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "date");

  // Update URL params when filters change
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (location) params.location = location;
    if (sortBy && sortBy !== "date") params.sortBy = sortBy;
    setSearchParams(params);
  }, [search, category, location, sortBy, setSearchParams]);

  // Filter & sort events
  const filteredEvents = events
    .filter((event) => {
      const q = search.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.organizer.toLowerCase().includes(q)
      );
    })
    .filter((event) => (category ? event.category === category : true))
    .filter((event) => (location ? event.location.includes(location) : true))
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        case "popularity":
          return b.attending - a.attending;
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Events
            </h1>
            <p className="text-gray-600">
              Find amazing events happening near you
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <i className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <HiSearch />
                  </i>
                  <input
                    type="text"
                    placeholder="Search events, locations, organizers..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Music & Concerts">Music & Concerts</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Seattle">Seattle</option>
                  <option value="Boston">Boston</option>
                  <option value="Miami">Miami</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="price">Sort by Price</option>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>
            </div>

            {/* Results + View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">
                {filteredEvents.length} events found
              </span>

              <div className="flex space-x-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg ${view === "grid"
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-400"
                    }`}
                >
                  <HiViewGrid size={20} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-lg ${view === "list"
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-400"
                    }`}
                >
                  <HiViewList size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid/List */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventGridCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <EventListCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}