import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, message, DatePicker, Select, InputNumber, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FaFilm, FaCheck, FaTimes } from 'react-icons/fa';
import { addMovieNew } from '../../../services/moviesAPI';
import PropTypes from 'prop-types';

const { Option } = Select;
const { TextArea } = Input;

// Mock data for genres and countries
const genreOptions = [
  'Hành động',
  'Phiêu lưu',
  'Hoạt hình',
  'Hài hước',
  'Tội phạm',
  'Tài liệu',
  'Drama',
  'Gia đình',
  'Fantasy',
  'Lịch sử',
  'Kinh dị',
  'Âm nhạc',
  'Bí ẩn',
  'Tình cảm',
  'Khoa học viễn tưởng',
  'Thriller',
  'Chiến tranh',
  'Western',
  'Thể thao',
];

const countryOptions = [
  'Việt Nam',
  'Mỹ',
  'Hàn Quốc',
  'Nhật Bản',
  'Trung Quốc',
  'Anh',
  'Pháp',
  'Ấn Độ',
  'Thái Lan',
  'Đài Loan',
  'Canada',
  'Australia',
  'Đức',
  'Tây Ban Nha',
];

const AddMovieForm = ({ initialValues, onSubmit, mode = 'add' }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [posterPreview, setPosterPreview] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

  // Khi initialValues thay đổi (edit), set vào form
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        releaseDate: initialValues.releaseDate,
      });
      // Nếu có posterUrl thì preview luôn
      if (initialValues.posterUrl) {
        setPosterPreview(initialValues.posterUrl);
      }
    } else {
      form.resetFields();
      setPosterPreview(null);
      setPosterFile(null);
    }
  }, [form, initialValues]);

  const handlePosterChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      setPosterFile(file.originFileObj);

      // Create preview URL
      if (file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          setPosterPreview(reader.result);
        };
        reader.readAsDataURL(file.originFileObj);
      }
    } else {
      setPosterFile(null);
      setPosterPreview(null);
    }
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Validate poster file
      if (!posterFile && !values.posterUrl) {
        message.error('Vui lòng chọn ảnh poster hoặc nhập link poster cho phim');
        setLoading(false);
        return;
      }
      // Convert date to string format that API expects
      let releaseDate = null;
      if (values.releaseDate && values.releaseDate.format) {
        releaseDate = values.releaseDate.format('YYYY-MM-DD');
      } else if (values.releaseDate) {
        releaseDate = values.releaseDate;
      }
      const movieData = {
        title: values.title,
        othernames: values.othernames || '',
        basePrice: values.basePrice,
        duration: values.duration,
        genre: values.genre,
        description: values.description,
        posterUrl: values.posterUrl || '',
        actors: values.actors,
        director: values.director,
        country: values.country,
        releaseDate: releaseDate,
        trailerUrl: values.trailerUrl || '',
      };
      // Gọi callback onSubmit nếu có (edit hoặc add)
      if (onSubmit) {
        await onSubmit(movieData, posterFile);
      } else {
        // Mặc định: thêm mới
        const response = await addMovieNew(movieData, posterFile);
        if (response.status === 200 || response.status === 201) {
          message.success('Thêm phim mới thành công!');
          form.resetFields();
          setPosterPreview(null);
          setPosterFile(null);
          setTimeout(() => {
            navigate('/admin/movies');
          }, 2000);
        } else {
          message.error('Có lỗi xảy ra khi thêm phim');
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <FaFilm size={24} />
          </div>
          <h1 className="text-xl font-bold ml-4">
            {mode === 'edit' ? 'Chỉnh sửa phim' : 'Thêm phim mới'}
          </h1>
        </div>
      </div>

      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div>
            <Form.Item
              name="title"
              label="Tên phim"
              rules={[{ required: true, message: 'Vui lòng nhập tên phim' }]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>
            <Form.Item name="othernames" label="Tên khác">
              <Input placeholder="Tên khác/Tên tiếng Anh" />
            </Form.Item>
            <Form.Item
              name="genre"
              label="Thể loại"
              rules={[{ required: true, message: 'Vui lòng chọn thể loại phim' }]}
            >
              <Select
                placeholder="Chọn thể loại phim"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {genreOptions.map((genre) => (
                  <Option key={genre} value={genre}>
                    {genre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả phim"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả phim' }]}
            >
              <TextArea
                placeholder="Nhập mô tả nội dung phim"
                rows={6}
                showCount
                maxLength={2000}
              />
            </Form.Item>
          </div>

          {/* Right Column */}
          <div>
            <Form.Item
              label="Poster phim"
              name="poster"
              rules={[
                {
                  required: !posterPreview,
                  message: 'Vui lòng tải lên poster phim',
                },
              ]}
            >
              <div className="space-y-4">
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handlePosterChange}
                  accept="image/*"
                >
                  {posterPreview ? (
                    <div className="relative group">
                      <img
                        src={posterPreview}
                        alt="Poster preview"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-sm">Thay đổi</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <PlusOutlined />
                      <div className="mt-2 text-sm">Tải poster lên</div>
                    </div>
                  )}
                </Upload>
                <div className="text-sm text-gray-500">Kích thước khuyến nghị: 500x750 pixels</div>
                {posterFile && (
                  <div className="flex items-center text-sm text-green-600">
                    <FaCheck className="mr-1" /> File đã chọn: {posterFile.name}
                  </div>
                )}
              </div>
            </Form.Item>
            <Form.Item
              name="posterUrl"
              label="Link poster (URL)"
              rules={[
                { type: 'url', message: 'Vui lòng nhập đúng định dạng URL' }
              ]}
            >
              <Input placeholder="Dán link ảnh poster (nếu có)" />
            </Form.Item>
            <Form.Item name="trailerUrl" label="Link Trailer (YouTube)">
              <Input placeholder="VD: https://www.youtube.com/watch?v=..." />
            </Form.Item>
            <Form.Item
              name="actors"
              label="Diễn viên"
              rules={[{ required: true, message: 'Vui lòng nhập tên diễn viên' }]}
            >
              <Input placeholder="Nhập tên diễn viên chính, cách nhau bởi dấu phẩy" />
            </Form.Item>
            <Form.Item
              name="director"
              label="Đạo diễn"
              rules={[{ required: true, message: 'Vui lòng nhập tên đạo diễn' }]}
            >
              <Input placeholder="Nhập tên đạo diễn" />
            </Form.Item>
            <Form.Item
              name="country"
              label="Quốc gia"
              rules={[{ required: true, message: 'Vui lòng chọn quốc gia' }]}
            >
              <Select
                placeholder="Chọn quốc gia sản xuất"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {countryOptions.map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="duration"
              label="Thời lượng (phút)"
              rules={[
                { required: true, message: 'Vui lòng nhập thời lượng phim' },
                { type: 'number', min: 1, message: 'Thời lượng phải lớn hơn 0' },
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="VD: 120" min={1} />
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label="Ngày phát hành"
              rules={[{ required: true, message: 'Vui lòng chọn ngày phát hành' }]}
            >
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày" />
            </Form.Item>
            <Form.Item
              name="basePrice"
              label="Giá vé cơ bản (VNĐ)"
              rules={[
                { required: true, message: 'Vui lòng nhập giá vé' },
                { type: 'number', min: 10000, message: 'Giá vé phải từ 10.000đ trở lên' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value) => value.replace(/\./g, '')}
                placeholder="VD: 90000"
                min={10000}
                step={10000}
              />
            </Form.Item>
          </div>

          {/* Form actions - full width */}
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-4">
            <Button
              onClick={() => {
                form.resetFields();
                setPosterPreview(null);
                setPosterFile(null);
              }}
              icon={<FaTimes />}
            >
              Xóa form
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: '#FFCC00', borderColor: '#FFCC00' }}
              icon={<FaCheck />}
            >
              {mode === 'edit' ? 'Cập nhật' : 'Thêm phim'}
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

AddMovieForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  mode: PropTypes.oneOf(['add', 'edit']),
};

export default AddMovieForm;
