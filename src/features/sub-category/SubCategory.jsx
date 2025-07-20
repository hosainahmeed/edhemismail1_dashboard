import React, { useState } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import { Button, Space, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

function SubCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      name: "Vehicles",
      category: "Vehicles",
      subCategory: ["Cars", "Motorcycles", "Trucks"],
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

  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const handleAdd = (values) => {
    if (editMode) {
      const newData = data.map((item) =>
        item.key === editingKey
          ? {
              ...item,
              category: values.category,
              name: values.category,
              subCategory: values.subCategory,
            }
          : item
      );
      setData(newData);
      message.success("Sub Category updated successfully!");
    } else {
      const newKey = Date.now().toString();
      const newEntry = {
        key: newKey,
        name: values.category,
        category: values.category,
        subCategory: values.subCategory,
      };
      setData([...data, newEntry]);
      message.success("Sub Category added successfully!");
    }
    form.resetFields();
    setIsModalVisible(false);
    setEditMode(false);
    setEditingKey(null);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: () => {
        setData((prevData) => prevData.filter((item) => item.key !== key));
        message.success("Deleted successfully");
      },
    });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      category: record.category,
      subCategory: record.subCategory,
    });
    setEditingKey(record.key);
    setEditMode(true);
    setIsModalVisible(true);
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
            <h1 key={index}>
              {item},
            </h1>
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
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            form.resetFields();
            setIsModalVisible(true);
            setEditMode(false);
            setEditingKey(null);
          }}
          icon={<PlusOutlined />}
          className="!bg-[var(--primary-color)] !text-white"
        >
          Add
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Sub Category</h1>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={editMode ? "Edit Sub Category" : "Add Sub Category"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditMode(false);
          setEditingKey(null);
        }}
        footer={null}
      >
        <Form
          requiredMark={false}
          form={form}
          layout="vertical"
          onFinish={handleAdd}
        >
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Fashion">Fashion</Select.Option>
              <Select.Option value="Home & Living">Home & Living</Select.Option>
            </Select>
          </Form.Item>

          <Form.List name="subCategory">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Missing sub category" },
                      ]}
                    >
                      <Input placeholder="Sub Category" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Sub Category
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button
              className="!bg-[var(--primary-color)] !text-white"
              htmlType="submit"
              block
            >
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SubCategory;
