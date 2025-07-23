import { DeleteOutlined, EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Upload,
} from "antd";
import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Vehicles from "../../../public/categorise/car.png";
const categories = [
  {
    _id: "1",
    name: "Vehicles",
    image: Vehicles,
    sub_category: [
      {
        _id: "1-1",
        name: "Cars",
        sub_category: [
          {
            _id: "1-1-1",
            name: "Sedan",
            sub_category: [
              {
                _id: "1-1-1-1",
                name: "Electric Sedan",
                sub_category: [
                  {
                    _id: "1-1-1-1-1",
                    name: "Tesla Model S",
                    sub_category: [
                      {
                        _id: "1-1-1-1-1-1",
                        name: "2024 Model",
                        sub_category: []
                      },
                      {
                        _id: "1-1-1-1-1-2",
                        name: "2025 Model",
                        sub_category: []
                      }
                    ]
                  },
                  {
                    _id: "1-1-1-1-2",
                    name: "Lucid Air",
                    sub_category: []
                  }
                ]
              }
            ]
          },
          {
            _id: "1-1-2",
            name: "SUV",
            sub_category: [
              {
                _id: "1-1-2-1",
                name: "Off-Road SUV",
                sub_category: [
                  {
                    _id: "1-1-2-1-1",
                    name: "Jeep Wrangler",
                    sub_category: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        _id: "1-2",
        name: "Motorcycles",
        sub_category: [
          {
            _id: "1-2-1",
            name: "Sports Bike",
            sub_category: [
              {
                _id: "1-2-1-1",
                name: "Yamaha R1",
                sub_category: []
              }
            ]
          }
        ]
      }
    ]
  }
];
const DynamicCategory = () => {
  const navigate = useNavigate();
  let params = useParams()
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sub Category",
      dataIndex: "sub_category",
      key: "sub_category",
      render: (sub_category) => {
        return (
          <>
            {Array.isArray(sub_category)
              ? sub_category.map((item) => (
                <button onClick={() => navigate(`/dynamic-category/${item?._id}`)} style={{ margin: "0 5px" }} className='cursor-pointer'>
                  {item.name}
                </button>
              ))
              : null}
            <Button
              type="primary"
              style={{ backgroundColor: "#185F90", color: "white" }}
              icon={<PlusCircleFilled />}
              onClick={() => handleEdit(record)}
            />
          </>

        )
      },
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
        // setCategories([...categories, newCategory]);
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
        // setCategories(categories.filter((category) => category.key !== key));
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
      </div>

      <Table columns={columns} dataSource={categories} pagination={false} />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okButtonProps={{
          style: { backgroundColor: "#185F90", color: "white" },
        }}
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

export default DynamicCategory
