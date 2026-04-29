# HỒ SƠ THIẾT KẾ & ĐẶC TẢ CHI TIẾT HỆ THỐNG (RSD)
## DỰ ÁN: WEBSITE BÁN HOA ONLINE (FLORAL SOUL)

---

## 1. ĐẶC TẢ CHỨC NĂNG DÀNH CHO NGƯỜI QUẢN TRỊ

### 1.1. Quản lý Loại hoa
| Chức năng | Nhập vào | Xử lý | Hiển thị |
| :--- | :--- | :--- | :--- |
| **Thêm loại hoa** | Tên loại hoa | Lưu thông tin vào bảng `LOAI_HOA` | Thông báo "Thêm loại hoa thành công" |
| **Sửa loại hoa** | Tên loại hoa mới | Cập nhật tên theo `Ma_loai` | Thông báo "Cập nhật thành công" |
| **Xóa loại hoa** | Chọn loại cần xóa | Kiểm tra ràng buộc (nếu không có hoa liên kết) -> Xóa khỏi DB | Thông báo "Xóa thành công" hoặc cảnh báo lỗi |

### 1.2. Quản lý Sản phẩm (Hoa)
| Chức năng | Nhập vào | Xử lý | Hiển thị |
| :--- | :--- | :--- | :--- |
| **Thêm hoa mới** | Tên, Mô tả, Ảnh, Giá, Loại hoa | Lưu thông tin vào bảng `HOA` | Thông báo thành công qua Custom Modal |
| **Sửa hoa** | Thông tin thay đổi | Cập nhật dữ liệu theo `Ma_hoa` | Thông báo cập nhật thành công |
| **Tìm kiếm** | Tên hoa, Loại hoa | Truy vấn bảng `HOA` với điều kiện LIKE | Danh sách sản phẩm khớp kết quả |

### 1.3. Quản lý Đơn hàng (Admin Only)
- **Danh sách:** Hiển thị đơn hàng mới nhất lên đầu. Trạng thái: "Chưa giao" và "Đã giao".
- **Xác nhận giao:** Người dùng nhấn nút "Xác nhận đã giao". Hệ thống cập nhật `Hien_trang = 1` và gán `Ngay_gh = NOW()`.
- **Xóa đơn hàng:** 
  - Đã giao: Được phép xóa sau khi xác nhận.
  - Chưa giao: Không được xóa (Hiển thị cảnh báo lỗi).

---

## 2. THIẾT KẾ CHI TIẾT CƠ SỞ DỮ LIỆU

### 2.1. Bảng KHACH_HANG (Thành viên)
| Field Name | Data Type | Length | Constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| Ma_kh | int | | PK, Identity | Mã Khách Hàng |
| Ho_kh | nvarchar | 30 | Not null | Họ Khách Hàng |
| Ten_kh | nvarchar | 30 | Not null | Tên Khách Hàng |
| sdt | varchar | 12 | Not null | Số Điện Thoại |
| Dia_chi | nvarchar | 200 | Not null | Địa Chỉ |
| email | varchar | 50 | Not null | Email liên hệ |
| Gioi_tinh | int | | Not null | 0: Nữ, 1: Nam |
| Ten_dn | varchar | 30 | Not null | Tên Đăng Nhập |
| Mat_khau | varchar | 30 | Not null | Mật Khẩu |

### 2.2. Bảng HOA (Sản phẩm)
| Field Name | Data Type | Length | Constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| Ma_hoa | int | | PK, Identity | Mã Sản Phẩm |
| Ten_hoa | nvarchar | 30 | Not null | Tên Sản Phẩm |
| Ma_loai | int | | FK | Thuộc Loại Hoa |
| Mo_ta | nvarchar | 300 | | Mô Tả Sản Phẩm |
| Hinh_anh | varchar | 50 | | URL/Đường dẫn ảnh |
| Gia | float | | Not null | Giá bán hiện tại |
| Ngay_d | datetime | | | Ngày đăng sản phẩm |
| Trang_thai | int | | Not null | 1: Hiện, 0: Ẩn |

### 2.3. Bảng DONDATHANG (Đơn hàng)
| Field Name | Data Type | Length | Constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| Ma_dh | int | | PK, Identity | Mã Hóa Đơn |
| Ma_kh | int | | FK | Mã Khách Hàng |
| Ngay_dh | timestamp | | Not null | Ngày đặt hàng |
| Ngay_gh | datetime | | | Ngày giao hàng |
| Noi_giao | nvarchar | 300 | Not null | Địa chỉ nhận hoa |
| Hien_trang | int | | Not null | 0: Đang xử lý, 1: Đã giao |

---

## 3. SƠ ĐỒ CẤU TRÚC WEBSITE (SITEMAP)

### 3.1. Phân hệ Quản lý (Admin)
- Tổng quan hệ thống (Stats)
- Quản lý Khách hàng
- Quản lý Sản phẩm (Hoa)
- Quản lý Loại sản phẩm
- Quản lý Đơn hàng
- Quản lý Tin tức
- Quản lý Góp ý/Phản hồi

### 3.2. Phân hệ Thành viên
- Xem thông tin cá nhân
- Cập nhật Profile/Mật khẩu
- Lịch sử mua hàng
- Giỏ hàng cá nhân

### 3.3. Phân hệ Khách vãng lai
- Trang chủ / Giới thiệu
- Tìm kiếm sản phẩm (Thường/Nâng cao)
- Xem tin tức / Liên hệ
- Đăng ký thành viên

---

## 4. QUY TẮC NGHIỆP VỤ & BẢO MẬT (BUSINESS RULES)

- **Layout Isolation:** Hệ thống sử dụng Middleware và LayoutWrapper phía Client để tách biệt hoàn toàn không gian quản trị (Dark Mode/Neumorphic) và không gian bán hàng (Light/Botanical).
- **Authentication:** Mọi hành động truy cập vào `/quan-tri` đều yêu cầu xác thực Admin.
- **Data Integrity:** Không cho phép xóa `LOAI_HOA` hoặc `KHACH_HANG` nếu có dữ liệu liên kết trong `HOA` hoặc `DONDATHANG`.
- **UI/UX Standard:** Toàn bộ thông báo hệ thống được đồng bộ qua `NotificationModal` thay thế cho `alert()` mặc định để đảm bảo tính thẩm mỹ Boutique.
