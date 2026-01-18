import { useState, useRef } from "react";
import { InfoIcon, FileIcon, BookingsIcon, SuccessIcon, AddIcon, DeleteIcon, ImageIcon, ArrowLeftIcon, ArrowRightIcon, } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CardPreview = ({ image, title, date, location, onRemove, removable = false }) => (
    <div className="relative max-w-sm">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <img src={image} className="w-full h-48 object-cover" />
            <div className="p-4">
                <div className="text-sm text-gray-500">{date || "Event Date"}</div>
                <h3 className="font-semibold">{title || "Event Title"}</h3>
                <div className="text-sm text-gray-600">
                    {location || "Location"}
                </div>
            </div>
        </div>

        {removable && (
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-2 right-2 bg-white/90 text-red-600 text-xs px-2 py-1 rounded hover:bg-red-600 hover:text-white"
            >
                Remove
            </button>
        )}
    </div>
);

const CoverPreview = ({ image, title, date, location, onRemove, removable = false }) => (
    <div className="relative h-56 rounded-lg overflow-hidden">
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">{title || "Event Title"}</h3>
            <p className="text-sm">
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
);

const UploadBox = ({ label, onClick }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <ImageIcon className="mx-auto text-gray-400 mb-2" />
        <p className="text-gray-600 mb-2">{label}</p>

        <button
            type="button"
            onClick={onClick}
            className="rounded-lg border-2 border-purple-600 text-purple-600 px-4 py-2 text-sm hover:bg-purple-600 hover:text-white"
        >
            Choose Image
        </button>
    </div>
);

export default function CreateEvent() {
    const [currentTab, setCurrentTab] = useState(0);
    const [tickets, setTickets] = useState([
        { name: "General Admission", price: "", quantity: "" },
    ]);

    // -------- BASIC INFO STATE --------
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");

    // -------- IMAGES --------
    const [cardImage, setCardImage] = useState(null);
    const [cardPreview, setCardPreview] = useState(cardImage);

    const [coverImage, setCoverImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(coverImage);

    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState(galleryImages);

    // -------- DETAILS STATE --------
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);
    const [capacity, setCapacity] = useState("");
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [allowWaitList, setAllowWaitList] = useState(false);

    const cardInputRef = useRef(null);
    const coverInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const ALL_CATEGORIES = {
        "Music & Concerts": ["DJ", "Live", "EDM", "Rock"],
        Technology: ["AI", "Web", "Cloud"],
        Sports: ["Football", "Cricket"],
    };

    const availableTags = categories.length
        ? [...new Set(categories.flatMap(cat => ALL_CATEGORIES[cat] || []))]
        : ["Popular", "Trending", "Featured"];

    const nextTab = () => {
        if (currentTab < 3) setCurrentTab(currentTab + 1);
    };

    const prevTab = () => {
        if (currentTab > 0) setCurrentTab(currentTab - 1);
    };

    const addTicket = () => {
        setTickets([...tickets, { name: "", price: "", quantity: "" }]);
    };

    const handleSingleImage = (file, setFile, setPreview) => {
        if (!file) return;
        setFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleGalleryImages = (files) => {
        if (!files || files.length === 0) return;
        const imgs = Array.from(files);
        setGalleryImages(imgs);
        setGalleryPreviews(imgs.map(f => URL.createObjectURL(f)));
    };

    const removeCardImage = () => {
        setCardImage(null);
        setCardPreview(null);
        if (cardInputRef.current) cardInputRef.current.value = "";
    };

    const removeCoverImage = () => {
        setCoverImage(null);
        setCoverPreview(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    };

    const removeGalleryImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const safeNumber = (v, min = 0) => Math.max(Number(v) || 0, min);

    const handleSubmit = async () => {
        const cardUrl = await uploadImage(cardImage);
        const coverUrl = await uploadImage(coverImage);

        const galleryUrls = await Promise.all(
            galleryImages.map(file => uploadImage(file))
        );

        const payload = {
            durationHours: safeNumber(duration) || 0,
            venue: {
                name: locationName,
                address: address,
            },
            images: {
                card: { url: cardUrl },
                cover: { url: coverUrl },
                gallery: galleryUrls.map(url => ({ url })),
            },
            capacity: safeNumber(capacity, 1),
            tickets: tickets.map(t => ({
                ...t,
                price: safeNumber(t.price, 0),
                quantity: safeNumber(t.quantity, 1),
            })),
        };

        console.log(payload);
    };

    const uploadImage = async (file) => {
        // later: Cloudinary / S3
        return URL.createObjectURL(file); // TEMP ONLY
    };

    return (
        <>
            <Navbar />

            <main className="pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
                        <p className="text-gray-600 mt-2">Fill in the details to create your event</p>
                    </div>

                    {/* Tab Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center">
                            {[
                                { label: "Basic Info", icon: <InfoIcon /> },
                                { label: "Details", icon: <FileIcon /> },
                                { label: "Tickets", icon: <BookingsIcon /> },
                                { label: "Review", icon: <SuccessIcon /> },
                            ].map((tab, idx) => (
                                <div key={tab.label} className="flex items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentTab >= idx
                                            ? "bg-purple-600 border-purple-600 text-white"
                                            : "border-gray-300 text-gray-400"
                                            }`}
                                    >
                                        {tab.icon}
                                    </div>
                                    <span
                                        className={`ml-2 text-sm font-medium ${currentTab >= idx ? "text-purple-600" : "text-gray-400"
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                    {idx < 3 && (
                                        <div
                                            className={`w-16 h-0.5 mx-4 ${currentTab > idx ? "bg-purple-600" : "bg-gray-300"
                                                }`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                        {/* ---------------- BASIC INFO ---------------- */}
                        {currentTab === 0 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter event title"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                    {Object.keys(ALL_CATEGORIES).map(cat => (
                                        <label key={cat} className="flex  items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={categories.includes(cat)}
                                                onChange={(e) => {
                                                    setCategories(prev =>
                                                        e.target.checked
                                                            ? [...prev, cat]
                                                            : prev.filter(c => c !== cat)
                                                    );
                                                }}
                                            />
                                            {cat}
                                        </label>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Tags</label>
                                    {availableTags.map(tag => (
                                        <label key={tag} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={tags.includes(tag)}
                                                onChange={(e) => {
                                                    setTags(prev =>
                                                        e.target.checked
                                                            ? [...prev, tag]
                                                            : prev.filter(t => t !== tag)
                                                    );
                                                }}
                                            />
                                            {tag}
                                        </label>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
                                    <textarea
                                        rows="6"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your event..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                {/* CARD IMAGE (REQUIRED) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Image (Required)
                                    </label>

                                    {cardPreview ? (
                                        <CardPreview
                                            image={cardPreview}
                                            title={title}
                                            date={date}
                                            location={locationName}
                                            onRemove={removeCardImage}
                                            removable={true}
                                        />
                                    ) : (
                                        <>
                                            <input ref={cardInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImage(e.target.files[0], setCardImage, setCardPreview)} />
                                            <UploadBox
                                                label="Upload card image"
                                                onClick={() => cardInputRef.current.click()}
                                            />
                                        </>
                                    )}
                                </div>

                                {/* COVER IMAGE (REQUIRED) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cover Image (Required – Hero Banner)
                                    </label>

                                    {coverPreview ? (
                                        <CoverPreview
                                            image={coverPreview}
                                            title={title}
                                            date={date}
                                            location={locationName}
                                            onRemove={removeCoverImage}
                                            removable={true}
                                        />
                                    ) : (
                                        <>
                                            <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImage(e.target.files[0], setCoverImage, setCoverPreview)} />
                                            <UploadBox
                                                label="Upload cover image"
                                                onClick={() => coverInputRef.current.click()}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ---------------- DETAILS ---------------- */}
                        {currentTab === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold mb-6">Event Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                                        <input
                                            placeholder="2"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Name *</label>
                                    <input
                                        placeholder="Convention Center"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        type="text"
                                        value={locationName}
                                        onChange={(e) => setLocationName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                    <input
                                        placeholder="123 Main Street, City, State"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="isPublic"
                                            type="checkbox"
                                            value={isPublic}
                                            onChange={(e) => setIsPublic(e.target.checked)}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                            defaultChecked
                                        />
                                        <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                                            Make this event public
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="allowWaitList"
                                            type="checkbox"
                                            value={allowWaitList}
                                            onChange={(e) => setAllowWaitList(e.target.checked)}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="allowWaitList" className="ml-2 text-sm text-gray-700">
                                            Allow wait list when sold out
                                        </label>
                                    </div>
                                </div>

                                {/* GALLERY IMAGES (OPTIONAL) */}
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

                                    {/* Ordinary Preview */}
                                    {galleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            {galleryPreviews.map((img, i) => (
                                                <div key={i} className="relative">
                                                    <img
                                                        src={img}
                                                        className="h-32 w-full object-cover rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(i)}
                                                        className="absolute top-1 right-1 bg-white/90 text-red-600 text-xs px-2 py-0.5 rounded"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tickets tab */}
                        {currentTab === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Ticket Types</h2>
                                    <button
                                        type="button"
                                        onClick={addTicket}
                                        className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-base flex items-center gap-1"
                                    >
                                        <AddIcon className="mr-2" />Add Ticket Type
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {tickets.map((ticket, idx) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg relative">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-medium">Ticket Type {idx + 1}</h3>
                                                {tickets.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updated = tickets.filter((_, i) => i !== idx);
                                                            setTickets(updated);
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Name</label>
                                                    <input
                                                        placeholder="General Admission"
                                                        type="text"
                                                        value={ticket.name}
                                                        onChange={(e) => {
                                                            const updated = [...tickets];
                                                            updated[idx].name = e.target.value;
                                                            setTickets(updated);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                                    <input
                                                        placeholder="50"
                                                        type="number"
                                                        value={ticket.price}
                                                        min={1}
                                                        onChange={(e) => {
                                                            const updated = [...tickets];
                                                            updated[idx].price = e.target.value;
                                                            setTickets(updated);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                                    <input
                                                        placeholder="100"
                                                        type="number"
                                                        value={ticket.quantity}
                                                        min={1}
                                                        onChange={(e) => {
                                                            const updated = [...tickets];
                                                            updated[idx].quantity = e.target.value;
                                                            setTickets(updated);
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Review tab */}
                        {currentTab === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Review Event</h2>

                                {/* Event Basic Info */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Basic Information</h3>
                                    <p><span className="font-semibold">Title:</span> {title}</p>
                                    <p><span className="font-semibold">Category:</span> {categories.join(", ")}</p>
                                    <p>
                                        <span className="font-semibold">Tags:</span>{" "}
                                        {tags.join(", ")}
                                    </p>
                                    <p><span className="font-semibold">Description:</span> {description}</p>
                                    {(cardPreview || coverPreview) && (
                                        <div className="mt-2 p-4 border border-gray-200 rounded-lg">
                                            {/* Card */}
                                            {cardPreview && (
                                                <>
                                                    <p className="font-semibold mb-2">Card Image</p>
                                                    <CardPreview
                                                        image={cardPreview}
                                                        title={title}
                                                        date={date}
                                                        location={locationName}
                                                        onRemove={removeCardImage}
                                                        removable={false}
                                                    />
                                                </>
                                            )}

                                            {/* Cover */}
                                            {coverPreview && (
                                                <>
                                                    <p className={`font-semibold mb-2 ${cardPreview ? "mt-6" : "mt-0"}`}>Cover Image</p>
                                                    <CoverPreview
                                                        image={coverPreview}
                                                        title={title}
                                                        date={date}
                                                        location={locationName}
                                                        onRemove={removeCoverImage}
                                                        removable={false}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Event Details */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Event Details</h3>
                                    <p><span className="font-semibold">Date:</span> {date}</p>
                                    <p><span className="font-semibold">Start Time:</span> {startTime}</p>
                                    <p><span className="font-semibold">Duration:</span> {duration}</p>
                                    <p><span className="font-semibold">Capacity:</span> {capacity}</p>
                                    <p><span className="font-semibold">Location:</span> {locationName}, {address}</p>
                                    <p><span className="font-semibold">Public Event:</span> {isPublic ? "Yes" : "No"}</p>
                                    <p><span className="font-semibold">Allow Wait List:</span> {allowWaitList ? "Yes" : "No"}</p>
                                    {/* Gallery */}
                                    {galleryPreviews.length > 0 && (
                                        <div className="mt-2 p-4 border border-gray-200 rounded-lg">
                                            <p className="font-semibold mb-2">Gallery Images</p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {galleryPreviews.map((img, i) => (
                                                    <div key={i} className="relative">
                                                        <img
                                                            src={img}
                                                            className="h-24 w-full object-cover rounded border"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Tickets */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Tickets</h3>
                                    {tickets.map((ticket, idx) => (
                                        <div key={idx} className="border-b border-gray-200 py-2">
                                            <p><span className="font-semibold">Name:</span> {ticket.name}</p>
                                            <p><span className="font-semibold">Price:</span> ${ticket.price}</p>
                                            <p><span className="font-semibold">Quantity:</span> {ticket.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevTab}
                                disabled={currentTab === 0}
                                className={`font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 px-6 py-3 text-base ${currentTab === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600 hover:text-white"
                                    }`}
                            >
                                <ArrowLeftIcon className="mr-2" />Previous
                            </button>
                            <button
                                type="button"
                                onClick={currentTab < 3 ? nextTab : handleSubmit}
                                className={`font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer px-6 py-3 text-base bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl`}
                            >
                                {currentTab < 3 ? "Next" : "Finish"}
                                <ArrowRightIcon className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}