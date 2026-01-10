import SaveButton from "../../ui/SaveButton";

/**
 * OrganizationSection (Organizer Only)
 *
 * Editable:
 * - personalInfo.dateOfBirth
 * - businessInfo.businessName
 * - businessInfo.businessType
 * - businessInfo.address
 * - businessInfo.phone
 * - businessInfo.email
 * - businessInfo.website
 *
 * Read-only:
 * - status
 * - isCompleted
 */
export default function OrganizationSection({
    organizerProfile = {},
    onChange,
    onSave,
    saving = false,
}) {
    const personalInfo = organizerProfile.personalInfo || {};
    const businessInfo = organizerProfile.businessInfo || {};
    
    const updateOrganizerProfile = (section, field, value) => {
        onChange?.({
            ...organizerProfile,
            [section]: {
                ...organizerProfile?.[section],
                [field]: value,
            },
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Organization Details
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Manage your organizer and business information.
                </p>
            </div>

            <div className="space-y-10">
                {/* Status */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Application Status
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <input
                                type="text"
                                value={organizerProfile.status || "pending"}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           bg-gray-100 text-gray-700 cursor-not-allowed capitalize"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Completion
                            </label>
                            <input
                                type="text"
                                value={
                                    organizerProfile.isCompleted
                                        ? "Completed"
                                        : "Incomplete"
                                }
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           bg-gray-100 text-gray-700 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Personal Information
                    </h3>

                    <div className="max-w-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            value={
                                personalInfo.dateOfBirth
                                    ? personalInfo.dateOfBirth.split("T")[0]
                                    : ""
                            }
                            onChange={(e) =>
                                updateOrganizerProfile(
                                    "personalInfo",
                                    "dateOfBirth",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Business Info */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Business Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Name
                            </label>
                            <input
                                type="text"
                                value={businessInfo.businessName || ""}
                                onChange={(e) =>
                                    updateOrganizerProfile(
                                        "businessInfo",
                                        "businessName",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Type
                            </label>
                            <input
                                type="text"
                                value={businessInfo.businessType || ""}
                                onChange={(e) =>
                                    updateOrganizerProfile(
                                        "businessInfo",
                                        "businessType",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Address
                        </label>
                        <input
                            type="text"
                            value={businessInfo.address || ""}
                            onChange={(e) =>
                                updateOrganizerProfile(
                                    "businessInfo",
                                    "address",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Phone
                            </label>
                            <input
                                type="tel"
                                value={businessInfo.phone || ""}
                                onChange={(e) =>
                                    updateOrganizerProfile(
                                        "businessInfo",
                                        "phone",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Email
                            </label>
                            <input
                                type="email"
                                value={businessInfo.email || ""}
                                onChange={(e) =>
                                    updateOrganizerProfile(
                                        "businessInfo",
                                        "email",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                value={businessInfo.website || ""}
                                onChange={(e) =>
                                    updateOrganizerProfile(
                                        "businessInfo",
                                        "website",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Save */}
                <div className="flex justify-end pt-4 border-t">
                    <SaveButton onClick={onSave} loading={saving}>
                        Save Organization Details
                    </SaveButton>
                </div>
            </div>
        </div>
    );
}