// app/api/signup/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    // ✅ Return user so frontend can auto-login after signup
    return Response.json({
      message: "User Created",
      user: { name, email },
    });

  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}