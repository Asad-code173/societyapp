import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const CreateComplain = mutation({
  args: {
    fullName: v.string(),
    ContactNumber: v.string(),
    apartmentNumber: v.string(),
    Message:v.string(),
    Status: v.boolean(),
    
  },
  handler: async (ctx, args) => {
    const complaintlodged = await ctx.db.insert("complaint", {
      fullName: args.fullName,
      ContactNumber: args.ContactNumber,
      apartmentNumber: args.apartmentNumber,
      Message:args.Message,
      Status:false
  
    });
    return complaintlodged;
  },
});

export const fetchComplain = query(async ({ db }) => {
  return await db.query("complaint").collect();
});

export const handleComplaint = mutation({
  args: {
    id: v.id("complaint"), 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      Status: true,
    });
  },
});

export const pendingComplaintCount = query(async ({ db }) => {
  const pending = await db
    .query("complaint")
    .filter((q) => q.eq(q.field("Status"), false))
    .collect();
  return pending.length;
});

