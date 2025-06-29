import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { addMovieNew } from '../services/moviesAPI';

const { TextArea } = Input;
const { Option } = Select;

const AddMovieModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [posterFile, setPosterFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const movieData = {
        ...values,
        basePrice:
          values.basePrice !== undefined && values.basePrice !== ''
            ? Number(values.basePrice)
            : undefined,
        duration:
          values.duration !== undefined && values.duration !== ''
            ? Number(values.duration)
            : undefined,
      };
      const response = await addMovieNew(movieData, posterFile);
      message.success('Thêm phim thành công!');
      form.resetFields();
      setPosterFile(null);
      onSuccess(response.data);
      onCancel();
    } catch (error) {
      console.error('Error adding movie:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm phim');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setPosterFile(null);
    onCancel();
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ được upload file ảnh!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('File ảnh phải nhỏ hơn 5MB!');
        return false;
      }

      setPosterFile(file);
      return false; // Prevent upload
    },
    onChange: (info) => {
      if (info.file.status === 'removed') {
        setPosterFile(null);
      }
    },
    fileList: posterFile ? [posterFile] : [],
  };

  return (
    <Modal
      title="Thêm Phim Mới"
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
      okText="Thêm Phim"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" initialValues={{}}>
        <Form.Item
          name="title"
          label="Tên phim"
          rules={[{ required: true, message: 'Vui lòng nhập tên phim!' }]}
        >
          <Input placeholder="Nhập tên phim" />
        </Form.Item>

        <Form.Item name="othernames" label="Tên khác">
          <Input placeholder="Tên phim bằng tiếng Anh hoặc tên khác" />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="basePrice" label="Giá vé cơ bản (VNĐ)" rules={[]} style={{ flex: 1 }}>
            <InputNumber placeholder="100000" min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="duration" label="Thời lượng (phút)" rules={[]} style={{ flex: 1 }}>
            <InputNumber placeholder="120" min={1} style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item name="genre" label="Thể loại" rules={[]}>
          <Select placeholder="Chọn thể loại phim" allowClear>
            <Option value="Action">Action</Option>
            <Option value="Adventure">Adventure</Option>
            <Option value="Animation">Animation</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Crime">Crime</Option>
            <Option value="Documentary">Documentary</Option>
            <Option value="Drama">Drama</Option>
            <Option value="Family">Family</Option>
            <Option value="Fantasy">Fantasy</Option>
            <Option value="Horror">Horror</Option>
            <Option value="Mystery">Mystery</Option>
            <Option value="Romance">Romance</Option>
            <Option value="Sci-Fi">Sci-Fi</Option>
            <Option value="Thriller">Thriller</Option>
            <Option value="War">War</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea rows={4} placeholder="Mô tả ngắn gọn về nội dung phim..." />
        </Form.Item>

        <Form.Item name="posterUrl" label="Link ảnh poster (nếu không upload file)">
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item label="Poster phim">
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>Chọn ảnh poster</Button>
          </Upload>
          <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            Chấp nhận: JPG, PNG, GIF. Tối đa: 5MB
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMovieModal;
