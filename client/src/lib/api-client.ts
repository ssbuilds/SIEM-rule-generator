import { apiRequest } from "./queryClient";
import { GenerateRuleRequest } from "@shared/schema";

export interface GenerateRulesResponse {
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

export const apiClient = {
  async generateRules(request: GenerateRuleRequest): Promise<GenerateRulesResponse> {
    const response = await apiRequest("POST", "/api/generate-rules", request);
    return response.json();
  },

  async testConnection(provider: string, apiKey: string): Promise<{ success: boolean; message: string }> {
    const response = await apiRequest("POST", "/api/test-connection", { provider, apiKey });
    return response.json();
  },

  async getRuleGeneration(id: number) {
    const response = await apiRequest("GET", `/api/rules/${id}`);
    return response.json();
  },
};
