import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Layout
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sections (barrel import)
import {
    Sidebar,
    ProfileSection,
    OrganizationSection,
    AccountSection,
    NotificationSection,
    BillingSection,
    SecuritySection,
} from "../sections/UserSettings";

// Utils
import { buildUserForm } from "../utils/buildUserForm";

// Redux
import {
    getMe,
    updateProfile,
    updateOrganizerProfile,
    updateSettings,
} from "../store/user/userSlice";

const SECTION_TITLES = {
    profile: "Profile",
    organization: "Organization",
    account: "Account",
    notifications: "Notifications",
    billing: "Billing",
    security: "Security",
};

export default function UserSettings() {
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.auth?.user);
    const loading = useSelector((state) => state.user?.loading);

    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({});

    /* ---------------- Fetch user once ---------------- */
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    /* ---------------- Build form data ---------------- */
    const builtForm = useMemo(
        () => buildUserForm(authUser),
        [authUser]
    );

    useEffect(() => {
        setFormData(builtForm);
    }, [builtForm]);

    if (!authUser) {
        return <div className="pt-20 text-center">Loading settings...</div>;
    }

    /* ---------------- Save handler ---------------- */
    const handleSave = async (section) => {
        try {
            switch (section) {
                case "profile":
                    await dispatch(updateProfile(formData.profile)).unwrap();
                    break;

                case "organization":
                    await dispatch(
                        updateOrganizerProfile(formData.organization)
                    ).unwrap();
                    break;

                case "account":
                case "notifications":
                    await dispatch(
                        updateSettings({
                            [section]: formData[section],
                        })
                    ).unwrap();
                    break;

                default:
                    return;
            }

            alert(`${SECTION_TITLES[section]} updated successfully`);
        } catch (err) {
            console.error(err);
            alert("Failed to save changes");
        }
    };

    return (
        <>
            <Navbar />

            <main className="pt-20 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Settings
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your account preferences and settings
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <Sidebar
                            user={authUser}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Content */}
                        <div className="flex-1">
                            {/* ---------------- Profile ---------------- */}
                            {activeTab === "profile" && (
                                <ProfileSection
                                    user={formData.profile}
                                    onChange={(data) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            profile: data,
                                        }))
                                    }
                                    onSave={() => handleSave("profile")}
                                    saving={loading}
                                />
                            )}

                            {/* ---------------- Organization ---------------- */}
                            {activeTab === "organization" &&
                                authUser.role === "organizer" && (
                                    <OrganizationSection
                                        organizerProfile={
                                            formData.organization
                                        }
                                        onChange={(data) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                organization: data,
                                            }))
                                        }
                                        onSave={() =>
                                            handleSave("organization")
                                        }
                                        saving={loading}
                                    />
                                )}

                            {/* ---------------- Account ---------------- */}
                            {activeTab === "account" && (
                                <AccountSection
                                    userId={formData.account?.userId}
                                    email={formData.account?.email}
                                    role={formData.account?.role}
                                    preferences={
                                        formData.account?.preferences
                                    }
                                    onUserIdChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            account: {
                                                ...prev.account,
                                                userId: value,
                                            },
                                        }))
                                    }
                                    onPreferencesChange={(prefs) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            account: {
                                                ...prev.account,
                                                preferences: prefs,
                                            },
                                        }))
                                    }
                                    onCheckUserIdAvailability={(id) =>
                                        console.log(
                                            "Check availability:",
                                            id
                                        )
                                    }
                                    userIdStatus="idle"
                                    onSave={() => handleSave("account")}
                                    saving={loading}
                                />
                            )}

                            {/* ---------------- Notifications ---------------- */}
                            {activeTab === "notifications" && (
                                <NotificationSection
                                    notifications={
                                        formData.notifications
                                    }
                                    onChange={(data) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            notifications: data,
                                        }))
                                    }
                                    onSave={() =>
                                        handleSave("notifications")
                                    }
                                    saving={loading}
                                />
                            )}

                            {/* ---------------- Billing ---------------- */}
                            {activeTab === "billing" && (
                                <BillingSection user={authUser} />
                            )}

                            {/* ---------------- Security ---------------- */}
                            {activeTab === "security" && (
                                <SecuritySection user={authUser} />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}