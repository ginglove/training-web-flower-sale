"use client";

import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductSort({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/hoa?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Sắp xếp:</span>
      <div className="nm-inset px-4 py-2 rounded-xl relative">
        <select 
          className="bg-transparent text-xs font-bold text-text-main outline-none appearance-none pr-8 cursor-pointer relative z-10"
          value={currentSort}
          onChange={handleSortChange}
        >
          <option value="newest">Mới nhất</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[8px]">▼</div>
      </div>
    </div>
  );
}
