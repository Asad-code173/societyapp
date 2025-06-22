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
    phone: v.string(),
    address: v.string(),
    apartmentNumber: v.optional(v.string()),
    moveInDate: v.optional(v.string()),     // ISO string
    isAdminApproved: v.boolean(),           // default false
    createdAt: v.string(),                  // ISO string (e.g., Date.now().toISOString())
  }).index("by_ClerkId", ["clerkId"]),

})
