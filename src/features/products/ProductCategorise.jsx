import React from 'react'
import { useGetCategoriesQuery } from '../../Redux/Apis/service/categoryApis';
import { Image, Table } from 'antd';
import { Link } from 'react-router-dom';

function ProductCategorise() {
    const { data: categoryData, isLoading: categoryLoading } = useGetCategoriesQuery();

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
            render: (text, record) => <Link to={`/product/${record._id}`} state={{ breadcrumb: [{ name: record.name, categoryId: record._id }] }}>{text}</Link>,
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={categoryData?.data?.result}
                loading={categoryLoading}
                rowKey="_id"
            />
        </div>
    )
}

export default ProductCategorise