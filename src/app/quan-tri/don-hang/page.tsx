import AdminOrderListLive from "@/components/AdminOrderListLive";

export default function AdminOrders() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-text-main">Quản lý Đơn hàng</h1>
        <div className="nm-inset px-6 py-2 rounded-full text-[10px] font-black text-sage uppercase tracking-[0.2em]">
            Đang đồng bộ trực tuyến
        </div>
      </div>

      <AdminOrderListLive />
    </div>
  );
}
