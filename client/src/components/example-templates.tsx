import { Network, Key, Terminal, Clock, Upload, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const templates = [
  {
    id: "lateral-movement",
    icon: Network,
    title: "Lateral Movement",
    description: "Detect PsExec, WMI, and other lateral movement techniques",
    mitre: "T1021.002",
    useCase: "Detect lateral movement using PsExec tool by monitoring process creation events where the parent process is psexec.exe and child processes are cmd.exe or powershell.exe on remote systems",
    logSource: "Windows Security, Sysmon",
    eventIds: "4688, 1",
    severity: "high" as const,
    mitreTechnique: "T1021.002 (Remote Services: SMB/Windows Admin Shares)"
  },
  {
    id: "credential-dumping",
    icon: Key,
    title: "Credential Dumping",
    description: "Identify Mimikatz, LSASS access, and credential theft",
    mitre: "T1003",
    useCase: "Identify credential dumping attempts by detecting access to LSASS process memory or execution of known credential theft tools like Mimikatz",
    logSource: "Sysmon, Windows Security",
    eventIds: "10, 4688",
    severity: "critical" as const,
    mitreTechnique: "T1003.001 (LSASS Memory)"
  },
  {
    id: "powershell-attack",
    icon: Terminal,
    title: "PowerShell Attacks",
    description: "Malicious PowerShell execution and obfuscation",
    mitre: "T1059.001",
    useCase: "Detect malicious PowerShell execution including encoded commands, suspicious parameter usage, and download cradles",
    logSource: "PowerShell Operational, Sysmon",
    eventIds: "4103, 4104, 1",
    severity: "high" as const,
    mitreTechnique: "T1059.001 (PowerShell)"
  },
  {
    id: "persistence",
    icon: Clock,
    title: "Persistence Mechanisms",
    description: "Registry modifications, scheduled tasks, services",
    mitre: "T1053",
    useCase: "Detect persistence mechanisms including registry run keys, scheduled tasks, and service modifications that allow attackers to maintain access",
    logSource: "Windows Security, Sysmon",
    eventIds: "4697, 4698, 13",
    severity: "medium" as const,
    mitreTechnique: "T1053 (Scheduled Task/Job)"
  },
  {
    id: "data-exfiltration",
    icon: Upload,
    title: "Data Exfiltration",
    description: "Unusual network transfers and data staging",
    mitre: "T1041",
    useCase: "Detect data exfiltration through unusual network connections, large file transfers, and data compression activities before transmission",
    logSource: "Network logs, Windows Security",
    eventIds: "5156, 3",
    severity: "high" as const,
    mitreTechnique: "T1041 (Exfiltration Over C2 Channel)"
  },
  {
    id: "privilege-escalation",
    icon: Shield,
    title: "Privilege Escalation",
    description: "Token manipulation and UAC bypass attempts",
    mitre: "T1548",
    useCase: "Identify privilege escalation attempts including UAC bypass techniques, token manipulation, and exploitation of vulnerable services",
    logSource: "Windows Security, Sysmon",
    eventIds: "4648, 4672, 1",
    severity: "high" as const,
    mitreTechnique: "T1548 (Abuse Elevation Control Mechanism)"
  }
];

export function ExampleTemplates() {
  const { toast } = useToast();

  const loadTemplate = (template: typeof templates[0]) => {
    // Use the window function exposed by RuleGeneratorForm
    if ((window as any).loadTemplate) {
      (window as any).loadTemplate({
        useCase: template.useCase,
        logSource: template.logSource,
        eventIds: template.eventIds,
        severity: template.severity,
        mitre: template.mitreTechnique
      });
    }
  };

  return (
    <div className="cyber-card">
      <div className="p-6 border-b border-[var(--border-dark)]">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center space-x-2">
          <div className="w-6 h-6 bg-[var(--warning-amber)] rounded flex items-center justify-center">
            <span className="text-white text-sm">💡</span>
          </div>
          <span>Example Use Cases & Templates</span>
        </h3>
        <p className="text-[var(--text-secondary)] mt-1">Click any example to automatically populate the input form</p>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => {
            const IconComponent = template.icon;
            
            return (
              <Button
                key={template.id}
                variant="outline"
                onClick={() => loadTemplate(template)}
                className="text-left p-4 h-auto bg-[var(--deep-dark)] border-[var(--border-dark)] hover:border-[var(--cyber-blue)] transition-colors flex flex-col items-start space-y-2"
              >
                <div className="flex items-center space-x-2 w-full">
                  <IconComponent 
                    size={16} 
                    className={
                      template.id === 'lateral-movement' ? 'text-[var(--cyber-blue)]' :
                      template.id === 'credential-dumping' ? 'text-[var(--error-red)]' :
                      template.id === 'powershell-attack' ? 'text-[var(--success-green)]' :
                      template.id === 'persistence' ? 'text-[var(--warning-amber)]' :
                      template.id === 'data-exfiltration' ? 'text-[var(--error-red)]' :
                      'text-[var(--cyber-blue)]'
                    }
                  />
                  <h4 className="font-medium text-[var(--text-primary)]">{template.title}</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] text-left">
                  {template.description}
                </p>
                <div className="text-xs text-[var(--warning-amber)] flex items-center space-x-1">
                  <span>🏷️</span>
                  <span>{template.mitre}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
