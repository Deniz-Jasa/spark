"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Layout, theme, Menu } from "antd";
import { DynamicSwitch } from "@/components/utils";
import logo from "../../public/spark-logo-white.svg";

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
					textAlign: "center",
					left: 0,
					bottom: 0, // Updated to bottom
				}}>
				<Image src={logo} width={100} height={100} />

				<Menu
					mode="inline"
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					style={{
						textAlign: "center",
						background: "transparent",
						marginTop: "10%",
						borderRight: 0,
					}}
					items={[
						{ key: "1", label: "Discover" },
						{ key: "2", label: "Favorites" },
						{ key: "3", label: "My Contributions" },
					]}
				/>
				<div style={{ marginTop: "140%" }}>
					<h1 style={{ fontSize: "2em" }}>100</h1>
					<h1>Spark Points</h1>
				</div>
				<div style={{ marginTop: "15%" }}>
					<DynamicSwitch
						pathName={pathName}
						redirect={(path) => {
							router.push(path);
						}}
					/>
					<p style={{ marginTop: 10 }}>Company View</p>
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
