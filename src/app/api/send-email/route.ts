// app/api/send-email/route.ts
export const runtime = "nodejs";       // <- Asegura Node, no Edge
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nombre, email, telefono, empresa, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"VI Studio" <${process.env.EMAIL_USER}>`,
      to: "servicioalcliente.ekko@gmail.com",
      replyTo: email,
      subject: "Nueva solicitud de cotización",
      html: `
        <h2>Nueva cotización</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa || "-"}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || "-"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${(mensaje || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("send-email error:", err.message);
    } else if (typeof err === "object" && err !== null && "code" in err) {
      console.error("send-email error:", (err as { code?: string }).code);
    } else {
      console.error("send-email error:", err);
    }

    return NextResponse.json(
      { error: "Error enviando correo" },
      { status: 500 }
    );
  }

}
