import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import JoditComponent from '../../components/common/JoditComponent';
import toast from 'react-hot-toast';
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from '../../Redux/Apis/service/termsApis';

const Terms = () => {
  const [content, setContent] = useState('');
  const { data, isLoading } = useGetTermsAndConditionsQuery({});
  const [setDescription, { isLoading: isSubmitting }] =
    useUpdateTermsAndConditionsMutation();

  console.log(data)
  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const updateTerms = async () => {
    try {
      const requestData = {
        description: content,
      };

      const res = await setDescription({ requestData }).unwrap();
      if (res?.success) {
        toast.success(
          res?.message || 'Terms and conditions updated successfully !'
        );
      }
    } catch (error) {
      console.log(error);
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
      <h1 className='text-3xl !font-black'>Terms and Conditions</h1>
      <JoditComponent setContent={setContent} content={content} />
      {/* Button to log content */}
      <Button
        loading={isSubmitting}
        onClick={updateTerms}
        disabled={isSubmitting}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
        className="max-w-48 !w-full !h-12 !text-xl !bg-[var(--primary-color)] !text-white"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </>
  );
};

export default Terms;
