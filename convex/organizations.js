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
	const campaigns = await ctx.runQuery(api.monetaryCampaigns.getAllMonCamps, {});

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

const getOrgById = query({
	args: { orgId: v.id("organizations") },
	handler: async (ctx, args) => await ctx.db.get(args.orgId),
});

const postNewOrg = mutation({
	handler: async (ctx, args) => await ctx.db.insert("organizations", args),
});

const postOrgCampaign = mutation({
	handler: async (ctx, args) => {
		const campaignId = await ctx.db.insert("monetaryCampaigns", args);
		const campaigns = await ctx.db.get(args.organizationID);
		const newCampaigns = !campaigns.campaigns ? [campaignId] : [...campaigns.campaigns, campaignId];

		await ctx.db.patch(args.organizationID, { campaigns: newCampaigns });
		return campaignId;
	},
});

export { getAllOrgs, getOrgByName, getOrgById, postNewOrg, postOrgCampaign, fetchOrgPageInfo };
