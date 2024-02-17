"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
import React from "react";
import { Button } from "antd";
import Sidebar from "@/components/Sidebar";

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
			{/* <h1>Welcome to the Marketplace App</h1>
			<p>This is the homepage of the Marketplace App.</p>
			{allOrgs?.map((org, i) => (
				<>
					<h2>{org.name}</h2>
					<button
						onClick={() =>
							postOrgCampaign({
								campaignTitle: "Test Campaign " + i,
								organizationID: org._id,
								goalAmount: 100000,
								goalDate: 1000000000,
								contributions: [{ amount: 100000 }],
							})
						}>
						Click me bitch {i + 1}
					</button>
				</>
			))}
			<button onClick={() => postNewOrg({ name: "Test Organization " + allOrgs?.length })}>Click me bitch</button>

			{allCampaigns?.map((camp, i) => (
				<>
					<h2>{camp.campaignTitle}</h2>
				</>
			))} */}
			<div className="App">
				<Button type="primary">Button</Button>
				<Sidebar />
			</div>
		</div>
	);
};

export default HomePage;
