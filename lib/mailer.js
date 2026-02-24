import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use a Gmail App Password, not your account password
  },
});

/**
 * Sends a branded "Thank you for subscribing" email.
 * @param {string} name  - Subscriber's name
 * @param {string} email - Subscriber's email address
 */
export async function sendThankYouEmail(name, email) {
  const mailOptions = {
    from: `"Yash | Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "You're In — Subscription Confirmed ⚡",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Subscription Confirmed</title>
      </head>
      <body style="margin:0;padding:0;background-color:#0a0a1a;font-family:'Segoe UI',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,rgba(79,70,229,0.12),rgba(59,130,246,0.08));
                       border:1px solid rgba(255,255,255,0.08);
                       border-radius:20px;
                       padding:48px 40px;
                       max-width:560px;">
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <!-- Gradient heading bar -->
                    <div style="height:4px;width:80px;background:linear-gradient(90deg,#4f46e5,#3b82f6);
                                border-radius:4px;margin-bottom:32px;"></div>
                    <h1 style="margin:0;font-size:28px;font-weight:700;
                               background:linear-gradient(135deg,#818cf8,#60a5fa);
                               -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                               letter-spacing:0.05em;">
                      SIGNAL RECEIVED
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="color:#94a3b8;font-size:16px;line-height:1.8;text-align:center;padding-bottom:28px;">
                    <p style="margin:0 0 16px;">Hey <strong style="color:#e2e8f0;">${name}</strong>,</p>
                    <p style="margin:0 0 16px;">
                      Your connection to the grid is now <strong style="color:#60a5fa;">active</strong>.
                      You'll be the first to know about new projects, insights, and ideas as they emerge.
                    </p>
                    <p style="margin:0;">
                      Thanks for subscribing — the future's looking sharp.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:16px;">
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(79,70,229,0.4),transparent);
                                margin-bottom:28px;"></div>
                    <p style="margin:0;font-size:12px;color:#475569;letter-spacing:0.08em;">
                      — YASH | DATA SCIENCE PORTFOLIO —
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
}
