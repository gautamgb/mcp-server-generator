/** Max raw request body size (bytes). */
export const MAX_BODY_BYTES = 1_000_000;
/** Max OpenAPI spec length (characters). */
export const MAX_SPEC_LENGTH = 500_000;

export function rejectBodyTooLarge(request: Request, maxBytes: number): Response | null {
  const cl = request.headers.get("content-length");
  if (cl) {
    const n = parseInt(cl, 10);
    if (!Number.isFinite(n) || n > maxBytes) {
      return new Response(
        JSON.stringify({ error: "Request body too large." }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  return null;
}
