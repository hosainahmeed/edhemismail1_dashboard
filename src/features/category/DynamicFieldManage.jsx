import { Button, Form, Input, Modal, Radio, Select, Space, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useCreateFieldMutation } from '../../Redux/Apis/service/filedApis';

const fieldTypes = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    // { value: "date", label: "Date" },
    { value: "select", label: "Select" },
    // { value: "checkbox", label: "Checkbox" },
    // { value: "radio", label: "Radio" },
    { value: "file", label: "File" },
];

const DynamicFieldManage = ({ fieldModalOpen, setFieldModalOpen, initialValues, id }) => {
    const [form] = Form.useForm();
    const [selectedType, setSelectedType] = useState(null);
    const [createField, { isLoading }] = useCreateFieldMutation();

    useEffect(() => {
        if (fieldModalOpen) {
            const values = initialValues || { is_required: false };
            form.setFieldsValue(values);
            setSelectedType(values.type);
        }
    }, [fieldModalOpen, initialValues, form]);

    const handleSubmit = async (values) => {
        try {
            let finalValues = { ...values };
            if (['select'].includes(values.type)) {
                if (values.options?.length > 0) {
                    delete finalValues.category;
                } else if (values.category) {
                    delete finalValues.options;
                }
            } else {
                delete finalValues.options;
                delete finalValues.category;
            }

            await createField({ data: finalValues, id }).unwrap().then((res) => {
                if (res?.success) {
                    toast.success(res?.message);
                    setFieldModalOpen(false);
                    form.resetFields();
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    const renderOptionsField = () => {
        if (!['select'].includes(selectedType)) return null;

        return (
            <Form.Item
                name="options"
                label="Options"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const category = getFieldValue('category');
                            if (!category && (!value || value.length === 0)) {
                                return Promise.reject("Please add at least one option!");
                            }
                            return Promise.resolve();
                        }
                    })
                ]}
            >
                <Form.List name="options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name]}
                                        rules={[
                                            { required: true, message: 'Option is required' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const options = getFieldValue('options') || [];
                                                    if (options.filter(opt => opt === value).length > 1) {
                                                        return Promise.reject('Duplicate option');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input placeholder="Enter option value" />
                                    </Form.Item>
                                    <CloseOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add Option
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>

        );
    };

    const renderCategory = () => {
        return (
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please paste category id!",
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.reject("Please paste category id!");
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input placeholder="Paste category id" />
            </Form.Item>
        );
    };

    return (
        <Modal
            open={fieldModalOpen}
            title={initialValues ? "Edit Field" : "Create Field"}
            width={600}
            footer={null}
            onCancel={() => {
                form.resetFields();
                setFieldModalOpen(false);
            }}
            destroyOnClose
        >
            <Form form={form} requiredMark={false} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Field Name"
                    rules={[
                        { required: true, message: "Required" },
                        {
                            pattern: /^[a-z0-9_]+$/,
                            message: "Only lowercase letters, numbers, and underscores"
                        }
                    ]}
                >
                    <Input placeholder="e.g., eng_type" />
                </Form.Item>

                <Form.Item
                    name="label"
                    label="Display Label"
                    rules={[{ required: true, message: "Required" }]}
                >
                    <Input placeholder="e.g., Engine Type" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Field Type"
                    rules={[{ required: true, message: "Required" }]}
                >
                    <Select
                        options={fieldTypes}
                        onChange={setSelectedType}
                        placeholder="Select field type"
                    />
                </Form.Item>

                {/* Tabs only for select, checkbox, and radio */}
                {['select'].includes(selectedType) && (
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                key: "1",
                                label: "Options",
                                children: renderOptionsField(),
                            },
                            {
                                key: "2",
                                label: "Category",
                                children: renderCategory(),
                            },
                        ]}
                    />
                )}

                <Form.Item
                    name="is_required"
                    label="Is Required"
                    rules={[{ required: true, message: "Required" }]}
                >
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit">
                        {initialValues ? "Update" : "Create"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DynamicFieldManage;
