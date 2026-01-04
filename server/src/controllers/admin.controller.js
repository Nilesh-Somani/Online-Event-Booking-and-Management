export const approveEvent = async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    res.json(event);
};