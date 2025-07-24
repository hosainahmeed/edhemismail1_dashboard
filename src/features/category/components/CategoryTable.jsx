import { Image, Table, Tag, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";
import CategoryActions from "./CategoryActions";

const CategoryTable = ({
  categories,
  loading,
  onAddNew,
  onEdit,
  onDelete
}) => {
  const columns = [
    {
      title: "Category Image",
      dataIndex: "category_image",
      key: "category_image",
      render: (image) => (
        <Image
          src={image}
          alt="Category"
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
          preview={false}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/dynamic-category/${record._id}`}>{text}</Link>,
    },
    {
      title: "Subcategories",
      dataIndex: "totalSubcategory",
      key: "totalSubcategory",
      render: (count) => <Tag color={count > 0 ? "blue" : "default"}>{count}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <CategoryActions 
          record={record} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Categories</h2>
        <Button
          style={{ backgroundColor: "#185F90", color: "white" }}
          icon={<PlusCircleFilled />}
          onClick={onAddNew}
        >
          Add New Category
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={categories}
          loading={loading}
          scroll={{ x: 1300 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: false,
            position: ['bottomCenter'],
            size: 'small',
            showQuickJumper: false,
            showLessItems: true,
          }}
        />
      </Spin>
    </div>
  );
};

export default CategoryTable;
