// src/components/Icon.jsx

/* =======================
   ICON IMPORTS
======================= */

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
  RiEditLine,
  RiDeleteBinLine,
  RiSearchLine,
  RiAddLine,
  RiMoneyDollarCircleLine,
  RiBarChartLine,
  RiDownloadLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiSubtractLine,
  RiBankCardLine,
  RiPaypalLine,
  RiAppleLine,
  RiCheckLine,
  RiShieldCheckLine,
  RiRefundLine,
  RiVerifiedBadgeLine,
  RiInformationLine,
  RiFileTextLine,
  RiImageLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiMusic2Line,
  RiCpuLine,
  RiFootballLine,
  RiPaletteLine,
  RiRestaurantLine,
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiHeartPulseLine,
  RiHomeLine,
  RiTimeLine,
  RiMapPinLine,
  RiArrowRightSLine,
  RiShareLine,
  RiLink,
  RiCalendarLine,
  RiGridLine,
  RiListCheck,
  RiMailLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiEyeLine,
  RiDownloadCloudLine,
  RiNotification3Line,
  RiBuildingLine,
  RiShieldLine,
  RiCommunityLine,
} from "react-icons/ri";

import {
  HiUsers,
  HiUserGroup,
  HiCalendarDays,
  HiCurrencyDollar,
} from "react-icons/hi2";

/* =======================
   BRAND / APP IDENTITY
======================= */

export const BrandIcon = ({ size = 18, className = "" }) => (
  <RiCalendarEventLine size={size} className={className} />
);

/* =======================
   COMMON UI ICONS
======================= */

export const StarIcon = ({ size = 14, className = "text-yellow-400" }) => (
  <RiStarFill size={size} className={className} />
);

export const MenuIcon = ({ size = 24, className = "" }) => (
  <RiMenuLine size={size} className={className} />
);

export const CloseIcon = ({ size = 24, className = "" }) => (
  <RiCloseLine size={size} className={className} />
);

export const CalendarOutlineIcon = ({ size = 16, className = "" }) => (
  <RiCalendarLine size={size} className={className} />
);

export const TimeIcon = ({ size = 16, className = "" }) => (
  <RiTimeLine size={size} className={className} />
);

export const LocationIcon = ({ size = 16, className = "" }) => (
  <RiMapPinLine size={size} className={className} />
);

/* =======================
   SOCIAL (Footer.jsx)
======================= */

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

/* =======================
   NAVIGATION (Navbar.jsx)
======================= */

export const HomeIcon = ({ size = 16, className = "" }) => (
  <RiHome4Line size={size} className={className} />
);

export const EventsIcon = ({ size = 16, className = "" }) => (
  <RiCalendar2Line size={size} className={className} />
);

export const CategoriesIcon = ({ size = 16, className = "" }) => (
  <RiApps2Line size={size} className={className} />
);

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

export const BookingsIcon = ({ size = 16, className = "" }) => (
  <RiTicketLine size={size} className={className} />
);

/* =======================
   AUTH / ROLE ICONS (Auth.jsx, Navbar.jsx)
======================= */

export const AuthUserIcon = ({ size = 20, className = "" }) => (
  <RiUserLine size={size} className={className} />
);

export const AuthAdminIcon = ({ size = 20, className = "" }) => (
  <RiAdminLine size={size} className={className} />
);

export const OrganizerIcon = ({ size = 20, className = "" }) => (
  <RiCalendarEventLine size={size} className={className} />
);

export const BecomeOrganizerIcon = ({ size = 16, className = "" }) => (
  <RiUserStarLine size={size} className={className} />
);

export const ProfileIcon = ({ size = 18, className = "" }) => (
  <RiUser3Line size={size} className={className} />
);

/* =======================
   SETTINGS / SESSION
======================= */

export const SettingsIcon = ({ size = 16, className = "" }) => (
  <RiSettings3Line size={size} className={className} />
);

export const LogoutIcon = ({ size = 16, className = "" }) => (
  <RiLogoutBoxRLine size={size} className={className} />
);

/* =======================
   ADMIN / DASHBOARD STATS
======================= */

export const UsersIcon = ({ size = 20, className = "" }) => (
  <HiUsers size={size} className={className} />
);

export const UserGroupIcon = ({ size = 20, className = "" }) => (
  <HiUserGroup size={size} className={className} />
);

export const TotalEventsIcon = ({ size = 20, className = "" }) => (
  <HiCalendarDays size={size} className={className} />
);

export const RevenueIcon = ({ size = 20, className = "" }) => (
  <HiCurrencyDollar size={size} className={className} />
);

/* =======================
   ACTION ICONS
======================= */

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

export const MinusIcon = ({ size = 18, className = "" }) => (
  <RiSubtractLine size={size} className={className} />
);

/* =======================
   ANALYTICS METRICS
======================= */

export const ArrowUpIcon = ({ size = 16, className = "" }) => (
  <RiArrowUpLine size={size} className={className} />
);

export const ArrowDownIcon = ({ size = 16, className = "" }) => (
  <RiArrowDownLine size={size} className={className} />
);

export const TotalBookingsIcon = ({ size = 20, className = "" }) => (
  <RiTicketLine size={size} className={className} />
);

export const MoneyIcon = ({ size = 20, className = "" }) => (
  <RiMoneyDollarCircleLine size={size} className={className} />
);

export const ChartIcon = ({ size = 20, className = "" }) => (
  <RiBarChartLine size={size} className={className} />
);

/* =======================
   PAYMENT ICONS
======================= */

export const CardIcon = ({ size = 20, className = "" }) => (
  <RiBankCardLine size={size} className={className} />
);

export const PaypalIcon = ({ size = 20, className = "" }) => (
  <RiPaypalLine size={size} className={className} />
);

export const ApplePayIcon = ({ size = 20, className = "" }) => (
  <RiAppleLine size={size} className={className} />
);

/* =======================
    STATUS / SUCCESS ICONS
======================= */

export const SuccessIcon = ({ size = 24, className = "" }) => (
  <RiCheckLine size={size} className={className} />
);

export const SecureIcon = ({ size = 16, className = "" }) => (
  <RiShieldCheckLine size={size} className={className} />
);

export const RefundIcon = ({ size = 16, className = "" }) => (
  <RiRefundLine size={size} className={className} />
);

export const VerifiedIcon = ({ size = 16, className = "" }) => (
  <RiVerifiedBadgeLine size={size} className={className} />
);

// STEPPER / FORM ICONS
export const InfoIcon = ({ size = 18, className = "" }) => (
  <RiInformationLine size={size} className={className} />
);

export const FileIcon = ({ size = 18, className = "" }) => (
  <RiFileTextLine size={size} className={className} />
);

export const ImageIcon = ({ size = 24, className = "" }) => (
  <RiImageLine size={size} className={className} />
);

// NAVIGATION ARROWS
export const ArrowLeftIcon = ({ size = 18, className = "" }) => (
  <RiArrowLeftLine size={size} className={className} />
);

export const ArrowRightIcon = ({ size = 18, className = "" }) => (
  <RiArrowRightLine size={size} className={className} />
);

/* =======================
   CATEGORY ICONS
======================= */

export const MusicIcon = ({ size = 20, className = "" }) => (
  <RiMusic2Line size={size} className={className} />
);

export const TechnologyIcon = ({ size = 20, className = "" }) => (
  <RiCpuLine size={size} className={className} />
);

export const SportsIcon = ({ size = 20, className = "" }) => (
  <RiFootballLine size={size} className={className} />
);

export const ArtsIcon = ({ size = 20, className = "" }) => (
  <RiPaletteLine size={size} className={className} />
);

export const FoodIcon = ({ size = 20, className = "" }) => (
  <RiRestaurantLine size={size} className={className} />
);

export const BusinessIcon = ({ size = 20, className = "" }) => (
  <RiBriefcaseLine size={size} className={className} />
);

export const EducationIcon = ({ size = 20, className = "" }) => (
  <RiGraduationCapLine size={size} className={className} />
);

export const HealthIcon = ({ size = 20, className = "" }) => (
  <RiHeartPulseLine size={size} className={className} />
);

export const HomeOutlineIcon = ({ size = 18, className = "" }) => (
  <RiHomeLine size={size} className={className} />
);

// NAV / BREADCRUMB ICONS
export const BreadcrumbArrowIcon = ({ size = 16, className = "" }) => (
  <RiArrowRightSLine size={size} className={className} />
);

// SEARCH ICON (replace lucide / hi)
export const SearchOutlineIcon = ({ size = 18, className = "" }) => (
  <RiSearchLine size={size} className={className} />
);

// SHARE / LINK ICONS
export const ShareIcon = ({ size = 18, className = "" }) => (
  <RiShareLine size={size} className={className} />
);

export const LinkIcon = ({ size = 18, className = "" }) => (
  <RiLink size={size} className={className} />
);

/* =======================
   UNIDENTIFIED / FUTURE USE
   (keep here till more files)
======================= */

export const GridIcon = ({ size = 20, className = "" }) => (
  <RiGridLine size={size} className={className} />
);

export const ListIcon = ({ size = 20, className = "" }) => (
  <RiListCheck size={size} className={className} />
);

// ACTION / STATUS ICONS
export const MailIcon = ({ size = 20, className = "" }) => (
  <RiMailLine size={size} className={className} />
);

export const ConfirmedIcon = ({ size = 20, className = "" }) => (
  <RiCheckboxCircleLine size={size} className={className} />
);

export const PendingIcon = ({ size = 20, className = "" }) => (
  <RiTimeLine size={size} className={className} />
);

export const CancelledIcon = ({ size = 20, className = "" }) => (
  <RiCloseCircleLine size={size} className={className} />
);

export const ViewIcon = ({ size = 20, className = "" }) => (
  <RiEyeLine size={size} className={className} />
);

export const ExportIcon = ({ size = 20, className = "" }) => (
  <RiDownloadCloudLine size={size} className={className} />
);

export const NotificationIcon = ({ size = 20, className = "" }) => (
  <RiNotification3Line size={size} className={className} />
);

export const OrganizationIcon = ({ size = 18, className = "" }) => (
  <RiBuildingLine size={size} className={className} />
);

export const SecurityIcon = ({ size = 18, className = "" }) => (
  <RiShieldLine size={size} className={className} />
);

// RiUserCommunityLine (previous UserIcon)
// RiShieldUserLine (old AdminIcon)

export const CommunityIcon = ({ size = 18, className = "" }) => {
  <RiCommunityLine size={size} className={className} />
}

export const DefaultCategoryIcon = ({ size = 18, className = "" }) => {
  <RiGridLine size={size} className={className} />
}

export const TravelIcon = ({ size = 18, className = "" }) => {
  <RiBriefcaseLine size={size} className={className} />
}
