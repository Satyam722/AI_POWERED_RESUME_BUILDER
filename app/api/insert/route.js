// /app/api/insert/route.js

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Resume from "@/models/resumemodel"; // ✅ your model file
import connect from "@/utils/db"; // ✅ your DB connect file

export async function POST(req) {
  await connect(); // Connect to MongoDB
  const { userId } = auth(); // Get Clerk User ID

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newResume = new Resume({ ...body, userId });
    await newResume.save();
    return NextResponse.json({ success: true, message: "Resume saved!" });
  } catch (error) {
    console.error("Resume Save Error:", error);
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 });
  }
}
