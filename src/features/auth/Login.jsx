import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import BrandLogo from '../../assets/brand-black.png';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../../Redux/Apis/auth/loginApis';
const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const onFinish = async (values) => {
    const data = { email: values.email, password: values.password };
    try {
      await loginUser({ data }).unwrap().then((res) => {
        if (res?.success) {
          const accessToken = res?.data?.accessToken;
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            toast.success(res?.message);
            window.location.href = '/';
          }
        }
      }).catch((error) => {
        console.log(error)
        toast.error(error?.data?.message || 'Something went wrong');
      });
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-white)] p-4">
      <Card className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">Login to Account</h1>
          <p className="text-sm text-gray-500">
            Please enter your email and password to continue
          </p>
        </div>
        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input
              placeholder="exmple@gmail.com"
              defaultValue={'maniksarker265@gmail.com'}
              type="email"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input.Password
              placeholder="Password"
              defaultValue={'admin123'}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-between">
            <Link
              to="/auth/forgot-password"
              className="!text-[var(--primary-color)] hover:!underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            size='large'
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full !bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] !text-white"
            style={{ marginTop: 10 }}
          >
            Continue with Email
          </Button>
        </Form>
      </Card>
      <div>
        <img src={BrandLogo} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
};

export default Login;
