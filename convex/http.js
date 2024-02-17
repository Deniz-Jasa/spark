import { httpRouter } from "convex/server";
import { fetchOrgPageInfo } from "./organizations";

const http = httpRouter();

http.route({
	path: "/fetchOrgPageInfo",
	method: "GET",
	handler: fetchOrgPageInfo,
});

export default http;
