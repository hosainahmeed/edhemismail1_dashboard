import React, { useState } from 'react';
import { Typography, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
import BrandLogo from '../../assets/brand-black.png';
// import {
//   useForgetEmailPostMutation,
//   useVerifyOtpCodeMutation,
// } from '../../Redux/services/AuthApis/authApis';

const { Title, Text } = Typography;

const Verification = () => {
  const router = useNavigate();
  // const [verifyOtp, { isLoading }] = useVerifyOtpCodeMutation();
  // const [resendOtp] = useForgetEmailPostMutation();
  const [otp, setOtp] = useState('');
  const handleContinue = async () => {
    console.log(otp);
    router('/auth/reset-password');
  };
  const resendOtpHandler = async () => {
    console.log('resendOtpHandler');
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <Card className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Check your email</h1>
          <h1 className="text-base text-gray-500">
            We sent a code to your email address @. Please check your email for
            the 5 digit code.
          </h1>
        </div>
        <div className="flex justify-center my-4">
          <Input.OTP
            length={6}
            value={otp}
            onChange={setOtp}
            className="text-center text-xl w-full"
          />
        </div>

        <Button
          type="primary"
          className="w-full !bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] !text-white"
          disabled={otp.length < 6}
          // loading={isLoading}
          onClick={handleContinue}
        >
          Continue
        </Button>

        <div className="mt-3">
          <div>
            <Text>Didn&apos;t receive the OTP? </Text>
            <Text
              onClick={() => resendOtpHandler()}
              className="text-[#3872F0] cursor-pointer hover:underline"
            >
              {/* {isLoading ? (
                <div class="flex flex-row gap-2">
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                </div> */}
              {/* ) : ( */}
              'Resend OTP'
              {/* )} */}
            </Text>
          </div>
        </div>
      </Card>
      <div>
        <img src={BrandLogo} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
};

export default Verification;
