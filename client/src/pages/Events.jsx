import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchOutlineIcon, GridIcon, ListIcon } from "../components/Icon";

import EventGridCard from "../components/events/EventGridCard";
import EventListCard from "../components/events/EventListCard";

import { fetchEvents } from "../store/events/eventsSlice";
import { fetchBaseEventFilters, fetchDependentEventFilters } from "../store/events/eventFiltersSlice";
import RoundedDropdown from "../components/events/ui/RoundedDropdown";

export default function Events() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  /* ----------------------------- Redux State ----------------------------- */
  const { events, loading, error, total } = useSelector(
    (state) => state.events
  );
  const {
    categories: filterCategories,
    locations: filterLocations,
    loading: filtersLoading,
  } = useSelector((state) => state.eventFilters);

  /* ----------------------------- Local UI State ----------------------------- */
  const category = params.category || "";
  const search = params.search || "";
  const [searchInput, setSearchInput] = useState(search);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const locationFilter = params.location || "";
  const sortBy = params.sortBy || "date";
  const [filters, setFilters] = useState({
    category,
    location: locationFilter,
    sortBy,
    order: 'asc'
  });
  const [view, setView] = useState("grid");

  const sortedEvents = useMemo(() => {
    const list = [...events];

    const direction = filters.order === "asc" ? 1 : -1;

    switch (filters.sortBy) {
      case "date":
        return list.sort(
          (a, b) => direction * (new Date(a.date) - new Date(b.date))
        );

      case "title":
        return list.sort(
          (a, b) => direction * a.title.localeCompare(b.title)
        );

      case "price":
        return list.sort(
          (a, b) =>
            direction *
            ((a.tickets?.[0]?.price ?? 0) -
              (b.tickets?.[0]?.price ?? 0))
        );

      case "popularity":
        return list.sort(
          (a, b) =>
            direction *
            ((b.bookingsCount ?? 0) - (a.bookingsCount ?? 0))
        );

      case "rating":
        return list.sort(
          (a, b) =>
            direction *
            ((b.rating ?? 0) - (a.rating ?? 0))
        );

      default:
        return list;
    }
  }, [events, filters.sortBy, filters.order]);

  /* ----------------------------- Fetch Events ----------------------------- */
  useEffect(() => {
    dispatch(
      fetchEvents({
        search,
        dateFrom,
        dateTo,
        category,
        location: locationFilter,
      })
    );
  }, [dispatch, search, dateFrom, dateTo, category, locationFilter]);

  /* Load BASE filters once */
  useEffect(() => {
    dispatch(fetchBaseEventFilters());
  }, [dispatch]);

  /* Category selected → update LOCATIONS only */
  useEffect(() => {
    if (filters.category) {
      dispatch(fetchDependentEventFilters({ category: filters.category }));
    } else {
      // Reset back to ALL if cleared
      dispatch(fetchBaseEventFilters());
    }
  }, [dispatch, filters.category]);

  /* Location selected → update CATEGORIES only */
  useEffect(() => {
    if (filters.location) {
      dispatch(fetchDependentEventFilters({ location: filters.location }));
    } else {
      dispatch(fetchBaseEventFilters());
    }
  }, [dispatch, filters.location]);

  /* ----------------------------- Render ----------------------------- */
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
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 space-y-6">

            {/* ROW 1 — Search + Sort */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Search */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Search</label>
                <div className="relative">
                  <i className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchOutlineIcon />
                  </i>
                  <input
                    type="text"
                    placeholder="Search events, locations, organizers..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const value = searchInput.trim();
                        value ? navigate(`/events/search/${value}`) : navigate("/events");
                      }
                    }}
                  />
                  {searchInput.trim().length > 0 && (
                    <span className="absolute right-3 bottom-1 text-[11px] text-gray-400 pointer-events-none">
                      Press Enter
                    </span>
                  )}
                </div>
              </div>

              {/* Date From */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-12 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Date To */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-12 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Sort By */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Sort by</label>
                <RoundedDropdown
                  label={{
                    date: "Date",
                    price: "Price",
                    popularity: "Popularity",
                    rating: "Rating",
                    title: "Title",
                  }[filters.sortBy]}
                  value={filters.sortBy}
                  options={[
                    { label: "Date", value: "date" },
                    { label: "Price", value: "price" },
                    { label: "Popularity", value: "popularity" },
                    { label: "Rating", value: "rating" },
                    { label: "Title", value: "title" },
                  ]}
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, sortBy: value }))
                  }
                />
              </div>

              {/* Order */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Order</label>
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      order: prev.order === "asc" ? "desc" : "asc",
                    }))
                  }
                  className="flex items-center justify-center gap-2 h-12 border border-gray-300 rounded-lg hover:border-purple-400 text-sm font-medium"
                >
                  {filters.order === "asc" ? (
                    <>
                      {/* Up Arrow */}
                      Ascending
                    </>
                  ) : (
                    <>
                      {/* Down Arrow */}
                      Descending
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ROW 2 — Category + Location + Apply */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Category</label>
                <RoundedDropdown
                  label={
                    filterCategories.find(c => c.slug === filters.category)?.name
                    || "All Categories"
                  }
                  value={filters.category}
                  disabled={filtersLoading}
                  options={[
                    { label: "All Categories", value: "" },
                    ...filterCategories.map(c => ({ label: c.name, value: c.slug }))
                  ]}
                  onChange={(value) =>
                    setFilters(prev => ({ ...prev, category: value, location: "" }))
                  }
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Location</label>
                <RoundedDropdown
                  label={filters.location || "All Locations"}
                  value={filters.location}
                  disabled={filtersLoading || !filterLocations.length}
                  options={[
                    { label: "All Locations", value: "" },
                    ...filterLocations.map(l => ({ label: l, value: l }))
                  ]}
                  onChange={(value) =>
                    setFilters(prev => ({ ...prev, location: value }))
                  }
                />
              </div>

              {/* Apply */}
              <div className="flex flex-col gap-1 justify-end">
                <button
                  onClick={() => {
                    let path = "/events";
                    if (filters.category) path += `/category/${filters.category}`;
                    if (filters.location) path += `/location/${filters.location}`;
                    navigate(path);
                  }}
                  className="h-12 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>

            {/* ROW 3 — Count + View */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-600">
                {loading ? "Loading events..." : `${total} events found`}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg ${view === "grid"
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-400"
                    }`}
                >
                  <GridIcon size={20} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-lg ${view === "list"
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-400"
                    }`}
                >
                  <ListIcon size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {!loading && events.length === 0 && (
            <p className="text-gray-500 text-sm">
              No events found for the selected filters.
            </p>
          )}

          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEvents.map((event) => (
                <EventGridCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedEvents.map((event) => (
                <EventListCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}