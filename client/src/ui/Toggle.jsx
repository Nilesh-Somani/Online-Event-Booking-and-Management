// src/ui/Toggle.jsx
export default function Toggle({
    label,
    description,
    checked = false,
    onChange,
    disabled = false,
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="pr-4">
                {label && (
                    <h3 className="text-sm font-medium text-gray-900">{label}</h3>
                )}
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange?.(!checked)}
                className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          ${checked ? "bg-purple-600" : "bg-gray-200"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
            >
                <span
                    className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
                />
            </button>
        </div>
    );
}