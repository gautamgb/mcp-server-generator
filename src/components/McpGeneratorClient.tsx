"use client";

import { useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function McpGeneratorClient() {
  const [spec, setSpec] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    setError(null);
    setOutput("");
    setStreaming(true);
    try {
      const res = await fetch("/api/demo/mcp-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Request failed: ${res.status}`);
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setStreaming(false);
    }
  }, [spec]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="min-w-0 space-y-3">
        <label htmlFor="mcp-spec" className="block text-sm font-medium text-neutral-900">
          OpenAPI spec (JSON)
        </label>
        <textarea
          id="mcp-spec"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          placeholder='Paste your OpenAPI JSON or YAML here, e.g. {"openapi":"3.0.0","paths":{}}'
          className="w-full min-h-[400px] rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-mono text-neutral-900 resize-y"
          disabled={streaming}
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={streaming || !spec.trim()}
          className="rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900 disabled:opacity-50"
        >
          {streaming ? "Generating…" : "Generate MCP Server"}
        </button>
      </div>

      <div className="min-w-0 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-sm font-medium text-neutral-900">
            Generated MCP server (TypeScript)
          </label>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className="rounded border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
          >
            {copied ? "Copied" : "Copy Code"}
          </button>
        </div>
        <div className="relative min-h-[400px] overflow-hidden rounded-md border border-neutral-200">
          {error && (
            <p className="p-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {!error && (
            <>
              {!output && !streaming && (
                <p className="absolute inset-0 flex items-center justify-center p-4 text-sm text-neutral-500">
                  Generated code will appear here
                </p>
              )}
              {(output || streaming) && (
                <SyntaxHighlighter
                  language="typescript"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    minHeight: "400px",
                    fontSize: "0.8125rem",
                    background: "#1e1e1e",
                  }}
                  showLineNumbers
                  wrapLongLines
                >
                  {output || " "}
                </SyntaxHighlighter>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
