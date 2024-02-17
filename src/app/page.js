"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
import React from "react";
import { Button } from "antd";

// pages/index.js
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * Contributor Home/Discover Page
 * @returns React.Component
 */
const HomePage = () => {
	const allOrgs = useQuery(api.organizations.getAllOrgs);
	const allCampaigns = useQuery(api.monetaryCampaigns.getAllMonCamps);

	const postNewOrg = useMutation(api.organizations.postNewOrg);
	const postOrgCampaign = useMutation(api.organizations.postOrgCampaign);

	return (
		<div>
			<h1 style={{ color: "black" }}></h1>
		</div>
	);
};

export default HomePage;
