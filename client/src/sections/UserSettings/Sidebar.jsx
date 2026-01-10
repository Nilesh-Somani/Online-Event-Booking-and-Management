import {
    FaUser,
    FaBuilding,
    FaCog,
    FaBell,
    FaCreditCard,
    FaLock,
} from "react-icons/fa";

export default function Sidebar({ user, activeTab, setActiveTab }) {
    if (!user) return null;

    const tabs = [
        { id: "profile", label: "Profile", icon: FaUser, roles: ["user", "organizer", "admin"] },
        { id: "organization", label: "Organization", icon: FaBuilding, roles: ["organizer"] },
        { id: "account", label: "Account", icon: FaCog, roles: ["user", "organizer", "admin"] },
        { id: "notifications", label: "Notifications", icon: FaBell, roles: ["user", "organizer", "admin"] },
        { id: "billing", label: "Billing", icon: FaCreditCard, roles: ["user", "organizer"] },
        { id: "security", label: "Security", icon: FaLock, roles: ["user", "organizer", "admin"] },
    ];

    return (
        <aside className="hidden lg:block w-64 shrink-0">
            {/* Sticky container */}
            <div
                className="
                    sticky top-24
                    max-h-[calc(100vh-200px)]
                    overflow-y-auto
                    pb-6
                "
            >
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <nav className="space-y-2">
                        {tabs
                            .filter(tab => tab.roles.includes(user.role))
                            .map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            w-full flex items-center px-4 py-3
                                            rounded-lg text-left transition-colors
                                            ${isActive
                                                ? "bg-purple-100 text-purple-700 border-l-4 border-purple-500"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        <Icon className="mr-3 text-base" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                );
                            })}
                    </nav>
                </div>
            </div>
        </aside>
    );
}