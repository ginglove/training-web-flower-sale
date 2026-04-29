import postgres from 'postgres';
import bcrypt from 'bcryptjs';

// Setup connection
const sql = postgres(process.env.DATABASE_URL!);

const flowerImages = [
  'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11',
  'https://images.unsplash.com/photo-1563241598-a24ce1e473e3',
  'https://images.unsplash.com/photo-1591886960571-74d43a9d4166',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e',
  'https://images.unsplash.com/photo-1548629739-0630d75a4897',
  'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701',
  'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d',
  'https://images.unsplash.com/photo-1464852047516-bb48594347fc',
  'https://images.unsplash.com/photo-1519378304602-28c037955529',
  'https://images.unsplash.com/photo-1507290439931-a861b5a38200',
  'https://images.unsplash.com/photo-1533616688419-b7a585564566',
  'https://images.unsplash.com/photo-1469259948000-fa2f80452330',
  'https://images.unsplash.com/photo-1552683326-40f446974e7d',
  'https://images.unsplash.com/photo-1562690868-60bbe7293e94',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23'
];

async function seed() {
  console.log('🌱 Starting DB Seeding...');

  try {
    // 1. Create tables
    console.log('Ensuring tables exist...');
    await sql`CREATE TABLE IF NOT EXISTS loai_hoa (ma_loai SERIAL PRIMARY KEY, ten_loai VARCHAR(100) NOT NULL UNIQUE)`;
    await sql`CREATE TABLE IF NOT EXISTS hoa (ma_hoa SERIAL PRIMARY KEY, ten_hoa VARCHAR(100) NOT NULL, ma_loai INT REFERENCES loai_hoa(ma_loai), mo_ta TEXT, hinh_anh VARCHAR(500), gia FLOAT NOT NULL, ngay_d TIMESTAMP DEFAULT NOW(), trang_thai INT DEFAULT 1)`;
    await sql`CREATE TABLE IF NOT EXISTS khach_hang (ma_kh SERIAL PRIMARY KEY, ho_kh VARCHAR(50) NOT NULL, ten_kh VARCHAR(50) NOT NULL, sdt VARCHAR(20) NOT NULL, dia_chi VARCHAR(500) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, gioi_tinh INT NOT NULL DEFAULT 1, ten_dn VARCHAR(50) NOT NULL UNIQUE, mat_khau VARCHAR(255) NOT NULL)`;
    await sql`CREATE TABLE IF NOT EXISTS adm (ma_adm SERIAL PRIMARY KEY, ten_dn VARCHAR(30) NOT NULL UNIQUE, mat_khau VARCHAR(100) NOT NULL, ho VARCHAR(30) NOT NULL, ten VARCHAR(30) NOT NULL, gioi_tinh INT NOT NULL DEFAULT 1)`;
    await sql`CREATE TABLE IF NOT EXISTS don_dat_hang (ma_dh SERIAL PRIMARY KEY, ma_kh INT REFERENCES khach_hang(ma_kh), ngay_dh TIMESTAMP DEFAULT NOW(), ngay_gh TIMESTAMP, noi_giao VARCHAR(300) NOT NULL, hien_trang INT DEFAULT 0)`;
    await sql`CREATE TABLE IF NOT EXISTS ct_don_dat_hang (ma_dh INT REFERENCES don_dat_hang(ma_dh), ma_hoa INT REFERENCES hoa(ma_hoa), gia_ban FLOAT NOT NULL, sl_dat INT NOT NULL, PRIMARY KEY (ma_dh, ma_hoa))`;
    await sql`CREATE TABLE IF NOT EXISTS tin_tuc (ma_tt SERIAL PRIMARY KEY, tieu_de VARCHAR(80) NOT NULL, hinh_anh VARCHAR(200), noi_dung TEXT NOT NULL, ngay_dang TIMESTAMP DEFAULT NOW())`;

    // 2. Insert Admins
    console.log('Seeding Admins...');
    // Use the verified hash for abc@123 from the user's screenshot
    const hashedAdminPw = '$2a$12$MruUw0GAD8pKxTm58uQdh.MQIOFWObAAInwvrYh4MvZ/S8CbYSlpO';
    await sql`INSERT INTO adm (ten_dn, mat_khau, ho, ten, gioi_tinh) VALUES ('admin', ${hashedAdminPw}, 'Nguyen', 'Quản Trị', 1) ON CONFLICT (ten_dn) DO NOTHING`;

    // 3. Insert Categories
    console.log('Seeding Categories...');
    const targetCategories = [
      'Hoa Cưới', 'Hoa Tình Yêu', 'Hoa Sinh Nhật', 'Hoa Tươi Bó', 
      'Hoa Tươi Giỏ', 'Hoa Văn Phòng', 'Hoa Sự Kiện', 'Hoa Chia Buồn', 
      'Hoa Cắm Bình', 'Hoa Để Bàn', 'Hoa Cài Áo', 'Hoa Hội Nghị'
    ];
    for (const cat of targetCategories) {
      await sql`INSERT INTO loai_hoa (ten_loai) VALUES (${cat}) ON CONFLICT DO NOTHING`;
    }
    const categories = await sql`SELECT * FROM loai_hoa`;

    // 4. Insert Products (Hoa) - Target 50
    console.log('Seeding Products (Target 50)...');
    
    // Clear existing to avoid duplicates if re-running for 50
    await sql`DELETE FROM hoa`;

    const flowerNames = ['Hương Sắc Mùa Xuân', 'Tình Yêu Vĩnh Cửu', 'Nắng Hạ Rực Rỡ', 'Khúc Giao Mùa', 'Dáng Ngọc', 'Mây Trắng', 'Ánh Dương', 'Huyền Bí', 'Vẻ Đẹp Á Đông', 'Lời Chúc May Mắn'];
    
    let count = 0;
    for (const cat of categories) {
      // Add 4-5 flowers per category to reach ~50+
      const itemsPerCat = Math.floor(Math.random() * 2) + 4; 
      for (let i = 1; i <= itemsPerCat; i++) {
        if (count >= 50) break;
        
        const name = `${flowerNames[Math.floor(Math.random() * flowerNames.length)]} ${idxToChar(i)}`;
        const price = Math.floor(Math.random() * 800000) + 150000;
        const img = `${flowerImages[count % flowerImages.length]}?q=80&w=800&auto=format`;
        
        await sql`
          INSERT INTO hoa (ten_hoa, ma_loai, mo_ta, hinh_anh, gia)
          VALUES (
            ${name}, 
            ${cat.ma_loai}, 
            ${`Mẫu ${name} thuộc bộ sưu tập ${cat.ten_loai}. Sản phẩm được thiết kế từ những nhành hoa tươi nhất trong ngày, mang phong cách hiện đại và sang trọng.`}, 
            ${img}, 
            ${price}
          )
        `;
        count++;
      }
    }

    // 5. Insert News
    console.log('Seeding News...');
    await sql`DELETE FROM tin_tuc`;
    await sql`INSERT INTO tin_tuc (tieu_de, hinh_anh, noi_dung) VALUES ('Xu hướng màu sắc hoa cưới năm 2026', 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format', 'Năm 2026 đánh dấu sự lên ngôi của các tone màu đất ấm áp kết hợp cùng pastel nhẹ nhàng...')`;
    await sql`INSERT INTO tin_tuc (tieu_de, hinh_anh, noi_dung) VALUES ('Bí quyết giữ hoa tươi lâu trong mùa nóng', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=800&auto=format', 'Thời tiết nắng nóng là kẻ thù số một của hoa cắt cành...')`;

    // 6. Test User
    console.log('Seeding Test User...');
    const hashedUserPw = await bcrypt.hash('password123', 10);
    await sql`INSERT INTO khach_hang (ho_kh, ten_kh, sdt, dia_chi, email, gioi_tinh, ten_dn, mat_khau) VALUES ('Khách', 'Hàng Test', '0901234567', '123 Đường Test, Quận 1', 'test@example.com', 1, 'testuser', ${hashedUserPw}) ON CONFLICT (email) DO NOTHING`;

    console.log(`✅ DB Seeding completed! Total Products: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

function idxToChar(idx: number) {
  return String.fromCharCode(64 + idx);
}

seed();
