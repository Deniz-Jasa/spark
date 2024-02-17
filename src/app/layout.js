import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConvexClientProvider from "./ConvexClientProvider";
import DashboardLayout from "@/components/DashboardLayout";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
	title: "Spark | Your Spark Can Create Change",
	description: "Made for TreeHacks 2024",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />

			<body className={inter.className}>
				<ConfigProvider
					theme={{
						token: {
							// Seed Token
							colorPrimary: "#FF8947",
							borderRadius: 2,

							// Alias Token
							colorBgContainer: "#FF8947",
						},
					}}></ConfigProvider>
				<AntdRegistry>
					<ConvexClientProvider>
						{/* If user */}
						<DashboardLayout>{children}</DashboardLayout>
						{/* If not user */}
						{/* <LandingLayout>{Children}</LandingLayout>*/}
					</ConvexClientProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
