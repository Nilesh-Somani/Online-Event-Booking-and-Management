// src/ui/Textarea.jsx
export default function Textarea({
    label,
    description,
    value,
    onChange,
    placeholder = "",
    rows = 4,
    disabled = false,
}) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-900">
                    {label}
                </label>
            )}

            {description && (
                <p className="text-sm text-gray-500">{description}</p>
            )}

            <textarea
                rows={rows}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`
          mt-1 block w-full resize-none rounded-md border border-gray-300
          bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
          ${disabled ? "cursor-not-allowed bg-gray-100 opacity-60" : ""}
        `}
            />
        </div>
    );
}