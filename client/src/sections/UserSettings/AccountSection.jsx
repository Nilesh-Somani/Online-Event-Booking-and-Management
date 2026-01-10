import Select from "../../ui/Select";
import SaveButton from "../../ui/SaveButton";

/**
 * AccountSection
 *
 * Editable:
 * - userId
 * - preferences.language
 * - preferences.currency
 * - preferences.timezone
 *
 * Read-only:
 * - email
 * - role
 */
export default function AccountSection({
    userId = "",
    email = "",
    role = "",
    preferences = {},
    onUserIdChange,
    onPreferencesChange,
    onCheckUserIdAvailability,
    userIdStatus = "idle",
    onSave,
    saving = false,
}) {
    const safePreferences = {
        language: preferences.language || "en",
        currency: preferences.currency || "INR",
        timezone: preferences.timezone || "Asia/Kolkata",
    };

    const updatePreference = (field, value) => {
        onPreferencesChange?.({
            ...safePreferences,
            [field]: value,
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Account Settings
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Manage your account identity and preferences.
                </p>
            </div>

            <div className="space-y-10">
                {/* Identity */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Identity
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* User ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User ID
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) =>
                                        onUserIdChange?.(e.target.value)
                                    }
                                    onBlur={() =>
                                        onCheckUserIdAvailability?.(userId)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                               focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />

                                {userIdStatus !== "idle" && (
                                    <span
                                        className={`absolute right-3 top-2.5 text-xs font-medium ${userIdStatus === "available"
                                                ? "text-green-600"
                                                : userIdStatus === "taken"
                                                    ? "text-red-600"
                                                    : "text-gray-500"
                                            }`}
                                    >
                                        {userIdStatus === "checking" &&
                                            "Checking..."}
                                        {userIdStatus === "available" &&
                                            "Available"}
                                        {userIdStatus === "taken" && "Taken"}
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                                This will be your public identifier.
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           bg-gray-100 text-gray-700 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="max-w-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <input
                            type="text"
                            value={role}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                       bg-gray-100 text-gray-700 cursor-not-allowed capitalize"
                        />
                    </div>
                </div>

                {/* Preferences */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Preferences
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Select
                            label="Language"
                            value={safePreferences.language}
                            onChange={(v) =>
                                updatePreference("language", v)
                            }
                            options={[
                                { label: "English", value: "en" },
                                { label: "Hindi", value: "hi" },
                            ]}
                        />

                        <Select
                            label="Currency"
                            value={safePreferences.currency}
                            onChange={(v) =>
                                updatePreference("currency", v)
                            }
                            options={[
                                { label: "USD", value: "USD" },
                                { label: "INR", value: "INR" },
                            ]}
                        />

                        <Select
                            label="Timezone"
                            value={safePreferences.timezone}
                            onChange={(v) =>
                                updatePreference("timezone", v)
                            }
                            options={[
                                {
                                    label: "Asia/Kolkata",
                                    value: "Asia/Kolkata",
                                },
                                { label: "UTC", value: "UTC" },
                            ]}
                        />
                    </div>
                </div>

                {/* Save */}
                <div className="flex justify-end pt-4">
                    <SaveButton onClick={onSave} loading={saving}>
                        Save Account Settings
                    </SaveButton>
                </div>
            </div>
        </div>
    );
}