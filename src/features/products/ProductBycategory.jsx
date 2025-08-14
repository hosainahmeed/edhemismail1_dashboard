import React, { useState, useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/Apis/service/productApis";
import { Table, Button, Modal, Image, Spin, Tag, Typography, Divider, Breadcrumb } from "antd";
import { imageUrl } from "../../utils/server";
import { FaArrowAltCircleLeft, FaCheck, FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const { Title, Text } = Typography;

const useProductColumns = (onDetailsClick) => [
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        width: 90,
        render: (images) => (
            <Image
                width={60}
                height={60}
                src={imageUrl(images?.[0])}
                alt="product"
                className="rounded-lg shadow-sm object-cover"
                preview={false}
            />
        ),
    },
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text) => <Text strong>{text}</Text>,
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
        render: (location) => <Text type="secondary">{location || "N/A"}</Text>,
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date) => <Text type="secondary">{date || "N/A"}</Text>,
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Button icon={<FaEye />} className="!bg-[#185F90] !text-white" onClick={() => onDetailsClick(record)}>
                See Details
            </Button>
        ),
    },
];

const ProductDetailsModal = ({ product, onClose }) => {
    if (!product) return null;
    const details = [
        { label: "Title", value: product.title },
        { label: "Location", value: product.location },
        { label: "Date", value: product.date },
        { label: "Category", value: product.main_category?.name },
        { label: "Created By", value: product.createdBy?.email },
        { label: "Fields Reference", value: product.fieldsReference },
        {
            label: "Approval Status",
            value: product.isApprove ? (
                <Tag color="green" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>Approved <FaCheck /></Tag>
            ) : (
                <Tag color="red" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>Not Approved <MdCancel /></Tag>
            ),
        },
    ];

    return (
        <Modal
            title={<Title level={4}>Product Details</Title>}
            open={!!product}
            onCancel={onClose}
            footer={null}
            width={650}
            bodyStyle={{ backgroundColor: "#f9fafb", padding: "20px" }}
        >
            <div className="flex gap-4 mb-4">
                <Image
                    width={200}
                    height={200}
                    src={imageUrl(product.image?.[0])}
                    preview={false}
                    className="rounded-lg border border-gray-200 shadow"
                />
                <div className="flex flex-col justify-center">
                    <Title level={5} className="mb-1">
                        {product.title}
                    </Title>
                    <Text type="secondary">{product.location || "N/A"}</Text>
                    <Text type="secondary">{product.date || "N/A"}</Text>
                </div>
            </div>
            <Divider />
            <div className="space-y-2">
                {details.map((item) => (
                    <p key={item.label}>
                        <strong>{item.label}:</strong> {item.value}
                    </p>
                ))}
            </div>
        </Modal>
    );
};

function ProductBycategory() {
    const params = useParams();
    const { data: productData, isLoading } = useGetProductsQuery(
        { main_category: params?.categoryId },
        { skip: !params?.categoryId }
    );

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDetailsClick = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedProduct(null);
    }, []);

    const columns = useMemo(
        () => useProductColumns(handleDetailsClick),
        [handleDetailsClick]
    );

    const products = productData?.data?.result || [];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1><Link className="flex items-center gap-2 mb-12 hover:text-blue-500" to="/product"><FaArrowAltCircleLeft />Products</Link></h1>
            <Title level={3} className="mb-6">
                Products in Category
            </Title>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <Table
                        columns={columns}
                        dataSource={products}
                        rowKey="_id"
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                </div>
            )}

            <ProductDetailsModal
                product={selectedProduct}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default ProductBycategory;
