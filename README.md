# MCP Server Generator

A small Next.js DevEx tool that generates a **TypeScript Model Context Protocol (MCP) server** from an OpenAPI spec. Paste your OpenAPI JSON (or YAML), click Generate, and get streamed TypeScript code you can copy and use.

## Features

- Single-page UI: textarea for OpenAPI spec + syntax-highlighted output
- Streamed generation via OpenAI (gpt-4o-mini)
- Copy-to-clipboard for the generated code
- No database or auth — just add `OPENAI_API_KEY` and run

## Setup

1. Clone the repo and install dependencies:

   ```bash
   cd MCP-Server-Generator
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set your OpenAI API key:

   ```bash
   cp .env.example .env.local
   # Edit .env.local and set OPENAI_API_KEY=sk-...
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000), paste an OpenAPI spec, and click **Generate MCP Server**.

## Deploy (e.g. Vercel)

- Push to GitHub and import the project in Vercel.
- Add `OPENAI_API_KEY` in Project Settings → Environment Variables.
- Deploy; the app will be available at your Vercel URL.

## Tech

- **Next.js 16** (App Router)
- **OpenAI API** (streaming)
- **Tailwind CSS**
- **react-syntax-highlighter** (dark theme)

## Pushing to a different GitHub account

To push this repo from a **different** GitHub account (e.g. a second user or org):

1. **Create the repo on GitHub** under that account (e.g. `other-account/mcp-server-generator`). Do not add a README or .gitignore so the repo is empty.

2. **Commit locally** (if you haven’t yet):
   ```bash
   cd MCP-Server-Generator
   git add -A
   git config user.email "other-account@example.com"   # email for that account
   git config user.name "Other Account Name"
   git commit -m "feat: MCP Server Generator — OpenAPI to TypeScript MCP server with streaming"
   ```

3. **Add the remote and push** using that account’s credentials:

   - **HTTPS (recommended for second account):**  
     Use a [Personal Access Token (PAT)](https://github.com/settings/tokens) for the other account as the password:
     ```bash
     git remote add origin https://github.com/OTHER_ACCOUNT/mcp-server-generator.git
     git push -u origin main
     ```
     When prompted, use the **other account’s** username and its PAT as the password.

   - **SSH:**  
     Use an SSH key linked to the other account (e.g. `~/.ssh/id_ed25519_other`) and configure the host in `~/.ssh/config`:
     ```
     Host github-other
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_ed25519_other
     ```
     Then:
     ```bash
     git remote add origin git@github-other:OTHER_ACCOUNT/mcp-server-generator.git
     git push -u origin main
     ```

4. **Optional:** To avoid using the wrong account on this repo in the future, leave the local `user.email` and `user.name` set as above (they apply only inside this repo).

## License

MIT
