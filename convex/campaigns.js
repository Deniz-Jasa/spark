import { query } from "./_generated/server";
import { v } from "convex/values";

const getAllMonCamps = query({
	args: {},
	handler: async (ctx) => await ctx.db.query("campaigns").collect(),
});

const getMonCampsByIds = query({
	args: { campIds: v.array(v.string()) },
	handler: async (ctx, args) => await Promise.all(args.campIds.map((id) => ctx.db.get(id))),
});

const getMonCampByTitle = query({
	args: { campTitle: v.string() },
	handler: async (ctx, args) =>
		await ctx.db
			.query("campaigns")
			.filter((q) => q.eq(q.field("campaignTitle"), args.campTitle))
			.unique(),
});

const getMonCampsForOrg = query({
	args: { orgId: v.id("organizations") },
	handler: async (ctx, args) => await ctx.db.get(args.orgId.campaigns),
});

export { getAllMonCamps, getMonCampsByIds, getMonCampByTitle, getMonCampsForOrg };
