import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import JoditComponent from '../../components/common/JoditComponent';
import toast from 'react-hot-toast';
import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from '../../Redux/Apis/service/privacyPolicyApis';

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');
  const { data, isLoading } = useGetPrivacyPolicyQuery({});
  const [setDescription, { isLoading: isSubmitting }] =
    useUpdatePrivacyPolicyMutation();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleLogContent = async () => {
    try {
      await setDescription({ description: content })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(
              res?.message || 'Privacy policy updated successfully'
            );
          } else {
            toast.error(res?.message || 'Something went wrong');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="w-48 h-6 mb-3 rounded-md animate-pulse bg-gray-200"></div>
        <div className="w-full p-3 flex flex-col gap-2 min-h-[600px] animate-pulse rounded-md bg-gray-200">
          {Array.from({ length: 22 }).map((_, x) => (
            <div key={x} className="bg-gray-300 h-3 w-full animate-pulse"></div>
          ))}
        </div>
        <div className="w-32 h-8 mt-3 rounded-md animate-pulse bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      {/* heading and back button */}
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <JoditComponent setContent={setContent} content={content} />

      {/* Button to log content */}
      <Button
        loading={isSubmitting}
        onClick={handleLogContent}
        disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
        className="max-w-48 sidebar-button-black"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </>
  );
};

export default PrivacyPolicy;
