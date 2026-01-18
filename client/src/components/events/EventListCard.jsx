import { Link } from "react-router-dom";
import { CalendarOutlineIcon, StarIcon, TimeIcon } from "../Icon";

export default function EventListCard({ event }) {
  const minPrice = Math.min(...event.tickets.map(t => t.price));

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex">
      <div className="w-64 shrink-0 relative">
        <img
          src={event.images.cover.url}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            ${minPrice}
          </span>
        </div>

        {event.bookingsCount > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            🔥 {event.bookingsCount} bookings
          </div>
        )}
      </div>

      <div className="p-6 flex-1">
        <div className="flex items-center text-sm text-gray-500 mb-2">

          <span className="flex justify-center items-center gap-1">
            <CalendarOutlineIcon /> {new Date(event.date).toLocaleDateString()}
          </span>
          <span className="flex justify-center items-center gap-1 ml-10">
            <TimeIcon /> {event.startTime}
          </span>
          <span className="ml-auto flex items-center gap-1 text-yellow-400"><StarIcon /> {event.rating}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>

        <div className="text-gray-600 mb-2">{event.locationName}</div>
        <div className="text-gray-600 mb-4">
          {event.organizer?.profile?.firstName}{" "}
          {event.organizer?.profile?.lastName}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-start gap-4"
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {event.categories?.map((cat) => (
              <span
                key={cat._id}
                className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            to={`/events/${event._id}`}
            className="ml-auto shrink-0"
          >
            <button className="font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white px-5 py-2 text-sm hover:from-purple-700 hover:to-pink-700">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}