import CardPreview from "./CardPreview";
import CoverPreview from "./CoverPreview";

const Section = ({ title, children }) => (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
            {title}
        </h3>
        {children}
    </div>
);

const SubCard = ({ title, children }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-2">
        <p className="text-sm font-medium text-gray-800">
            {title}
        </p>
        {children}
    </div>
);

const Row = ({ label, value }) => (
    <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-medium">{value || "—"}</span>
    </div>
);

const ReviewTab = ({
    title,
    selectedCategoryIds,
    tags,
    description,
    highlights,
    date,
    startTime,
    duration,
    capacity,
    schedule,
    locationMode,
    locationName,
    address,
    city,
    stateRegion,
    country,
    parking,
    entryNotes,
    onlinePlatform,
    onlineJoinUrl,
    onlineAccessNotes,
    policies,
    eventType,
    allowWaitList,
    cardPreview,
    coverPreview,
    galleryItems,
    allCategories,
    tickets
}) => {
    const categories = allCategories
        .filter(c => selectedCategoryIds.includes(c._id))
        .map(c => c.name)
        .join(", ");

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
            <h2 className="text-xl font-semibold">Review Your Event</h2>

            {/* MAIN GRID */}
            <div className="space-y-8">

                {/* LEFT COLUMN */}
                <div className="space-y-6 text-sm">

                    {/* BASIC INFORMATION */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2">
                            Basic Information
                        </h3>
                        <div className="space-y-1 text-gray-700">
                            <p><span className="font-medium">Event Title:</span> {title || "—"}</p>
                            <p><span className="font-medium">Categories:</span> {categories || "—"}</p>
                            <p><span className="font-medium">Event Type:</span> {eventType === "public" ? "Public" : "Private"}</p>
                            <p><span className="font-medium">Wait List:</span> {allowWaitList ? "Enabled" : "Disabled"}</p>
                            {tags.length > 0 && (
                                <p><span className="font-medium">Tags:</span> {tags.join(", ")}</p>
                            )}
                        </div>
                    </div>

                    {/* DESCRIPTION & HIGHLIGHTS */}
                    <Section title="Description">
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                            {description || "—"}
                        </p>

                        {highlights.length > 0 && (
                            <SubCard title="Event Highlights">
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    {highlights.map((h, i) => (
                                        <li key={i}>{h}</li>
                                    ))}
                                </ul>
                            </SubCard>
                        )}
                    </Section>

                    {/* EVENT DETAILS */}
                    <Section title="Event Details">
                        <Row label="Date" value={date} />
                        <Row label="Start Time" value={startTime} />
                        <Row label="Duration" value={duration} />
                        <Row label="Capacity" value={capacity} />

                        {schedule.length > 0 && (
                            <SubCard title="Event Schedule">
                                <div className="space-y-2">
                                    {/* HEADER */}
                                    <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wide">
                                        <span>Time</span>
                                        <span>Activity</span>
                                    </div>

                                    {/* ROWS */}
                                    {schedule.map((s, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-start text-sm text-gray-700 border-t pt-2"
                                        >
                                            <span className="font-medium text-gray-900">
                                                {s.time}
                                            </span>
                                            <span className="text-right max-w-[70%]">
                                                {s.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SubCard>
                        )}
                    </Section>

                    {/* LOCATION & POLICIES */}
                    <Section title="Location & Policies">
                        {locationMode !== "online" && (
                            <>
                                <Row label="Venue Name" value={locationName} />
                                <Row label="Address" value={address} />
                                <Row label="City" value={city} />
                                <Row label="State" value={stateRegion} />
                                <Row label="Country" value={country} />
                            </>
                        )}

                        {locationMode !== "physical" && (
                            <>
                                <Row label="Platform" value={onlinePlatform} />
                                <Row label="Join URL" value={onlineJoinUrl} />
                                <Row label="Access Notes" value={onlineAccessNotes} />
                            </>
                        )}

                        {(parking || entryNotes || policies) && (
                            <SubCard title="Additional Information">
                                {parking && <p className="text-sm">Parking: {parking}</p>}
                                {entryNotes && <p className="text-sm">Entry Notes: {entryNotes}</p>}
                                {policies?.refund && <p className="text-sm">Refund Policy: {policies.refund}</p>}
                                {policies?.ageLimit && <p className="text-sm">Age Limit: {policies.ageLimit}</p>}
                                {policies?.entry && <p className="text-sm">Entry Rules: {policies.entry}</p>}
                            </SubCard>
                        )}
                    </Section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">

                    {/* VISUAL PREVIEW */}
                    {(coverPreview || cardPreview) && (
                        <div>
                            <h3 className="font-medium text-gray-900 mb-3">
                                Event Preview
                            </h3>

                            {coverPreview && (
                                <CoverPreview
                                    image={coverPreview}
                                    title={title}
                                    date={date}
                                    location={locationName}
                                    removable={false}
                                />
                            )}

                            {cardPreview && (
                                <div className="mt-4 max-w-sm">
                                    <CardPreview
                                        image={cardPreview}
                                        title={title}
                                        date={date}
                                        location={locationName}
                                        removable={false}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* GALLERY */}
                    {galleryItems.length > 0 && (
                        <Section title="Gallery">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {galleryItems.filter(i => !i.uploading).map(item => (
                                    <img
                                        key={item.id}
                                        src={item.url}
                                        className="h-28 w-full object-cover rounded border"
                                    />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* TICKETS */}
                    <Section title="Tickets">
                        <div className="space-y-3">
                            {tickets.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-4 border rounded-md"
                                >
                                    <div>
                                        <p className="font-medium">{t.name}</p>
                                        <p className="text-xs text-gray-500">
                                            Quantity: {t.quantity}
                                        </p>
                                    </div>
                                    <span className="font-semibold text-purple-600">
                                        ₹{t.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>

            {/* INFO NOTE */}
            <div className="bg-purple-50 p-4 rounded-lg flex items-start gap-2">
                <span className="text-purple-600 text-lg">ℹ️</span>
                <p className="text-sm text-purple-800">
                    Please review all details carefully before creating your event.
                    You can edit most information later if needed.
                </p>
            </div>
        </div>
    );
};

export default ReviewTab;