import { useDispatch, useSelector } from "react-redux";
import { createOrder, verifyPayment } from "../store/payment/paymentSlice";
import { loadRazorpay } from "../utils/loadRazorpay";

export const usePayment = () => {
    const dispatch = useDispatch();
    const { loading, lastBookingId } = useSelector(state => state.payment);

    const startPayment = async ({
        event,
        ticketType,
        quantity,
        attendee,
        onSuccess,
        onFailure
    }) => {
        const ok = await loadRazorpay();
        if (!ok) return onFailure("Razorpay failed to load");

        const order = await dispatch(
            createOrder({
                eventId: event._id,
                ticketName: ticketType.name,
                quantity,
            })
        ).unwrap();

        const rzp = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            order_id: order.orderId,
            name: "EventHub",
            description: event.title,

            handler: async (response) => {
                try {
                    await dispatch(
                        verifyPayment({
                            ...response,
                        })
                    ).unwrap();

                    onSuccess();
                } catch (error) {
                    onFailure("Payment verification failed");
                    console.log(error);
                }
            },

            modal: {
                ondismiss: () => onFailure("Payment cancelled"),
            },

            prefill: {
                name: `${attendee.first_name} ${attendee.last_name}`,
                email: attendee.email,
                contact: attendee.phone,
            },

            theme: { color: "#7c3aed" },
        });

        rzp.open();
    };

    return { startPayment, loading, lastBookingId };
};