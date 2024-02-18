"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layout, theme } from "antd";
import { DynamicSwitch } from "@/components/utils";

const { Header, Content, Footer, Sider } = Layout;

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
					bottom: 0, // Updated to bottom
				}}>
				<h1 style={{ textAlign: "center", marginTop: "40px" }}>Spark</h1>

				<div style={{ marginTop: "auto", display: "flex", alignItems: "center" }}>
					<DynamicSwitch
						pathName={pathName}
						redirect={(path) => {
							router.push(path);
						}}
					/>
					<div style={{ display: "flex", alignItems: "center" }}>
						<p>Company View</p>
					</div>
				</div>
			</Sider>

			<Layout
				style={{
					marginLeft: 200,
					height: "100vh",
				}}>
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
