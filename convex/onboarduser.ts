import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const onboardResidentInfo = query({
  args:{clerkId:v.string()},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("residentOnboardDetails")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
  },
})

export const CreateOnboardUser = mutation({
  args: {
    clerkId: v.string(),
    fullName: v.string(),
    email: v.string(),
    Contactnumber: v.string(),
    apartmentNumber: v.string(),
    moveInDate: v.optional(v.string()),
    isAdminApproved:v.boolean(),
    imageStorageId: v.optional(v.id("_storage")), 
  },
  handler: async (ctx, args) => {
    const onboarduser = await ctx.db.insert("residentOnboardDetails", {
      clerkId: args.clerkId,
      fullName: args.fullName,
      email: args.email,
      Contactnumber: args.Contactnumber,
      apartmentNumber: args.apartmentNumber,
      moveInDate: args.moveInDate,
      isAdminApproved:false,
      imageStorageId:args.imageStorageId
    });
    return onboarduser;
  },
});

