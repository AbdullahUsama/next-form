"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";

interface FormData {
  name: string;
  email: string;
  details: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    details: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", details: "" });
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }

    try {
      // Convert formData to plain object (if necessary)
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        details: formData.details,
      };
      console.log(process.env.NEXT_PUBLIC_EMAILJS_USER_ID!);
      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_1!, // Template ID
        dataToSend, // Data to pass into the template
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID! // User ID
      );
      // Send second email
      const result2 = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2!, // Template ID
        dataToSend, // Data to pass into the template
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID! // User ID
      );
      console.log("Email sent:", result.text);
      console.log("Email sent:", result2.text);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Submit Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="details"
            >
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
