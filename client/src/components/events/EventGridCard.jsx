import { Link } from "react-router-dom";
import { StarIcon } from "../Icon";


export default function EventGridCard({ event }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            ${event.price}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
            <StarIcon className="mr-1 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">{event.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{event.date}</div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>

        <div className="text-gray-600 mb-2">{event.location}</div>
        <div className="text-gray-600 mb-4">{event.organizer}</div>

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

        <div className="flex items-center justify-between">
          <div className="text-sm text-purple-600 font-medium">
            {event.category}
          </div>

          <Link to={`/events/${event.id}`}>
            <button className="font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm hover:from-purple-700 hover:to-pink-700">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}