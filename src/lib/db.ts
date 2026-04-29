import postgres from 'postgres';

const globalForSql = global as unknown as { sql: postgres.Sql<{}> };

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl || dbUrl.trim() === '') {
  const errorMsg = 'CRITICAL ERROR: DATABASE_URL is missing or empty. Please configure it in your environment variables.';
  console.error(errorMsg);
  // On server-side, this will show in Vercel Logs
  throw new Error(errorMsg);
}

const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

const sql = globalForSql.sql || postgres(dbUrl, {
  max: 10,
  idle_timeout: 30,
  connect_timeout: 30,
  ssl: isLocal ? false : 'require', 
});

if (process.env.NODE_ENV !== 'production') globalForSql.sql = sql;

export default sql;

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS loai_hoa (
      ma_loai SERIAL PRIMARY KEY,
      ten_loai VARCHAR(100) NOT NULL UNIQUE
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS hoa (
      ma_hoa SERIAL PRIMARY KEY,
      ten_hoa VARCHAR(100) NOT NULL,
      ma_loai INT REFERENCES loai_hoa(ma_loai),
      mo_ta TEXT,
      hinh_anh VARCHAR(500),
      gia FLOAT NOT NULL,
      ngay_d TIMESTAMP DEFAULT NOW(),
      trang_thai INT DEFAULT 1
    )
  `;

  await sql`
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
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS adm (
      ma_adm SERIAL PRIMARY KEY,
      ten_dn VARCHAR(50) NOT NULL UNIQUE,
      mat_khau VARCHAR(255) NOT NULL,
      ho VARCHAR(50) NOT NULL,
      ten VARCHAR(50) NOT NULL,
      gioi_tinh INT NOT NULL DEFAULT 1
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS don_dat_hang (
      ma_dh SERIAL PRIMARY KEY,
      ma_kh INT REFERENCES khach_hang(ma_kh),
      ngay_dh TIMESTAMP DEFAULT NOW(),
      ngay_gh TIMESTAMP,
      noi_giao VARCHAR(500) NOT NULL,
      hien_trang INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ct_don_dat_hang (
      ma_dh INT REFERENCES don_dat_hang(ma_dh),
      ma_hoa INT REFERENCES hoa(ma_hoa),
      gia_ban FLOAT NOT NULL,
      sl_dat INT NOT NULL,
      PRIMARY KEY (ma_dh, ma_hoa)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS tin_tuc (
      ma_tt SERIAL PRIMARY KEY,
      tieu_de VARCHAR(200) NOT NULL,
      hinh_anh VARCHAR(500),
      noi_dung TEXT NOT NULL,
      ngay_dang TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS lien_he (
      ma_lh SERIAL PRIMARY KEY,
      ten_nguoi_lh VARCHAR(100) NOT NULL,
      sdt_nguoi_lh VARCHAR(20) NOT NULL,
      email_nguoi_lh VARCHAR(100) NOT NULL,
      gioi_nguoi_lh INT NOT NULL DEFAULT 1,
      diachi_nguoi_lh VARCHAR(500) NOT NULL,
      noi_dung TEXT NOT NULL,
      ngay_lh TIMESTAMP DEFAULT NOW()
    )
  `;
}
