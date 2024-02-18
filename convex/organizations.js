import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

const getAllOrgs = query({
	args: {},
	handler: async (ctx) => await ctx.db.query("organizations").collect(),
});

const fetchOrgPageInfo = action({
    args: {},
    handler: async (ctx, req) => {
	const orgs = await ctx.runQuery(api.organizations.getAllOrgs, {});
	const campaigns = await ctx.runQuery(api.campaigns.getAllMonCamps, {});

	return {orgs, campaigns}
    }
});

const getOrgByName = query({
	args: { orgName: v.string() },
	handler: async (ctx, args) =>
		await ctx.db
			.query("organizations")
			.filter((q) => q.eq(q.field("name"), args.orgName))
			.unique(),
});

const getOrgByIdQuery = query({
	args: { orgId: v.id("organizations") },
	handler: async (ctx, args) => await ctx.db.get(args.orgId),
});

const getOrgById = action({
	args: { orgId: v.id('organizations') },
	handler: async (ctx, req) => {
		const org = await ctx.runQuery(api.organizations.getOrgByIdQuery, {orgId: req.orgId})
		return org;
	}
})

const postNewOrg = mutation({
	handler: async (ctx, args) => await ctx.db.insert("organizations", args),
});

const postOrgCampaign = mutation({
	handler: async (ctx, args) => {
		const campaignId = await ctx.db.insert("campaigns", args);
		const campaigns = await ctx.db.get(args.organizationID);
		const newCampaigns = !campaigns.campaigns ? [campaignId] : [...campaigns.campaigns, campaignId];

		await ctx.db.patch(args.organizationID, { campaigns: newCampaigns });
		return campaignId;
	},
});

export { getAllOrgs, getOrgByName, getOrgByIdQuery, getOrgById, postNewOrg, postOrgCampaign, fetchOrgPageInfo };
