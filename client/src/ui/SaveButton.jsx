// src/ui/SaveButton.jsx
export default function SaveButton({
    children = "Save Changes",
    onClick,
    loading = false,
    disabled = false,
    type = "button",
}) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
        inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium
        text-white transition-all
        bg-linear-to-r from-purple-600 to-indigo-600
        hover:from-purple-700 hover:to-indigo-700
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ${isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `}
        >
            {loading && (
                <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                    />
                </svg>
            )}

            {loading ? "Saving..." : children}
        </button>
    );
}