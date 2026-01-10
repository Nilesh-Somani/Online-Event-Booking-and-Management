// src/sections/UserSettings/ProfileSection.jsx
import SaveButton from "../../ui/SaveButton";

export default function ProfileSection({
    user = {},
    onChange,
    onSave,
    saving = false,
}) {
    const updateField = (field, value) => {
        onChange?.({
            ...user,
            [field]: value,
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <h2 className="text-xl font-semibold mb-6">
                Profile Information
            </h2>

            {/* Avatar */}
            <div className="flex items-center mb-8">
                <img
                    src={
                        user.avatar ||
                        "https://via.placeholder.com/120?text=Avatar"
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full mr-6 object-cover"
                />

                <div>
                    <button
                        type="button"
                        className="font-medium rounded-lg border-2 border-purple-600
                                   text-purple-600 hover:bg-purple-600 hover:text-white
                                   px-4 py-2 text-sm transition"
                        onClick={() => {
                            // UI-only hook (file upload handled later)
                            alert("Avatar upload coming soon");
                        }}
                    >
                        Change Photo
                    </button>

                    <p className="text-sm text-gray-500 mt-2">
                        JPG, GIF or PNG. 1MB max.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={user.firstName || ""}
                        onChange={(e) =>
                            updateField("firstName", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Middle Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Middle Name
                    </label>
                    <input
                        type="text"
                        value={user.middleName || ""}
                        onChange={(e) =>
                            updateField("middleName", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={user.lastName || ""}
                        onChange={(e) =>
                            updateField("lastName", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

            </div>
            <div className="grid grid-cols-1 gap-6">
                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={user.phone || ""}
                        onChange={(e) =>
                            updateField("phone", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                    </label>
                    <textarea
                        rows={4}
                        value={user.bio || ""}
                        onChange={(e) =>
                            updateField("bio", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Tell us something about yourself..."
                    />
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end mt-6">
                <SaveButton onClick={onSave} loading={saving}>
                    Save Profile Details
                </SaveButton>
            </div>
        </div >
    );
}