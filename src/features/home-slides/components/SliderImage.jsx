import React from 'react';
import { Button, Popconfirm, Upload, message } from 'antd';
import { FaTrash, FaUpload } from 'react-icons/fa';

const SliderImage = () => {
  const [slides, setSlides] = React.useState([
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800&auto=format',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format',
  ]);

  const handleUpload = async ({ file }) => {
    try {
      // For now, we'll just add a new placeholder image
      const newImage = `https://picsum.photos/800/400?random=${Math.floor(
        Math.random() * 100
      )}`;
      setSlides((prev) => [...prev, newImage]);
      message.success('Image added successfully');
    } catch (error) {
      message.error('Failed to add image');
      console.error('Error:', error);
    }
  };

  const handleDelete = (url) => {
    setSlides(slides.filter((slide) => slide !== url));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Home Slides</h1>

      <div className="mb-6">
        <Upload
          beforeUpload={() => false}
          onChange={handleUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 20px',
            }}
            icon={<FaUpload />}
          >
            Upload Slide Image
          </Button>
        </Upload>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slideUrl, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={slideUrl}
              alt="slide"
              className="w-full h-[300px] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Popconfirm
                  title="Are you sure to delete this slide?"
                  placement="bottom"
                  onConfirm={() => handleDelete(slideUrl)}
                >
                  <Button
                    type="primary"
                    danger
                    icon={<FaTrash />}
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      padding: '5px',
                    }}
                  />
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderImage