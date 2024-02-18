"use client";

import React, { useState } from "react";
import { useAction } from "convex/react";

import { Card, Row, Col, Collapse, Space, Flex } from "antd";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Organization = async () => {
	//document.title = "My Organization | Spark";
	const data = await useAction(api.organizations.fetchOrgPageInfo)();

	console.log(data)
	const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;
	const items = [
		{
			key: "1",
			label: "This is panel header 1",
			children: <p>{text}</p>,
		},
		{
			key: "2",
			label: "This is panel header 2",
			children: <p>{text}</p>,
		},
		{
			key: "3",
			label: "This is panel header 3",
			children: <p>{text}</p>,
		},
	];

	return (
		<Row gutter={16} style={{ height: "100%" }}>
			<Col span={18}>
				<Col>
					<Card>
						<h2 style={{ color: "black" }}>{"Organization Name"}</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam,{" "}
						</p>
					</Card>
				</Col>
				<Col style={{ height: "100%" }}>
					<Collapse items={items} accordion={true} />;
				</Col>
			</Col>
			<Col span={6}>
				<Card title={<h3>Contributions</h3>} style={{ height: "100%" }}>
					<h2 style={{ color: "black" }}>{"Organization Name"}</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam,{" "}
					</p>
				</Card>
			</Col>
		</Row>
	);
};

export default Organization;
