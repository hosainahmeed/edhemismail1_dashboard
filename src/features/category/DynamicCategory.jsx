import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Breadcrumb, Button, Popconfirm, Space, Table, Form, Tag, Tooltip } from 'antd'
import { useGetSubCategoriesQuery } from '../../Redux/Apis/service/categoryApis'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '../../Redux/Apis/service/categoryApis'
import toast from 'react-hot-toast'
import { FaArrowAltCircleLeft, FaCopy, FaEye } from 'react-icons/fa'
import DynamicFieldManage from './DynamicFieldManage'
import ViewDynamicFieldManage from './ViewDynamicFieldManage'
import ManageDynamicCategory from './ManageDynamicCategory'

function DynamicCategory() {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fieldModalOpen, setFieldModalOpen] = useState(false)
  const [viewFieldModalOpen, setViewFieldModalOpen] = useState(false)
  const [fieldId, setFieldId] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const initialBreadcrumb = location?.state?.breadcrumb || []
  const [breadcrumb, setBreadcrumb] = useState(initialBreadcrumb)
  const [createCategory, { isLoading: createCategoryLoading }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: updateCategoryLoading }] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const queryParams = useMemo(() => ({ id: params?.categoryId }), [params?.categoryId])
  const { data, isLoading, isFetching } = useGetSubCategoriesQuery(queryParams, {
    skip: !params?.categoryId,
    refetchOnMountOrArgChange: true
  })

  const handleEdit = (record) => {
    setEditingCategory(record)
    form.setFieldsValue(record)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingCategory(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteCategory({ id }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message)
        }
      })
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={(e) => {
          e.preventDefault()
          handleDynamicAction(record)
        }}>
          {text}
        </a>
      ),
    },
    {
      title: "Subcategories",
      dataIndex: "totalSubcategory",
      key: "totalSubcategory",
      render: (count) => <Tag color={count > 0 ? "blue" : "default"}>{count}</Tag>,
    },
    {
      title: "Parent Category",
      dataIndex: "parentCategory",
      key: "parentCategory",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Copy the category id">
            <Button
              type="primary"
              style={{ backgroundColor: "#185F90", color: "white" }}
              icon={<FaCopy />}
              onClick={async () => {
                const textToCopy = record?._id;
                if (!textToCopy) {
                  toast.error("No ID to copy");
                  return;
                }

                if (navigator.clipboard && window.isSecureContext) {
                  try {
                    await navigator.clipboard.writeText(textToCopy);
                    toast.dismiss()
                    toast.success("Id Copied to clipboard");
                    return;
                  } catch (err) {
                    toast.dismiss()
                    toast.error("Failed to copy");
                    console.error("Clipboard API failed, falling back...", err);
                  }
                }

                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                  document.execCommand("copy");
                  toast.dismiss()
                  toast.success("Id Copied to clipboard");
                } catch (err) {
                  toast.dismiss()
                  toast.error("Failed to copy");
                  console.error("Fallback copy failed:", err);
                } finally {
                  document.body.removeChild(textArea);
                }
              }}
            />
          </Tooltip>

          <Button
            type="primary"
            style={{ backgroundColor: "#185F90", color: "white" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record._id)}>
            <Button
              type="danger"
              style={{ backgroundColor: "red", color: "white" }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          <Button
            style={{ backgroundColor: `${record?.is_add_product === false ? "gray" : "#185F90"}`, color: "white" }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAddFields(record._id)}
            disabled={record?.is_add_product === false}
          >
            Add fields
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: `${record?.is_add_product === false ? "gray" : "#185F90"}`, color: "white" }}
            icon={<FaEye />}
            onClick={() => handleViewFields(record._id)}
            disabled={record?.is_add_product === false}
          >
            View fields
          </Button>
        </Space>
      ),
    }
  ]

  const handleAddFields = (id) => {
    setFieldModalOpen(true)
    setFieldId(id)
  }

  const handleViewFields = (id) => {
    setViewFieldModalOpen(true)
    setFieldId(id)
  }

  const handleDynamicAction = (record) => {
    const existingIndex = breadcrumb.findIndex(
      item => item.categoryId === record._id
    )

    let newBreadcrumb
    if (existingIndex >= 0) {
      newBreadcrumb = breadcrumb.slice(0, existingIndex + 1)
    } else {
      newBreadcrumb = [
        ...breadcrumb,
        {
          name: record.name,
          categoryId: record._id,
        }
      ]
    }
    navigate(`/dynamic-category/${record._id}`, {
      state: { breadcrumb: newBreadcrumb }
    })
  }

  const handleBreadcrumbClick = (item, index) => {
    const newBreadcrumb = breadcrumb.slice(0, index + 1)
    const lastItem = newBreadcrumb[newBreadcrumb.length - 1]

    navigate(`/dynamic-category/${lastItem.categoryId}`, {
      state: { breadcrumb: newBreadcrumb }
    })
  }

  useEffect(() => {
    if (location.state?.breadcrumb) {
      setBreadcrumb(location.state.breadcrumb)
    }
  }, [location.state])

  const handleSubmit = async (values) => {
    try {
      if (editingCategory) {
        // Update existing category
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('parentCategory', params?.categoryId)
        await updateCategory({ data: formData, id: editingCategory?._id }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message)
            setIsModalOpen(false)
            setEditingCategory(null)
            form.resetFields()
          }
        })
      } else {
        // Create new category
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('parentCategory', params?.categoryId)
        formData.append('is_add_product', values.is_add_product)
        formData.append('is_parent_adding_product', location?.state?.parent_active ? true : false)
        console.log("parent_active", location?.state?.parent_active)
        if (data?.data?.main_category?.is_add_product === true) {
          formData.delete('is_add_product')
        }

        await createCategory({ data: formData }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message)
            setIsModalOpen(false)
            form.resetFields()
          }
          else {
            toast.error(res?.message)
          }
        })
      }
    } catch (error) {
      console.log("error", error)
      toast.error(error?.data?.message)
    }
  }

  const handleModalCancel = useCallback(() => {
    setIsModalOpen(false)
    setEditingCategory(null)
    form.resetFields()
  }, [form])

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])
  return (
    <div>
      <div className="flex items-center gap-2">
        <FaArrowAltCircleLeft className='text-2xl cursor-pointer' onClick={() => handleBack()} />
        {breadcrumb?.length > 0 && <Link className='text-sm text-[#8e8585]' to="/category">category</Link>}/
        <Breadcrumb>
          {breadcrumb?.length > 0 ? breadcrumb.map((item, index) => (
            <Breadcrumb.Item key={index}>
              <a onClick={(e) => {
                e.preventDefault()
                handleBreadcrumbClick(item, index)
              }}>
                {item.name}
              </a>
            </Breadcrumb.Item>
          )) : <Breadcrumb.Item>
            <a onClick={(e) => {
              e.preventDefault()
              handleBack()
            }}>
              Category
            </a>
          </Breadcrumb.Item>}
        </Breadcrumb>
      </div>
      <Button
        type="primary"
        style={{ backgroundColor: "#185F90", color: "white", marginBottom: "1rem", marginTop: "1rem", float: "right" }}
        icon={<PlusCircleFilled />}
        onClick={handleAdd}
      >
        Add Sub Category
      </Button>
      <Table
        columns={columns}
        loading={isLoading || isFetching}
        dataSource={data?.data?.result || []}
        rowKey="_id"
      />

      <ManageDynamicCategory
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingCategory={editingCategory}
        is_add_product={data?.data?.main_category?.is_add_product}
        handleSubmit={handleSubmit}
        updateCategoryLoading={updateCategoryLoading}
        createCategoryLoading={createCategoryLoading}
        handleModalCancel={handleModalCancel}
      />
      <DynamicFieldManage
        fieldModalOpen={fieldModalOpen}
        id={fieldId}
        setFieldModalOpen={setFieldModalOpen}
      />
      <ViewDynamicFieldManage
        viewFieldModalOpen={viewFieldModalOpen}
        id={fieldId}
        setViewFieldModalOpen={setViewFieldModalOpen}
      />
    </div >
  )
}

export default DynamicCategory