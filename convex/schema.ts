import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registration: defineTable({
    clerkId: v.string(),
    email: v.string(),
    role: v.string()
  }).index('byClerkUserId', ['clerkId']),
  residentOnboardDetails: defineTable({
    clerkId: v.string(),   
    fullName: v.string(),
    email: v.string(),
    Contactnumber: v.string(),
    apartmentNumber: v.string(),
    moveInDate: v.optional(v.string()),     // ISO string
    isAdminApproved: v.boolean(),   
    imageStorageId:v.optional(v.id("_storage"))        // default false
                     // ISO string (e.g., Date.now().toISOString())
  }).index("by_ClerkId", ["clerkId"]),

})
