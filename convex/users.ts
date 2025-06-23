import { UserJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'
import { internalMutation, query, QueryCtx } from './_generated/server'

export const getUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('registration').collect()
  }
})

export const getRecentUsers = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query('registration').order('desc').take(5)
  }
})

export const current = query({
  args: {},
  handler: async ctx => {
    return await getCurrentUser(ctx)
  }
})

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  async handler(ctx, { data }) {
    const userAttributes = {
      clerkId: data.id ?? "",
      email: data.email_addresses[0].email_address ?? "",
      role: (data.public_metadata?.role as string) || "resident"
    }

    const user = await userByClerkUserId(ctx, data.id)

    if (user === null) {
      await ctx.db.insert('registration', userAttributes)
    } else {
      await ctx.db.patch(user._id, userAttributes)
    }
  }
})

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkUserId(ctx, clerkUserId)

    if (user !== null) {
      await ctx.db.delete(user._id)
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      )
    }
  }
})

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx)
  if (!userRecord) throw new Error("Can't get current user")
  return userRecord
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity()
  if (identity === null) {
    return null
  }
  return await userByClerkUserId(ctx, identity.subject)
}

async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query('registration')
    .withIndex('byClerkUserId', q => q.eq('clerkId', clerkUserId))
    .unique()
 }

// export const getByClerkId = query({
//   args: { clerkId: v.string() },
//   handler: async (ctx, { clerkId }) => {
//     return await userByClerkUserId(ctx, clerkId);
//   }
// });



