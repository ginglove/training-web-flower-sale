import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM don_dat_hang) as total_orders,
        (SELECT COALESCE(SUM(gia_ban * sl_dat), 0) FROM ct_don_dat_hang) as total_revenue,
        (SELECT COUNT(*) FROM hoa) as total_products,
        (SELECT COUNT(*) FROM khach_hang) as total_customers
    `;

    const recentOrders = await sql`
      SELECT d.*, k.ten_kh 
      FROM don_dat_hang d 
      LEFT JOIN khach_hang k ON d.ma_kh = k.ma_kh 
      ORDER BY d.ma_dh DESC 
      LIMIT 5
    `;

    const newUsers = await sql`
      SELECT ma_kh, ten_kh, ten_dn 
      FROM khach_hang 
      ORDER BY ma_kh DESC 
      LIMIT 2
    `;

    return NextResponse.json({
      stats: {
        orders: stats[0].total_orders,
        revenue: stats[0].total_revenue,
        products: stats[0].total_products,
        customers: stats[0].total_customers
      },
      recentOrders,
      newUsers
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
