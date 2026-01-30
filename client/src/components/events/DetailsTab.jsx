import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableGalleryItem from "./SortableGalleryItem";
import UploadBox from "./UploadBox";
import { ImageIcon } from "../Icon";

const DetailsTab = ({
    errors, clearError, registerField,
    date, setDate,
    startTime, setStartTime,
    duration, setDuration,
    capacity, setCapacity,
    schedule, setSchedule,
    venues,
    locationMode, setLocationMode,
    locationName, setLocationName,
    address, setAddress,
    city, setCity,
    stateRegion, setStateRegion,
    country, setCountry,
    parking, setParking,
    entryNotes, setEntryNotes,
    saveVenue, setSaveVenue,
    selectedVenueId, setSelectedVenueId,
    onlinePlatform, setOnlinePlatform,
    onlineJoinUrl, setOnlineJoinUrl,
    onlineAccessNotes, setOnlineAccessNotes,
    policies, setPolicies,
    eventType, setEventType,
    allowWaitList, setAllowWaitList,
    galleryItems, setGalleryItems,
    handleGalleryImages,
    removeGalleryImageById,
    galleryInputRef,
    today, nowMinutes, minEventDate,
    isScheduleTimeValid
}) => {
    const canEditSchedule = Boolean(date && startTime && duration);


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Event Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={registerField("date")}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                        type="date"
                        value={date}
                        min={minEventDate}
                        onChange={(e) => {
                            setDate(e.target.value)
                            clearError("date")
                            setStartTime("");
                            setSchedule([]);
                        }}
                        className={`w-full px-4 py-3 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                </div>
                <div ref={registerField("startTime")}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                    <input
                        type="time"
                        value={startTime}
                        min={date === today ? (() => {
                            const d = new Date();
                            return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                        })() : undefined}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (date === today) {
                                const [h, m] = value.split(":").map(Number);
                                if (h * 60 + m < nowMinutes) return;
                            }
                            setStartTime(value);
                            setSchedule([]);
                            clearError("startTime");
                        }}
                        className={`w-full px-4 py-3 border ${errors.startTime ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <input
                        placeholder="1"
                        type="number"
                        value={duration}
                        min={1}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                    <input
                        placeholder="100"
                        type="number"
                        value={capacity}
                        min={1}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Event Schedule</label>
                {!canEditSchedule && (
                    <p className="text-xs text-gray-500 mb-2">
                        Please select <span className="font-medium">date, start time, and duration</span> to add schedule items.
                    </p>
                )}

                {schedule.map((item, i) => (
                    <div key={i} className="flex gap-3 mb-2">
                        <input
                            type="time"
                            disabled={!canEditSchedule}
                            value={item.time}
                            onChange={e => {
                                const value = e.target.value;
                                if (!isScheduleTimeValid(value)) return;

                                const s = [...schedule];
                                s[i].time = value;
                                setSchedule(s);
                            }}
                            className={`w-1/4 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent
        ${item.time && !isScheduleTimeValid(item.time)
                                    ? "border-red-500"
                                    : "border-gray-300"}
    `}
                        />
                        <input
                            placeholder="Opening Ceremony"
                            value={item.title}
                            disabled={!canEditSchedule}
                            onChange={e => {
                                const s = [...schedule];
                                s[i].title = e.target.value;
                                setSchedule(s);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setSchedule(prev => prev.filter((_, idx) => idx !== i))
                            }
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    disabled={!canEditSchedule}
                    onClick={() => setSchedule(prev => [...prev, { time: "", title: "" }])}
                    className="text-purple-600 text-sm font-medium"
                >
                    + Add Schedule Item
                </button>
            </div>

            <div className="flex items-center justify-between mb-6">
                <label className="text-sm font-medium text-gray-700">
                    Event Location Mode *
                </label>

                <div className="flex bg-gray-100 rounded-lg p-1">
                    {["physical", "online", "hybrid"].map(mode => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setLocationMode(mode)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition
                    ${locationMode === mode
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-600"
                                }`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {locationMode !== "online" && venues?.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Use Saved Venue
                    </label>

                    <select
                        value={selectedVenueId || ""}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Reset to defaults when "Select saved venue"
                            if (!value) {
                                setSelectedVenueId("");
                                setLocationName("");
                                setAddress("");
                                setCity("");
                                setStateRegion("");
                                setCountry("");
                                setParking("");
                                setEntryNotes("");
                                return;
                            }

                            const venue = venues.find(v => v._id === value);
                            if (!venue) return;

                            setSelectedVenueId(venue._id);
                            setLocationName(venue.name || "");
                            setAddress(venue.address || "");
                            setCity(venue.city || "");
                            setStateRegion(venue.state || "");
                            setCountry(venue.country || "");
                            setParking(venue.parking || "");
                            setEntryNotes(venue.entryNotes || "");
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select saved venue</option>
                        {venues.map(v => (
                            <option key={v._id} value={v._id}>
                                {v.name} – {v.city}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {locationMode !== "online" && (
                <>
                    <div ref={registerField("locationName")}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location Name *</label>
                        <input
                            placeholder="Convention Center"
                            value={locationName}
                            onChange={e => { setLocationName(e.target.value); clearError("locationName"); }}
                            className={`w-full px-4 py-3 border ${errors.locationName ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        />
                    </div>

                    <div ref={registerField("address")}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <input
                            placeholder="123 Main Street"
                            value={address}
                            onChange={e => { setAddress(e.target.value); clearError("address"); }}
                            className={`w-full px-4 py-3 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="Mumbai"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input
                                value={stateRegion}
                                onChange={e => setStateRegion(e.target.value)}
                                placeholder="Maharashtra"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <input
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="India"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parking Information</label>
                        <input value={parking} placeholder="Parking available in basement / Street parking nearby / No parking available" onChange={e => setParking(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Entry Notes</label>
                        <input value={entryNotes} placeholder="Bring valid ID, arrive 30 mins early" onChange={e => setEntryNotes(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <input
                            type="checkbox"
                            checked={saveVenue}
                            onChange={(e) => setSaveVenue(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">
                            Save this venue for future events
                        </span>
                    </div>
                </>
            )}

            {locationMode !== "physical" && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Online Platform *</label>
                        <input
                            placeholder="Zoom, Google Meet, Custom"
                            value={onlinePlatform}
                            onChange={e => setOnlinePlatform(e.target.value)}
                            className={`w-full px-4 py-3 border ${errors.onlinePlatform ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Join URL *</label>
                        <input
                            placeholder="https://zoom.us/..."
                            value={onlineJoinUrl}
                            onChange={e => setOnlineJoinUrl(e.target.value)}
                            className={`w-full px-4 py-3 border ${errors.onlineJoinUrl ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Access Notes</label>
                        <input
                            placeholder="Meeting password: 123456"
                            value={onlineAccessNotes}
                            onChange={e => setOnlineAccessNotes(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </>
            )}

            <div>
                <h3 className="text-sm font-medium text-gray-800 mb-4">
                    Event Policies
                </h3>

                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Refund Policy
                        </label>
                        <input
                            value={policies.refund}
                            placeholder="Full refund up to 24 hours before event"
                            onChange={e => setPolicies(p => ({ ...p, refund: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Age Limit
                        </label>
                        <input
                            value={policies.ageLimit}
                            placeholder="18+ only / All ages allowed"
                            onChange={e => setPolicies(p => ({ ...p, ageLimit: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Entry Rules
                        </label>
                        <input
                            value={policies.entry}
                            placeholder="No re-entry, no outside food"
                            onChange={e => setPolicies(p => ({ ...p, entry: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                        Event Type
                    </label>

                    <div className="flex bg-gray-100 rounded-lg p-1 w-48">
                        {["public", "private"].map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setEventType(type)}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${eventType === type
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                {type === "public" ? "Public" : "Private"}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        Allow waitlist when sold out
                    </span>

                    <button
                        type="button"
                        onClick={() => setAllowWaitList(prev => !prev)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${allowWaitList ? "bg-purple-600" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`bg-white w-4 h-4 rounded-full transform transition ${allowWaitList ? "translate-x-6" : "translate-x-0"
                                }`}
                        />
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Optional Gallery Image(s)
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 mb-2">
                        Upload optional images (multiple allowed)
                    </p>

                    <input
                        ref={galleryInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleGalleryImages(e.target.files)}
                    />

                    <button
                        type="button"
                        onClick={() => galleryInputRef.current.click()}
                        className="rounded-lg border-2 border-purple-600 text-purple-600 px-4 py-2 text-sm hover:bg-purple-600 hover:text-white"
                    >
                        Choose Images
                    </button>
                </div>

                {galleryItems.length > 0 && (
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => {
                            const { active, over } = event;
                            if (!over || active.id === over.id) return;

                            setGalleryItems(items => {
                                const oldIndex = items.findIndex(i => i.id === active.id);
                                const newIndex = items.findIndex(i => i.id === over.id);
                                return arrayMove(items, oldIndex, newIndex);
                            });
                        }}
                    >
                        <SortableContext
                            items={galleryItems.map(i => i.id)}
                            strategy={rectSortingStrategy}
                        >
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {galleryItems.map(item => (
                                    <SortableGalleryItem
                                        key={item.id}
                                        item={item}
                                        onRemove={removeGalleryImageById}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default DetailsTab;