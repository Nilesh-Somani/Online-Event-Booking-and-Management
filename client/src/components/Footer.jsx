import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BrandIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "./Icon";

export default function Footer() {
    const location = useLocation();

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

    const categories = [
        { label: "Music & Concerts", href: "/events?category=Music%20%26%20Concerts" },
        { label: "Technology", href: "/events?category=Technology" },
        { label: "Sports & Fitness", href: "/events?category=Sports%20%26%20Fitness" },
        { label: "Arts & Culture", href: "/events?category=Arts%20%26%20Culture" },
        { label: "Food & Drink", href: "/events?category=Food%20%26%20Drink" },
        { label: "Business", href: "/events?category=Business" },
    ];

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <BrandIcon className="text-teal-600" />
                            </div>
                            <span className="text-xl font-bold">EventHub</span>
                        </div>
                        <p className="text-teal-100 mb-4">
                            Discover and create amazing events. Connect with people who share your interests.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-teal-200 hover:text-white transition-colors">
                                <FacebookIcon />
                            </a>
                            <a href="#" className="text-teal-200 hover:text-white transition-colors">
                                <TwitterIcon />
                            </a>
                            <a href="#" className="text-teal-200 hover:text-white transition-colors">
                                <InstagramIcon />
                            </a>
                            <a href="#" className="text-teal-200 hover:text-white transition-colors">
                                <LinkedinIcon />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">{renderLinks(footerLinks[role])}</ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">{renderLinks(categories)}</ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">{renderLinks(supportLinks)}</ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">{renderLinks(companyLinks)}</ul>
                    </div>
                </div>

                <div className="border-t border-teal-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
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