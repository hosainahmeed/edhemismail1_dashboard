import { Form, Input, Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CategoryForm = ({ 
  form, 
  onFinish, 
  fileList, 
  onUploadChange, 
  beforeUpload,
  isEditing 
}) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadProps = {
    accept: "image/*",
    name: "image",
    listType: "picture-card",
    beforeUpload: beforeUpload,
    onChange: onUploadChange,
    fileList: fileList,
    maxCount: 1,
    onRemove: () => {
      onUploadChange({ fileList: [] });
    }
  };

  return (
    <Form
      name="category"
      requiredMark={false}
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="image"
        label="Category Image"
        rules={[{
          required: !isEditing,
          message: "Please upload an image!",
          validator: (_, value) => {
            if (isEditing) {
              return Promise.resolve();
            }
            if (fileList && fileList.length > 0) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('Please upload an image!'));
          }
        }]}
      >
        <Upload {...uploadProps}>
          {fileList.length === 0 && uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item
        name="name"
        label="Category Name"
        rules={[{ required: true, message: "Please enter category name!" }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
