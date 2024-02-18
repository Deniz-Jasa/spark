import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const organizationsSchema = {
    organizations: defineTable({
        name: v.string(),
        bio: v.string(),
        websiteURL: v.string(),
        location: v.string(),
        campaigns: v.any(),
    })
}

const campaignsSchema = {
    campaigns: defineTable({
        campaignTitle: v.string(),
        description: v.string(),
        organizationID: v.id('organizations'),
        location: v.optional(v.string()),
        goal: v.object({
            type: v.union(v.literal('volunteering'), v.literal('material'), v.literal('donation')),
            materialRequested: v.optional(v.string()),
            goalAmount: v.number(),
            goalDate: v.number(),
        }),
        contributions: v.array(
            v.object({
                amount: v.number(),
                contributer: v.optional(v.string()),
            })
        )
    })
}

export default defineSchema({
    ...organizationsSchema,
    ...campaignsSchema
});