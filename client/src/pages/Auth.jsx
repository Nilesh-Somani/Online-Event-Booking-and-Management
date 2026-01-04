import { useSearchParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiCalendarEventLine, RiUserLine, RiAdminLine } from "react-icons/ri";
import { login, register, checkEmailAvailability, checkUserIdAvailability } from "../store/auth/authSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const runAvailabilityCheck = ({
  value,
  isValid,
  setChecking,
  setShowAvailable,
  action,
  resetAction,
  dispatch
}) => {
  if (!isValid) {
    if (resetAction) dispatch(resetAction);
    return;
  }

  const debounce = setTimeout(async () => {
    setChecking(true);
    setShowAvailable(false);

    const result = await dispatch(action(value));

    setChecking(false);

    if (result.payload === true) {
      setShowAvailable(true);
      setTimeout(() => setShowAvailable(false), 500);
    }
  }, 500);

  return () => clearTimeout(debounce);
};

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);
  const { availability } = useSelector((state) => state.auth);

  // where user came from (protected route)
  const from = location.state?.from;

  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") || "signin";
  const isSignIn = mode === "signin";

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user");

  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingUserId, setCheckingUserId] = useState(false);
  const [showEmailAvailable, setShowEmailAvailable] = useState(false);
  const [showUserIdAvailable, setShowUserIdAvailable] = useState(false);

  const canSubmit =
    isSignIn ||
    (
      firstName &&
      lastName &&
      email &&
      userId &&
      password &&
      availability.email === true &&
      availability.userId === true
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignIn) {
      // hard stop if fields incomplete
      if (!firstName || !lastName || !email || !userId || !password) {
        return;
      }

      // hard stop if availability not confirmed
      if (availability.email !== true || availability.userId !== true) {
        return;
      }
    }

    const action = isSignIn
      ? login({ identifier, password })
      : register({
        firstName,
        middleName,
        lastName,
        email,
        userId,
        password,
        role,
      });

    const result = await dispatch(action);

    if (result.meta.requestStatus !== "fulfilled") return;

    const loggedUser = result.payload;

    if (from) {
      navigate(from.pathname, { replace: true, state: from.state });
    } else {
      if (loggedUser.role === "admin") navigate("/dashboard/admin");
      else if (loggedUser.role === "organizer") {
        alert("Please complete organizer application");
        navigate("/organizer-application");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    return runAvailabilityCheck({
      value: email,
      isValid: email && email.includes("@") && email.includes("."),
      setChecking: setCheckingEmail,
      setShowAvailable: setShowEmailAvailable,
      action: checkEmailAvailability,
      resetAction: { type: "auth/resetEmailAvailability" },
      dispatch
    });
  }, [email, dispatch]);

  useEffect(() => {
    return runAvailabilityCheck({
      value: userId,
      isValid: userId && userId.length >= 4,
      setChecking: setCheckingUserId,
      setShowAvailable: setShowUserIdAvailable,
      action: checkUserIdAvailability,
      resetAction: { type: "auth/resetUserIdAvailability" },
      dispatch
    });
  }, [userId, dispatch]);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <div className="max-w-md mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <RiCalendarEventLine className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600 mt-2">
              {isSignIn
                ? "Sign in to your EventHub account"
                : "Join EventHub and discover amazing events"}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setParams({ mode: "signin" })}
                  className={`flex-1 py-2 rounded-md ${isSignIn
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600"
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setParams({ mode: "signup" })}
                  className={`flex-1 py-2 rounded-md ${!isSignIn
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600"
                    }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Name (First - Middle - Last) */}
              {!isSignIn && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Middle Name (optional)"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </>
              )}

              {/* User ID */}
              {!isSignIn && (
                <input
                  type="text"
                  placeholder="User ID (unique username)"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />
              )}

              {/* User ID Not Checkable */}
              {!isSignIn && userId && userId.length < 4 && (
                <p className="text-sm text-red-500">User ID must be at least 4 characters</p>
              )}

              {/* User ID Checking */}
              {!isSignIn && userId && checkingUserId && (
                <p className="text-sm text-gray-500">Checking availability…</p>
              )}

              {/* User ID Available */}
              {!isSignIn && showUserIdAvailable && (
                <p className="text-sm text-green-600">User ID available ✓</p>
              )}

              {/* User ID Taken */}
              {!isSignIn && !checkingUserId && availability.userId === false && (
                <p className="text-sm text-red-500">User ID already taken</p>
              )}

              {/* Identifier (Sign In only) */}
              {isSignIn && (
                <input
                  type="text"
                  placeholder="Email or User ID"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              )}

              {/* Email (Sign Up only) */}
              {!isSignIn && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {/* Email Checking */}
                  {email && checkingEmail && (
                    <p className="text-sm text-gray-500">Checking availability…</p>
                  )}

                  {/* Email Available */}
                  {showEmailAvailable && (
                    <p className="text-sm text-green-600">Email available ✓</p>
                  )}

                  {/* Email Taken */}
                  {!checkingEmail && availability.email === false && (
                    <p className="text-sm text-red-500">Email already in use</p>
                  )}
                </>
              )}

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Account Type */}
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Account Type
                  </label>

                  <div className="space-y-3">
                    {/* User */}
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${role === "user" ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === "user"}
                        onChange={() => setRole("user")}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        <RiUserLine size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Event Attendee</div>
                        <div className="text-sm text-gray-500">
                          Browse and book events
                        </div>
                      </div>
                    </label>

                    {/* Organizer */}
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${role === "organizer" ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="organizer"
                        checked={role === "organizer"}
                        onChange={() => setRole("organizer")}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${role === "organizer" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        <RiCalendarEventLine size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Event Organizer</div>
                        <div className="text-sm text-gray-500">
                          Create and manage events
                        </div>
                      </div>
                    </label>

                    {/* Admin (temporary) */}
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${role === "admin" ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === "admin"}
                        onChange={() => setRole("admin")}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${role === "admin" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        <RiAdminLine size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Administrator</div>
                        <div className="text-sm text-gray-500">
                          System administration
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading || !canSubmit}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg"
              >
                {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-purple-600">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}