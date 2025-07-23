import React, { useState } from "react";
import {  Modal, Table, message } from "antd";
import { Button, Space, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function SubCategory() {
  const [data, setData] = useState([
    {
      key: "1",
      name: "Vehicles",
      category: "Vehicles",
      subCategory: [{ id: 1, name: "Cars" }, "Motorcycles", "Trucks"],
    },
    {
      key: "2",
      name: "Real Estate",
      category: "Real Estate",
      subCategory: ["Apartments", "Houses", "Land"],
    },
    {
      key: "3",
      name: "Job Offers",
      category: "Job Offers",
      subCategory: ["IT", "Sales", "Marketing"],
    },
    {
      key: "4",
      name: "New & Used Products",
      category: "New & Used Products",
      subCategory: ["Electronics", "Furniture", "Clothing"],
    },
    {
      key: "5",
      name: "Animals",
      category: "Animals",
      subCategory: ["Pets", "Livestock", "Accessories"],
    },
    {
      key: "6",
      name: "Services",
      category: "Services",
      subCategory: ["Cleaning", "Repair", "Tutoring"],
    },
  ]);

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: () => {
        setData((prevData) => prevData.filter((item) => item.key !== key));
        message.success("Deleted successfully");
      },
    });
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (text, record) => (
        <Space wrap>
          {record.subCategory.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            className="!bg-[var(--primary-color)] !text-white"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
          <Button icon={<PlusOutlined />}>Add Sub</Button>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sub Category</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default SubCategory;
