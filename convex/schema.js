import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const organizationsSchema = {
    organizations: defineTable({
        name: v.string(),
        websiteURL: v.string(),
        monetaryCampaigns: v.optional(v.array(
            v.object({
                goal: v.number(),
                assignee: v.optional(v.string())
            }),
        )),
        volunteerCampaigns: v.optional(v.array(
            v.object({
                need: v.string(),
                assignee: v.optional(v.string())
            })
        ))
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