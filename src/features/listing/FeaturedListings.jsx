import React, { useState } from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Typography,
  List,
  Input,
  Form,
  Space,
  message,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';

const { Title } = Typography;

const initialFeatureData = {
  'Safety Features': [
    'ABS (Anti-lock Braking System)',
    'ESP (Electronic Stability Program)',
    'Airbags (front, side, curtain)',
  ],
  'Interior & Comfort': [
    'Power-adjustable seats',
    'Leather seats',
    'Keyless entry and start (Keyless Go)',
  ],
};

const FeaturedListings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [featureData, setFeatureData] = useState(initialFeatureData);
  const [form] = Form.useForm();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleAddFeatures = () => {
    form
      .validateFields()
      .then((values) => {
        const { title, features } = values;

        if (!features || features.length === 0) {
          message.warning('Add at least one feature.');
          return;
        }

        const nonEmpty = features.filter((f) => f && f.trim() !== '');
        if (nonEmpty.length === 0) {
          message.warning('Features cannot be empty.');
          return;
        }

        setFeatureData((prev) => ({
          ...prev,
          [title]: nonEmpty,
        }));

        message.success('Feature section added!');
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <h1 className="text-2xl font-bold mb-4">Featured / Urgent</h1>
        <Button
          className="!bg-[var(--primary-color)] !text-white"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add
        </Button>
      </Row>

      <Row gutter={[24, 24]}>
        {Object.entries(featureData).map(([category, items]) => (
          <Col xs={24} sm={12} md={12} lg={12} key={category}>
            <Title level={5}>{category}</Title>
            <List
              size="small"
              dataSource={items}
              renderItem={(item) => (
                <List.Item>
                  <CheckCircleTwoTone
                    twoToneColor="#1890ff"
                    style={{ marginRight: 8 }}
                  />
                  {item}
                </List.Item>
              )}
            />
          </Col>
        ))}
      </Row>

      <Modal
        title="Add New Feature Section"
        open={isModalVisible}
        onOk={handleAddFeatures}
        onCancel={handleCancel}
        okText="Add"
        okButtonProps={{ className: '!bg-[var(--primary-color)] !text-white' }}
      >
        <Form requiredMark={false} layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Section Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="e.g., Driver Assistance Features" />
          </Form.Item>

          <Form.List name="features">
            {(fields, { add, remove }) => (
              <>
                <label>Features</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: 'Enter a feature' }]}
                    >
                      <Input placeholder="Feature description" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Feature
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default FeaturedListings;
