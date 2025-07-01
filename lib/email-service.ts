"use server"

import nodemailer from "nodemailer"

// Email template types
type EmailTemplate = "contact" | "booking" | "demo"

// Email data interface
interface EmailData {
  name: string
  email: string
  subject?: string
  message?: string
  phone?: string
  service?: string
  course?: string
  date?: string
  time?: string
  whatsapp?: string
  [key: string]: any // For any additional fields
}

// Format data into HTML for email body
function formatDataToHtml(data: EmailData, template: EmailTemplate): string {
  // Common header and footer
  const header = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="background: linear-gradient(90deg, #8a2be2, #ff6347); padding: 15px; border-radius: 5px 5px 0 0;">
        <h2 style="color: white; margin: 0; text-align: center;">BombayFashions </h2>
        <p style="color: white; margin: 5px 0 0; text-align: center; font-size: 14px;">
  `

  const footer = `
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px; text-align: center;">
        <p>© ${new Date().getFullYear()} BombayFashions . All rights reserved.</p>
        <p>123 Music Avenue, Thane West, Maharashtra 400601, India</p>
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

    case "demo":
      title = "New Demo Session Request"
      content = `
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
          <p><strong>Course:</strong> ${data.course || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${data.message || "No message provided"}
          </div>
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
    let subject = "BombayFashions  - "
    switch (template) {
      case "contact":
        subject += "New Contact Form Submission"
        break
      case "booking":
        subject += "New Booking Request"
        break
      case "demo":
        subject += "New Demo Session Request"
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
