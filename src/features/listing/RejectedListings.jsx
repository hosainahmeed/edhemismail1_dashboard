import React from "react";
import { Table, Button, Space, message, Tag, Select } from "antd";
import { EyeOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { CiMail } from "react-icons/ci";

function RejectedListings({ location }) {
  const [listingData, setListingData] = React.useState([
    {
      key: "1",
      title: "Modern Apartment",
      category: "Property",
      email: "john.doe@example.com",
      language: "English",
      currency: "USD",
      date: "2025-07-10",
      status: "rejected",
      isBlocked: false,
      originalStatus: "pending",
    },
    {
      key: "2",
      title: "Luxury Car",
      category: "Vehicles",
      email: "john.doe@example.com",
      language: "Arabic",
      currency: "EUR",
      date: "2025-07-09",
      status: "rejected",
      isBlocked: false,
      originalStatus: "pending",
    },
    {
      key: "3",
      title: "Vintage Watch",
      category: "Accessories",
      email: "john.doe@example.com",
      language: "Spanish",
      currency: "GBP",
      date: "2025-07-08",
      status: "rejected",
      isBlocked: false,
      originalStatus: "pending",
    },
  ]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="red">{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<CiMail />} onClick={() => handleEmail(record.email)} />
          <Button
            danger={!record.isBlocked}
            icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleToggleBlock(record)}
          />
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    console.log(record);
  };

  const handleEmail = (email) => {
    window.open(
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`,
      "_blank"
    );
  };

  const handleToggleBlock = (record) => {
    const updatedData = listingData.map((listing) =>
      listing.key === record.key
        ? {
            ...listing,
            isBlocked: !listing.isBlocked,
          }
        : listing
    );
    setListingData(updatedData);
    message.success(
      `Listing ${record.title} is now ${
        record.isBlocked ? "unblocked" : "blocked"
      }`
    );
  };

  return (
    <div className="p-4">
      {location !== "/" && (
        <h1 className="text-2xl font-bold mb-4">Rejected Listings</h1>
      )}
      <Table
        scroll={{ x: 800 }}
        bordered
        columns={columns}
        pagination={
          location !== "/" && {
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: false,
            position: ["bottomCenter"],
            size: "small",
            defaultCurrent: 1,
            total: listingData.length,
            onChange: (page, pageSize) => {
              console.log("Page:", page);
              console.log("Page Size:", pageSize);
            },
          }
        }
        dataSource={listingData}
      />
    </div>
  );
}

export default RejectedListings