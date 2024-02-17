"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchOutlined, CompassOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Switch } from "antd";
import { DynamicHeader, DynamicSwitch } from "@/components/utils";

const { Header, Content, Footer, Sider } = Layout;
const items = [
	{
		key: "1",
		icon: <CompassOutlined />,
		label: "Discover",
	},
	{
		key: "2",
		icon: <SearchOutlined />,
		label: "Search",
	},
];

const DashboardLayout = ({ children }) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const pathName = usePathname();
	const router = useRouter();

	return (
		<Layout hasSider>
			<Sider
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}>
				<div className="demo-logo-vertical" />
				<Menu mode="inline" defaultSelectedKeys={["4"]} items={items} />
				<DynamicSwitch
					pathName={pathName}
					redirect={(path) => {
						router.push(path);
					}}
				/>
			</Sider>
			<Layout
				style={{
					marginLeft: 200,
				}}>
				<DynamicHeader
					pathName={pathName}
					style={{
						padding: 0,
						background: colorBgContainer,
						color: "black",
					}}
				/>
				<Content
					style={{
						margin: "24px 16px 0",
						overflow: "initial",
					}}>
					<div
						style={{
							padding: 24,
							textAlign: "center",
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}>
						{children}
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}>
					Spark ©{new Date().getFullYear()} Created by the Spark Team at TreeHacks 2024
				</Footer>
			</Layout>
		</Layout>
	);
};
export default DashboardLayout;
