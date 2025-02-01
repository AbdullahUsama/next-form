// app/api/submit-form/route.ts
import dbConnect from "@/app/lib/db";
import FormData from "@/app/models/Form";
import { NextResponse } from "next/server";

// Define the expected shape of the request body
interface FormDataRequestBody {
  name: string;
  email: string;
  details: string;
}

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body: FormDataRequestBody = await request.json();
    const { name, email, details } = body;

    // Save the form data to MongoDB
    const newFormData = await FormData.create({ name, email, details });

    // Return the saved data as a JSON response
    return NextResponse.json(newFormData, { status: 201 });
  } catch (error) {
    // Handle errors
    console.error("Error saving form data:", error);

    // Return an error response
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
