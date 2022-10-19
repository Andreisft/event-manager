import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

import moment from "moment";

const { Option } = Select;

export default function CreateAndUpdateEvent({ onCreate, onUpdate, event }) {
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (event) {
      setIsUpdate(!!event);

      const { description, date, frequency, title } = event;
      const [day, month, year] = date.split("/");

      form.setFieldsValue({
        description,
        frequency,
        date: moment(new Date(year, month - 1, day)),
        title,
      });
    }
  }, [event, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
      size="large"
      onFinish={({ date, ...rest }) => {
        const value = { ...rest, date: date.format("DD/MM/YYYY") };

        if (isUpdate) onUpdate({ ...event, ...value });
        else onCreate({ ...value, historic: [] });

        form.resetFields();
      }}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input event title!" }]}
      >
        <Input placeholder="título" style={{ width: "340px" }} />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Please input event description!" }]}
      >
        <Input placeholder="descrição" style={{ width: "340px" }} />
      </Form.Item>
      <Form.Item name="frequency">
        <Select style={{ width: "300px" }} placeholder="período">
          <Option value="Week">Week</Option>
          <Option value="Month">Month</Option>
          <Option value="Quarter">Quarter</Option>
          <Option value="Year">Year</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="date"
        rules={[{ required: true, message: "Please input event date!" }]}
      >
        <DatePicker
          placeholder="data"
          format="DD/MM/YYYY"
          style={{ width: "300px" }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<PlusOutlined />} htmlType="submit" ghost>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
