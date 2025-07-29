import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import toast from 'react-hot-toast';
import { useCreateAdminMutation } from '../../../Redux/Apis/service/adminApis';

function CreateNewAdmin({ closeModal }) {
    const [createAdmin, { isLoading }] = useCreateAdminMutation();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const data = {
            name: values?.name,
            email: values?.email,
            password: values?.password,
        };
        try {
            await createAdmin({ data })
                .unwrap()
                .then((res) => {
                    if (res?.success) {
                        toast.success(res?.message || 'Admin added successfully');
                        form.resetFields();
                        closeModal(false);
                    }
                });
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const onCancel = () => {
        form.resetFields();
        closeModal();
    };

    return (
        <div>
            <div className="text-center">
                <Divider>
                    <h1 className="text-3xl font-semibold">Add New Admin</h1>
                </Divider>

                <p className="text-sm">
                    Create a new admin account by filling in the required information. The
                    new admin will receive access based on the assigned role.
                </p>
                <Divider />
            </div>
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input the full name!' }]}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input the email!' },
                        { type: 'email', message: 'Please input a valid email!' },
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="password"
                    label="Admin Password"
                    rules={[
                        { required: true, message: 'Please input the password!' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '8px',
                    }}
                >
                    <Button
                        className="!w-full !h-10 !text-white !bg-[var(--primary-color)]"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={isLoading}
                        className="!w-full !h-10 !text-white !bg-[var(--primary-color)]"
                        htmlType="submit"
                    >
                        {isLoading ? 'Creating...' : 'Create Admin'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateNewAdmin;