import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Select } from "antd";

const selectTypes = [
	{
		key: 1,
		value: "donation",
		label: "Donation",
	},
	{
		key: 2,
		value: "volunteering",
		label: "Volunteering",
	},
	{
		key: 3,
		value: "material",
		label: "Material",
	},
];

const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const CreateCampForm = ({ onFinish }) => {
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
				name="campaignTitle"
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
				name="description"
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
						required: false,
						message: "Please input a website or social media link!",
					},
				]}>
				<Select style={{ width: 200 }} options={selectTypes} />
			</Form.Item>
			<Form.Item
				label="Date"
				name="goalDate"
				rules={[
					{
						required: true,
						message: "Please input a date!",
					},
				]}>
				<DatePicker />
			</Form.Item>
			<Form.Item
				label="Goal Amount"
				name="goalAmount"
				rules={[
					{
						required: true,
						message: "Please input a goal amount!",
					},
				]}>
				<Input />
			</Form.Item>
			<Form.Item label="Location" name="location">
				<Input />
			</Form.Item>
			<Button justify="flex-end" type="primary" htmlType="submit">
				Submit
			</Button>
		</Form>
	);
};

export default CreateCampForm;
