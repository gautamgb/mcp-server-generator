# MCP Server Generator

Paste an OpenAPI spec, get a production-ready MCP server in TypeScript. One click.

## Why This Exists

When I drove the MCP-first mandate at Qualtrics, the biggest bottleneck wasn't buy-in — it was boilerplate. Every team that wanted to expose their API as an MCP tool had to manually write the server scaffolding, map endpoints to MCP tool definitions, and handle the protocol plumbing. It took days per integration. This tool reduces that to seconds: paste your OpenAPI spec, and it generates a complete, deployable MCP server using streaming code generation.

The agentic ecosystem won't scale if every tool integration requires a developer spending a week on protocol boilerplate. This fixes that. 

## Key Features

- **Single-page interface** — paste OpenAPI spec, get TypeScript MCP server
- **Streaming code generation** powered by OpenAI (gpt-4o-mini)
- **Production-ready output** — generated servers follow MCP protocol conventions and are deployment-ready
- **Copy-to-clipboard** with syntax-highlighted preview
- **Minimal setup** — one environment variable (`OPENAI_API_KEY`)

## Getting Started

```bash
git clone https://github.com/gautamgb/mcp-server-generator.git
cd MCP-Server-Generator
npm install
cp .env.example .env.local  # Add your OPENAI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), paste an OpenAPI specification, and generate your MCP server.

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** OpenAI API (streaming)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Live Demo

[seekgb.com](https://www.seekgb.com)

## License

MIT
