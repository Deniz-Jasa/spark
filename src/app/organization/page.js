"use client";

import React from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Organization = async () => {
	//document.title = "My Organization | Spark";
	const data = await useAction(api.organizations.fetchOrgPageInfo)();

	console.log(data)

	return (
		<>
			<h1 style={{ color: "black" }}>My Organization</h1>
		</>
	);
};

export default Organization;
