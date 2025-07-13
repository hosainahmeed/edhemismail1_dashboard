import React from "react";
import { Input, Table, DatePicker } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

function Support() {
  const supportUsers = [
    {
      key: "1",
      name: "John Doe",
      role: "Client",
      email: "john.doe@example.com",
      time: "2025-07-13 13:46:47",
    },
    {
      key: "2",
      name: "Jane Smith",
      role: "Vendor",
      email: "jane.smith@example.com",
      time: "2025-07-13 13:46:47",
    },
    {
      key: "3",
      name: "Mike Johnson",
      role: "Client",
      email: "mike.johnson@example.com",
      time: "2025-07-13 13:46:47",
    },
    {
      key: "4",
      name: "Sarah Wilson",
      role: "Vendor",
      email: "sarah.wilson@example.com",
      time: "2025-07-13 13:46:47",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  const handleSearch = (value) => {
    console.log(value.target.value);
  };

  const handleDateChange = (value) => {
    console.log(value);
  };

  return (
    <div className="support-container">
      <div className="flex mb-4 items-center gap-2 justify-end">
        <Input
          placeholder="Search users"
          onChange={handleSearch}
          prefix={<SearchOutlined />} 
          size="large"
          className="max-w-[400px]"
        />
        <DatePicker
          prefixIcon={<FilterOutlined />}
          size="large"
          placeholder="Select Date"
          onChange={handleDateChange}
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Support</h2>
      <Table
        bordered
        columns={columns}
        dataSource={supportUsers}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false,
        }}
        className="support-table"
      />
    </div>
  );
}

export default Support;
