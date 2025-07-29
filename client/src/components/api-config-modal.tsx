import { useState } from "react";
import { X, Eye, EyeOff, Lock, Plug } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApiConfig } from "@/hooks/use-api-config";

interface ApiConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiConfigModal({ open, onOpenChange }: ApiConfigModalProps) {
  const { config, setConfig, saveConfig, testConnection, isTesting } = useApiConfig();
  const [showApiKey, setShowApiKey] = useState(false);
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    saveConfig(localConfig);
    onOpenChange(false);
  };

  const handleTestConnection = () => {
    testConnection();
  };

  const handleProviderChange = (provider: "anthropic" | "openai" | "azure" | "groq") => {
    setLocalConfig({ ...localConfig, provider });
  };

  const handleApiKeyChange = (apiKey: string) => {
    setLocalConfig({ ...localConfig, apiKey });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl bg-[var(--card-dark)] border-[var(--border-dark)]">
        <DialogHeader className="border-b border-[var(--border-dark)] pb-4">
          <DialogTitle className="text-xl font-semibold text-[var(--text-primary)]">
            API Configuration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-6">
          {/* API Provider Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--text-primary)]">
              AI Provider
            </Label>
            <Select
              value={localConfig.provider}
              onValueChange={handleProviderChange}
            >
              <SelectTrigger className="w-full bg-[var(--deep-dark)] border-[var(--border-dark)] text-[var(--text-primary)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--card-dark)] border-[var(--border-dark)]">
                <SelectItem value="anthropic" className="text-[var(--text-primary)]">
                  Anthropic Claude (Default - $10 free monthly)
                </SelectItem>
                <SelectItem value="openai" className="text-[var(--text-primary)]">
                  OpenAI GPT (Limited free tier)
                </SelectItem>
                <SelectItem value="azure" className="text-[var(--text-primary)]">
                  Azure OpenAI (Enterprise)
                </SelectItem>
                <SelectItem value="groq" className="text-[var(--text-primary)]">
                  Groq (High-speed Llama models)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--text-primary)]">
              API Key
            </Label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your API key (stored locally)"
                value={localConfig.apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="w-full bg-[var(--deep-dark)] border-[var(--border-dark)] text-[var(--text-primary)] pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <p className="text-xs text-[var(--text-secondary)] flex items-center space-x-1">
              <Lock size={12} />
              <span>Keys are stored securely in your browser's local storage and never sent to our servers</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-dark)]">
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={isTesting || !localConfig.apiKey}
              className="bg-[var(--border-dark)] text-[var(--text-primary)] border-[var(--border-dark)] hover:bg-[var(--border-dark)]/80"
            >
              <Plug size={16} className="mr-2" />
              {isTesting ? "Testing..." : "Test Connection"}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[var(--cyber-blue)] text-white hover:bg-[var(--cyber-blue)]/90"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
