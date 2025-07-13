import React from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message,
  Space,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

function Category() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([
    {
      key: "1",
      name: "Electronics",
      image: "https://picsum.photos/200/200?random=1",
    },
    {
      key: "2",
      name: "Fashion",
      image: "https://picsum.photos/200/200?random=2",
    },
    {
      key: "3",
      name: "Home & Living",
      image: "https://picsum.photos/200/200?random=3",
    },
    {
      key: "4",
      name: "Sports",
      image: "https://picsum.photos/200/200?random=4",
    },
    {
      key: "5",
      name: "Books",
      image: "https://picsum.photos/200/200?random=5",
    },
    {
      key: "6",
      name: "Beauty",
      image: "https://picsum.photos/200/200?random=6",
    },
    {
      key: "7",
      name: "Toys",
      image: "https://picsum.photos/200/200?random=7",
    },
    {
      key: "8",
      name: "Food & Beverages",
      image: "https://picsum.photos/200/200?random=8",
    },
    {
      key: "9",
      name: "Automotive",
      image: "https://picsum.photos/200/200?random=9",
    },
    {
      key: "10",
      name: "Health & Wellness",
      image: "https://picsum.photos/200/200?random=10",
    },
  ]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Category"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: "#185F90", color: "white" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="danger"
            style={{ backgroundColor: "red", color: "white" }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Add new category to the list
        const newCategory = {
          key: Date.now(),
          ...values,
        };
        setCategories([...categories, newCategory]);
        message.success("Category created successfully");
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Are you sure you want to delete this category?",
      onOk: () => {
        setCategories(categories.filter((category) => category.key !== key));
        message.success("Category deleted successfully");
      },
    });
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button
          type="primary"
          style={{ backgroundColor: "#185F90", color: "white" }}
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Create Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 5,
        }}
      />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okButtonProps={{ style: { backgroundColor: "#185F90", color: "white" } }}
        mask={true}
      >
        <Form
          name="category"
          requiredMark={false}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="image"
            label="Category Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              Upload
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Category;
