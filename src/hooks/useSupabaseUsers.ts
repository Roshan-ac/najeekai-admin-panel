import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Customer = Database["public"]["Tables"]["Customer"]["Row"];
type Freelancer = Database["public"]["Tables"]["Freelancer"]["Row"];
type Contact = Database["public"]["Tables"]["Contact"]["Row"];
type Avatar = Database["public"]["Tables"]["Avatar"]["Row"];
type WorkExperience = Database["public"]["Tables"]["WorkExperience"]["Row"];
type SkillSet = Database["public"]["Tables"]["SkillSet"]["Row"];

interface EnhancedCustomer extends Customer {
  contact?: Contact;
  Avatar?: Avatar;
  status: "active" | "suspended" | "pending";
}

interface EnhancedFreelancer extends Freelancer {
  contact?: Contact;
  Avatar?: Avatar;
  workExperience: WorkExperience[];
  skills: SkillSet[];
  status: "active" | "suspended" | "pending";
}

export const useSupabaseUsers = () => {
  const [customers, setCustomers] = useState<EnhancedCustomer[]>([]);
  const [freelancers, setFreelancers] = useState<EnhancedFreelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      const { data: customersData, error: customersError } =
        await supabase.from("Customer").select(`
          *,
          contact:Contact(*),
          Avatar(*)
        `);

      if (customersError) throw customersError;

      if (customersData) {
        setCustomers(
          customersData.map((customer) => ({
            ...customer,
            status: customer.status || "active",
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error.message);
    }
  };

  const fetchFreelancers = async () => {
    try {
      const { data: freelancersData, error: freelancersError } =
        await supabase.from("Freelancer").select(`
          *,
          contact:Contact(*),
          Avatar(*),
          skills:SkillSet(*),
          workExperience:WorkExperience(*)
        `);

      if (freelancersError) throw freelancersError;

      if (freelancersData) {
        setFreelancers(
          freelancersData.map((freelancer) => ({
            ...freelancer,
            status: freelancer.status || "active",
            workExperience: freelancer.workExperience || [],
            skills: freelancer.skills || [],
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      setError(error.message);
    }
  };

  const setupSubscriptions = () => {
    // Set up real-time subscriptions for all relevant tables
    const channels = [
      {
        table: "Customer",
        handler: fetchCustomers,
      },
      {
        table: "Freelancer",
        handler: fetchFreelancers,
      },
      {
        table: "Contact",
        handler: () => {
          fetchCustomers();
          fetchFreelancers();
        },
      },
      {
        table: "Avatar",
        handler: () => {
          fetchCustomers();
          fetchFreelancers();
        },
      },
      {
        table: "SkillSet",
        handler: fetchFreelancers,
      },
      {
        table: "WorkExperience",
        handler: fetchFreelancers,
      },
    ];

    const subscriptions = channels.map((channel) =>
      supabase
        .channel(`${channel.table}-changes`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: channel.table },
          () => channel.handler(),
        )
        .subscribe(),
    );

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([fetchCustomers(), fetchFreelancers()]);
      } catch (err) {
        console.error("Error initializing data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
    const cleanup = setupSubscriptions();

    return () => {
      cleanup();
    };
  }, []);

  const handleVerify = async (
    userId: string,
    type: "customer" | "freelancer",
  ) => {
    try {
      const table = type === "customer" ? "Customer" : "Freelancer";
      const { error: updateError } = await supabase
        .from(table)
        .update({ status: "active" })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Refresh data after update
      if (type === "customer") {
        await fetchCustomers();
      } else {
        await fetchFreelancers();
      }
    } catch (error) {
      console.error(`Error verifying ${type}:`, error);
      setError(error.message);
    }
  };

  const handleSuspend = async (
    userId: string,
    type: "customer" | "freelancer",
  ) => {
    try {
      const table = type === "customer" ? "Customer" : "Freelancer";
      const { error: updateError } = await supabase
        .from(table)
        .update({ status: "suspended" })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Refresh data after update
      if (type === "customer") {
        await fetchCustomers();
      } else {
        await fetchFreelancers();
      }
    } catch (error) {
      console.error(`Error suspending ${type}:`, error);
      setError(error.message);
    }
  };

  const handleDelete = async (
    userId: string,
    type: "customer" | "freelancer",
  ) => {
    try {
      const table = type === "customer" ? "Customer" : "Freelancer";
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq("id", userId);

      if (deleteError) throw deleteError;

      // Refresh data after delete
      if (type === "customer") {
        await fetchCustomers();
      } else {
        await fetchFreelancers();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      setError(error.message);
    }
  };

  return {
    customers,
    freelancers,
    loading,
    error,
    handleVerify,
    handleSuspend,
    handleDelete,
  };
};
