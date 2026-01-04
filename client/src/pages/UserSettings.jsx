import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ================= ROLE CONFIG ================= */

const ROLE_SETTINGS = {
    user: {
        tabs: ["profile", "account", "notifications", "security"],
        editable: {
            profile: true,
            account: true,
            notifications: true,
            security: true,
        },
    },

    organizer: {
        tabs: ["profile", "organization", "account", "notifications", "billing", "security"],
        editable: {
            profile: true,
            organization: true,
            account: true,
            notifications: true,
            billing: true,
            security: true,
        },
    },

    admin: {
        tabs: ["profile", "account", "notifications", "security"],
        editable: {
            profile: false,
            account: false,
            notifications: true,
            security: true,
        },
    },
};

/* ================= SIDEBAR BUTTON ================= */

function NavButton({ tab, label, icon, activeTab, setActiveTab }) {
    const active = activeTab === tab;

    return (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
        ${active
                    ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
        >
            <i className={`${icon} text-lg`} />
            {label}
        </button>
    );
}

/* ================= MAIN COMPONENT ================= */

export default function UserSettings() {
    const user = useSelector((state) => state.auth.user);

    const role = user?.role || "user";
    const allowedTabs = ROLE_SETTINGS[role].tabs;
    const editableMap = ROLE_SETTINGS[role].editable;

    const [activeTab, setActiveTab] = useState("profile");
    const isEditable = editableMap[activeTab];

    if (!user) return null;

    return (
        <>
            <Navbar />

            <main className="pt-20 min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* ================= SIDEBAR ================= */}
                        <aside className="lg:w-64">
                            <div className="bg-white border rounded-lg p-3 space-y-1">
                                {allowedTabs.includes("profile") && (
                                    <NavButton tab="profile" label="Profile" icon="ri-user-line"
                                        activeTab={activeTab} setActiveTab={setActiveTab} />
                                )}

                                {allowedTabs.includes("organization") && (
                                    <NavButton tab="organization" label="Organization" icon="ri-building-line"
                                        activeTab={activeTab} setActiveTab={setActiveTab} />
                                )}

                                {allowedTabs.includes("account") && (
                                    <NavButton tab="account" label="Account" icon="ri-settings-line"
                                        activeTab={activeTab} setActiveTab={setActiveTab} />
                                )}

                                {allowedTabs.includes("notifications") && (
                                    <NavButton tab="notifications" label="Notifications" icon="ri-notification-line"
                                        activeTab={activeTab} setActiveTab={setActiveTab} />
                                )}

                                {allowedTabs.includes("billing") && (
                                    <NavButton tab="billing" label="Billing" icon="ri-bank-card-line"
                                        activeTab={activeTab} setActiveTab={setActiveTab} />
                                )}

                                {allowedTabs.includes("security") && (
                                    <NavButton tab="security" label="Security" icon="ri-shield-line"
                                        activeTab={activeTab} setActiveTab={setActiveTab} />
                                )}
                            </div>
                        </aside>

                        {/* ================= CONTENT ================= */}
                        <section className="flex-1 space-y-6">

                            {/* ---------- PROFILE ---------- */}
                            {activeTab === "profile" && (
                                <div className="bg-white border rounded-lg p-6 space-y-4">
                                    <h2 className="text-xl font-semibold">Profile</h2>

                                    <Input label="First Name" value={user.profile?.firstName} disabled={!isEditable} />
                                    <Input label="Last Name" value={user.profile?.lastName} disabled={!isEditable} />
                                    <Input label="Email" value={user.email} disabled />
                                    <Input label="Phone" value={user.profile?.phone} disabled={!isEditable} />

                                    {isEditable && <SaveButton />}
                                </div>
                            )}

                            {/* ---------- ORGANIZATION ---------- */}
                            {activeTab === "organization" && role === "organizer" && (
                                <div className="bg-white border rounded-lg p-6 space-y-4">
                                    <h2 className="text-xl font-semibold">Organization</h2>

                                    <Input
                                        label="Business Name"
                                        value={user.organizerProfile?.businessInfo?.businessName}
                                        disabled={!isEditable}
                                    />

                                    <Input
                                        label="Business Type"
                                        value={user.organizerProfile?.businessInfo?.businessType}
                                        disabled={!isEditable}
                                    />

                                    {isEditable && <SaveButton />}
                                </div>
                            )}

                            {/* ---------- ACCOUNT ---------- */}
                            {activeTab === "account" && (
                                <div className="bg-white border rounded-lg p-6 space-y-4">
                                    <h2 className="text-xl font-semibold">Account</h2>

                                    <Input label="Role" value={role} disabled />
                                    <Input label="Account Status" value={user.accountStatus} disabled />

                                    {isEditable && <SaveButton />}
                                </div>
                            )}

                            {/* ---------- NOTIFICATIONS ---------- */}
                            {activeTab === "notifications" && (
                                <div className="bg-white border rounded-lg p-6 space-y-4">
                                    <h2 className="text-xl font-semibold">Notifications</h2>

                                    <Checkbox label="Email Notifications" checked={user.settings?.notifications?.email} disabled={!isEditable} />
                                    <Checkbox label="SMS Notifications" checked={user.settings?.notifications?.sms} disabled={!isEditable} />

                                    {isEditable && <SaveButton />}
                                </div>
                            )}

                            {/* ---------- BILLING ---------- */}
                            {activeTab === "billing" && role === "organizer" && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h2 className="text-xl font-semibold">Billing</h2>
                                    <p className="text-gray-500 text-sm">Billing details go here</p>
                                </div>
                            )}

                            {/* ---------- SECURITY ---------- */}
                            {activeTab === "security" && (
                                <div className="bg-white border rounded-lg p-6 space-y-4">
                                    <h2 className="text-xl font-semibold">Security</h2>

                                    {role !== "admin" && (
                                        <button className="text-red-600 border border-red-600 px-4 py-2 rounded-lg">
                                            Delete Account
                                        </button>
                                    )}
                                </div>
                            )}

                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

/* ================= REUSABLE COMPONENTS ================= */

function Input({ label, value, disabled }) {
    return (
        <div>
            <label className="block text-sm mb-1">{label}</label>
            <input
                value={value || ""}
                disabled={disabled}
                className={`w-full border rounded-lg px-3 py-2 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
            />
        </div>
    );
}

function Checkbox({ label, checked, disabled }) {
    return (
        <label className="flex items-center gap-3">
            <input type="checkbox" checked={checked} disabled={disabled} />
            <span>{label}</span>
        </label>
    );
}

function SaveButton() {
    return (
        <div className="flex justify-end">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                Save Changes
            </button>
        </div>
    );
}