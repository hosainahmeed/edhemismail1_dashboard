import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { 
  useCreateCategoryMutation, 
  useDeleteCategoryMutation, 
  useGetCategoriesQuery, 
  useUpdateCategoryMutation 
} from "../../Redux/Apis/service/categoryApis";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CategoryTable from "./components/CategoryTable";
import CategoryModal from "./components/CategoryModal";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // API Hooks
  const { data, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  
  // State and Refs
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  // Update categories when data is fetched
  useEffect(() => {
    if (data?.data?.result) {
      const formattedCategories = data.data.result.map((category, index) => ({
        key: category._id || index.toString(),
        ...category,
        createdAt: new Date(category.createdAt).toLocaleDateString(),
        updatedAt: new Date(category.updatedAt).toLocaleDateString(),
      }));
      setCategories(formattedCategories);
    }
  }, [data]);



  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingCategory(record);
    form.setFieldsValue({ name: record.name });

    // Set the existing image in fileList for display
    if (record.category_image) {
      setFileList([
        {
          uid: '-1',
          name: 'current-image',
          status: 'done',
          url: record.category_image,
        },
      ]);
    } else {
      setFileList([]);
    }

    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setEditingCategory(null);
    form.resetFields();
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory({ id }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          // Only navigate if needed
          if (params?.categoryId) {
            navigate(`/dynamic-category/${params?.categoryId}`);
          }
        }
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete category');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);

      if (isEditing) {
        const hasNewImage = fileList.some(file => file.originFileObj);
        if (hasNewImage) {
          const imageFile = fileList.find(file => file.originFileObj)?.originFileObj;
          formData.append('category_image', imageFile);
        }
        await updateCategory({
          id: editingCategory._id,
          data: formData
        }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Category updated successfully!');
            resetModal();
          }
        });

      } else {
        if (!fileList || fileList.length === 0) {
          toast.error('Please upload an image!');
          return;
        }

        const imageFile = fileList[0].originFileObj || fileList[0];
        formData.append('category_image', imageFile);

        await createCategory({ data: formData }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Category created successfully!');
            resetModal();
          }
        });
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.data?.message || `Failed to ${isEditing ? 'update' : 'save'} category`);
    }
  };

  const resetModal = () => {
    form.resetFields();
    setFileList([]);
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingCategory(null);
    // Only navigate if needed
    if (params?.categoryId) {
      navigate(`/dynamic-category/${params?.categoryId}`);
    }
  };

  const handleCancel = () => {
    resetModal();
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    return false; // Prevent automatic upload
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };



  return (
    <div>
      <CategoryTable 
        categories={categories}
        loading={isLoading}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryModal
        isModalOpen={isModalOpen}
        isEditing={isEditing}
        isSubmitting={isEditing ? isUpdating : isCreating}
        form={form}
        fileList={fileList}
        onCancel={handleCancel}
        onFinish={handleSubmit}
        onUploadChange={handleUploadChange}
        beforeUpload={beforeUpload}
      />
    </div>
  );
}

export default Category;