import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/category/categorySlice";
import { createEvent } from "../store/events/eventsSlice";
import { fetchEventDraft, saveEventDraft, clearEventDraft, } from "../store/events/eventDraftSlice";
import { uploadImage as uploadImageThunk, deleteImage } from "../store/upload/uploadSlice";
import { createVenue, fetchMyVenues } from "../store/venue/venueSlice";
import { InfoIcon, FileIcon, BookingsIcon, SuccessIcon, AddIcon, DeleteIcon, ImageIcon, ArrowLeftIcon, ArrowRightIcon, } from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BasicInfoTab from "../components/events/BasicInfoTab";
import DetailsTab from "../components/events/DetailsTab";
import TicketsTab from "../components/events/TicketsTab";
import ReviewTab from "../components/events/ReviewTab";



export default function CreateEvent() {
    const dispatch = useDispatch();
    const { categories: allCategories } = useSelector(state => state.categories);
    const { draft, loading } = useSelector(state => state.eventDraft);
    const { venues } = useSelector(state => state.venues);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchEventDraft());
        dispatch(fetchMyVenues());
    }, [dispatch]);

    const [currentTab, setCurrentTab] = useState(0);
    const [tickets, setTickets] = useState([
        { name: "General Admission", price: "", quantity: "" },
    ]);

    // -------- BASIC INFO STATE --------
    const [title, setTitle] = useState("");
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");

    // -------- IMAGES --------
    const [cardImage, setCardImage] = useState(null);
    const [cardPreview, setCardPreview] = useState(cardImage);

    const [coverImage, setCoverImage] = useState(null);
    const [coverPreview, setCoverPreview] = useState(coverImage);

    const [galleryItems, setGalleryItems] = useState([]);

    const [cardUploading, setCardUploading] = useState(false);
    const [coverUploading, setCoverUploading] = useState(false);

    // -------- DETAILS STATE --------
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [duration, setDuration] = useState("");
    const [capacity, setCapacity] = useState("");
    // -------- LOCATION MODE STATE --------
    const [locationMode, setLocationMode] = useState("physical"); // physical | online | hybrid

    // Physical location (existing)
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateRegion, setStateRegion] = useState("");
    const [country, setCountry] = useState("");
    const [coordinates, setCoordinates] = useState(null); // { lat: Number, lng: Number }
    const [parking, setParking] = useState("");
    const [entryNotes, setEntryNotes] = useState("");

    const [saveVenue, setSaveVenue] = useState(false);
    const [selectedVenueId, setSelectedVenueId] = useState(null);

    // Online location (new)
    const [onlinePlatform, setOnlinePlatform] = useState("");
    const [onlineJoinUrl, setOnlineJoinUrl] = useState("");
    const [onlineAccessNotes, setOnlineAccessNotes] = useState("");

    const [policies, setPolicies] = useState({
        refund: "",
        ageLimit: "",
        entry: "",
    });
    const [eventType, setEventType] = useState("public"); // "public" | "private"
    const [allowWaitList, setAllowWaitList] = useState(false);

    const clearError = (key) => {
        setErrors(prev => {
            if (!prev[key]) return prev;
            const copy = { ...prev };
            delete copy[key];
            return copy;
        });
    };

    const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
    const [submitMessage, setSubmitMessage] = useState("");

    const cardInputRef = useRef(null);
    const coverInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const uploadControllersRef = useRef({});
    const hasHydratedRef = useRef(false);
    const lastSavedRef = useRef(null);
    const hasInitializedDraftRef = useRef(false);

    const [errors, setErrors] = useState({});
    const fieldRefs = useRef({});

    const registerField = (name) => (el) => {
        if (!el) return;
        fieldRefs.current[name] = el;
    };

    const availableTags = useMemo(() => {
        return allCategories
            .filter(cat => selectedCategoryIds.includes(cat._id))
            .flatMap(cat => cat.tags || []);
    }, [allCategories, selectedCategoryIds]);

    useEffect(() => {
        setTags(prev => {
            const next = prev.filter(tag => availableTags.includes(tag));

            // ⛔ Prevent useless state updates
            if (next.length === prev.length &&
                next.every((t, i) => t === prev[i])) {
                return prev;
            }

            return next;
        });
    }, [availableTags]);

    useEffect(() => {
        if (loading) return;

        // If backend says no draft AND we haven't created one yet
        if (!draft && !hasInitializedDraftRef.current) {
            hasInitializedDraftRef.current = true;

            const emptyDraft = {
                lastStep: 0,
                title: "",
                description: "",
                categories: [],
                tags: [],
                eventType: "public",
                highlights: [],
                schedule: [],
                tickets: [],
                images: {
                    card: null,
                    cover: null,
                    gallery: [],
                },
            };

            dispatch(saveEventDraft(emptyDraft));
        }
    }, [draft, loading, dispatch]);

    useEffect(() => {
        // ⛔ wait until API finishes
        if (loading) return;

        // ⛔ hydrate only once
        if (hasHydratedRef.current) return;

        // ⛔ if draft is still null, DO NOT hydrate yet
        if (!draft) return;

        // ✅ now it's safe
        hasHydratedRef.current = true;

        setCurrentTab(draft.lastStep ?? 0);

        setTitle(draft.title ?? "");
        setSelectedCategoryIds(draft.categories ?? []);
        setTags(draft.tags ?? []);
        setDescription(draft.description ?? "");
        setHighlights(draft.highlights ?? []);

        setDate(draft.date ? draft.date.slice(0, 10) : "");
        setStartTime(draft.startTime ?? "");
        setDuration(draft.durationHours ?? "");
        setCapacity(draft.capacity ?? "");

        setLocationMode(draft.location.mode || "physical");
        const venue = draft.location.physical?.venueSnapshot;
        setLocationName(venue?.name ?? "");
        setAddress(venue?.address ?? "");
        setCity(venue?.city ?? "");
        setStateRegion(venue?.state ?? "");
        setCountry(venue?.country ?? "");
        setCoordinates(venue?.coordinates ?? null);
        setParking(venue?.parking ?? "");
        setEntryNotes(venue?.entryNotes ?? "");
        setOnlinePlatform(draft.location.online?.platform ?? "");
        setOnlineJoinUrl(draft.location.online?.joinUrl ?? "");
        setOnlineAccessNotes(draft.location.online?.accessNotes ?? "");

        setPolicies(draft.policies ?? { refund: "", ageLimit: "", entry: "" });
        setEventType(draft.eventType ?? "public");
        setAllowWaitList(draft.allowWaitList ?? false);

        setTickets(
            draft.tickets && draft.tickets.length > 0
                ? draft.tickets
                : [{ name: "", price: "", quantity: "" }]
        );
        setSchedule(draft.schedule ?? []);

        if (draft.images?.card) {
            setCardImage(draft.images.card);
            setCardPreview(draft.images.card.url);
        }

        if (draft.images?.cover) {
            setCoverImage(draft.images.cover);
            setCoverPreview(draft.images.cover.url);
        }

        setGalleryItems(draft.images?.gallery ?? []);

        lastSavedRef.current = JSON.stringify(draft);
    }, [draft, loading]);

    useEffect(() => {
        if (!hasHydratedRef.current) return;

        const payload = {
            lastStep: currentTab,
            title,
            description,
            categories: selectedCategoryIds,
            tags,
            eventType,
            date,
            startTime,
            durationHours: duration ? Number(duration) : null,
            location: {
                mode: locationMode,
                physical: locationMode !== "online" ? {
                    venueSnapshot: {
                        name: locationName,
                        address,
                        city,
                        state: stateRegion,
                        country,
                        coordinates,
                        parking: parking || null,
                        entryNotes: entryNotes || null,
                    },
                } : undefined,
                online: locationMode !== "physical" ? {
                    platform: onlinePlatform || null,
                    joinUrl: onlineJoinUrl || null,
                    accessNotes: onlineAccessNotes || null,
                } : undefined,
            },
            images: {
                card: cardImage,
                cover: coverImage,
                gallery: galleryItems.filter(i => !i.uploading),
            },
            highlights,
            schedule,
            capacity: capacity ? Number(capacity) : null,
            allowWaitList,
            tickets,
        };

        const serialized = JSON.stringify(payload);

        if (serialized === lastSavedRef.current) return;

        const timeout = setTimeout(() => {
            dispatch(saveEventDraft(payload));
            lastSavedRef.current = serialized;
        }, 800);

        return () => clearTimeout(timeout);
    }, [dispatch, currentTab, title, description, selectedCategoryIds, tags, highlights, date, startTime, duration, capacity, locationMode, locationName, address, city, stateRegion, country, coordinates, parking, entryNotes, onlinePlatform, onlineJoinUrl, onlineAccessNotes, eventType, allowWaitList, tickets, schedule, cardImage, coverImage, galleryItems]);

    const nextTab = () => {
        const e = validateTab(currentTab);
        setErrors(e);

        if (Object.keys(e).length > 0) {
            const firstKey = Object.keys(e)[0];
            fieldRefs.current[firstKey]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            return;
        }

        setCurrentTab(t => t + 1);
    };

    const prevTab = () => {
        if (currentTab > 0) setCurrentTab(currentTab - 1);
    };

    const addTicket = () => {
        setTickets([...tickets, { name: "", price: "", quantity: "" }]);
    };

    const handleSingleImage = async (file, setImage, setPreview, setLoading, errorKey) => {
        if (!file) return;
        setLoading(true);

        try {
            const result = await dispatch(
                uploadImageThunk({ file, folder: "events" })
            ).unwrap();

            setImage(result);        // { url, publicId }
            setPreview(result.url);  // Cloudinary URL
            clearError(errorKey)
        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGalleryImages = async (files) => {
        if (!files?.length) return;

        const fileArray = Array.from(files);

        fileArray.forEach(async (file) => {
            const tempId = crypto.randomUUID();

            // 1️⃣ Add placeholder immediately
            setGalleryItems(prev => [
                ...prev,
                { id: tempId, url: null, publicId: null, uploading: true }
            ]);

            try {
                const controller = new AbortController();
                uploadControllersRef.current[tempId] = controller;

                const result = await dispatch(
                    uploadImageThunk({
                        file,
                        folder: "events",
                        signal: controller.signal
                    })
                ).unwrap();

                delete uploadControllersRef.current[tempId];

                // 2️⃣ Replace placeholder with real image
                setGalleryItems(prev =>
                    prev.map(item =>
                        item.id === tempId
                            ? {
                                ...item,
                                url: result.url,
                                publicId: result.publicId,
                                uploading: false
                            }
                            : item
                    )
                );
            } catch (err) {
                console.error(err);
                delete uploadControllersRef.current[tempId];

                // 3️⃣ Remove failed placeholder
                setGalleryItems(prev =>
                    prev.filter(item => item.id !== tempId)
                );
            }
        });
    };

    const removeCardImage = async () => {
        if (cardImage?.publicId) {
            await dispatch(deleteImage(cardImage.publicId));
        }
        setCardImage(null);
        setCardPreview(null);
        if (cardInputRef.current) cardInputRef.current.value = "";
    };

    const removeCoverImage = async () => {
        if (coverImage?.publicId) {
            await dispatch(deleteImage(coverImage.publicId));
        }
        setCoverImage(null);
        setCoverPreview(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    };

    const removeGalleryImageById = async (id) => {
        setGalleryItems(prev => {
            const item = prev.find(i => i.id === id);
            if (!item) return prev;

            // 1. Cancel upload if still uploading
            if (item.uploading && uploadControllersRef.current[id]) {
                uploadControllersRef.current[id].abort();
                delete uploadControllersRef.current[id];
            }

            // 2. Delete from cloud (fire-and-forget)
            if (item.publicId) {
                dispatch(deleteImage(item.publicId));
            }

            // 3. Remove from UI
            return prev.filter(i => i.id !== id);
        });
    };

    const isUploading =
        cardUploading ||
        coverUploading ||
        galleryItems.some(i => i.uploading);

    const toMinutes = (time) => {
        if (!time) return null;
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    };

    const eventStartMinutes = toMinutes(startTime);
    const eventEndMinutes =
        eventStartMinutes !== null && duration
            ? eventStartMinutes + Number(duration) * 60
            : null;

    const today = new Date().toISOString().split("T")[0];
    const nowMinutes = (() => {
        const d = new Date();
        return d.getHours() * 60 + d.getMinutes();
    })();
    const minEventDate = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d.toISOString().split("T")[0];
    })();


    const isScheduleTimeValid = (time) => {
        if (!time || !startTime || !date) return true;

        const t = toMinutes(time);

        // ⛔ Event start/end window
        if (eventStartMinutes !== null && t < eventStartMinutes) return false;
        if (eventEndMinutes !== null && t > eventEndMinutes) return false;

        // ⛔ If event is today, schedule must also be future
        if (date === today && t < nowMinutes) return false;

        return true;
    };

    const validateTickets = () => {
        const cap = Number(capacity || 0);

        let totalQty = 0;

        for (const t of tickets) {
            if (Number(t.price) < 0) return "Ticket price cannot be negative";
            if (Number(t.quantity) < 1) return "Ticket quantity must be at least 1";

            totalQty += Number(t.quantity);

            if (cap && Number(t.quantity) > cap)
                return "Ticket quantity cannot exceed event capacity";
        }

        if (cap && totalQty > cap)
            return "Total ticket quantity exceeds event capacity";

        return null;
    };

    const validateTab = (tab) => {
        const e = {};

        // -------- TAB 0: BASIC INFO --------
        if (tab === 0) {
            if (!title.trim()) e.title = true;
            if (selectedCategoryIds.length === 0) e.categories = true;
            if (!description.trim()) e.description = true;
            if (!cardImage) e.cardImage = true;
            if (!coverImage) e.coverImage = true;
        }

        // -------- TAB 1: DETAILS --------
        if (tab === 1) {
            if (!date) e.date = true;
            if (date && date < minEventDate) {
                e.date = "Events must be scheduled at least 2 days in advance";
            }
            if (!startTime) e.startTime = true;
            if (locationMode !== "online" && !locationName.trim()) e.locationName = true;
            if (locationMode !== "online" && !address.trim()) e.address = true;
            if (locationMode !== "physical" && !onlinePlatform.trim()) e.onlinePlatform = true;
            if (locationMode !== "physical" && !onlineJoinUrl.trim()) e.onlineJoinUrl = true;
        }

        // -------- TAB 2: TICKETS --------
        if (tab === 2) {
            if (tickets.length === 0) e.tickets = true;

            tickets.forEach((t, i) => {
                if (!t.name || !t.price || !t.quantity) {
                    e[`ticket-${i}`] = true;
                }
            });

            const ticketError = validateTickets();
            if (ticketError) e.ticketValidation = ticketError;
        }

        return e;
    };

    const handleSubmit = async () => {
        if (isUploading) {
            setSubmitStatus("error");
            setSubmitMessage("Please wait until all images finish uploading.");
            return;
        }

        try {
            const payload = {
                title,
                description,
                categories: selectedCategoryIds,
                tags,
                eventType,

                date,
                startTime,
                durationHours: duration ? Number(duration) : null,

                location: {
                    mode: locationMode,
                    physical: locationMode !== "online" ? {
                        venueId,
                        venueSnapshot: {
                            name: locationName,
                            address,
                            city,
                            state: stateRegion,
                            country,
                            coordinates,
                            parking: parking || null,
                            entryNotes: entryNotes || null,
                        },
                    } : undefined,
                    online: locationMode !== "physical" ? {
                        platform: onlinePlatform || null,
                        joinUrl: onlineJoinUrl || null,
                        accessNotes: onlineAccessNotes || null,
                    } : undefined,
                },

                images: {
                    card: cardImage
                        ? { url: cardImage.url, alt: "" }
                        : null,

                    cover: coverImage
                        ? { url: coverImage.url, alt: "" }
                        : null,

                    gallery: galleryItems
                        .filter(i => !i.uploading)
                        .map(i => ({
                            url: i.url,
                            alt: "",
                        })),
                },

                highlights,
                schedule,
                policies,

                capacity: capacity ? Number(capacity) : null,
                allowWaitList,

                tickets: tickets.map(t => ({
                    name: t.name.trim(),
                    price: Number(t.price),
                    quantity: Number(t.quantity),
                })),
            };

            let venueId = selectedVenueId;

            if (saveVenue && locationMode !== "online" && !venueId) {
                const res = await dispatch(createVenue({
                    name: locationName,
                    address,
                    city,
                    state: stateRegion,
                    country,
                    coordinates,
                    parking,
                    entryNotes,
                })).unwrap();

                venueId = res.venue._id;
                setSelectedVenueId(venueId);
            }

            await dispatch(createEvent(payload)).unwrap();
            await dispatch(clearEventDraft());

            setSubmitStatus("success");
            setSubmitMessage("Your event has been submitted for approval.")
        } catch (err) {
            setSubmitStatus("error");
            setSubmitMessage(
                "Something went wrong while creating the event. Your progress is saved. Please try again in a few minutes."
            );
            console.log(err);
        }
    };

    useEffect(() => {
        if (submitStatus === "success") {
            const t = setTimeout(() => {
                window.location.href = "/events";
            }, 5000);

            return () => clearTimeout(t);
        }
    }, [submitStatus]);

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
                                    {/* ICON + LABEL */}
                                    <div className="flex flex-col items-center sm:flex-row sm:items-center px-2">
                                        <div
                                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentTab >= idx
                                                ? "bg-purple-600 border-purple-600 text-white"
                                                : "border-gray-300 text-gray-400"
                                                }`}
                                        >
                                            {tab.icon}
                                        </div>

                                        <span
                                            className={`mt-1 text-xs text-center sm:mt-0 sm:ml-2 sm:text-sm font-medium whitespace-nowrap ${currentTab >= idx ? "text-purple-600" : "text-gray-400"
                                                }`}
                                        >
                                            {tab.label}
                                        </span>
                                    </div>

                                    {/* CONNECTOR (always horizontal) */}
                                    {idx < 3 && (
                                        <div
                                            className={`h-0.5 w-3 mx-0 min-[350px]:w-4 min-[350px]:mx-1 min-[450px]:w-8 min-[450px]:mx-2 min-[800px]:w-16 min-[800px]:mx-4 ${currentTab > idx ? "bg-purple-600" : "bg-gray-300"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                        {/* ---------------- BASIC INFO ---------------- */}
                        {currentTab === 0 && <BasicInfoTab
                            errors={errors}
                            clearError={clearError}
                            registerField={registerField}
                            title={title}
                            setTitle={setTitle}
                            selectedCategoryIds={selectedCategoryIds}
                            setSelectedCategoryIds={setSelectedCategoryIds}
                            tags={tags}
                            setTags={setTags}
                            description={description}
                            setDescription={setDescription}
                            highlights={highlights}
                            setHighlights={setHighlights}
                            highlightInput={highlightInput}
                            setHighlightInput={setHighlightInput}
                            setCardImage={setCardImage}
                            cardPreview={cardPreview}
                            setCardPreview={setCardPreview}
                            setCoverImage={setCoverImage}
                            coverPreview={coverPreview}
                            setCoverPreview={setCoverPreview}
                            cardUploading={cardUploading}
                            setCardUploading={setCardUploading}
                            coverUploading={coverUploading}
                            setCoverUploading={setCoverUploading}
                            allCategories={allCategories}
                            availableTags={availableTags}
                            handleSingleImage={handleSingleImage}
                            removeCardImage={removeCardImage}
                            removeCoverImage={removeCoverImage}
                            cardInputRef={cardInputRef}
                            coverInputRef={coverInputRef}
                            date={date}
                            locationName={locationName}
                        />}

                        {/* ---------------- DETAILS ---------------- */}
                        {currentTab === 1 && <DetailsTab
                            errors={errors}
                            clearError={clearError}
                            registerField={registerField}
                            date={date}
                            setDate={setDate}
                            startTime={startTime}
                            setStartTime={setStartTime}
                            duration={duration}
                            setDuration={setDuration}
                            capacity={capacity}
                            setCapacity={setCapacity}
                            schedule={schedule}
                            setSchedule={setSchedule}
                            venues={venues}
                            locationMode={locationMode}
                            setLocationMode={setLocationMode}
                            locationName={locationName}
                            setLocationName={setLocationName}
                            address={address}
                            setAddress={setAddress}
                            city={city}
                            setCity={setCity}
                            stateRegion={stateRegion}
                            setStateRegion={setStateRegion}
                            country={country}
                            setCountry={setCountry}
                            parking={parking}
                            setParking={setParking}
                            entryNotes={entryNotes}
                            setEntryNotes={setEntryNotes}
                            saveVenue={saveVenue}
                            setSaveVenue={setSaveVenue}
                            selectedVenueId={selectedVenueId}
                            setSelectedVenueId={setSelectedVenueId}
                            onlinePlatform={onlinePlatform}
                            setOnlinePlatform={setOnlinePlatform}
                            onlineJoinUrl={onlineJoinUrl}
                            setOnlineJoinUrl={setOnlineJoinUrl}
                            onlineAccessNotes={onlineAccessNotes}
                            setOnlineAccessNotes={setOnlineAccessNotes}
                            policies={policies}
                            setPolicies={setPolicies}
                            eventType={eventType}
                            setEventType={setEventType}
                            allowWaitList={allowWaitList}
                            setAllowWaitList={setAllowWaitList}
                            galleryItems={galleryItems}
                            setGalleryItems={setGalleryItems}
                            handleGalleryImages={handleGalleryImages}
                            removeGalleryImageById={removeGalleryImageById}
                            galleryInputRef={galleryInputRef}
                            today={today}
                            nowMinutes={nowMinutes}
                            minEventDate={minEventDate}
                            isScheduleTimeValid={isScheduleTimeValid}
                        />}

                        {/* Tickets tab */}
                        {currentTab === 2 && <TicketsTab
                            errors={errors}
                            clearError={clearError}
                            registerField={registerField}
                            tickets={tickets}
                            setTickets={setTickets}
                            addTicket={addTicket}
                        />}

                        {/* Review tab */}
                        {currentTab === 3 && <ReviewTab
                            title={title}
                            selectedCategoryIds={selectedCategoryIds}
                            tags={tags}
                            description={description}
                            highlights={highlights}
                            date={date}
                            startTime={startTime}
                            duration={duration}
                            capacity={capacity}
                            schedule={schedule}
                            locationMode={locationMode}
                            locationName={locationName}
                            address={address}
                            city={city}
                            stateRegion={stateRegion}
                            country={country}
                            parking={parking}
                            entryNotes={entryNotes}
                            onlinePlatform={onlinePlatform}
                            onlineJoinUrl={onlineJoinUrl}
                            onlineAccessNotes={onlineAccessNotes}
                            policies={policies}
                            eventType={eventType}
                            allowWaitList={allowWaitList}
                            cardPreview={cardPreview}
                            coverPreview={coverPreview}
                            galleryItems={galleryItems}
                            allCategories={allCategories}
                            removeCardImage={removeCardImage}
                            removeCoverImage={removeCoverImage}
                            tickets={tickets}
                        />}

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
                                disabled={isUploading}
                                onClick={currentTab < 3 ? nextTab : handleSubmit}
                                className={`font-medium rounded-lg transition-all duration-200 px-6 py-3 text-base ${isUploading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                                    }`}

                            >
                                {isUploading ? "Uploading..." : currentTab < 3 ? "Next" : "Finish"}
                                <ArrowRightIcon className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {submitStatus && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
                        <h3 className="text-lg font-semibold mb-2">
                            {submitStatus === "success" ? "Event Submitted 🎉" : "Submission Failed"}
                        </h3>

                        <p className="text-gray-600 mb-4">{submitMessage}</p>

                        {submitStatus === "success" && (
                            <button
                                onClick={() => (window.location.href = "/events")}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                            >
                                Go to Events
                            </button>
                        )}

                        {submitStatus === "error" && (
                            <button
                                onClick={() => setSubmitStatus(null)}
                                className="border border-gray-300 px-4 py-2 rounded-lg"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}