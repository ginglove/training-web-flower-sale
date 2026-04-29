import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import NewsForm from "@/components/NewsForm";

export default function AddNewsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/quan-tri/tin-tuc" className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center text-[#2D3436] hover:text-sage transition-colors">
                <Undo2 size={20} />
            </Link>
            <div>
                <h1 className="font-serif text-4xl font-bold text-[#2D3436]">Đăng Tin Tức Mới</h1>
                <p className="text-text-muted italic mt-1 opacity-60">Chia sẻ những câu chuyện và cảm hứng về hoa tươi.</p>
            </div>
        </div>
      </div>

      <NewsForm mode="add" />
    </div>
  );
}
