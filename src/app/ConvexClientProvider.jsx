"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient("https://hearty-tiger-186.convex.cloud");

export default function ConvexClientProvider({ children }) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
