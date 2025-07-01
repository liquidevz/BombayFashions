"use server"

import { sendEmail } from "@/lib/email-service"

// Contact form action
export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    }

    // Validate required fields
    if (!data.name || !data.email) {
      return { success: false, message: "Name and email are required" }
    }

    // Send email
    const result = await sendEmail(data, "contact")
    return result
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

// Booking form action
export async function submitBookingForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.whatsapp || !data.service) {
      return { success: false, message: "Please fill all required fields" }
    }

    // Send email
    const result = await sendEmail(data, "booking")
    return result
  } catch (error) {
    console.error("Error in booking form submission:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

// Demo booking form action
export async function submitDemoForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      course: formData.get("course") as string,
      message: formData.get("message") as string,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.course) {
      return { success: false, message: "Please fill all required fields" }
    }

    // Send email
    const result = await sendEmail(data, "demo")
    return result
  } catch (error) {
    console.error("Error in demo form submission:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}
