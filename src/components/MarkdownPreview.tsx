import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        h2: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        h3: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        h4: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        h5: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        h6: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        p: ({ children }) => (
          <p className="text-sm font-normal text-gray-600">{children}</p>
        ),
        li: ({ children }) => (
          <li className="text-sm font-normal list-disc ml-4 text-gray-600">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-600">{children}</strong>
        ),
        code: ({ children }) => (
          <code className="text-xs bg-gray-100 px-1 rounded">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
