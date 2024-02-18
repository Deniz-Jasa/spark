import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space } from "antd";

const onFinish = (values) => {
	console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const CreateOrgForm = () => {
	return (
		<Form
			display="flex"
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}>
			<Form.Item
				label="Name"
				name="name"
				rules={[
					{
						required: true,
						message: "Please input your organization name!",
					},
				]}>
				<Input />
			</Form.Item>
			<Form.Item
				label="Bio"
				name="bio"
				rules={[
					{
						required: true,
						message: "Please include a bio about your organization!",
					},
				]}>
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item
				label="Website URL"
				name="url"
				rules={[
					{
						required: true,
						message: "Please input a website or social media link!",
					},
				]}>
				<Input />
			</Form.Item>
			<Space justify="right">
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Space>
		</Form>
	);
};

export default CreateOrgForm;
