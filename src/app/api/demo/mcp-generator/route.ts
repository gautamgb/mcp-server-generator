import { OpenAI } from "openai";
import type { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are an expert Principal Engineer. Convert the provided OpenAPI spec into a complete, secure, type-safe TypeScript Model Context Protocol (MCP) server implementation. Expose the API endpoints as MCP tools. Output only the raw TypeScript code, no markdown code fences or explanations.`;

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "OPENAI_API_KEY is not configured. Add it in .env.local or Vercel." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { spec?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const spec = typeof body?.spec === "string" ? body.spec.trim() : "";
  if (!spec) {
    return new Response(
      JSON.stringify({ error: "Missing or empty 'spec' in request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: spec },
      ],
      stream: true,
    });

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: "OpenAI request failed: " + message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export function GET() {
  return new Response(null, { status: 405 });
}
