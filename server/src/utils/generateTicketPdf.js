import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export const generateTicketPdf = async (booking, event) => {
    const browser = await puppeteer.launch({
        headless: "new"
    });

    const page = await browser.newPage();

    const html = fs.readFileSync(
        path.join(process.cwd(), "src", "templates", "ticket.html"),
        "utf-8"
    )
        .replace("{{eventTitle}}", event.title)
        .replace("{{eventDate}}", new Date(event.date).toDateString())
        .replace("{{venue}}", event.location?.physical?.venueSnapshot?.name || "Online")
        .replace("{{name}}", `${booking.attendee.first_name} ${booking.attendee.last_name}`)
        .replace("{{email}}", booking.attendee.email)
        .replace("{{ticket}}", booking.ticket.name)
        .replace("{{qty}}", booking.ticket.quantity)
        .replace("{{amount}}", booking.amountPaid)
        .replace("{{bookingId}}", booking._id)
        .replace("{{qrCode}}", booking.qrCode);

    await page.setContent(html, { waitUntil: "networkidle0" });

    const outputDir = path.join(process.cwd(), "uploads", "tickets");
    fs.mkdirSync(outputDir, { recursive: true });

    const filePath = path.join(outputDir, `ticket-${booking._id}.pdf`);

    await page.pdf({
        path: filePath,
        format: "A4",
        landscape: true,
        printBackground: true,
    });

    await browser.close();

    return `/uploads/tickets/ticket-${booking._id}.pdf`;
};