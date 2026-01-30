import { AddIcon, DeleteIcon } from "../Icon";

const TicketsTab = ({
    errors,
    clearError,
    registerField,
    tickets,
    setTickets,
    addTicket,
}) => {
    return (
        <div
            className="space-y-6"
            ref={registerField("tickets")}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Ticket Types *</h2>
                <button
                    type="button"
                    onClick={addTicket}
                    className="font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-base flex items-center gap-1"
                >
                    <AddIcon className="mr-2" />
                    Add Ticket Type
                </button>
            </div>

            {errors.tickets && (
                <p className="text-sm text-red-500">
                    At least one ticket type is required
                </p>
            )}

            {tickets.map((ticket, idx) => {
                const hasError = errors[`ticket-${idx}`];

                return (
                    <div
                        key={idx}
                        ref={registerField(`ticket-${idx}`)}
                        className={`p-4 rounded-lg relative border
                            ${hasError ? "border-red-500" : "border-gray-200"}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium">
                                Ticket Type {idx + 1}
                            </h3>

                            {tickets.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTickets(prev =>
                                            prev.filter((_, i) => i !== idx)
                                        );
                                        clearError(`ticket-${idx}`);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <DeleteIcon />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Ticket Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ticket Name *
                                </label>
                                <input
                                    placeholder="General Admission"
                                    value={ticket.name}
                                    onChange={(e) => {
                                        const updated = [...tickets];
                                        updated[idx].name = e.target.value;
                                        setTickets(updated);
                                        clearError(`ticket-${idx}`);
                                    }}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500
                                        ${hasError && !ticket.name
                                            ? "border-red-500"
                                            : "border-gray-300"}`}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="50"
                                    value={ticket.price}
                                    onChange={(e) => {
                                        const updated = [...tickets];
                                        updated[idx].price = e.target.value;
                                        setTickets(updated);
                                        clearError(`ticket-${idx}`);
                                        clearError("ticketValidation");
                                    }}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500
                                        ${hasError && !ticket.price
                                            ? "border-red-500"
                                            : "border-gray-300"}`}
                                />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    placeholder="100"
                                    value={ticket.quantity}
                                    onChange={(e) => {
                                        const updated = [...tickets];
                                        updated[idx].quantity = e.target.value;
                                        setTickets(updated);
                                        clearError(`ticket-${idx}`);
                                        clearError("ticketValidation");
                                    }}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500
                                        ${hasError && !ticket.quantity
                                            ? "border-red-500"
                                            : "border-gray-300"}`}
                                />
                            </div>
                        </div>

                        {hasError && (
                            <p className="mt-2 text-sm text-red-500">
                                All fields are required for this ticket
                            </p>
                        )}
                    </div>
                );
            })}

            {errors.ticketValidation && (
                <p className="text-sm text-red-500 mt-2">
                    {errors.ticketValidation}
                </p>
            )}
        </div>
    );
};

export default TicketsTab;