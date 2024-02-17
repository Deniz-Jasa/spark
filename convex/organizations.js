import { query } from "./_generated/server";
import { v } from "convex/values";

const getAllOrgs = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("organizations")
            .collect();
    }
});

const getOrg = query({
    args: {orgName: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db
            .query("organizations")
            .filter((q) => q.eq(q.field("name"), args.orgName))
            .collect();
    }
});