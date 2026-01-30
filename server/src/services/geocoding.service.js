import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;
const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

/**
 * Build a human-readable address string
 */
const buildAddressString = ({ name, address, city, state, country }) => {
    return [name, address, city, state, country].filter(Boolean).join(", ");
};

/**
 * Try Google Geocoding
 */
const geocodeWithGoogle = async (query) => {
    if (!GOOGLE_API_KEY) return null;

    const { data } = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
            params: {
                address: query,
                key: GOOGLE_API_KEY,
            },
        }
    );

    if (data.status !== "OK" || !data.results.length) return null;

    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
};

/**
 * Try OpenCage Geocoding
 */
const geocodeWithOpenCage = async (query, locationData) => {
    if (!OPENCAGE_API_KEY) return null;

    const { data } = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
            params: {
                q: query,
                key: OPENCAGE_API_KEY,
                limit: 5,
                no_annotations: 1,
            },
        }
    );

    if (!data.results?.length) return null;

    // 🔍 Find the BEST precise match
    const best = data.results.find(result => {
        const { _type, confidence, components } = result;

        // Reject broad locations
        if (["city", "state", "country"].includes(_type)) return false;

        // Reject low confidence
        if (confidence < 7) return false;

        // Validate city/state if provided
        if (
            locationData.city &&
            components.city &&
            components.city.toLowerCase() !== locationData.city.toLowerCase()
        ) {
            return false;
        }

        return true;
    });

    if (!best) return null;

    return {
        coordinates: {
            lat: best.geometry.lat,
            lng: best.geometry.lng,
        },
        accuracy: "exact",
    };
};

/**
 * MAIN EXPORT
 * Returns { lat, lng } OR null
 */
export const geocodeLocation = async (locationData) => {
    try {
        const query = buildAddressString(locationData);
        if (!query) return null;

        // 1️⃣ Google first
        // const googleResult = await geocodeWithGoogle(query);
        // if (googleResult) return googleResult;

        // 2️⃣ OpenCage fallback
        const openCageResult = await geocodeWithOpenCage(query, locationData);
        if (openCageResult) return openCageResult;

        return {
            coordinates: null,
            accuracy: "approximate",
        };
    } catch (err) {
        console.error("Geocoding failed:", err.message);
        return null;
    }
};