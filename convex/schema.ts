import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registration: defineTable({
    clerkId: v.string(),
    email: v.string(),
    role:v.string()
  }).index('byClerkUserId',['clerkId'])
})
