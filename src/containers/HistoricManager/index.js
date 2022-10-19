import { Button, Divider, Form, List, Modal, Typography, Input } from "antd";

const { TextArea } = Input;

export default function HistoricManager({
  open,
  setOpenModal,
  event,
  onCreate,
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Title"
      onCancel={() => setOpenModal(null)}
      onOk={() => console.log("ok")}
      footer={null}
    >
      <Form
        form={form}
        onFinish={({ historic }) => {
          onCreate({
            eventId: event.id,
            historic,
          });

          form.resetFields();
        }}
      >
        <Form.Item
          name="historic"
          rules={[
            { required: true, message: "Please input a description!" },
          ]}
        >
          <TextArea showCount style={{ resize: "none" }} maxLength={5000} />
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation="left">Histórico</Divider>
      <List
        bordered
        dataSource={event?.historic}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item}</Typography.Text>
          </List.Item>
        )}
      />
    </Modal>
  );
}
