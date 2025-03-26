import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../auth";
import { todos } from "@/utils/todosStore";
import { corsHeaders } from "@/utils/cors";

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function DELETE(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: corsHeaders(),
        }
      );
    }

    const id = parseInt(req.nextUrl.pathname.split("/").pop() || "0", 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Todo not found" },
        {
          status: 404,
          headers: corsHeaders(),
        }
      );
    }

    todos.splice(index, 1);

    return NextResponse.json(todos, { headers: corsHeaders() });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Delete todo error:", error.message);
    } else {
      console.error("Delete todo error:", error);
    }
  }
}
