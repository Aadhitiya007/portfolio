import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const waitlistFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: WaitlistFormValues) => {
      return apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: data.message || "Successfully joined the waitlist!",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: WaitlistFormValues) {
    mutate(data);
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-6 mt-6 text-center">
        <div className="rounded-full bg-green-100 p-2 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">You're on the List!</h3>
        <p>
          Thanks for joining our waitlist. We'll notify you as soon as we launch. Check your email for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Email Address</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="your@email.com" 
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-blue-300 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Full Name</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="John Doe" 
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-blue-300 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-6 rounded-lg transition duration-150 shadow-lg"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Join the Waitlist"}
        </Button>
      </form>
    </Form>
  );
}
