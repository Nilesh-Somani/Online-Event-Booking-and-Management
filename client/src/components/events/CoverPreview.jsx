const CoverPreview = ({ image, title, date, location, onRemove, removable = false, reviewTab = true }) => (
    <div className="relative">
        {/* Label */}
        <div className="mb-2 text-xs font-medium text-gray-500">
            Event Cover Preview (16:9)
        </div>

        {/* Cover container */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
            {/* Background image */}
            {image && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}

            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Safe Area Overlay */}
            { !reviewTab && (<div className="pointer-events-none absolute inset-0">
                    {/* Top unsafe (desktop crop risk) */}
                    <div className="absolute top-0 left-0 right-0 h-[15%] bg-red-500/10" />

                    {/* Bottom text-safe zone */}
                    <div className="absolute bottom-0 left-0 right-0 h-[25%] border-t border-white/30" />
                </div>
                )}

            {/* Text content (bottom-aligned) */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold leading-tight">
                    {title || "Event Title"}
                </h3>
                <p className="text-sm opacity-90">
                    {date || "Date"} • {location || "Location"}
                </p>
            </div>

            {removable && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-3 right-3 bg-white/90 text-red-600 text-xs px-3 py-1 rounded hover:bg-red-600 hover:text-white"
                >
                    Remove
                </button>
            )}
        </div>
        {/* Device hint */}
        {!reviewTab && (
            <p className="mt-1 text-[11px] text-gray-400">
                Mobile screens crop sides slightly — avoid edge-placed text
            </p>
        )}
    </div>
);

export default CoverPreview;