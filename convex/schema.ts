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
    moveInDate: v.optional(v.string()),     
    isAdminApproved: v.boolean(),   
    imageStorageId:v.id("_storage")     
                   
  }).index("by_ClerkId", ["clerkId"]),
  
  complaint:defineTable({
    fullName:v.string(),
    ContactNumber:v.string(),
    apartmentNumber: v.string(),
    Message:v.string(),
    Status:v.boolean(),
  })

})
