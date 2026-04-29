import sql from "@/lib/db";
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import ProductForm from "@/components/ProductForm";

export const dynamic = 'force-dynamic';

export default async function AddProductPage() {
  const categories = await sql`SELECT * FROM loai_hoa ORDER BY ten_loai ASC`;

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/quan-tri/hoa" className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center text-text-muted hover:text-sage transition-colors">
                <Undo2 size={20} />
            </Link>
            <div>
                <h1 className="font-serif text-4xl font-bold text-text-main">Thêm Hoa Mới</h1>
                <p className="text-text-muted italic mt-1 opacity-60">Thêm một kiệt tác thiên nhiên vào bộ sưu tập.</p>
            </div>
        </div>
      </div>

      <div className="nm-raised rounded-[60px] p-16">
        <ProductForm categories={categories} mode="add" />
      </div>
    </div>
  );
}
