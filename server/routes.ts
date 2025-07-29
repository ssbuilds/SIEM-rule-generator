import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/ai-service";
import { generateRuleSchema, apiConfigSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate SIEM rules endpoint
  app.post("/api/generate-rules", async (req, res) => {
    try {
      const validatedData = generateRuleSchema.parse(req.body);
      
      const result = await aiService.generateRules(validatedData, validatedData.apiKey);
      
      // Store the generation in memory
      const ruleGeneration = await storage.createRuleGeneration({
        useCase: validatedData.useCase,
        logSource: validatedData.logSource || null,
        eventIds: validatedData.eventIds || null,
        severity: validatedData.severity,
        mitreAttack: validatedData.mitreAttack || null,
        sigmaRule: result.sigmaRule,
        kqlQuery: result.kqlQuery,
        ruleId: result.ruleId,
      });

      res.json({
        id: ruleGeneration.id,
        sigmaRule: result.sigmaRule,
        kqlQuery: result.kqlQuery,
        ruleId: result.ruleId,
        metadata: result.metadata,
      });
    } catch (error: any) {
      console.error('Rule generation error:', error);
      res.status(400).json({ 
        message: error.message || "Failed to generate SIEM rules",
        error: error.name === 'ZodError' ? error.errors : undefined
      });
    }
  });

  // Test API connection endpoint
  app.post("/api/test-connection", async (req, res) => {
    try {
      const { provider, apiKey } = apiConfigSchema.parse(req.body);
      
      const isValid = await aiService.testConnection(provider, apiKey);
      
      res.json({ 
        success: isValid,
        message: isValid ? "API connection successful" : "API connection failed"
      });
    } catch (error: any) {
      console.error('Connection test error:', error);
      res.status(400).json({ 
        success: false,
        message: error.message || "Failed to test API connection"
      });
    }
  });

  // Demo endpoint with realistic examples
  app.post("/api/demo-rules", async (req, res) => {
    try {
      const validatedData = generateRuleSchema.parse(req.body);
      
      // Simulate realistic SIEM rule generation based on research
      const demoResult = {
        id: Math.floor(Math.random() * 1000),
        sigmaRule: `title: ${validatedData.useCase.substring(0, 50)}...
id: demo-${Math.random().toString(36).substr(2, 9)}
description: Detection rule for ${validatedData.useCase}
status: experimental
author: SIEM Rule Generator
date: ${new Date().toISOString().split('T')[0]}
modified: ${new Date().toISOString().split('T')[0]}
tags:
    - attack.${validatedData.mitreAttack ? validatedData.mitreAttack.split('.')[0].toLowerCase() : 'unknown'}
    - attack.${validatedData.mitreAttack || 'unknown'}
    - ${validatedData.logSource?.toLowerCase().replace(' ', '_') || 'windows'}
logsource:
    product: ${validatedData.logSource || 'windows'}
    service: security
detection:
    selection:
        EventID: ${validatedData.eventIds || '4625'}
        ${validatedData.logSource?.includes('Sysmon') ? 'Image|endswith:' : 'LogonType:'} 
            ${validatedData.logSource?.includes('Sysmon') ? "- '\\\\psexec.exe'" : '- 3'}
    condition: selection
fields:
    - EventID
    - ${validatedData.logSource?.includes('Sysmon') ? 'Image' : 'LogonType'}
    - TargetUserName
    - SourceNetworkAddress
falsepositives:
    - Legitimate administrative activities
    - Authorized remote access tools
level: ${validatedData.severity}`,

        kqlQuery: `// ${validatedData.useCase}
// MITRE ATT&CK: ${validatedData.mitreAttack || 'Not specified'}
// Severity: ${validatedData.severity}
// Generated: ${new Date().toISOString()}

${validatedData.logSource?.includes('Sysmon') ? 'DeviceProcessEvents' : 'SecurityEvent'}
| where TimeGenerated >= ago(1h)
${validatedData.eventIds ? `| where EventID == ${validatedData.eventIds.split(',')[0].trim()}` : '| where EventID == 4625'}
${validatedData.logSource?.includes('Sysmon') ? 
`| where FileName =~ "psexec.exe" or InitiatingProcessFileName =~ "psexec.exe"
| where ProcessCommandLine contains "cmd.exe" or ProcessCommandLine contains "powershell.exe"` :
`| where LogonType == 3
| where TargetUserName !endswith "$"
| where TargetUserName != "ANONYMOUS LOGON"`}
| extend Severity = "${validatedData.severity}"
| extend MitreTechnique = "${validatedData.mitreAttack || 'Unknown'}"
| project TimeGenerated, Computer, ${validatedData.logSource?.includes('Sysmon') ? 'FileName' : 'TargetUserName'}, 
          ${validatedData.logSource?.includes('Sysmon') ? 'ProcessCommandLine' : 'SourceNetworkAddress'}, 
          Severity, MitreTechnique
| summarize EventCount = count(), 
           FirstSeen = min(TimeGenerated), 
           LastSeen = max(TimeGenerated) 
           by Computer, ${validatedData.logSource?.includes('Sysmon') ? 'FileName' : 'TargetUserName'}
| order by EventCount desc`,

        ruleId: `demo-rule-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          severity: validatedData.severity,
          mitreMapping: validatedData.mitreAttack || 'Not specified',
          generationTimestamp: new Date().toISOString(),
        }
      };

      // Store the demo generation
      await storage.createRuleGeneration({
        useCase: validatedData.useCase,
        logSource: validatedData.logSource || null,
        eventIds: validatedData.eventIds || null,
        severity: validatedData.severity,
        mitreAttack: validatedData.mitreAttack || null,
        sigmaRule: demoResult.sigmaRule,
        kqlQuery: demoResult.kqlQuery,
        ruleId: demoResult.ruleId,
      });

      res.json(demoResult);
    } catch (error: any) {
      console.error('Demo generation error:', error);
      res.status(400).json({ 
        message: error.message || "Failed to generate demo SIEM rules",
        error: error.name === 'ZodError' ? error.errors : undefined
      });
    }
  });

  // Get rule generation by ID
  app.get("/api/rules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ruleGeneration = await storage.getRuleGeneration(id);
      
      if (!ruleGeneration) {
        return res.status(404).json({ message: "Rule generation not found" });
      }
      
      res.json(ruleGeneration);
    } catch (error: any) {
      console.error('Get rule error:', error);
      res.status(400).json({ message: "Failed to retrieve rule generation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
