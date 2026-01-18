// components/ui/RoundedDropdown.jsx
import { useState, useRef, useEffect } from "react";

export default function RoundedDropdown({
    label,
    value,
    options,
    disabled,
    onChange,
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => !ref.current?.contains(e.target) && setOpen(false);
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
                className={`w-full min-h-12 px-4 py-2 rounded-lg border border-gray-300 text-sm flex items-center justify-between text-left ${disabled ? "bg-gray-100 text-gray-400" : "bg-white hover:border-purple-400"} `}
            >
                <span className="wrap-break-word leading-tight">{label}</span>
                <span className="text-gray-400 ml-2">▾</span>
            </button>

            {open && (
                <div className="absolute z-20 mt-2 w-full bg-white rounded-lg border border-gray-300 shadow-lg max-h-60 overflow-auto">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-sm text-left wrap-break-word leading-tight hover:bg-purple-50 ${value === opt.value && "bg-purple-100 text-purple-700"} `}
                        >
                            {opt.label}
                        </button>

                    ))}
                </div>
            )}
        </div>
    );
}