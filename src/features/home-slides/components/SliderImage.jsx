import React, { useState } from 'react';
import { Button, Image, Popconfirm, Spin, Upload, Progress, message } from 'antd';
import { FaTrash, FaUpload, FaSpinner } from 'react-icons/fa';
import { useCreateBannerMutation, useDeleteBannerMutation, useGetBannerQuery } from '../../../Redux/Apis/service/bannerApis';
import toast from 'react-hot-toast';

const SliderImage = () => {
  const { data, isLoading } = useGetBannerQuery();
  const [deleteBanner] = useDeleteBannerMutation();
  const [createBanner] = useCreateBannerMutation();

  // Local state for UI feedback
  const [uploadingFiles, setUploadingFiles] = useState(new Set());
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [uploadProgress, setUploadProgress] = useState({});

  const handleUpload = async ({ file }) => {
    const fileId = file.uid;
    setUploadingFiles(prev => new Set([...prev, fileId]));
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

    const form = new FormData();
    form.append('banner', file);

    try {
      // Simulate upload progress (you can replace this with actual progress if your API supports it)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress < 90) {
            return { ...prev, [fileId]: currentProgress + 10 };
          }
          return prev;
        });
      }, 200);

      const res = await createBanner({ data: form }).unwrap();

      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

      if (res?.success) {
        toast.success(res?.message || 'Image uploaded successfully!');
        // Clean up progress after success
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        }, 1000);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to upload image');
      console.error('Upload Error:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    } finally {
      setUploadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const handleDelete = async (id) => {
    setDeletingIds(prev => new Set([...prev, id]));

    try {
      const res = await deleteBanner(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Image deleted successfully!');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete image');
      console.error('Delete Error:', error);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const isUploading = uploadingFiles.size > 0;

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Loading slides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Home Slides</h1>
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <Upload
          beforeUpload={() => false}
          onChange={handleUpload}
          showUploadList={false}
          accept="image/*"
          disabled={isUploading}
        >
          <Button
            style={{
              backgroundColor: isUploading ? '#ccc' : 'var(--primary-color)',
              color: 'white',
              border: 'none',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              padding: '10px 20px',
              height: '45px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            icon={isUploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Slide Image'}
          </Button>
        </Upload>
      </div>

      {/* Slides Grid */}
      {data?.data?.result?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📷</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No slides available</h3>
          <p className="text-gray-500">Upload your first slide image to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.result?.map((slide, index) => {
            const isDeleting = deletingIds.has(slide?._id);

            return (
              <div
                key={slide?._id || index}
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ${isDeleting ? 'opacity-50 scale-95' : 'hover:shadow-xl'
                  }`}
              >
                <div className='w-full h-[300px] relative'>
                  <Image
                    src={slide?.image || "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    placeholder={
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Spin size="large" />
                      </div>
                    }
                  />

                  {/* Loading overlay for delete */}
                  {isDeleting && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Spin size="large" />
                        <p className="mt-2">Deleting...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-sm">
                      Slide {index + 1}
                    </div>
                    <div className="flex gap-2">
                      <Popconfirm
                        title="Delete this slide?"
                        description="This action cannot be undone."
                        placement="topRight"
                        onConfirm={() => handleDelete(slide?._id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
                        okButtonProps={{
                          danger: true,
                          loading: isDeleting
                        }}
                        disabled={isDeleting}
                      >
                        <Button
                          type="primary"
                          danger
                          icon={isDeleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                          disabled={isDeleting}
                          style={{
                            backgroundColor: isDeleting ? '#ccc' : '#ff4d4f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title={isDeleting ? 'Deleting...' : 'Delete slide'}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {Object.keys(uploadProgress).length > 0 && <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-2xl bg-[#185F90] w-[400px] p-4 z-50'>
        {Object.entries(uploadProgress).map(([fileId, progress]) => (
          <div key={fileId} className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-white">Uploading image...</span>
            </div>
            <Progress
              percent={progress}
              status={progress === 100 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#185F90',
                '100%': '#185F90',
              }}
            />
          </div>
        ))}
      </div>}
    </div>
  );
};

export default SliderImage;