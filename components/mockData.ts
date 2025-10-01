import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Worker } from "../types";

export function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      const { data, error } = await supabase.from("workers").select("*");
      if (error) {
        console.error("Error fetching workers:", error);
      } else {
        setWorkers(data);
      }
      setLoading(false);
    };

    fetchWorkers();
  }, []);

  return { workers, loading };
}
