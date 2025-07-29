import { useState } from "react";
import { Shield, Settings, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiConfigModal } from "../components/api-config-modal";
import { RuleGeneratorForm } from "../components/rule-generator-form";
import { OutputSection } from "../components/output-section";
import { ExampleTemplates } from "../components/example-templates";
import { useApiConfig } from "../hooks/use-api-config";

export interface GeneratedRules {
  id: number;
  sigmaRule: string;
  kqlQuery: string;
  ruleId: string;
  metadata: {
    severity: string;
    mitreMapping: string;
    generationTimestamp: string;
  };
}

export default function Home() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [generatedRules, setGeneratedRules] = useState<GeneratedRules | null>(null);
  const { config, isConnected } = useApiConfig();

  return (
    <div className="min-h-screen bg-[var(--deep-dark)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="bg-[var(--card-dark)] border-b border-[var(--border-dark)] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--cyber-blue)] rounded-lg flex items-center justify-center">
                <Shield className="text-white text-lg" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">SIEM Rule Generator</h1>
                <p className="text-sm text-[var(--text-secondary)]">Convert natural language to Sigma rules & KQL queries</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowConfigModal(true)}
                className="text-[var(--text-secondary)] hover:text-[var(--cyber-blue)] hover:bg-[var(--border-dark)]"
              >
                <Settings size={20} />
              </Button>
              <div className="w-px h-6 bg-[var(--border-dark)]"></div>
              <div className="text-right">
                <div className="text-sm text-[var(--text-secondary)]">API Status</div>
                <div className={`text-sm font-medium flex items-center space-x-1 ${
                  isConnected ? 'text-[var(--success-green)]' : 'text-[var(--error-red)]'
                }`}>
                  <Circle size={8} fill="currentColor" />
                  <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        <RuleGeneratorForm onRulesGenerated={setGeneratedRules} />
        
        {generatedRules && <OutputSection rules={generatedRules} />}
        
        <ExampleTemplates />
      </main>

      {/* Footer */}
      <footer className="bg-[var(--card-dark)] border-t border-[var(--border-dark)] mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">Documentation</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">API Configuration</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Sigma Rule Format</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">KQL Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">MITRE ATT&CK</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Technique Matrix</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Tactics Overview</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Detection Strategies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">GitHub Repository</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Issue Tracker</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Contributing Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[var(--cyber-blue)] transition-colors">Open Source License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border-dark)] pt-6 mt-6 flex items-center justify-between">
            <div className="text-sm text-[var(--text-secondary)]">
              SIEM Rule Generator v1.0.0 - Open Source Security Tool
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-[var(--text-secondary)]">Powered by</span>
              <span className="text-[var(--cyber-blue)] font-medium text-sm">Anthropic Claude</span>
              <span className="text-[var(--text-secondary)] text-xs">•</span>
              <span className="text-[var(--success-green)] font-medium text-sm">OpenAI GPT</span>
            </div>
          </div>
        </div>
      </footer>

      <ApiConfigModal 
        open={showConfigModal} 
        onOpenChange={setShowConfigModal}
      />
    </div>
  );
}
