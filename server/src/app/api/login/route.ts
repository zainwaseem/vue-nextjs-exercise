import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { corsHeaders } from "@/utils/cors";

const SECRET_KEY = "mysupersecretwillkeepindotenv"; // Change this in production
export const runtime = "nodejs"; // 👈 Force Node.js runtime

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === "user" && password === "pass123") {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "30d" });
      return NextResponse.json({ token }, { headers: corsHeaders() });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401, headers: corsHeaders() }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
    } else {
      console.error("Login error:", error);
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
