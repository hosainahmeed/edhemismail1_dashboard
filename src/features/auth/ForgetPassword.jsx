import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css';
import BrandLogo from '../../assets/brand-black.png';
import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
// import { useForgetEmailPostMutation } from '../../Redux/services/AuthApis/authApis';

const { Title, Text } = Typography;

const ForgetPassword = () => {
  // const [forgotPassword, { data, isLoading }] = useForgetEmailPostMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    localStorage.removeItem('email');
    localStorage.setItem('email', values.email);
    navigate('/auth/varification');
    // const data = {
    //   email: values.email,
    // };
    // await forgotPassword({ data })
    //   .unwrap()
    //   .then((res) => {
    //     if (res?.success) {
    //       toast.success('please check your email for otp');
    //       route('/otp');
    //     } else {
    //       console.log('error', res);
    //     }
    //   });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-white)] p-4">
      <div className="bg-white relative shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="flex mb-6 flex-col items-center">
          <Title level={3} className="mb-1">
            Forgot Password
          </Title>
          <Text type="secondary">
            Enter your email address to reset your password
          </Text>
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
              type="email"
              style={{
                width: '100%',
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
            'Continue with Email'
            {/* )} */}
          </Button>
        </Form>
      </div>
      <div>
        <img src={BrandLogo} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
};

export default ForgetPassword;
