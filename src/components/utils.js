import { Layout, Menu, theme, Switch } from "antd";
const { Header, Content, Footer, Sider } = Layout;

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

export { DynamicSwitch };
