"use server"

import nodemailer from "nodemailer"

// Email template types
type EmailTemplate = "contact" | "booking"

// Email data interface
interface EmailData {
  name: string
  email: string
  phone?: string
  whatsapp?: string
  service?: string
  message?: string
  date?: string
  time?: string
}

// Format data into HTML for email body
function formatDataToHtml(data: EmailData, template: EmailTemplate): string {
  // Common header and footer
  const header = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(to right, #8a2be2, #4a00e0); padding: 20px; border-radius: 10px 10px 0 0;">
        <p style="color: white; font-size: 24px; margin: 0; padding: 10px 0;">
  `

  const footer = `
      </div>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; margin-top: 20px; text-align: center;">
        <p style="color: #6c757d; margin: 0;">© ${new Date().getFullYear()} BombayFashions . All rights reserved.</p>
      </div>
    </div>
  `

  // Template-specific content
  let title = ""
  let content = ""

  switch (template) {
    case "contact":
      title = "New Contact Form Submission"
      content = `
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${data.service || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${data.message || "No message provided"}
          </div>
        </div>
      `
      break

    case "booking":
      title = "New Booking Request"
      content = `
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp || "Not provided"}</p>
          <p><strong>Service:</strong> ${data.service || "Not specified"}</p>
          <p><strong>Date:</strong> ${data.date || "Not specified"}</p>
          <p><strong>Time:</strong> ${data.time || "Not specified"}</p>
        </div>
      `
      break
  }

  return `${header}${title}</p></div>${content}${footer}`
}

// Send email function
export async function sendEmail(
  data: EmailData,
  template: EmailTemplate,
): Promise<{ success: boolean; message: string }> {
  try {
    // Create a transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use app password, not regular password
      },
      secure: true,
    })

    // Format subject based on template
    let subject = "BombayFashions  - "
    switch (template) {
      case "contact":
        subject += "New Contact Form Submission"
        break
      case "booking":
        subject += "New Booking Request"
        break
    }

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "sid17upasani@gmail.com",
      subject,
      html: formatDataToHtml(data, template),
      replyTo: data.email,
    })

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}
