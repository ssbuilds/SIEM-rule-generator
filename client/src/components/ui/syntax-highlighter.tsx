import { useEffect, useRef } from "react";

interface SyntaxHighlighterProps {
  code: string;
  language: "yaml" | "sql" | "kql";
  className?: string;
}

export function SyntaxHighlighter({ code, language, className = "" }: SyntaxHighlighterProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && window.Prism) {
      window.Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const languageClass = language === "kql" ? "language-sql" : `language-${language}`;

  return (
    <div className={`syntax-highlight rounded-lg border border-[var(--border-dark)] ${className}`}>
      <pre className="code-block text-sm text-[var(--text-primary)] p-4 overflow-x-auto">
        <code ref={codeRef} className={languageClass}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// Extend window type for Prism
declare global {
  interface Window {
    Prism: any;
  }
}
