import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input } from "antd";
import { LockOutlined, SearchOutlined, UnlockOutlined } from "@ant-design/icons";
import { useAllUsersQuery } from "../../../Redux/Apis/service/userApis";

function AllUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useAllUsersQuery({ searchTerm: searchTerm });
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (data?.data?.result) {
      const transformed = data.data.result.map((item) => ({
        key: item._id,
        name: `${item.firstName} ${item.lastName}`,
        userImage: item.profile_image || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
        userType: "Unknown",
        contactNumber: item?.contactNumber || "N/A",
        email: item.email,
        isBlocked: item.user?.isBlocked || false,
      }));
      setUserData(transformed);
    }
  }, [data]);

  const handleToggleBlock = (record) => {
    console.log(record);
    // message.success(
    //   `User ${record.name} is now ${record.isBlocked ? "unblocked" : "blocked"}`
    // );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
            style={{ width: 50, height: 50, borderRadius: "50%" }}
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
          danger={record.isBlocked}
          icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
          onClick={() => handleToggleBlock(record)}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 justify-end">
        <Input
          placeholder="Search users"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          size="large"
          className="mb-4 max-w-[400px]"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <Table
        scroll={{ x: 'max-content' }}
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={userData}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: true,
          position: ["bottomCenter"],
          size: "small",
          total: userData.length,
        }}
      />
    </div>
  );
}

export default AllUser;
