"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
import React from "react";
import { Button } from "antd";

// pages/index.js
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * Contributor Home/Discover Page
 * @returns React.Component
 */

const HomePage = async () => {
	const data = await useQuery(api.monetaryCampaigns.getAllMonCamps);
	console.log(data)

	return (
		<div>
			<h1 style={{ color: "black" }}></h1>
		</div>
	);
}

export default HomePage;
