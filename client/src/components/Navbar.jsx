import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { BrandIcon, HomeIcon, EventsIcon, CategoriesIcon, DashboardIcon, CreateEventIcon, AttendeesIcon, AnalyticsIcon, AdminIcon, UserIcon, BookingsIcon, ProfileIcon, BecomeOrganizerIcon, SettingsIcon, LogoutIcon, MenuIcon, CloseIcon } from "./Icon";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    // AUTH
    const authUser = useSelector(state => state.auth.user);
    const isAuth = !!authUser;
    const role = authUser?.role; // guest | user | organizer | admin
    const dispatch = useDispatch();

    // BASE LINKS
    const baseLinks = [
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        { name: "Categories", path: "/categories" },
    ];

    // ROLE LINKS
    const roleLinks = {
        user: [{ name: "My Bookings", path: "/mybookings" }],

        organizer: [
            { name: "Dashboard", path: "/organizer" },
            { name: "Create Event", path: "/create-event" },
            { name: "Attendees", path: "/attendees" },
            { name: "Analytics", path: "/analytics" },
        ],

        admin: [
            { name: "Admin Panel", path: "/admin" },
            { name: "Users", path: "/admin?tab=users" },
            { name: "Analytics", path: "/analytics" },
        ],
    };

    const linkIcons = {
        Home: HomeIcon,
        Events: EventsIcon,
        Categories: CategoriesIcon,
        Dashboard: DashboardIcon,
        "Create Event": CreateEventIcon,
        Attendees: AttendeesIcon,
        Analytics: AnalyticsIcon,
        "Admin Panel": AdminIcon,
        Users: UserIcon,
        "My Bookings": BookingsIcon,
    };

    const dropdownIcons = {
        Dashboard: DashboardIcon,
        "Create Event": CreateEventIcon,
        Attendees: AttendeesIcon,
        Analytics: AnalyticsIcon,
        "Admin Panel": AdminIcon,
        Users: UserIcon,
        "My Bookings": BookingsIcon,
    };

    // Links shown in MAIN NAV (desktop)
    const desktopNavLinks = [...baseLinks, ...(role === "user" ? roleLinks.user : []), ...(role === "organizer" ? [roleLinks.organizer.find(link => link.name === "Dashboard")] : []), ...(role === "admin" ? [roleLinks.admin.find(link => link.name === "Admin Panel")] : []),];

    const mobileNavLinks = [
        ...(role === "user" ? [{ name: "Become Organizer", path: "/organizer-application" }] : []),
        ...(role === "organizer" ? roleLinks.organizer.filter(link => link.name !== "Dashboard") : []),
        ...(role === "admin" ? roleLinks.admin.filter(link => link.name !== "Admin Panel") : []),
    ]

    const logoutHandler = () => dispatch(logout());

    const isActiveLink = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO */}
                <div
                    className="flex items-center gap-2 font-bold text-xl cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <div className="w-8 h-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <BrandIcon className="text-white" />
                    </div>
                    EventHub
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8 text-gray-600">
                    {desktopNavLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActiveLink(link.path)
                                ? "text-purple-600 bg-purple-50"
                                : "hover:text-purple-600 hover:bg-gray-50"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                {(() => {
                                    const Icon = linkIcons[link.name];
                                    return Icon ? <Icon size={16} /> : null;
                                })()}
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* AUTH BUTTONS (ALWAYS VISIBLE – DESKTOP + MOBILE) */}
                    {!isAuth ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/auth?mode=signin")}
                                className="text-gray-700 hover:text-purple-600 font-medium"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate("/auth?mode=signup")}
                                className="font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm"
                            >
                                Sign Up
                            </button>
                        </div>
                    ) : (
                        <div className="md:flex items-center gap-4">
                            <div className="hidden md:flex">
                                {role === "user" && (
                                    <Link
                                        to="/organizer-application"
                                        className="flex items-center gap-2 text-gray-700 hover:text-teal-600"
                                    >
                                        <BecomeOrganizerIcon size={16} />
                                        Become Organizer
                                    </Link>
                                )}
                            </div>

                            <div className="relative group" ref={dropdownRef}>
                                <button onClick={() => setDropdownOpen(prev => !prev)} className="flex items-center gap-2">
                                    {authUser?.profile?.avatar ? (
                                        <img
                                            src={authUser.profile.avatar}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <ProfileIcon className="text-gray-600" />
                                        </div>
                                    )}
                                    <span className="font-medium">{authUser.profile.firstName}</span>
                                </button>

                                {/* DROPDOWN */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium">{authUser.profile.firstName} {authUser.profile.lastName}</p>
                                            <p className="text-xs text-gray-500 capitalize">{role}</p>
                                        </div>

                                        {(roleLinks[role] || []).map(item => {
                                            const Icon = dropdownIcons[item.name];
                                            return (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                                >
                                                    {Icon && <Icon size={16} />}
                                                    {item.name}
                                                </Link>
                                            )
                                        })}
                                        <Link
                                            to="/settings"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                        >
                                            <SettingsIcon size={16} />
                                            Settings
                                        </Link>

                                        <button
                                            onClick={logoutHandler}
                                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                                        >
                                            <LogoutIcon size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* MOBILE TOGGLE */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU (NAV ONLY) */}
            {open && (
                <div ref={mobileMenuRef} className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    {[...desktopNavLinks, ...mobileNavLinks].map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className="px-3 py-2 rounded-md hover:bg-gray-50"
                        >
                            <span className="flex items-center gap-2">
                                {(() => {
                                    const Icon = linkIcons[link.name];
                                    return Icon ? <Icon size={16} /> : null;
                                })()}
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    {isAuth ? (
                        <>
                            <Link
                                to="/settings"
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 border-t"
                            >
                                <SettingsIcon size={16} />
                                Settings
                            </Link>
                            <button
                                onClick={logoutHandler}
                                className="flex items-center gap-2 w-full text-left px-4 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogoutIcon size={16} />
                                Sign Out
                            </button>
                        </>
                    ) : null}
                </div>
            )}
        </header>
    );
}