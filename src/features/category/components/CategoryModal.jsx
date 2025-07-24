import { Button, Modal } from "antd";
import CategoryForm from "./CategoryForm";

const CategoryModal = ({
    isModalOpen,
    isEditing,
    isSubmitting,
    form,
    fileList,
    onCancel,
    onFinish,
    onUploadChange,
    beforeUpload
}) => {
    return (
        <Modal
            title={isEditing ? "Edit Category" : "Add New Category"}
            open={isModalOpen}
            onCancel={onCancel}
            footer={[
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button style={{ backgroundColor: "#185F90", color: "white", width: "100%" }} key="back" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        style={{ backgroundColor: "#185F90", color: "white", width: "100%" }}
                        key="submit"
                        onClick={() => form.submit()}
                        loading={isSubmitting}
                    >
                        {isEditing ? "Update" : "Submit"}
                    </Button>
                </div>
            ]}
            width={300}
            mask={true}
        >
            <CategoryForm
                form={form}
                onFinish={onFinish}
                fileList={fileList}
                onUploadChange={onUploadChange}
                beforeUpload={beforeUpload}
                isEditing={isEditing}
            />
        </Modal>
    );
};

export default CategoryModal;
