// convex/storage.ts
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async ({ storage }) => {
  return await storage.generateUploadUrl();
});