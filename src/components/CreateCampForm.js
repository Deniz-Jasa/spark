import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Select } from "antd";

const onFinish = (values) => {
	console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const CreateCampForm = () => {
	return (
		<Form
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
				label="Title"
                name="title"
				rules={[
					{
						required: true,
						message: "Please input your organization name!",
					},
				]}>
				<Input />
			</Form.Item>
			<Form.Item
				label="Description"
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
				label="Campaign Type"
                name="type"
				rules={[
					{
						required: true,
						message: "Please input a website or social media link!",
					},
				]}>
				<Select />
			</Form.Item>
			<Form.Item
				label="Date"
				name="date"
				rules={[
					{
						required: true,
						message: "Please input a date!",
					},
				]}>
					<DatePicker />
			</Form.Item>
			<Button justify="flex-end" type="primary" htmlType="submit">
				Submit
			</Button>
		</Form>
	);
};

export default CreateCampForm;
