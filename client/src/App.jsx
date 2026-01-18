import { Routes, Route, Navigate } from "react-router-dom";

// Public Page Imports
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from './pages/EventDetails'
import Categories from "./pages/Categories";

// Auth Page + Component Imports
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoutes";
import GuestRoute from "./components/GuestRoute";

// User Accessible Pages Imports
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import OrganizerApplication from "./pages/OrganizerApplication";

// Organizer Accessible Page Imports
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import OrganizerAttendees from "./pages/OrganizerAttendees";

// Admin Accessible Page Imports
import AdminPanel from "./pages/AdminPanel";

// Role-Based Accessible Page Imports
import Analytics from "./pages/Analytics";
import UserSettings from "./pages/UserSettings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/events" element={<Events />} />
      {/* Event Page's Filters Routes */}
      <Route path="/events/category/:category" element={<Events />} />
      <Route path="/events/search/:search" element={<Events />} />
      <Route path="/events/location/:location" element={<Events />} />
      {/* Event Page's Combined Filters Routes  */}
      <Route path="/events/category/:category/location/:location" element={<Events />} />
      <Route path="/events/search/:search/location/:location" element={<Events />} />
      <Route path="/events/:filterType/:filterValue/:filterType2/:filterValue2" element={<Events />} />

      <Route path="/events/:eventId" element={<EventDetails />} />
      
      <Route path="/categories" element={<Categories />} />

      <Route path="/auth" element={
        <GuestRoute>
          <Auth />
        </GuestRoute>
      } />

      <Route path="/booking" element={
        <ProtectedRoute allowedRoles={["user", "organizer"]}>
          <Booking />
        </ProtectedRoute>
      } />
      <Route path="/mybookings" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <MyBookings />
        </ProtectedRoute>
      } />
      <Route path="/organizer-application" element={
        <ProtectedRoute allowedRoles={["user"]}>
          <OrganizerApplication />
        </ProtectedRoute>
      } />

      <Route path="/organizer" element={
        <ProtectedRoute allowedRoles={["organizer"]}>
          <OrganizerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-event" element={
        <ProtectedRoute allowedRoles={["organizer"]}>
          <CreateEvent />
        </ProtectedRoute>
      } />
      <Route path="/attendees" element={
        <ProtectedRoute allowedRoles={["organizer"]}>
          <OrganizerAttendees />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminPanel />
        </ProtectedRoute>
      } />

      <Route path="/analytics" element={
        <ProtectedRoute allowedRoles={["organizer", "admin"]}>
          <Analytics />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute allowedRoles={["user", "organizer", "admin"]}>
          <UserSettings />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to='/' replace />} />
    </Routes>
  );
}