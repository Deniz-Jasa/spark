"use client";

import React, { useEffect, useState } from "react";
import { useAction, useMutation, useQuery} from "convex/react";

import { Card, Row, Col, Collapse, Select, Button, Modal } from "antd";
import { api } from "../../../convex/_generated/api";
import CreateOrgForm from "@/components/CreateOrgForm";
import CreateCampForm from "@/components/CreateCampForm";
import { CAMPAIGN_TYPES } from "@/components/utils";

function convertIntToCash(int) {
	// Add commas as thousands separators.
	const parts = int.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// Add the currency symbol.
	parts[1] = parts[1] || "00";
	return parts.join(".");
}
const orgSelectOptions = (orgs) =>
	orgs.map((org) => ({
		label: org.name,
		value: org._id,
		key: org._id,
	}));

const makeCampaignSections = (camps) =>
	camps.map((camp, index) => ({
		key: index,
		label: camp.campaignTitle,
		children: (
			<Row>
				<Col flex="1">
					<p>Campaign Type: {camp.goal.type.charAt(0).toUpperCase() + camp.goal.type.slice(1)}</p>
				</Col>
				{camp.goal?.materialRequested && (
					<Col flex="1">
						<p>Material Requested: {camp.goal.materialRequested}</p>
					</Col>
				)}
				<Col flex="1">
					<p>
						Goal Amount:{" "}
						{camp.goal.type == CAMPAIGN_TYPES.DONATION
							? "$" + convertIntToCash(camp.goal.goalAmount)
							: camp.goal.goalAmount + " " + camp.goal.type + "(s)"}
					</p>
				</Col>
				<Col flex="1">
					<p>Goal Date: {new Date(camp.goal.goalDate).toLocaleDateString()}</p>
				</Col>
			</Row>
		),
	}));

const aggregateContributions = (camps) =>
	camps
		.map((camp) => camp.contributions)
		.flat()
		.map((contribution, index) => (
			<div key={index + contribution?[].amount}>
				<h3></h3>+ {contribution?[].amount}
			</div>
		));

const Organization = () => {
	const [activeOrg, setActiveOrg] = useState(null);
	const [campaigns, setCampaigns] = useState(null);
	const [data, setData] = useState(null);

	/* Modal Forms */
	const [openOrg, setOpenOrg] = useState(false);
	const [openCamp, setOpenCamp] = useState(false);

	const ORG_ID = "org";
	const CAMP_ID = "camp";

	const showModal = (id, state) => {
		switch (id) {
			case ORG_ID:
				setOpenOrg(state);
				break;
			case CAMP_ID:
				if(!!activeOrg){
					setOpenCamp(state);
				}
				break;
			default:
				console.log("Invalid Form ID");
				break;
		}
	};

	const postNewOrg = useMutation(api.organizations.postNewOrg)
	const postNewCampaign = useMutation(api.organizations.postOrgCampaign)

	/* API Fetch */
	const fetchData = useAction(api.organizations.fetchOrgPageInfo);
	const fetchOrg = useAction(api.organizations.getOrgById);

	const finishOrgForm = async (values) => {
		await postNewOrg({...values, campaigns: []})
	}
	const finishCampForm = async (values) => {
		await postNewCampaign({
			campaignTitle: values.campaignTitle,
			description: values.description,
			organizationID: activeOrg._id,
			location: !values.location ? null : values.location,
			goal: {
				type: values.type,
				goalAmount: values.goalAmount,
				goalDate: (new Date(values.goalDate)).getTime()
			}
		})
	}

	useEffect(() => {
		console.log("ret");
		const call = async () => {
			if (!activeOrg || !campaigns) {
				const data1 = await fetchData();

				setData(data1);
			}
		};
		call();
	}, []);

	return (
		<>
			<Row gutter={16} style={{ height: "100%" }}>
				<Col span={18}>
					<Col>
						<Card>
							<Select
								onChange={async (value) => {
									const org = await fetchOrg({ orgId: value });
									setActiveOrg(org);
									setCampaigns(
										data?.campaigns.filter((campaign) => org._id == campaign.organizationID)
									);
								}}
								style={{ width: 200 }}
								defaultValue={activeOrg?._id ?? "Select an Organization"}
								options={!!data ? orgSelectOptions(data.orgs) : []}
							/>
						</Card>
					</Col>
					<Col>
						<Collapse
							style={{ margin: "10px 0" }}
							items={!!campaigns ? makeCampaignSections(campaigns) : []}
							accordion={true}
						/>
					</Col>
					<Col>
						<Card>
							<Button
								type="primary"
								style={{ margin: "0 10px" }}
								onClick={() => showModal(CAMP_ID, true)}>
								Create Campaign
							</Button>
							<Button type="primary" style={{ margin: "0 10px" }} onClick={() => showModal(ORG_ID, true)}>
								Create Organization
							</Button>
						</Card>
					</Col>
				</Col>
				<Col span={6}>
					<Card title={<h3>Contributions</h3>} style={{ height: "100%" }}>
						<h2 style={{ color: "#52c41a", fontWeight: "bold" }}>
							{!!campaigns ? aggregateContributions(campaigns) : []}
						</h2>
					</Card>
				</Col>
			</Row>
			<Modal
				title="Create Campaign"
				width={750}
				open={openCamp}
				onCancel={() => showModal(CAMP_ID, false)}
				footer={null}>
				<CreateCampForm activeOrg={activeOrg} onFinish={finishCampForm}/>
			</Modal>
			<Modal
				title="Create Organization"
				width={750}
				open={openOrg}
				onCancel={() => showModal(ORG_ID, false)}
				footer={null}>
				<CreateOrgForm onFinish={finishOrgForm}/>
			</Modal>
		</>
	);
};

export default Organization;
