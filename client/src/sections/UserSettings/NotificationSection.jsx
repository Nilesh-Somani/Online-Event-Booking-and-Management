import Toggle from "../../ui/Toggle";
import SaveButton from "../../ui/SaveButton";

/**
 * NotificationSection
 *
 * Source: user.settings.notifications
 *
 * Editable:
 * - email
 * - sms
 * - marketing
 *
 * Card-based section layout (entire section separated)
 */
export default function NotificationSection({
    notifications = {},
    onChange,
    onSave,
    saving = false,
}) {
    const updateNotification = (field, value) => {
        onChange?.({
            ...notifications,
            [field]: value,
        });
    };

    return (
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Notification Preferences
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Control how and when you receive notifications.
                </p>
            </div>

            {/* Notification Toggles */}
            <div className="space-y-6">
                <Toggle
                    label="Email notifications"
                    description="Receive booking updates and important information via email."
                    checked={!!notifications.email}
                    onChange={(v) => updateNotification("email", v)}
                />

                <Toggle
                    label="SMS notifications"
                    description="Get critical alerts and reminders directly to your phone."
                    checked={!!notifications.sms}
                    onChange={(v) => updateNotification("sms", v)}
                />

                <Toggle
                    label="Marketing notifications"
                    description="Receive promotions, offers, and product updates."
                    checked={!!notifications.marketing}
                    onChange={(v) => updateNotification("marketing", v)}
                />
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <SaveButton onClick={onSave} loading={saving}>
                    Save Preferences
                </SaveButton>
            </div>
        </section>
    );
}