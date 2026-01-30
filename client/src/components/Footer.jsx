import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { BrandIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "./Icon";
import { fetchCategories } from "../store/category/categorySlice";

export default function Footer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const popularCategories = categories.slice(0, 4);
    const [openMenu, setOpenMenu] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        if(popularCategories.length == 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, popularCategories])

    useEffect(() => {
        const close = (e) => {
            if (e.type === "keydown") {
                setOpenMenu(null);
                return;
            }

            if (!menuRef.current?.contains(e.target)) {
                setOpenMenu(null);
            }
        };

        const closeOnScroll = () => {
            setOpenMenu(null);
        };

        document.addEventListener("mousedown", close);
        document.addEventListener("keydown", close);
        window.addEventListener("scroll", closeOnScroll);

        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("keydown", close);
            window.removeEventListener("scroll", closeOnScroll);
        };
    }, []);

    const toggleMenu = (key) => {
        setOpenMenu(prev => (prev === key ? null : key));
    };

    const isActiveLink = (href) => {
        const currentPath = location.pathname;
        const currentParams = new URLSearchParams(location.search);
        const [hrefPath, hrefQuery] = href.split("?");
        const hrefParams = new URLSearchParams(hrefQuery);
        if (currentPath !== hrefPath) return false;
        for (const [key, value] of hrefParams.entries()) {
            if (currentParams.get(key) !== value) return false;
        }

        return true;
    };

    const authUser = useSelector(state => state.auth.user);
    const role = authUser?.role || "guest";

    const footerLinks = {
        guest: [
            { label: "Browse Events", href: "/events" },
            { label: "Categories", href: "/categories" },
            { label: "Settings", href: "/settings" },
        ],
        user: [
            { label: "Browse Events", href: "/events" },
            { label: "My Bookings", href: "/mybookings" },
            { label: "Categories", href: "/categories" },
            { label: "Settings", href: "/settings" },
        ],
        organizer: [
            { label: "Dashboard", href: "/organizer" },
            { label: "Create Event", href: "/create-event" },
            { label: "Analytics", href: "/analytics" },
            { label: "Attendees", href: "/attendees" },
        ],
        admin: [
            { label: "Admin Panel", href: "/admin" },
            { label: "Analytics", href: "/analytics" },
            { label: "User Management", href: "/admin?tab=users" },
            { label: "Event Management", href: "/admin?tab=events" },
        ],
    };

    const supportLinks = [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ];

    const companyLinks = [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Blog", href: "/blog" },
    ];

    const socialLink = [];

    const renderLinks = (links) =>
        links.map((link) => (
            <li key={link.href}>
                <a
                    href={link.href}
                    className={`text-teal-200 hover:text-white transition-colors ${isActiveLink(link.href) ? "font-bold underline" : ""
                        }`}
                >
                    {link.label}
                </a>
            </li>
        ));

    return (
        <footer className="bg-teal-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="lg:col-span-1">
                        {/* Brand + Socials */}
                        <div className="flex flex-row md:flex-col md:items-start items-center justify-between md:justify-start gap-3">
                            {/* Brand */}
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-white rounded flex items-center justify-center shrink-0">
                                    <BrandIcon className="text-teal-600" />
                                </div>
                                <span className="font-semibold whitespace-nowrap">
                                    EventHub
                                </span>
                            </div>

                            {/* Description (not on small) */}
                            <p className="hidden sm:block text-teal-100 text-sm leading-snug max-w-sm mt-2">
                                Discover and create amazing events. Connect with people who share your interests.
                            </p>

                            {/* Social Icons */}
                            <div className={`${ socialLink.length == 0 ? 'hidden' : 'flex' } w-full justify-around gap-3`}>
                                <a href={socialLink[0]} className="text-teal-200 hover:text-white transition-colors">
                                    <FacebookIcon />
                                </a>
                                <a href={socialLink[1]} className="text-teal-200 hover:text-white transition-colors">
                                    <TwitterIcon />
                                </a>
                                <a href={socialLink[2]} className="text-teal-200 hover:text-white transition-colors">
                                    <InstagramIcon />
                                </a>
                                <a href={socialLink[3]} className="text-teal-200 hover:text-white transition-colors">
                                    <LinkedinIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div ref={menuRef} className="grid grid-cols-2 gap-x-6 gap-y-3 md:gap-x-35 lg:gap-x-80 lg:pr-40">
                        <div className="relative">
                            <button
                                onClick={() => toggleMenu("quick")}
                                onKeyDown={(e) => {
                                    if (e.key === " " || e.key === "Spacebar") {
                                        e.preventDefault();
                                    }
                                }}
                                className="text-sm text-teal-100 hover:text-white font-medium"
                            >
                                Quick Links ▾
                            </button>

                            {openMenu === "quick" && (
                                <ul className="absolute bottom-full mb-2 w-48 rounded-md bg-teal-700 text-white shadow-xl ring-1 ring-teal-500/40 p-2 space-y-1 z-50">
                                    {renderLinks(footerLinks[role])}
                                </ul>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => toggleMenu("categories")}
                                onKeyDown={(e) => {
                                    if (e.key === " " || e.key === "Spacebar") {
                                        e.preventDefault();
                                    }
                                }}
                                className="text-sm text-teal-100 hover:text-white font-medium"
                            >
                                Categories ▾
                            </button>

                            {openMenu === "categories" && (
                                <ul className="absolute bottom-full mb-2 w-48 rounded-md bg-teal-700 text-white shadow-xl ring-1 ring-teal-500/40 p-2 space-y-1 z-50 right-0">
                                    {popularCategories.map(cat => (
                                        <li key={cat._id}>
                                            <a
                                                href={`/events?category=${encodeURIComponent(cat.name)}`}
                                                className="block px-2 py-1 rounded text-sm hover:bg-teal-600"
                                            >
                                                {cat.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => toggleMenu("support")}
                                onKeyDown={(e) => {
                                    if (e.key === " " || e.key === "Spacebar") {
                                        e.preventDefault();
                                    }
                                }}
                                className="text-sm text-teal-100 hover:text-white font-medium"
                            >
                                Support ▾
                            </button>

                            {openMenu === "support" && (
                                <ul className="absolute bottom-full mb-2 w-48 rounded-md bg-teal-700 text-white shadow-xl ring-1 ring-teal-500/40 p-2 space-y-1 z-50">
                                    {renderLinks(supportLinks)}
                                </ul>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => toggleMenu("company")}
                                onKeyDown={(e) => {
                                    if (e.key === " " || e.key === "Spacebar") {
                                        e.preventDefault();
                                    }
                                }}
                                className="text-sm text-teal-100 hover:text-white font-medium"
                            >
                                Company ▾
                            </button>

                            {openMenu === "company" && (
                                <ul className="absolute bottom-full mb-2 w-48 rounded-md bg-teal-700 text-white shadow-xl ring-1 ring-teal-500/40 p-2 space-y-1 z-50 right-0">
                                    {renderLinks(companyLinks)}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-teal-500 mt-5 pt-3 flex flex-col md:flex-row justify-between items-center lg:gap-1 text-center">
                    <p className="text-teal-200 text-sm">© 2024 EventHub. All rights reserved.</p>
                    <div className="flex items-center gap-1 mt-4 md:mt-0">
                        <span className="text-teal-200 text-sm">Made by</span>
                        <a
                            href="https://nileshsomani.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-200 hover:text-white text-sm transition-colors"
                        >
                            Nilesh Somani
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}