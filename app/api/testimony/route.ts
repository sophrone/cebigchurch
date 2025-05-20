import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    // Log environment variables (without exposing sensitive info)
    console.log("Environment variables loaded:", {
      userExists: !!process.env.EMAIL_USER,
      passExists: !!process.env.EMAIL_PASS,
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing environment variables: EMAIL_USER or EMAIL_PASS");
      return NextResponse.json(
        { error: "Server configuration error: Missing email credentials" },
        { status: 500 }
      );
    }

    const { name, email, testimony } = await request.json();
    console.log("Received form data:", { name, email, testimony });

    // Basic backend validation
    if (!name || !email || !testimony) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log("Validation failed: Invalid email format");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }
    if (testimony.length < 20) {
      console.log("Validation failed: Testimony too short");
      return NextResponse.json(
        { error: "Testimony must be at least 20 characters" },
        { status: 400 }
      );
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("Transporter is ready");
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      throw verifyError;
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "cebigchurchtestimonies@gmail.com",
      subject: `New Testimony Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Testimony: ${testimony}
      `,
      html: `
        <h2>New Testimony Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Testimony:</strong> ${testimony}</p>
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(
        "Email sent successfully to cebigchurchtestimonies@gmail.com"
      );
    } catch (sendError) {
      console.error("Failed to send email:", sendError);
      throw sendError;
    }

    return NextResponse.json(
      { message: "Testimony submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/testimony:", error);
    return NextResponse.json(
      { error: "Failed to submit testimony. Check server logs for details." },
      { status: 500 }
    );
  }
}
