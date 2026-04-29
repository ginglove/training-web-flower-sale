import sql from "@/lib/db";
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from "next/navigation";
import NewsForm from "@/components/NewsForm";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const ma_tt = parseInt(id);

  const result = await sql`SELECT * FROM tin_tuc WHERE ma_tt = ${ma_tt}`;
  if (result.length === 0) notFound();
  const newsItem = result[0];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/quan-tri/tin-tuc" className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center text-[#2D3436] hover:text-sage transition-colors">
                <Undo2 size={20} />
            </Link>
            <div>
                <h1 className="font-serif text-4xl font-bold text-[#2D3436]">Sửa Tin Tức Đã Đăng</h1>
                <p className="text-text-muted italic mt-1 opacity-60">Cập nhật nội dung và cảm hứng cho bản tin của bạn.</p>
            </div>
        </div>
      </div>

      <NewsForm initialData={newsItem} mode="edit" />
    </div>
  );
}
