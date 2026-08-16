export const dynamic = "force-dynamic";

const headers = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store",
};

export function GET() {
  return new Response("ok\n", { headers });
}

export function HEAD() {
  return new Response(null, { status: 200, headers });
}
