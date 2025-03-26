export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // Change this to your frontend domain in production
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
