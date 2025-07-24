import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";

const CategoryActions = ({ record, onEdit, onDelete }) => {
  return (
    <Space size="middle">
      <Button
        type="primary"
        style={{ backgroundColor: "#185F90", color: "white" }}
        icon={<EditOutlined />}
        onClick={() => onEdit(record)}
      />
      <Popconfirm
        placement="bottomRight"
        title="Are you sure to delete this category?"
        onConfirm={() => onDelete(record._id)}
      >
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </Space>
  );
};

export default CategoryActions;
