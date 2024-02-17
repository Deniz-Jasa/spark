"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient("https://upbeat-spaniel-750.convex.cloud");

export default function ConvexClientProvider({ children }) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
