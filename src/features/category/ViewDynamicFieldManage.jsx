import { Modal, Form, Input, Select, Checkbox, Radio, DatePicker, Upload, Button, Empty } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { useGetFieldsQuery } from '../../Redux/Apis/service/filedApis';

function ViewDynamicFieldManage({ viewFieldModalOpen, setViewFieldModalOpen, id }) {
    const { data, isLoading } = useGetFieldsQuery(id, { skip: !viewFieldModalOpen || !id });
    const [form] = Form.useForm();

    const renderField = (field) => {
        const { type, label, name, options = [], is_required } = field;
        const rules = [{ required: is_required, message: `${label} is required` }];

        switch (type) {
            case 'text':
                return (
                    <div>
                        {
                            label === 'location' ? (
                                null
                            ) : (
                                <Form.Item key={name} label={label} name={name} rules={rules}>
                                    <Input placeholder={`Enter ${label}`} />
                                </Form.Item>
                            )
                        }
                    </div>
                );

            case 'number':
                return (
                    <Form.Item key={name} label={label} name={name} rules={rules}>
                        <Input type="number" placeholder={`Enter ${label}`} />
                    </Form.Item>
                );

            case 'date':
                return (
                    <Form.Item key={name} label={label} name={name} rules={rules}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                );

            case 'select':
                return (
                    <Form.Item key={name} label={label} name={name} rules={rules}>
                        <Select placeholder={`Select ${label}`}>
                            {options.map((opt) => (
                                <Select.Option key={opt} value={opt}>
                                    {opt}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                );

            case 'checkbox':
                return (
                    <Form.Item key={name} label={label} name={name} rules={rules}>
                        <Checkbox.Group options={options} />
                    </Form.Item>
                );

            case 'radio':
                return (
                    <Form.Item key={name} label={label} name={name} rules={rules}>
                        <Radio.Group>
                            {options.map((opt) => (
                                <Radio key={opt} value={opt}>
                                    {opt}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                );

            case 'file':
                return (
                    <Form.Item
                        key={name}
                        label={label}
                        name={name}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={rules}
                    >
                        <Upload beforeUpload={() => false} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload {label}</Button>
                        </Upload>
                    </Form.Item>
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            loading={isLoading}
            open={viewFieldModalOpen}
            title="View Dynamic Fields"
            width={600}
            footer={null}
            onCancel={() => setViewFieldModalOpen(false)}
            destroyOnClose
        >
            {
                data?.data?.length > 1 ? (
                    <Form form={form} layout="vertical">
                        {data?.data?.map((field) => renderField(field))}
                    </Form>
                ) : (
                    <Empty description="No fields found" />
                )
            }
        </Modal>
    );
}

export default ViewDynamicFieldManage;
