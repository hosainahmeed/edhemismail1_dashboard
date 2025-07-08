import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Verification = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [resendCount, setResendCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate verification
    setMessage('Verification code is correct! You can now reset your password.');
    // Add your actual verification logic here
  };

  const handleResend = () => {
    setResendCount(resendCount + 1);
    setMessage('New verification code has been sent to your email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the verification code sent to your email
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="code"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify Code
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleResend}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
              disabled={resendCount > 0}
            >
              {resendCount > 0 ? 'Verification code sent' : 'Resend Verification Code'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/auth"
              className="mt-4 font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
