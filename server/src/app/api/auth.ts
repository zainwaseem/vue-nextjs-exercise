import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Change this in production

export function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Token verification error:", error.message);
    } else {
      console.error("Token verification error:", error);
    }
    return null;
  }
}
