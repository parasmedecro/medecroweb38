import dbConnect from "@/lib/dbConnect";
import Assessment from "@/db/Assessment";
import { getAuth } from "@clerk/nextjs/server"; // Clerk's authentication helper

export default async function handler(req, res) {
  if (req.method !== "POST") {  // Ensure it's checking for POST
    return res.status(405).json({ message: "Method Not Allowed" }); // 405 error
  }

  try {
    await dbConnect();
    
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const formData = { ...req.body, userId };

    const newAssessment = new Assessment(formData);
    await newAssessment.save();

    res.status(201).json({ message: "Form data submitted successfully", data: newAssessment });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
