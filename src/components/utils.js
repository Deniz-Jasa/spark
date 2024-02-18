import { Layout, Menu, theme, Switch } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const CAMPAIGN_TYPES = {
	DONATION: "donation",
	VOLUNTEERING: "volunteering",
}

const DynamicHeader = ({ pathName, style }) => {
	return pathName == "/" ? (
		<Header style={style}>
			<h1>Explore</h1>
		</Header>
	) : null;
};

const DynamicSwitch = ({ pathName, redirect }) => {
	return (
		<Switch
			checked={pathName == "/organization"}
			onChange={(checked) => {
				if (checked) {
					redirect("/organization");
				} else {
					redirect("/");
				}
			}}
		/>
	);
};

export { DynamicHeader, DynamicSwitch, CAMPAIGN_TYPES };