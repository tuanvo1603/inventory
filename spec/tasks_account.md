# Checklist: Tài khoản (Account Management)

- [x] Xây dựng model tài khoản (user)
- [ ] API đăng ký tài khoản
- [ ] API đăng nhập, đăng xuất
- [x] API lấy danh sách tài khoản
- [x] API tìm kiếm tài khoản
- [x] API thêm tài khoản mới
- [x] API điều chỉnh thông tin tài khoản
- [x] API xóa tài khoản
- [x] API khóa/mở khóa tài khoản
- [x] Giao diện quản lý tài khoản (danh sách, tìm kiếm, thêm, sửa, xóa, khóa)
- [ ] Tích hợp xác thực NextAuth.js

## API Endpoints đã tạo:

### 1. `/api/user` (GET, POST)
- **GET**: Lấy danh sách tài khoản với tìm kiếm và phân trang
- **POST**: Tạo tài khoản mới

### 2. `/api/user/[id]` (GET, PUT, DELETE)
- **GET**: Lấy thông tin chi tiết một tài khoản
- **PUT**: Cập nhật thông tin tài khoản
- **DELETE**: Xóa tài khoản (soft delete nếu có dữ liệu liên quan)

### 3. `/api/user/[id]/toggle-status` (PATCH)
- **PATCH**: Khóa/mở khóa tài khoản

### 4. `/api/user/[id]/reset-password` (PATCH)
- **PATCH**: Đặt lại mật khẩu

## Tính năng đã implement:

- ✅ Validation dữ liệu input (email format, password length, role)
- ✅ Hash password với bcryptjs
- ✅ Kiểm tra email đã tồn tại
- ✅ Bảo vệ admin cuối cùng (không cho phép xóa/khóa)
- ✅ Soft delete khi user có dữ liệu liên quan
- ✅ Tìm kiếm theo tên, email
- ✅ Lọc theo role và trạng thái
- ✅ Thống kê số lượng user theo loại
- ✅ Giao diện responsive với i18n support
- ✅ Error handling và user feedback
