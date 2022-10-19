import { ClockCircleFilled, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, List, Popconfirm, Skeleton, Space } from "antd";

export default function EventList({
  dataSource,
  onUpdate,
  onDelete,
  onCreateHistoric,
}) {
  return (
    <List
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              shape="circle"
              icon={<EditFilled />}
              size="large"
              onClick={() => onUpdate(item)}
            />,
            <Popconfirm
              placement="top"
              title="Deseja realmente apagar?"
              onConfirm={() => onDelete(item)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteFilled />}
                size="large"
                danger
              />
            </Popconfirm>,
            <Button
              type="primary"
              shape="circle"
              icon={<ClockCircleFilled />}
              size="large"
              onClick={() => onCreateHistoric(item)}
              ghost
            />,
          ]}
        >
          <Skeleton active loading={false}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
            <div>
              <Space direction="vertical" align="center">
                <p style={{ margin: "0" }}>{item.date}</p>
                <p style={{ margin: "0" }}>{item.frequency}</p>
              </Space>
            </div>
          </Skeleton>
        </List.Item>
      )}
    ></List>
  );
}
