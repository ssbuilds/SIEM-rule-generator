import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Edit, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateRuleSchema, type GenerateRuleRequest } from "@shared/schema";
import { apiClient } from "@/lib/api-client";
import { useApiConfig } from "@/hooks/use-api-config";
import { useToast } from "@/hooks/use-toast";
import { GeneratedRules } from "@/pages/home";

interface RuleGeneratorFormProps {
  onRulesGenerated: (rules: GeneratedRules) => void;
}

export function RuleGeneratorForm({ onRulesGenerated }: RuleGeneratorFormProps) {
  const { config } = useApiConfig();
  const { toast } = useToast();
  
  const form = useForm<GenerateRuleRequest>({
    resolver: zodResolver(generateRuleSchema),
    defaultValues: {
      useCase: "",
      logSource: "",
      eventIds: "",
      severity: "medium",
      mitreAttack: "",
      apiProvider: config.provider,
      apiKey: config.apiKey,
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateRuleRequest) => {
      return apiClient.generateRules({
        ...data,
        apiProvider: config.provider,
        apiKey: config.apiKey,
      });
    },
    onSuccess: (data) => {
      onRulesGenerated(data);
      toast({
        title: "Rules Generated Successfully",
        description: "Your SIEM rules have been generated and are ready to use.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate SIEM rules. Please check your API configuration.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GenerateRuleRequest) => {
    if (!config.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your API key in the settings before generating rules.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate(data);
  };

  // Template loading function
  const loadTemplate = (template: {
    useCase: string;
    logSource: string;
    eventIds: string;
    severity: "low" | "medium" | "high" | "critical";
    mitre: string;
  }) => {
    form.setValue("useCase", template.useCase);
    form.setValue("logSource", template.logSource);
    form.setValue("eventIds", template.eventIds);
    form.setValue("severity", template.severity);
    form.setValue("mitreAttack", template.mitre);
    
    toast({
      title: "Template Loaded",
      description: "Example template has been loaded into the form.",
    });
  };

  // Expose loadTemplate to parent via window (for template buttons)
  (window as any).loadTemplate = loadTemplate;

  return (
    <div className="cyber-card">
      <div className="p-6 border-b border-[var(--border-dark)]">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] flex items-center space-x-2">
          <Edit className="text-[var(--cyber-blue)]" size={20} />
          <span>Describe Your SIEM Use Case</span>
        </h2>
        <p className="text-[var(--text-secondary)] mt-1">
          Enter a natural language description of the security event or threat you want to detect
        </p>
      </div>
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Main Description */}
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[var(--text-primary)]">
                    Use Case Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Example: Detect lateral movement using PsExec tool by monitoring process creation events where the parent process is psexec.exe and child processes are cmd.exe or powershell.exe on remote systems..."
                      className="min-h-[100px] cyber-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technical Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="logSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[var(--text-primary)]">
                      Log Source / Data Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Windows Security, Sysmon, Process Creation"
                        className="cyber-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eventIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[var(--text-primary)]">
                      Event ID(s)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 4688, 1, 4624"
                        className="cyber-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[var(--text-primary)]">
                      Severity Level
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="cyber-input">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[var(--card-dark)] border-[var(--border-dark)]">
                        <SelectItem value="low" className="text-[var(--text-primary)]">Low</SelectItem>
                        <SelectItem value="medium" className="text-[var(--text-primary)]">Medium</SelectItem>
                        <SelectItem value="high" className="text-[var(--text-primary)]">High</SelectItem>
                        <SelectItem value="critical" className="text-[var(--text-primary)]">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mitreAttack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[var(--text-primary)]">
                      MITRE ATT&CK Technique
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., T1021.002 (Remote Services: SMB/Windows Admin Shares)"
                        className="cyber-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={generateMutation.isPending}
                className="w-full cyber-button glow-effect"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Generating SIEM Rules...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    <span>Generate SIEM Rules</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
