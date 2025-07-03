import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addMovieNew } from '../services/moviesAPI';

const { TextArea } = Input;
const { Option } = Select;

const AddMovieModal = ({ visible, onCancel, onSuccess }) => {
  const { t } = useTranslation();
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
      title={t('movie.add_movie')}
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
      okText={t('common.add')}
      cancelText={t('common.cancel')}
    >
      <Form form={form} layout="vertical" initialValues={{}}>
        <Form.Item
          name="title"
          label={t('movie.title')}
          rules={[{ required: true, message: t('common.error', 'Vui lòng nhập tên phim!') }]}
        >
          <Input placeholder={t('movie.title')} />
        </Form.Item>

        <Form.Item name="othernames" label={t('movie.othernames')}>
          <Input placeholder={t('movie.othernames')} />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="basePrice" label={t('movie.base_price')} rules={[]} style={{ flex: 1 }}>
            <InputNumber placeholder="100000" min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="duration" label={t('movie.duration')} rules={[]} style={{ flex: 1 }}>
            <InputNumber placeholder="120" min={1} style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item name="genre" label={t('movie.genre')} rules={[]}>
          <Select placeholder={t('movie.genre')} allowClear>
            <Option value="Action">{t('movie.genre_action', 'Action')}</Option>
            <Option value="Adventure">{t('movie.genre_adventure', 'Adventure')}</Option>
            <Option value="Animation">{t('movie.genre_animation', 'Animation')}</Option>
            <Option value="Comedy">{t('movie.genre_comedy', 'Comedy')}</Option>
            <Option value="Crime">{t('movie.genre_crime', 'Crime')}</Option>
            <Option value="Documentary">{t('movie.genre_documentary', 'Documentary')}</Option>
            <Option value="Drama">{t('movie.genre_drama', 'Drama')}</Option>
            <Option value="Family">{t('movie.genre_family', 'Family')}</Option>
            <Option value="Fantasy">{t('movie.genre_fantasy', 'Fantasy')}</Option>
            <Option value="Horror">{t('movie.genre_horror', 'Horror')}</Option>
            <Option value="Mystery">{t('movie.genre_mystery', 'Mystery')}</Option>
            <Option value="Romance">{t('movie.genre_romance', 'Romance')}</Option>
            <Option value="Sci-Fi">{t('movie.genre_scifi', 'Sci-Fi')}</Option>
            <Option value="Thriller">{t('movie.genre_thriller', 'Thriller')}</Option>
            <Option value="War">{t('movie.genre_war', 'War')}</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label={t('movie.description')}>
          <TextArea rows={4} placeholder={t('movie.description')} />
        </Form.Item>

        <Form.Item name="posterUrl" label={t('movie.poster_url')}>
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item label={t('movie.poster_upload')}>
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>{t('movie.poster_upload')}</Button>
          </Upload>
          <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            {t('movie.poster_note', 'Chấp nhận: JPG, PNG, GIF. Tối đa: 5MB')}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMovieModal;
