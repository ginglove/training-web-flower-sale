import AdminDashboardLive from "@/components/AdminDashboardLive";

export default function AdminOverview() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-4xl font-bold text-text-main">Tổng Quan Hệ Thống</h1>
        <p className="text-text-muted italic mt-2 opacity-60">Dữ liệu được cập nhật thời gian thực từ cửa hàng.</p>
      </div>
      
      <AdminDashboardLive />
    </div>
  );
}
