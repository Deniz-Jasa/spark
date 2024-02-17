"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
import React from "react";
import { Button } from "antd";

// pages/index.js
import { useMutation, useQuery } from "convex/react";
import { internal } from "../../convex/_generated/api";

/**
 * Contributor Home/Discover Page
 * @returns React.Component
 */
/*
const getData = async () => {
	const res = await fetch("https://upbeat-spaniel-750.convex.site/fetchOrgPageInfo");

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
};*/

export default function HomePage() {
	/*const data = await getData();

	console.log(data);*/
	return (
		<div>
			<h1 style={{ color: "black" }}>My Feed</h1>
		</div>
	);
}
