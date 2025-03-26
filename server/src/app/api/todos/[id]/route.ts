import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../auth";
import { todos } from "@/utils/todosStore";
import { corsHeaders } from "@/utils/cors";

export async function DELETE(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  const index = todos.findIndex((todo) => todo.id.toString() === id);
  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  todos.splice(index, 1);

  return NextResponse.json(todos, { headers: corsHeaders() });
}
