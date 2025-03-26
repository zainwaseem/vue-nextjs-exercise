import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../auth";
import { todos } from "@/utils/todosStore";
import { corsHeaders } from "@/utils/cors";

export const runtime = "nodejs"; // 👈 Force Node.js runtime

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders() });
}
// GET /api/todos (Get Todos)
export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(todos, { headers: corsHeaders() });
}

// POST /api/todos (Add Todo)
export async function POST(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { task } = await req.json();
  if (!task) {
    return NextResponse.json({ error: "Task is required" }, { status: 400 });
  }

  const newTodo = { id: Date.now(), task };
  todos.push(newTodo);

  return NextResponse.json(todos, { headers: corsHeaders() });
}
