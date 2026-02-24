import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { sendThankYouEmail } from "@/lib/mailer";

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    // --- Validation ---
    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // --- Database ---
    await connectToDatabase();

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    const subscriber = new Subscriber({ name, email });
    await subscriber.save();

    // --- Email (non-blocking — don't fail the request if email fails) ---
    sendThankYouEmail(name, email).catch((err) => {
      console.error("[mailer] Failed to send thank-you email:", err.message);
    });

    return Response.json(
      { message: "Subscribed successfully! Check your inbox." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[subscribe] Unexpected error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
