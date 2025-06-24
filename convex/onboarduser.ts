import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const approveResident = mutation({
  args: {
    id: v.id("residentOnboardDetails"), 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isAdminApproved: true,
    });
  },
});


export const onboardResidentInfo = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("residentOnboardDetails")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
  },
})





export const fetchonborduserWithImage = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("residentOnboardDetails").collect();
    console.log("📦 Raw users from DB:", users);
    
    const usersWithUrls = await Promise.all(users.map(async (user) => {
      let imageUrl = null;
      if (user.imageStorageId) {
        console.log("🖼️ Getting URL for:", user.imageStorageId);
        imageUrl = await ctx.storage.getUrl(user.imageStorageId);
        console.log("🔗 Generated URL:", imageUrl);
      }
      return {
        ...user,
        imageUrl
      };
    }));
    
    console.log("🚀 Final users with URLs:", usersWithUrls);
    return usersWithUrls;
  },
});

export const CreateOnboardUser = mutation({
  args: {
    clerkId: v.string(),
    fullName: v.string(),
    email: v.string(),
    Contactnumber: v.string(),
    apartmentNumber: v.string(),
    moveInDate: v.optional(v.string()),
    isAdminApproved: v.boolean(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const onboarduser = await ctx.db.insert("residentOnboardDetails", {
      clerkId: args.clerkId,
      fullName: args.fullName,
      email: args.email,
      Contactnumber: args.Contactnumber,
      apartmentNumber: args.apartmentNumber,
      moveInDate: args.moveInDate,
      isAdminApproved: false,
      imageStorageId: args.imageStorageId
    });
    return onboarduser;
  },
});

export const countApprovedResidents = query({
  args: {},
  handler: async (ctx) => {
    const approved = await ctx.db
      .query("residentOnboardDetails")
      .filter((q) => q.eq(q.field("isAdminApproved"), true))
      .collect();

    return approved.length;
  },
});
export const PendingResidentsCount = query({
  args: {},
  handler: async (ctx) => {
    const approved = await ctx.db
      .query("residentOnboardDetails")
      .filter((q) => q.eq(q.field("isAdminApproved"), false))
      .collect();

    return approved.length;
  },
});





export const getResidentById = query({
  args: { id: v.id("residentOnboardDetails") },
  async handler(ctx, args) {
    const resident = await ctx.db.get(args.id);
    if (!resident) return null;

    const imageUrl = resident.imageStorageId
      ? await ctx.storage.getUrl(resident.imageStorageId)
      : null;

    return { ...resident, imageUrl };
  }
});

