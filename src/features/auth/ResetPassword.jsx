import React from 'react';
import { Form, Button, Input, Card } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
import { useState } from 'react';
import { Typography } from 'antd';
// import { useResetPasswordMutation } from '../../Redux/services/AuthApis/authApis';

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const route = useNavigate();
  const onFinish = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        return Promise.reject(new Error('Passwords do not match!'));
      }
      const data = {
        email: localStorage.getItem('email'),
        newPassword: values?.password,
        confirmPassword: values?.confirmPassword,
      };
      console.log(data);
      route('/auth/login');
      // const res = await resetPassword({ data }).unwrap();
      // if (res?.success) {
      //   toast.success('Password reset successfully');
      //   route('/login');
      // } else {
      //   toast.error('Password reset failed');
      // }
    } catch (error) {
      console.error('Reset Password Error:', error);
      // toast.error(
      //   error?.data?.message || error?.message || 'An unexpected error occurred'
      // );
    }
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--)] p-4">
      <Card className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <div className="flex mb-6 flex-col items-center">
          <Title level={3} className="mb-1">
            Reset Password
          </Title>
          <Text type="secondary">
            Enter your email address to reset your password
          </Text>
        </div>
        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                textAlign: 'start',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                textAlign: 'start',
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] !text-white"
            style={{ marginTop: 10 }}
          >
            {/* {isLoading ? (
              <div class="flex flex-row gap-2">
                <div class="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : ( */}
            'Confirm'
            {/* )} */}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
