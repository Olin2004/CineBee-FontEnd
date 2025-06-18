# Cinema Zino Frontend

## Giới thiệu

Đây là dự án web xem phim trực tuyến, xây dựng với ReactJS, Redux Toolkit, Tailwind CSS và kiến trúc tách biệt UI/logic hiện đại, dễ maintain.

## Cấu trúc thư mục chính

```
src/
  assets/           # Ảnh, video, icon
  components/       # UI components (Header, Footer, Search, ...)
  constants/        # Hằng số dùng chung
  features/         # Custom hooks cho logic (auth, profile, ...)
  layouts/          # Layouts (MainLayout, AuthLayout)
  pages/            # Các trang chính (Home, Login, Register, ...)
  routes/           # Định nghĩa route, phân layout
  services/         # Gọi API (authAPI, apiConfig, ...)
  store/            # Redux store, slice
  utils/            # Hàm tiện ích (formatDate, ...)
  App.js            # Khởi tạo app, đọc localStorage, set Redux
  index.js          # Entry point
```

## Kiến trúc & Cách hoạt động

- **UI (components/):** Chỉ render giao diện, nhận props/hook, không xử lý logic phức tạp.
- **Logic (features/):** Custom hook (useLogin, useGoogleLogin, ...) xử lý gọi API, validate, toast, ...
- **Service (services/):** Chỉ gọi API, không xử lý UI.
- **Redux (store/):** Quản lý state toàn cục (auth, theme, ...), không gọi API trực tiếp trong UI.
- **Layout (layouts/):** MainLayout (có Header, Footer), AuthLayout (không có Header).
- **Route (routes/):** Phân biệt rõ route dùng layout nào, không lặp lại Header.
- **Lưu trữ login:**
  - Sau login thành công: lưu accessToken + user vào localStorage.
  - Khi app load: đọc lại localStorage, set lại Redux (App.js).
  - Khi logout: xóa localStorage, reset Redux.

## Quy trình đăng nhập/đăng xuất

1. **Login thành công:**
   - Lưu accessToken và user vào localStorage.
   - dispatch(setAuth) cập nhật Redux.
   - (Có thể gọi fetchProfile để đồng bộ profile từ BE).
2. **Khi F5 hoặc mở lại app:**
   - App.js đọc localStorage, set lại Redux, giữ trạng thái đăng nhập.
3. **Logout:**
   - Xóa accessToken, user khỏi localStorage.
   - dispatch(logout) reset Redux.

## Chạy dự án

```bash
pnpm install
pnpm start
```

Truy cập http://localhost:3000

## Ghi chú

- Dự án sử dụng Tailwind CSS cho UI hiện đại, responsive.
- Tách biệt UI/logic giúp dễ maintain, mở rộng, test.
- Có thể mở rộng thêm các features khác theo mẫu đã có.
