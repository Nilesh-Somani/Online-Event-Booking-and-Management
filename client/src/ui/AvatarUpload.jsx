// src/ui/AvatarUpload.jsx
import { useRef } from "react";

export default function AvatarUpload({
    value,
    onChange,
    label = "Profile photo",
    helperText = "PNG, JPG up to 2MB",
    disabled = false,
}) {
    const inputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        onChange?.(file);
    };

    const previewUrl =
        typeof value === "string"
            ? value
            : value instanceof File
                ? URL.createObjectURL(value)
                : null;

    return (
        <div className="flex items-center gap-6">
            {/* Avatar Preview */}
            <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                        No photo
                    </div>
                )}
            </div>

            {/* Upload Controls */}
            <div className="space-y-2">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">{label}</h3>
                    <p className="text-sm text-gray-500">{helperText}</p>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => inputRef.current?.click()}
                        className={`
              rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700
              hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
            `}
                    >
                        Change
                    </button>

                    {value && (
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => onChange?.(null)}
                            className={`
                text-sm font-medium text-red-600 hover:text-red-700
                ${disabled ? "cursor-not-allowed opacity-50" : ""}
              `}
                        >
                            Remove
                        </button>
                    )}
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    disabled={disabled}
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        </div>
    );
}