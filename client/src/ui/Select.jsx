// src/ui/Select.jsx
export default function Select({
    label,
    description,
    value,
    onChange,
    options = [],
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

            <select
                value={value}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`
          mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2
          text-sm text-gray-900 shadow-sm
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
          ${disabled ? "cursor-not-allowed bg-gray-100 opacity-60" : ""}
        `}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}