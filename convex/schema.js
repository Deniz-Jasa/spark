import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const organizationsSchema = {
    organizations: defineTable({
        name: v.string(),
        campaigns: v.array(
            v.id('monetaryCampaigns')
        ),

    })
}

const monetaryCampaignsSchema = {
    monetaryCampaigns: defineTable({
        campaignTitle: v.string(),
        organizationID: v.id('organizations'),
        goalDate: v.number(),
        goalNumber: v.number(),
        contributions: v.array(
            v.object({
                amount: v.number()
            })
        )
    })
}

export default defineSchema({
    ...organizationsSchema,
    ...monetaryCampaignsSchema
});