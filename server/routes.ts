import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist signup endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertWaitlistSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ 
          message: errorMessage,
          success: false 
        });
      }

      // Check for existing entry
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.data.email);
      if (existingEntry) {
        return res.status(200).json({ 
          message: "You're already on our waitlist!",
          data: existingEntry,
          success: true 
        });
      }

      // Create the waitlist entry
      const entry = await storage.createWaitlistEntry(validatedData.data);
      
      return res.status(201).json({ 
        message: "Successfully joined the waitlist!",
        data: entry,
        success: true 
      });
    } catch (error) {
      console.error("Error creating waitlist entry:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your request.",
        success: false 
      });
    }
  });

  // Get all waitlist entries (could be protected in a real app)
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      return res.status(200).json({ 
        data: entries,
        count: entries.length,
        success: true 
      });
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching waitlist entries.",
        success: false 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
