import { useState } from "react";
import SaveButton from "../../ui/SaveButton";

export default function SecuritySection({ user }) {
    const is2FAEnabled = user.security?.twoFactorEnabled;

    const [passwords, setPasswords] = useState({
        current: "",
        next: "",
        confirm: "",
    });

    // Mock sessions (API later)
    const sessions = [
        {
            id: 1,
            device: "MacBook Pro",
            type: "desktop",
            browser: "Chrome",
            location: "New York, NY",
            current: true,
        },
        {
            id: 2,
            device: "iPhone",
            type: "mobile",
            browser: "Safari",
            lastActive: "2 hours ago",
            current: false,
        },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">
                Security Settings
            </h2>

            <div className="space-y-6">
                {/* ================= Change Password ================= */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">
                        Change Password
                    </h3>

                    <div className="space-y-4 mb-6">
                        <Input
                            label="Current Password"
                            type="password"
                            value={passwords.current}
                            onChange={(v) =>
                                setPasswords({ ...passwords, current: v })
                            }
                        />

                        <Input
                            label="New Password"
                            type="password"
                            value={passwords.next}
                            onChange={(v) =>
                                setPasswords({ ...passwords, next: v })
                            }
                        />

                        <Input
                            label="Confirm New Password"
                            type="password"
                            value={passwords.confirm}
                            onChange={(v) =>
                                setPasswords({ ...passwords, confirm: v })
                            }
                        />
                    </div>

                    <SaveButton>
                        Update Password
                    </SaveButton>
                </div>

                {/* ================= Two-Factor Authentication ================= */}
                <div className="border-t border-t-gray-400 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">
                        Two-Factor Authentication
                    </h3>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account
                        </p>

                        {!is2FAEnabled ? (
                            <button
                                type="button"
                                className="border-2 border-purple-600
                                           text-purple-600 px-6 py-3 rounded-lg
                                           font-medium hover:bg-purple-600
                                           hover:text-white transition"
                            >
                                Enable 2FA
                            </button>
                        ) : (
                            <span className="text-sm font-medium text-green-600">
                                2FA Enabled
                            </span>
                        )}
                    </div>
                </div>

                {/* ================= Active Sessions ================= */}
                <div className="border-t border-t-gray-400 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">
                        Active Sessions
                    </h3>

                    <div className="space-y-3">
                        {sessions.map((s) => (
                            <div
                                key={s.id}
                                className="flex items-center justify-between
                                           p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center">
                                    <i
                                        className={`mr-3 text-gray-400 ${s.type === "mobile"
                                                ? "ri-smartphone-line"
                                                : "ri-computer-line"
                                            }`}
                                    />

                                    <div>
                                        <p className="text-sm font-medium">
                                            {s.device}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {s.browser} •{" "}
                                            {s.location || s.lastActive}
                                        </p>
                                    </div>
                                </div>

                                {s.current ? (
                                    <span className="text-xs text-green-600">
                                        Current
                                    </span>
                                ) : (
                                    <button className="text-xs text-red-600 hover:text-red-800">
                                        Revoke
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= Reusable Input ================= */

function Input({ label, type = "text", value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-purple-500
                           focus:border-transparent"
            />
        </div>
    );
}