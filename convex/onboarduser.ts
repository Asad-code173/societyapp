import { query } from "./_generated/server";
import { v } from "convex/values"; // ✅ Required import for validators

export const onboardResidentInfo = query({
  args: { clerkId: v.string() }, // ✅ Use v.string() instead of "string"
  handler: async (ctx, args) => {
    return await ctx.db
      .query("residentOnboardDetails")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first(); // returns null if not found
  },
});
