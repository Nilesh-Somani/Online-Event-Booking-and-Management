const CardPreview = ({ image, title, date, location, onRemove, removable = false, reviewTab = true }) => (
    <div className="relative max-w-sm">
        {/* Label */}
        <div className="mb-2 text-xs font-medium text-gray-500">
            Listing Card Preview (4:3)
        </div>

        {/* Card Container */}
        <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Image wrapper enforces 4:3 */}
            <div className="relative aspect-4/3 bg-gray-100">
                {image && (
                    <img
                        src={image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Safe Area Overlay */}
                {!reviewTab && (
                    <div className="pointer-events-none absolute inset-0">
                        {/* Unsafe top */}
                        <div className="absolute top-0 left-0 right-0 h-[10%] bg-red-500/10" />
                        {/* Unsafe bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-red-500/10" />
                        {/* Unsafe left */}
                        <div className="absolute top-0 bottom-0 left-0 w-[5%] bg-red-500/10" />
                        {/* Unsafe right */}
                        <div className="absolute top-0 bottom-0 right-0 w-[5%] bg-red-500/10" />
                    </div>
                )}
            </div>

            {/* Minimal text (context only) */}
            <div className="p-3">
                <div className="text-xs text-gray-500">
                    {date || "Event Date"}
                </div>
                <h3 className="text-sm font-semibold line-clamp-2">
                    {title || "Event Title"}
                </h3>
                <div className="text-xs text-gray-600">
                    {location || "Location"}
                </div>
            </div>
        </div>

        {/* Mobile hint */}
        {!reviewTab && (
            <p className="mt-1 text-[11px] text-gray-400">
                Mobile grids may crop slightly from top & bottom
            </p>
        )}

        {removable && (
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-8 right-2 bg-white/90 text-red-600 text-xs px-2 py-1 rounded hover:bg-red-600 hover:text-white"
            >
                Remove
            </button>
        )}
    </div>
);

export default CardPreview;