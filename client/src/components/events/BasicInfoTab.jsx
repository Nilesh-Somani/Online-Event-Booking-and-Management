import CardPreview from "./CardPreview";
import CoverPreview from "./CoverPreview";
import UploadBox from "./UploadBox";

const BasicInfoTab = ({
    errors, clearError, registerField,
    title, setTitle,
    selectedCategoryIds, setSelectedCategoryIds,
    tags, setTags,
    description, setDescription,
    highlights, setHighlights,
    highlightInput, setHighlightInput,
    setCardImage, cardPreview, setCardPreview,
    setCoverImage, coverPreview, setCoverPreview,
    cardUploading, setCardUploading,
    coverUploading, setCoverUploading,
    allCategories, availableTags,
    handleSingleImage,
    removeCardImage, removeCoverImage,
    cardInputRef, coverInputRef,
    date, locationName
}) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                <input
                    ref={registerField("title")}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        if (e.target.value.trim()) clearError("title");
                    }}
                    placeholder="Enter event title"
                    className={`w-full px-4 py-3 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    type="text"
                />
            </div>

            <div
                ref={registerField("categories")}
                className={`rounded-lg p-3 border ${errors.categories ? "border-red-500" : "border-transparent"
                    }`}
            >
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category *
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allCategories.map(cat => {
                        const checked = selectedCategoryIds.includes(cat._id);

                        return (
                            <button
                                key={cat._id}
                                type="button"
                                onClick={() => {
                                    setSelectedCategoryIds(prev => {
                                        const next = checked
                                            ? prev.filter(id => id !== cat._id)
                                            : [...prev, cat._id];

                                        if (next.length > 0) clearError("categories");
                                        return next;
                                    });
                                }}
                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition
            ${checked
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-purple-400"}
          `}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
                {errors.category && (
                    <p className="mt-2 text-sm text-red-500">
                        Please select at least one category
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (Optional)
                </label>

                {availableTags.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        Select categories to see available tags
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map(tag => {
                            const active = tags.includes(tag);

                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() =>
                                        setTags(prev =>
                                            active ? prev.filter(t => t !== tag) : [...prev, tag]
                                        )
                                    }
                                    className={`px-3 py-1 rounded-full text-sm border transition ${active ? "bg-purple-100 text-purple-700 border-purple-300" : "border-gray-300 text-gray-600 hover:border-purple-400"} `}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
                <textarea
                    ref={registerField("description")}
                    rows="6"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                        if (e.target.value.trim()) clearError("description");
                    }}
                    placeholder="Describe your event..."
                    className={`w-full px-4 py-3 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Highlights
                </label>

                <textarea
                    placeholder="Write one highlight and press Add (full sentences allowed)"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                />

                <button
                    type="button"
                    onClick={() => {
                        if (!highlightInput.trim()) return;
                        setHighlights(prev => [...prev, highlightInput.trim()]);
                        setHighlightInput("");
                    }}
                    className="mt-2 text-sm font-medium text-purple-600"
                >
                    + Add Highlight
                </button>

                {highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                        {highlights.map((h, i) => (
                            <li
                                key={i}
                                className="flex items-start justify-between bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 text-sm text-purple-800"
                            >
                                <span className="pr-4">{h}</span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setHighlights(prev => prev.filter((_, idx) => idx !== i))
                                    }
                                    className="text-purple-500 hover:text-purple-700 font-medium"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div ref={registerField("cardImage")}>
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
                        reviewTab={false}
                    />
                ) : (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={cardInputRef}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                handleSingleImage(file, setCardImage, setCardPreview, setCardUploading, "cardImage");
                            }}
                        />
                        {cardUploading ? (
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-600 mb-2">Uploading...</p>
                                <div className="loader border-t-4 border-purple-600 w-8 h-8 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <UploadBox
                                hasError={errors.cardImage}
                                label="Upload card image"
                                onClick={() => cardInputRef.current.click()}
                            />
                        )}
                    </>
                )}
            </div>

            <div ref={registerField("coverImage")}>
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
                        reviewTab={false}
                    />
                ) : (
                    <>
                        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            handleSingleImage(file, setCoverImage, setCoverPreview, setCoverUploading, "coverImage");
                        }} />
                        {coverUploading ? (
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-600 mb-2">Uploading...</p>
                                <div className="loader border-t-4 border-purple-600 w-8 h-8 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <UploadBox
                                hasError={errors.coverImage}
                                label="Upload cover image"
                                onClick={() => coverInputRef.current.click()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BasicInfoTab;