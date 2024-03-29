import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConvexClientProvider from "./ConvexClientProvider";
import DashboardLayout from "@/components/DashboardLayout";
import { ConfigProvider } from "antd";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
	title: "Spark | Support Your Community",
	description: "Made for TreeHacks 2024",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />

			<body className={inter.className}>
				<AntdRegistry>
					<ConvexClientProvider>
						{/* If user */}
						<ConfigProvider
							theme={{
								token: {
									fontFamily: "Inter, sans-serif",
									colorBg: "white",
									colorWarning: "#f8c058",
									colorError: "#7e0018",
									colorPrimary: "#ff8947",
									colorInfo: "#ff8947",
								},
								components: {
									Menu: {
										darkItemBg: "transparent",
									},
									Layout: {
										siderWidth: 300,
										siderBg: "#ff8947",
									},
								},
							}}>
							<DashboardLayout>
								{children}
							</DashboardLayout>
							{/* If not user */}
							{/* <LandingLayout>{Children}</LandingLayout>*/}
						</ConfigProvider>
					</ConvexClientProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
