
/**
 * buildUserForm
 * Creates a structured form object that mirrors the User.js schema.
 * Preserves nested fields for easy mapping in UI.
 *
 * @param {Object} user - User object from API / Redux store
 * @returns {Object} formData - structured form for UI consumption
 */
export function buildUserForm(user) {
    if (!user) return {};

    const {
        email,
        userId,
        role,
        profile,
        organizerProfile,
        settings,
        security,
    } = user;

    return {
        // PROFILE TAB
        profile: {
            firstName: profile?.firstName || "",
            middleName: profile?.middleName || "",
            lastName: profile?.lastName || "",
            phone: profile?.phone || "",
            avatar: profile?.avatar || "",
            bio: profile?.bio || "",
        },

        // ORGANIZATION TAB (organizer only)
        organization:
            role === "organizer"
                ? {
                    personalInfo: {
                        dateOfBirth: organizerProfile?.personalInfo?.dateOfBirth || "",
                    },
                    businessInfo: {
                        businessName: organizerProfile?.businessInfo?.businessName || "",
                        businessType: organizerProfile?.businessInfo?.businessType || "",
                        address: organizerProfile?.businessInfo?.address || "",
                        phone: organizerProfile?.businessInfo?.phone || "",
                        email: organizerProfile?.businessInfo?.email || "",
                        website: organizerProfile?.businessInfo?.website || "",
                    },
                    venueInfo: {
                        name: organizerProfile?.venueInfo?.name || "",
                        type: organizerProfile?.venueInfo?.type || "",
                        address: organizerProfile?.venueInfo?.address || "",
                        capacity: organizerProfile?.venueInfo?.capacity || "",
                        costPerDay: organizerProfile?.venueInfo?.costPerDay || "",
                        description: organizerProfile?.venueInfo?.description || "",
                        photos: organizerProfile?.venueInfo?.photos || [],
                    },
                    eventTypes: organizerProfile?.eventTypes || [],
                    experience: organizerProfile?.experience || "",
                    documents: {
                        license: organizerProfile?.documents?.license || "",
                        insurance: organizerProfile?.documents?.insurance || "",
                        identity: organizerProfile?.documents?.identity || "",
                    },
                    status: organizerProfile?.status || "pending", // read-only
                    isCompleted: organizerProfile?.isCompleted || false, // read-only
                }
                : null,

        // ACCOUNT TAB
        account: {
            userId: userId || "",
            email: email || "", // read-only
            role: role || "user", // read-only
            preferences: {
                language: settings?.preferences?.language || "en",
                currency: settings?.preferences?.currency || "USD",
                timezone: settings?.preferences?.timezone || "",
            },
        },

        // NOTIFICATIONS TAB
        notifications: {
            email: settings?.notifications?.email || false,
            sms: settings?.notifications?.sms || false,
            marketing: settings?.notifications?.marketing || false,
        },

        // BILLING TAB (placeholder)
        billing: {
            address: "",
            paymentMethods: [],
        },

        // SECURITY TAB
        security: {
            enable2FA: security?.twoFactorEnabled || false,
            twoFactorEnabled: security?.twoFactorEnabled || false, // read-only
            accountDeleted: security?.accountDeleted || false, // read-only
            activeSessions: [
                { device: "Chrome on Windows", lastActive: "2026-01-08 09:30" },
                { device: "Safari on iPhone", lastActive: "2026-01-07 22:15" },
            ],
        },
    };
}