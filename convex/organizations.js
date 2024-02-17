import { mutation, query, internalQuery, httpAction } from "./_generated/server";
import { v } from "convex/values";

const getAllOrgs = internalQuery({
	args: {},
	handler: async (ctx) => await ctx.db.query("organizations").collect(),
});

const fetchOrgPageInfo = httpAction(async (ctx, req) => {
	const orgs = await ctx.runQuery(internal.organizations.getAllOrgs, {});
	const campaigns = await ctx.runQuery(internal.monetaryCampaigns.getAllMonCamps, {});

	return new Response(
		{
			orgs,
			campaigns,
		},
		{
			status: 200,
			headers: new Headers({
				"Access-Control-Allow-Origin": "http://localhost:3000",
				Vary: "origin",
			}),
		}
	);
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
