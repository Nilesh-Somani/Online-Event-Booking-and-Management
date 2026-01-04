// src/components/Icon.jsx
import {
  RiCalendarEventLine,
  RiStarFill,
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiUser3Line,
  RiHome4Line,
  RiCalendar2Line,
  RiApps2Line,
  RiDashboardLine,
  RiAddCircleLine,
  RiGroupLine,
  RiBarChart2Line,
  RiShieldUserLine,
  RiUserCommunityLine,
  RiTicketLine,
  RiUserStarLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiCloseLine,
  RiUserLine,
  RiAdminLine,
  RiUserAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiSearchLine,
  RiAddLine,
  RiMoneyDollarCircleLine,
  RiBarChartLine,
  RiDownloadLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";

import {
  HiUsers,
  HiUserGroup,
  HiCalendarDays,
  HiCurrencyDollar,
  HiChartBar,
} from "react-icons/hi2";

// Brand
export const BrandIcon = ({ size = 18, className = "" }) => (
  <RiCalendarEventLine size={size} className={className} />
);

// Common
export const StarIcon = ({ size = 14, className = "text-yellow-400" }) => (
  <RiStarFill size={size} className={className} />
);

// Social
export const FacebookIcon = ({ size = 20, className = "" }) => (
  <RiFacebookFill size={size} className={className} />
);

export const TwitterIcon = ({ size = 20, className = "" }) => (
  <RiTwitterFill size={size} className={className} />
);

export const InstagramIcon = ({ size = 20, className = "" }) => (
  <RiInstagramLine size={size} className={className} />
);

export const LinkedinIcon = ({ size = 20, className = "" }) => (
  <RiLinkedinFill size={size} className={className} />
);

// Nav
export const HomeIcon = ({ size = 16, className = "" }) => (
  <RiHome4Line size={size} className={className} />
);

export const EventsIcon = ({ size = 16, className = "" }) => (
  <RiCalendar2Line size={size} className={className} />
);

export const CategoriesIcon = ({ size = 16, className = "" }) => (
  <RiApps2Line size={size} className={className} />
);

// Role-based
export const DashboardIcon = ({ size = 16, className = "" }) => (
  <RiDashboardLine size={size} className={className} />
);

export const CreateEventIcon = ({ size = 16, className = "" }) => (
  <RiAddCircleLine size={size} className={className} />
);

export const AttendeesIcon = ({ size = 16, className = "" }) => (
  <RiGroupLine size={size} className={className} />
);

export const AnalyticsIcon = ({ size = 16, className = "" }) => (
  <RiBarChart2Line size={size} className={className} />
);

export const AdminIcon = ({ size = 16, className = "" }) => (
  <RiShieldUserLine size={size} className={className} />
);

export const UserIcon = ({ size = 16, className = "" }) => (
  <RiUserCommunityLine size={size} className={className} />
);

export const BookingsIcon = ({ size = 16, className = "" }) => (
  <RiTicketLine size={size} className={className} />
);

// User
export const ProfileIcon = ({ size = 18, className = "" }) => (
  <RiUser3Line size={size} className={className} />
);

// Mobile menu
export const MenuIcon = ({ size = 24, className = "" }) => (
  <RiMenuLine size={size} className={className} />
);

export const CloseIcon = ({ size = 24, className = "" }) => (
  <RiCloseLine size={size} className={className} />
);

export const BecomeOrganizerIcon = ({ size = 16, className = "" }) => (
  <RiUserStarLine size={size} className={className} />
);

export const SettingsIcon = ({ size = 16, className = "" }) => (
  <RiSettings3Line size={size} className={className} />
);

export const LogoutIcon = ({ size = 16, className = "" }) => (
  <RiLogoutBoxRLine size={size} className={className} />
);

/* ===== GENERIC DASHBOARD ICONS ===== */

export const UsersIcon = ({ size = 20, className = "" }) => (
  <HiUsers size={size} className={className} />
);

export const UserGroupIcon = ({ size = 20, className = "" }) => (
  <HiUserGroup size={size} className={className} />
);

export const DashboardEventsIcon = ({ size = 20, className = "" }) => (
  <HiCalendarDays size={size} className={className} />
);

export const RevenueIcon = ({ size = 20, className = "" }) => (
  <HiCurrencyDollar size={size} className={className} />
);

export const DashboardAnalyticsIcon = ({ size = 20, className = "" }) => (
  <HiChartBar size={size} className={className} />
);

/* ===== ACTION ICONS ===== */

export const AddIcon = ({ size = 18, className = "" }) => (
  <RiAddLine size={size} className={className} />
);

export const EditIcon = ({ size = 18, className = "" }) => (
  <RiEditLine size={size} className={className} />
);

export const DeleteIcon = ({ size = 18, className = "" }) => (
  <RiDeleteBinLine size={size} className={className} />
);

export const SearchIcon = ({ size = 18, className = "" }) => (
  <RiSearchLine size={size} className={className} />
);

export const DownloadIcon = ({ size = 18, className = "" }) => (
  <RiDownloadLine size={size} className={className} />
);

/* ===== ANALYTICS ICONS ===== */

export const ArrowUpIcon = ({ size = 16, className = "" }) => (
  <RiArrowUpLine size={size} className={className} />
);

export const ArrowDownIcon = ({ size = 16, className = "" }) => (
  <RiArrowDownLine size={size} className={className} />
);

export const MoneyIcon = ({ size = 20, className = "" }) => (
  <RiMoneyDollarCircleLine size={size} className={className} />
);

export const ChartIcon = ({ size = 20, className = "" }) => (
  <RiBarChartLine size={size} className={className} />
);

/* ===== AUTH / ROLE ICONS ===== */

export const AuthUserIcon = ({ size = 20, className = "" }) => (
  <RiUserLine size={size} className={className} />
);

export const OrganizerIcon = ({ size = 20, className = "" }) => (
  <RiCalendarEventLine size={size} className={className} />
);

export const AuthAdminIcon = ({ size = 20, className = "" }) => (
  <RiAdminLine size={size} className={className} />
);

export const RegisterIcon = ({ size = 20, className = "" }) => (
  <RiUserAddLine size={size} className={className} />
);