import React, { useEffect, useMemo, useState } from 'react'
import { Breadcrumb, Button, Popconfirm, Space, Table, Modal, Input, Form, Tag } from 'antd'
import { useGetSubCategoriesQuery } from '../../Redux/Apis/service/categoryApis'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PlusCircleFilled } from '@ant-design/icons'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../Redux/Apis/service/categoryApis'
import toast from 'react-hot-toast'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

function DynamicCategory() {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null) // Track if we're editing

  const initialBreadcrumb = location.state?.breadcrumb || []
  const [breadcrumb, setBreadcrumb] = useState(initialBreadcrumb)
  const [createCategory, { isLoading: createCategoryLoading }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: updateCategoryLoading }] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const queryParams = useMemo(() => ({ id: params?.categoryId }), [params?.categoryId])
  const { data, isLoading, isFetching } = useGetSubCategoriesQuery(queryParams, {
    skip: !params?.categoryId,
    refetchOnMountOrArgChange: true
  })
  console.log(data)
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
          navigate(`/dynamic-category/${params?.categoryId}`)
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
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
        </Space>
      ),
    }
  ]

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
        const data = {
          id: editingCategory._id,
          data: {
            name: values.name,
            parentCategory: params.categoryId
          }
        }
        await updateCategory({ data }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message)
            setIsModalOpen(false)
            setEditingCategory(null)
            form.resetFields()
          }
        })
      } else {
        // Create new category
        const data = { name: values.name, parentCategory: params.categoryId }
        await createCategory({ data }).unwrap().then((res) => {
          console.log("res", res)
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

  const handleModalCancel = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    form.resetFields()
  }

  const handleBack = () => {
    setBreadcrumb([])
    navigate(`/category`)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <FaArrowAltCircleLeft className='text-2xl cursor-pointer' onClick={() => handleBack()} />
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
      <Modal
        open={isModalOpen}
        destroyOnClose
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={handleModalCancel}
        width={600}
        okButtonProps={{
          style: { backgroundColor: "#185F90", color: "white" },
        }}
        mask={true}
        title={editingCategory ? "Edit Sub Category" : "Add Sub Category"}
      >
        <Form layout='vertical' form={form} requiredMark={false} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Button
            loading={editingCategory ? updateCategoryLoading : createCategoryLoading}
            htmlType='submit'
          >
            {editingCategory ? "Update" : "Submit"}
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default DynamicCategory