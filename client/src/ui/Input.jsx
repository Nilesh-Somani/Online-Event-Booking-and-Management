// src/ui/Input.jsx
export default function Input({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    disabled = false,
    readOnly = false,
    helperText,
}) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <input
                type={type}
                value={value ?? ""}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                onChange={(e) => !readOnly && onChange?.(e.target.value)}
                className={`
          w-full px-4 py-2 border rounded-lg
          focus:ring-2 focus:ring-purple-500 focus:border-transparent
          ${disabled || readOnly ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
            />

            {helperText && (
                <p className="text-sm text-gray-500 mt-1">{helperText}</p>
            )}
        </div>
    );
}