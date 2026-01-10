import { useState } from "react";
import SaveButton from "../../ui/SaveButton";

export default function BillingSection({ user }) {
    const [billing, setBilling] = useState({
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    // Restrict access
    if (!["user", "organizer"].includes(user.role)) {
        return (
            <div className="bg-white rounded-xl border p-6 text-sm text-gray-600">
                Billing is not available for this account.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ================= Billing Info ================= */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Billing Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field
                        label="Billing Address"
                        value={billing.address}
                        onChange={(v) =>
                            setBilling({ ...billing, address: v })
                        }
                    />
                    <Field
                        label="City"
                        value={billing.city}
                        onChange={(v) =>
                            setBilling({ ...billing, city: v })
                        }
                    />
                    <Field
                        label="State / Province"
                        value={billing.state}
                        onChange={(v) =>
                            setBilling({ ...billing, state: v })
                        }
                    />
                    <Field
                        label="ZIP / Postal Code"
                        value={billing.zip}
                        onChange={(v) =>
                            setBilling({ ...billing, zip: v })
                        }
                    />
                    <Field
                        label="Country"
                        value={billing.country}
                        onChange={(v) =>
                            setBilling({ ...billing, country: v })
                        }
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <SaveButton>
                        Update Billing
                    </SaveButton>
                </div>
            </section>

            {/* ================= Payment Methods ================= */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                    Payment Methods
                </h3>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium text-gray-900">
                            No payment method added
                        </p>
                        <p className="text-sm text-gray-500">
                            Add a card to make bookings faster.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg border-2 border-purple-600
                                   text-purple-600 hover:bg-purple-600 hover:text-white
                                   transition"
                    >
                        Add Payment Method
                    </button>
                </div>
            </section>
        </div>
    );
}

/* ================= Reusable Field ================= */

function Field({ label, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
        </div>
    );
}