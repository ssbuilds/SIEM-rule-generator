import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface ApiConfig {
  provider: "anthropic" | "openai" | "azure" | "groq";
  apiKey: string;
}

export function useApiConfig() {
  const [config, setConfig] = useState<ApiConfig>({
    provider: "anthropic",
    apiKey: "",
  });
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const testConnectionMutation = useMutation({
    mutationFn: async (configToTest: ApiConfig) => {
      const response = await apiRequest("POST", "/api/test-connection", configToTest);
      return response.json();
    },
    onSuccess: (data) => {
      setIsConnected(data.success);
      // Save connection status to localStorage
      localStorage.setItem('siemRuleGenerator_connection', JSON.stringify({
        isConnected: data.success,
        lastTested: new Date().toISOString()
      }));
      
      if (data.success) {
        toast({
          title: "Connection Successful",
          description: "API connection established successfully",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: data.message || "Failed to connect to API",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      setIsConnected(false);
      // Save failed connection status
      localStorage.setItem('siemRuleGenerator_connection', JSON.stringify({
        isConnected: false,
        lastTested: new Date().toISOString()
      }));
      
      toast({
        title: "Connection Error",
        description: error.message || "Failed to test API connection",
        variant: "destructive",
      });
    },
  });

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('siemRuleGenerator_config');
    const savedConnection = localStorage.getItem('siemRuleGenerator_connection');
    
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
        
        // Restore connection status from localStorage
        if (savedConnection) {
          const connectionStatus = JSON.parse(savedConnection);
          setIsConnected(connectionStatus.isConnected && Boolean(parsed.apiKey));
        } else if (parsed.apiKey) {
          // If we have an API key but no saved connection status, test the connection
          setTimeout(() => {
            testConnectionMutation.mutate(parsed);
          }, 100);
        }
      } catch (error) {
        console.error('Failed to load saved configuration:', error);
      }
    }
  }, []);

  const saveConfig = (newConfig: ApiConfig) => {
    setConfig(newConfig);
    localStorage.setItem('siemRuleGenerator_config', JSON.stringify(newConfig));
    
    toast({
      title: "Configuration Saved",
      description: "API configuration has been saved successfully",
    });

    // Test the new configuration
    if (newConfig.apiKey) {
      // Clear old connection status first
      localStorage.removeItem('siemRuleGenerator_connection');
      testConnectionMutation.mutate(newConfig);
    } else {
      // No API key means disconnected
      setIsConnected(false);
      localStorage.removeItem('siemRuleGenerator_connection');
    }
  };

  const testConnection = () => {
    if (!config.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter an API key before testing connection",
        variant: "destructive",
      });
      return;
    }
    testConnectionMutation.mutate(config);
  };

  return {
    config,
    setConfig,
    saveConfig,
    testConnection,
    isConnected,
    isTesting: testConnectionMutation.isPending,
  };
}
