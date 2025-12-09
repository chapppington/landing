import { useQuery } from "@tanstack/react-query";
import footerConfigService from "@/services/footer-config.service";

export function useFooterData() {
  const { data: footerConfig, isLoading, error } = useQuery({
    queryKey: ["footer-config"],
    queryFn: async () => {
      const { data } = await footerConfigService.get();
      return data;
    },
    staleTime: 0,
    gcTime: 0,
  });

  return {
    footerConfig,
    isLoading,
    error,
    departmentItems: footerConfig?.departmentItems || [],
    footerAddress: footerConfig?.footerAddress || "",
  };
}
