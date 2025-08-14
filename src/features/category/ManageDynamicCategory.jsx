import React from 'react'
import { Modal, Form, Input, Button, Radio, Tooltip } from 'antd'
import { FaCircleQuestion } from 'react-icons/fa6'

function ManageDynamicCategory({ form, is_add_product, isModalOpen, setIsModalOpen, editingCategory, handleSubmit, updateCategoryLoading, createCategoryLoading, handleModalCancel }) {
    return (
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

                {!editingCategory && !is_add_product && <Form.Item
                    name="is_add_product"
                    label={<p className='flex items-center gap-2'>Add Product<Tooltip placement="top" title="By yes , you are agreeing that this sub category can add dynamic fields" arrow={false}><FaCircleQuestion /></Tooltip></p>}
                    rules={[{ required: true, message: "Please select an option!" }]}
                >
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>}
                <Button
                    loading={editingCategory ? updateCategoryLoading : createCategoryLoading}
                    htmlType='submit'
                >
                    {editingCategory ? "Update" : "Submit"}
                </Button>
            </Form>
        </Modal >
    )
}

export default ManageDynamicCategory