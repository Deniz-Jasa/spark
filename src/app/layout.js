import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Spark | Your Spark Can Create Change",
	description: "Made for TreeHacks 2024",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AntdRegistry>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
