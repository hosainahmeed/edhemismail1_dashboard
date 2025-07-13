import React from "react";
import { Table, Button, Space, message, Input } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

function AllUser() {
  const [userData, setUserData] = React.useState([
    {
      key: "1",
      name: "John Doe",
      userImage:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      userType: "Free",
      contactNumber: "+1234567890",
      email: "john.doe@example.com",
      isBlocked: false,
    },
    {
      key: "2",
      name: "Jane Smith",
      userImage:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      userType: "Premium",
      contactNumber: "+0987654321",
      email: "jane.smith@example.com",
      isBlocked: false,
    },
  ]);

  const columns = [
    {
      title: "User’s Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.userImage}
            alt="User"
            style={{ width: 50, height: 50 }}
          />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          danger={!record.isBlocked}
          icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
          onClick={() => handleToggleBlock(record)}
        />
      ),
    },
  ];

  const handleToggleBlock = (record) => {
    const updatedData = userData.map((user) =>
      user.key === record.key
        ? {
            ...user,
            isBlocked: !user.isBlocked,
          }
        : user
    );
    setUserData(updatedData);
    message.success(
      `User ${record.name} is now ${record.isBlocked ? "unblocked" : "blocked"}`
    );
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 justify-end">
        <Input.Search
          placeholder="Search users"
          onSearch={handleSearch}
          enterButton="Search"
          size="large"
          className="mb-4 max-w-[400px]"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <Table
        bordered
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: false,
          position: ["bottomCenter"],
          size: "small",
          defaultCurrent: 1,
          total: userData.length,
          onChange: (page, pageSize) => {
            console.log("Page:", page);
            console.log("Page Size:", pageSize);
          },
        }}
        dataSource={userData}
      />
    </div>
  );
}

export default AllUser;
