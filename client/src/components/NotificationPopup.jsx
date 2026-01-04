import { useEffect, useRef } from "react";

export default function NotificationPopup({ open, onClose }) {
    const ref = useRef(null);

    // outside click close
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-800">
                        Mark all read
                    </button>
                </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
                {/* unread */}
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 bg-purple-50 cursor-pointer">
                    <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 bg-purple-500" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900">
                                New booking for Summer Music Festival
                            </p>
                            <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 bg-purple-50 cursor-pointer">
                    <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 bg-purple-500" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900">
                                Event "Tech Conference" has been approved
                            </p>
                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                    </div>
                </div>

                {/* read */}
                <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-2 mr-3 bg-gray-400" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900">
                                Art Gallery Opening starts in 2 days
                            </p>
                            <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}