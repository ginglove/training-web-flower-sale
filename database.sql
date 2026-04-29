-- ==========================================
-- 1. TẠO BẢNG (CREATE TABLES)
-- ==========================================

CREATE TABLE IF NOT EXISTS loai_hoa (
    ma_loai SERIAL PRIMARY KEY,
    ten_loai VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS hoa (
    ma_hoa SERIAL PRIMARY KEY,
    ten_hoa VARCHAR(100) NOT NULL,
    ma_loai INT REFERENCES loai_hoa(ma_loai),
    mo_ta TEXT,
    hinh_anh VARCHAR(500),
    gia FLOAT NOT NULL,
    ngay_d TIMESTAMP DEFAULT NOW(),
    trang_thai INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS khach_hang (
    ma_kh SERIAL PRIMARY KEY,
    ho_kh VARCHAR(50) NOT NULL,
    ten_kh VARCHAR(50) NOT NULL,
    sdt VARCHAR(20) NOT NULL,
    dia_chi VARCHAR(500) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    gioi_tinh INT NOT NULL DEFAULT 1,
    ten_dn VARCHAR(50) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS adm (
    ma_adm SERIAL PRIMARY KEY,
    ten_dn VARCHAR(50) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    ho VARCHAR(50) NOT NULL,
    ten VARCHAR(50) NOT NULL,
    gioi_tinh INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS don_dat_hang (
    ma_dh SERIAL PRIMARY KEY,
    ma_kh INT REFERENCES khach_hang(ma_kh),
    ngay_dh TIMESTAMP DEFAULT NOW(),
    ngay_gh TIMESTAMP,
    noi_giao VARCHAR(500) NOT NULL,
    hien_trang INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ct_don_dat_hang (
    ma_dh INT REFERENCES don_dat_hang(ma_dh),
    ma_hoa INT REFERENCES hoa(ma_hoa),
    gia_ban FLOAT NOT NULL,
    sl_dat INT NOT NULL,
    PRIMARY KEY (ma_dh, ma_hoa)
);

CREATE TABLE IF NOT EXISTS tin_tuc (
    ma_tt SERIAL PRIMARY KEY,
    tieu_de VARCHAR(200) NOT NULL,
    hinh_anh VARCHAR(500),
    noi_dung TEXT NOT NULL,
    ngay_dang TIMESTAMP DEFAULT NOW()
);

-- ==========================================
-- 2. DỮ LIỆU MẪU (SEED DATA)
-- ==========================================

-- Thêm tài khoản Admin (admin / abc@123)
INSERT INTO adm (ten_dn, mat_khau, ho, ten, gioi_tinh)
VALUES ('admin', '$2a$12$MruUw0GAD8pKxTm58uQdh.MQIOFWObAAInwvrYh4MvZ/S8CbYSlpO', 'Nguyen', 'Quản Trị', 1)
ON CONFLICT (ten_dn) DO NOTHING;

-- Thêm Loại Hoa
INSERT INTO loai_hoa (ten_loai) VALUES 
('Hoa Cưới'), ('Hoa Tình Yêu'), ('Hoa Sinh Nhật'), ('Hoa Tươi Bó'), 
('Hoa Tươi Giỏ'), ('Hoa Văn Phòng'), ('Hoa Sự Kiện'), ('Hoa Chia Buồn'), 
('Hoa Cắm Bình'), ('Hoa Để Bàn'), ('Hoa Cài Áo'), ('Hoa Hội Nghị')
ON CONFLICT (ten_loai) DO NOTHING;

-- Thêm 50 Sản Phẩm Hoa
INSERT INTO hoa (ten_hoa, ma_loai, mo_ta, hinh_anh, gia) VALUES 
('Ánh Dương Rực Rỡ', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cưới'), 'Bó hoa cưới sang trọng với tone màu vàng chủ đạo.', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format', 150000),
('Dáng Ngọc Tinh Khôi', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cưới'), 'Hoa cầm tay cô dâu với lan trắng và hồng pastel.', 'https://images.unsplash.com/photo-1563241598-a24ce1e473e3?q=80&w=800&auto=format', 500000),
('Tình Yêu Vĩnh Cửu', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tình Yêu'), '99 đóa hồng đỏ thắm tượng trưng cho tình yêu bất diệt.', 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format', 999000),
('Nắng Hạ', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sinh Nhật'), 'Lẵng hoa chúc mừng sinh nhật rực rỡ sắc màu.', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format', 350000),
('Hương Sắc Mùa Xuân', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Bó'), 'Bó hoa tổng hợp nhiều loại hoa xuân thơm ngát.', 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format', 250000),
('Mây Trắng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Giỏ'), 'Giỏ hoa tone trắng xanh dịu mát, thanh tao.', 'https://images.unsplash.com/photo-1548629739-0630d75a4897?q=80&w=800&auto=format', 450000),
('Vẻ Đẹp Á Đông', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Văn Phòng'), 'Thiết kế tối giản phù hợp không gian làm việc.', 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format', 180000),
('Lời Chúc May Mắn', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sự Kiện'), 'Kệ hoa khai trương hoành tráng.', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=800&auto=format', 1200000),
('Khúc Giao Mùa', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cắm Bình'), 'Bình hoa nghệ thuật cho không gian phòng khách.', 'https://images.unsplash.com/photo-1464852047516-bb48594347fc?q=80&w=800&auto=format', 600000),
('Huyền Bí', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Chia Buồn'), 'Vòng hoa viếng trang trọng, thành kính.', 'https://images.unsplash.com/photo-1519378304602-28c037955529?q=80&w=800&auto=format', 800000),
('Bình Minh', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Để Bàn'), 'Hoa để bàn nhỏ nhắn, xinh xắn.', 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800&auto=format', 120000),
('Cài Áo 002', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cài Áo'), 'Hoa lan cài áo cho khách mời danh dự.', 'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=800&auto=format', 15000),
('Hội Nghị 001', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Hội Nghị'), 'Hoa bục phát biểu chuyên nghiệp.', 'https://images.unsplash.com/photo-1469259948000-fa2f80452330?q=80&w=800&auto=format', 300000),
('Hồng Đỏ Quý Phái', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tình Yêu'), 'Bó hoa hồng nhập khẩu sang trọng.', 'https://images.unsplash.com/photo-1552683326-40f446974e7d?q=80&w=800&auto=format', 750000),
('Tulip Hà Lan', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sinh Nhật'), 'Bó hoa Tulip tươi mới đầy sức sống.', 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800&auto=format', 550000),
('Sắc Tím Thủy Chung', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Bó'), 'Hoa thạch thảo tím mộng mơ.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format', 200000),
('Giai Điệu Mùa Thu', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cưới'), 'Bó hoa cầm tay cô dâu tone cam cháy.', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format', 480000),
('Ký Ức', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Chia Buồn'), 'Vòng hoa chia buồn tone trắng tinh khôi.', 'https://images.unsplash.com/photo-1563241598-a24ce1e473e3?q=80&w=800&auto=format', 850000),
('Khai Trương Hồng Phát', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sự Kiện'), 'Kệ hoa 2 tầng rực rỡ.', 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format', 1500000),
('Hương Thơm Lạ', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Giỏ'), 'Giỏ hoa ly thơm ngát một góc phòng.', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format', 380000),
('Violet Tình Yêu', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tình Yêu'), 'Sự kết hợp hoàn hảo giữa hồng và violet.', 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format', 520000),
('Mặt Trời Bé Con', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Để Bàn'), 'Chậu hoa hướng dương nhỏ xinh.', 'https://images.unsplash.com/photo-1548629739-0630d75a4897?q=80&w=800&auto=format', 95000),
('Hồ Điệp Sang Trọng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Văn Phòng'), 'Chậu lan hồ điệp trắng 3 cành.', 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format', 1200000),
('Cẩm Tú Cầu Xanh', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Bó'), 'Bó hoa cẩm tú cầu size lớn.', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=800&auto=format', 320000),
('Hoa Cưới Boho', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cưới'), 'Phong cách hoang dại và tự nhiên.', 'https://images.unsplash.com/photo-1464852047516-bb48594347fc?q=80&w=800&auto=format', 580000),
('Hồng Môn Đỏ', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Hội Nghị'), 'Hoa lẵng bục phát biểu rực rỡ.', 'https://images.unsplash.com/photo-1519378304602-28c037955529?q=80&w=800&auto=format', 420000),
('Sen Đá Nghệ Thuật', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Để Bàn'), 'Tiểu cảnh sen đá trang trí.', 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800&auto=format', 220000),
('Cài Áo Chú Rể', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cài Áo'), 'Hoa hồng cài áo đồng bộ hoa cưới.', 'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=800&auto=format', 25000),
('Hướng Dương Tỏa Sáng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sinh Nhật'), 'Bó hoa 10 cành hướng dương lớn.', 'https://images.unsplash.com/photo-1469259948000-fa2f80452330?q=80&w=800&auto=format', 450000),
('Bình Hoa Cẩm Chướng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cắm Bình'), 'Tone màu pastel nhẹ nhàng.', 'https://images.unsplash.com/photo-1552683326-40f446974e7d?q=80&w=800&auto=format', 360000),
('Baby Trắng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tình Yêu'), 'Bó hoa baby khổng lồ như mây.', 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800&auto=format', 600000),
('Cát Tường Xanh', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Giỏ'), 'Giỏ hoa cát tường mang ý nghĩa may mắn.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format', 340000),
('Hoa Cưới Cổ Điển', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cưới'), 'Dáng thác đổ sang trọng.', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format', 800000),
('Vĩnh Hằng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Chia Buồn'), 'Kệ hoa chia buồn cao cấp.', 'https://images.unsplash.com/photo-1563241598-a24ce1e473e3?q=80&w=800&auto=format', 1100000),
('Sự Kiện VIP', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sự Kiện'), 'Kệ hoa khai trương đặc biệt.', 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format', 2500000),
('Bàn Làm Việc', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Văn Phòng'), 'Bình hoa mix nhiều loại nhỏ.', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format', 280000),
('Hồng Dâu Ngọt Ngào', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tình Yêu'), 'Tone hồng dâu trẻ trung.', 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format', 460000),
('Tiệc Cưới Trọn Gói', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Hội Nghị'), 'Set hoa trang trí bàn tiệc.', 'https://images.unsplash.com/photo-1548629739-0630d75a4897?q=80&w=800&auto=format', 3500000),
('Thạch Thảo Trắng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Bó'), 'Bó hoa đồng nội giản dị.', 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format', 150000),
('Hồng Vàng Kiêu Sa', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sinh Nhật'), 'Món quà sinh nhật ý nghĩa.', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=800&auto=format', 420000),
('Bình Hoa Lan Vũ Nữ', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cắm Bình'), 'Sắc vàng tươi tắn.', 'https://images.unsplash.com/photo-1464852047516-bb48594347fc?q=80&w=800&auto=format', 550000),
('Giỏ Hoa Mix', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tươi Giỏ'), 'Đa dạng các loại hoa theo mùa.', 'https://images.unsplash.com/photo-1519378304602-28c037955529?q=80&w=800&auto=format', 400000),
('Cưới Hiện Đại', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cưới'), 'Bó hoa dáng tròn gọn gàng.', 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800&auto=format', 450000),
('Phòng Họp', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Hội Nghị'), 'Hoa dài trang trí bàn họp.', 'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=800&auto=format', 650000),
('Lễ Viếng', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Chia Buồn'), 'Kệ hoa viếng tone tím trắng.', 'https://images.unsplash.com/photo-1469259948000-fa2f80452330?q=80&w=800&auto=format', 780000),
('Mừng Khai Trương', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sự Kiện'), 'Tone đỏ vàng may mắn.', 'https://images.unsplash.com/photo-1552683326-40f446974e7d?q=80&w=800&auto=format', 1350000),
('Hồng Xanh Độc Đáo', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Tình Yêu'), 'Bó hoa hồng xanh vĩnh cửu.', 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800&auto=format', 880000),
('Sinh Nhật Đồng Nghiệp', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Sinh Nhật'), 'Bó hoa lịch sự, trang trọng.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format', 380000),
('Hoa Cài Áo Chú Rể 02', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Cài Áo'), 'Hoa hồng trắng mini cài áo.', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format', 30000),
('Tiệc Cuối Năm', (SELECT ma_loai FROM loai_hoa WHERE ten_loai = 'Hoa Hội Nghị'), 'Lẵng hoa trang trí bục biểu diễn.', 'https://images.unsplash.com/photo-1563241598-a24ce1e473e3?q=80&w=800&auto=format', 900000);

-- Thêm Tin Tức
INSERT INTO tin_tuc (tieu_de, hinh_anh, noi_dung) VALUES 
('Xu hướng màu sắc hoa cưới năm 2026', 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format', 'Năm 2026 đánh dấu sự lên ngôi của các tone màu đất ấm áp kết hợp cùng pastel nhẹ nhàng trong thiết kế hoa cưới...'),
('Bí quyết giữ hoa tươi lâu trong mùa nóng', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=800&auto=format', 'Thời tiết nắng nóng là kẻ thù số một của hoa cắt cành. Để giữ hoa tươi lâu, bạn cần thay nước mỗi ngày...');

-- Thêm Test User
INSERT INTO khach_hang (ho_kh, ten_kh, sdt, dia_chi, email, gioi_tinh, ten_dn, mat_khau)
VALUES ('Khách', 'Hàng Test', '0901234567', '123 Đường Test, Quận 1', 'test@example.com', 1, 'testuser', '$2a$10$wT8K5w8z2O1H4k.B7Y9a/.M4Z9e7X8f0v.T5h2K1l6X.Q9r2w3y.C')
ON CONFLICT (email) DO NOTHING;
