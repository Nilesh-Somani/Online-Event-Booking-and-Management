// src/ui/Checkbox.jsx
export default function Checkbox({
    label,
    description,
    checked = false,
    onChange,
    disabled = false,
}) {
    return (
        <div className="flex items-start gap-3">
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
                className={`
          mt-1 h-4 w-4 rounded border-gray-300 text-purple-600
          focus:ring-purple-500
          ${disabled ? "cursor-not-allowed opacity-60" : ""}
        `}
            />

            <div className="space-y-0.5">
                {label && (
                    <label className="text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}

                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>
        </div>
    );
}