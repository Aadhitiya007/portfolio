import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint for waitlist signup
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertWaitlistSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const readableError = fromZodError(validatedData.error);
        return res.status(400).json({ 
          success: false, 
          message: readableError.message 
        });
      }
      
      // Check if entry with this email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.data.email);
      if (existingEntry) {
        return res.status(409).json({ 
          success: false, 
          message: "This email is already on our waitlist!" 
        });
      }
      
      // Create new waitlist entry
      const newEntry = await storage.createWaitlistEntry(validatedData.data);
      
      return res.status(201).json({ 
        success: true, 
        message: "Successfully added to waitlist!",
        data: newEntry 
      });
    } catch (error) {
      console.error("Waitlist signup error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred. Please try again." 
      });
    }
  });

  // Endpoint to get all waitlist entries (for admin/testing purposes)
  app.get("/api/waitlist", async (_req: Request, res: Response) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      return res.status(200).json({ 
        success: true, 
        data: entries 
      });
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve waitlist entries" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
