import { McpGeneratorClient } from "@/components/McpGeneratorClient";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        MCP Server Generator
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Paste an OpenAPI JSON spec and generate a TypeScript Model Context Protocol (MCP) server. Requires OPENAI_API_KEY in .env.local.
      </p>
      <div className="mt-6">
        <McpGeneratorClient />
      </div>
    </main>
  );
}
