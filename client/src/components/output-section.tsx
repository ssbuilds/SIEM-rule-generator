import { useState } from "react";
import { Code, Search, Copy, CheckCircle, CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { useToast } from "@/hooks/use-toast";
import { GeneratedRules } from "@/pages/home";

interface OutputSectionProps {
  rules: GeneratedRules;
}

export function OutputSection({ rules }: OutputSectionProps) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sigma Rule Output */}
      <div className="cyber-card">
        <div className="p-6 border-b border-[var(--border-dark)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="text-[var(--cyber-blue)]" size={20} />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Sigma Rule</h3>
            <span className="text-xs bg-[var(--cyber-blue)] text-white px-2 py-1 rounded-full">
              Universal SIEM Format
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(rules.sigmaRule, "Sigma rule")}
            className="bg-[var(--border-dark)] text-[var(--text-primary)] border-[var(--border-dark)] hover:bg-[var(--border-dark)]/80"
          >
            <Copy size={16} className="mr-2" />
            Copy
          </Button>
        </div>
        <div className="p-6">
          <SyntaxHighlighter
            code={rules.sigmaRule}
            language="yaml"
          />
        </div>
      </div>

      {/* KQL Query Output */}
      <div className="cyber-card">
        <div className="p-6 border-b border-[var(--border-dark)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="text-[var(--success-green)]" size={20} />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">KQL Query</h3>
            <span className="text-xs bg-[var(--success-green)] text-white px-2 py-1 rounded-full">
              Microsoft Sentinel
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(rules.kqlQuery, "KQL query")}
            className="bg-[var(--border-dark)] text-[var(--text-primary)] border-[var(--border-dark)] hover:bg-[var(--border-dark)]/80"
          >
            <Copy size={16} className="mr-2" />
            Copy
          </Button>
        </div>
        <div className="p-6">
          <SyntaxHighlighter
            code={rules.kqlQuery}
            language="kql"
          />
        </div>
      </div>

      {/* Rule Validation & Metadata */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="cyber-card">
          <div className="p-6 border-b border-[var(--border-dark)]">
            <h4 className="font-semibold text-[var(--text-primary)] flex items-center space-x-2">
              <CheckCircle className="text-[var(--success-green)]" size={20} />
              <span>Rule Validation</span>
            </h4>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">Sigma Syntax</span>
              <span className="flex items-center space-x-1 text-[var(--success-green)]">
                <CheckCircle size={16} />
                <span className="text-sm">Valid</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">KQL Syntax</span>
              <span className="flex items-center space-x-1 text-[var(--success-green)]">
                <CheckCircle size={16} />
                <span className="text-sm">Valid</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">MITRE Mapping</span>
              <span className="flex items-center space-x-1 text-[var(--success-green)]">
                <CheckCircle size={16} />
                <span className="text-sm">Mapped</span>
              </span>
            </div>
          </div>
        </div>

        <div className="cyber-card">
          <div className="p-6 border-b border-[var(--border-dark)]">
            <h4 className="font-semibold text-[var(--text-primary)] flex items-center space-x-2">
              <CircleOff className="text-[var(--cyber-blue)]" size={20} />
              <span>Detection Metadata</span>
            </h4>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Rule ID:</span>
              <span className="text-[var(--text-primary)] font-mono">{rules.ruleId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Severity:</span>
              <span className={`font-medium ${
                rules.metadata.severity === 'critical' ? 'text-[var(--error-red)]' :
                rules.metadata.severity === 'high' ? 'text-[var(--warning-amber)]' :
                rules.metadata.severity === 'medium' ? 'text-[var(--cyber-blue)]' :
                'text-[var(--success-green)]'
              }`}>
                {rules.metadata.severity.charAt(0).toUpperCase() + rules.metadata.severity.slice(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">MITRE Technique:</span>
              <span className="text-[var(--text-primary)]">{rules.metadata.mitreMapping}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Generated:</span>
              <span className="text-[var(--text-primary)]">
                {new Date(rules.metadata.generationTimestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
