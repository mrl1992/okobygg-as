import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Bestilling" <${process.env.SMTP_USER}>`,
      to: "markuslippestad@gmail.com",
      subject: "Ny bestilling mottatt",
      text: `
      Kunde: ${body.customer.name}
      E-post: ${body.customer.email}
      Telefon: ${body.customer.phone}

      Produkter:
      ${body.cart.map((p: any) => `- ${p.title}, antall: ${p.quantity}, tykkelse: ${p.thickness}`).join("\n")}
    `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (err: any) {
    console.error("❌ Email send error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Kunne ikke sende e-post: " + err.message,
    });
  }
});
