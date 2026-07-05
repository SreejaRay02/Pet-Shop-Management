import { useQuery } from "@tanstack/react-query";
import { groomingService } from "../../services/groomingService";

export const GROOMING_KEY = ["grooming"];

export const useGroomingServices = (params) => {
  return useQuery({
    /* queryKey gives a unique identity to a query  */
    queryKey: [...GROOMING_KEY, params],

    /* queryFn is the actual function that fetches the data.  */
    queryFn: () => groomingService.getAll(params).then((r) => r.data),
  });
};

export const useGroomingServiceById = (id) => {
  return useQuery({
    queryKey: [...GROOMING_KEY, id],
    queryFn: () => groomingService.getById(id).then((r) => r.data),

    // Run the query only when a valid ID is available
    enabled: !!id,
  });
};
