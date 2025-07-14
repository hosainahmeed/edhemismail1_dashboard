import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Popconfirm,
  Empty,
} from 'antd';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';
import toast from 'react-hot-toast';

function FrequentlyAskedQuestions() {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [faqs, setFaqs] = useState([
    { question: 'What is the meaning of life?', answer: 'nothing', _id: '1' },
    {
      question: 'What is the best programming language?',
      answer: 'JavaScript',
      _id: '2',
    },
    {
      question: 'What is the best way to make a cup of coffee?',
      answer: 'French press',
      _id: '3',
    },
  ]);

  const handleAddClick = () => {
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingIndex !== null) {
        // Update existing FAQ
        const faqToUpdate = faqs[editingIndex];
        const updatedFaqs = [...faqs];
        updatedFaqs[editingIndex] = {
          ...updatedFaqs[editingIndex],
          question: values.question,
          answer: values.description,
        };
        setFaqs(updatedFaqs);
        toast.success('FAQ updated successfully!');
      } else {
        // Create new FAQ
        setFaqs([
          ...faqs,
          {
            question: values.question,
            answer: values.description,
            _id: `new-${faqs.length + 1}`,
          },
        ]);
        toast.success('FAQ added successfully!');
      }
      setShowModal(false);
    } catch (error) {
      toast.error('An error occurred while saving FAQ.');
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(updatedFaqs);
      toast.success('FAQ deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete FAQ.');
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between !w-full mb-12">
        <div className="w-full p-2 bg-white flex items-center justify-between pr-12 shadow-sm rounded-lg">
          <h1 className="text-2xl font-bold">FAQ</h1>
          <Button
            style={{
              width: '200px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
            }}
            onClick={handleAddClick}
          >
            <FaPlus />
            Add FAQ
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {faqs.length > 0 ? (
          faqs.map((item, index) => (
            <Card key={item._id}>
              <div className="flex items-center justify-between my-4">
                <h1>{item.question}</h1>
                <Space>
                  <Button onClick={() => handleEdit(index)}>
                    <FaEdit />
                  </Button>
                  <Popconfirm
                    title="Delete this FAQ?"
                    description="Are you sure you want to delete this FAQ?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(index)}
                  >
                    <Button danger>
                      <AiTwotoneDelete />
                    </Button>
                  </Popconfirm>
                </Space>
              </div>
              <p>{item.answer}</p>
            </Card>
          ))
        ) : (
          <div className="col-span-2">
            <Empty description="No Frequently Asked Questions Available" />
          </div>
        )}
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title={editingIndex !== null ? 'Edit FAQ' : 'Add New FAQ'}
        destroyOnClose
      >
        <Form
          requiredMark={false}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={
            editingIndex !== null
              ? {
                  question: faqs[editingIndex].question,
                  description: faqs[editingIndex].answer,
                }
              : { question: '', description: '' }
          }
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: 'Please enter a question' }]}
          >
            <Input placeholder="Enter your question" />
          </Form.Item>

          <Form.Item
            label="Answer"
            name="description"
            rules={[{ required: true, message: 'Please enter an answer' }]}
          >
            <TextArea placeholder="Enter your answer" rows={4} />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end">
              <Button
                className="!bg-[var(--primary-color)] !text-white"
                htmlType="submit"
              >
                {editingIndex !== null ? 'Update FAQ' : 'Save FAQ'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FrequentlyAskedQuestions;
