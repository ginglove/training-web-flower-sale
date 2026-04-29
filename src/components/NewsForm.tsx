"use client";

import { Save, ImageIcon, Type, AlignLeft } from 'lucide-react';
import { useState } from 'react';
import { addNews, updateNews } from '@/app/actions/news';
import Link from 'next/link';

interface NewsFormProps {
    initialData?: any;
    mode: 'add' | 'edit';
}

export default function NewsForm({ initialData, mode }: NewsFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    let result;
    
    if (mode === 'add') {
        result = await addNews(formData);
    } else {
        result = await updateNews(initialData.ma_tt, formData);
    }
    
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      window.scrollTo(0, 0);
    } else {
      setError(result.error || "Có lỗi xảy ra khi xử lý.");
    }
  };

  if (success) {
    return (
        <div className="nm-raised rounded-[40px] p-20 text-center animate-in zoom-in-95 duration-500">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-orange-400">
                    {mode === 'add' ? 'Đã Thêm Thành Công Tin Tức Này' : 'Bạn Đã Sửa Thành Công Tin Tức Này!'}
                </h3>
                <Link 
                    href="/quan-tri/tin-tuc" 
                    className="block text-sm font-black text-orange-400 hover:text-orange-600 underline underline-offset-8 decoration-2 tracking-widest transition-colors"
                >
                    Bấm Vào Đây Để Về Trang Quản Lý Tin Tức
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="nm-raised rounded-[40px] overflow-hidden">
        <div className="bg-sage p-8 text-center">
            <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-white">
                {mode === 'add' ? 'Đăng Tin Tức Mới' : 'Sửa Tin Tức Đã Đăng'}
            </h2>
        </div>

        <form action={handleSubmit} className="p-12 space-y-10">
            {error && (
                <div className="nm-inset p-6 rounded-2xl text-red-500 text-xs font-bold text-center">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                    <Type size={12} className="text-sage" /> Tiêu Đề
                </label>
                <input 
                    name="tieu_de" 
                    type="text" 
                    defaultValue={initialData?.tieu_de || ''}
                    placeholder="Nhập tiêu đề bản tin..." 
                    className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-[#2D3436]" 
                    required 
                />
            </div>

            <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                    <ImageIcon size={12} className="text-sage" /> Ảnh Minh Họa
                </label>
                <div className="flex gap-4">
                    <input 
                        name="hinh_anh" 
                        type="text" 
                        defaultValue={initialData?.hinh_anh || ''}
                        placeholder="URL hình ảnh (https://...)" 
                        className="flex-1 nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-[#2D3436]" 
                    />
                    <button type="button" className="nm-raised px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60 italic">
                        Upload
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                    <AlignLeft size={12} className="text-sage" /> Nội Dung
                </label>
                <div className="nm-inset p-2 rounded-[30px]">
                    {/* Simulated Editor Toolbar */}
                    <div className="bg-white/50 p-3 rounded-t-[25px] border-b border-black/5 flex gap-4 overflow-x-auto no-scrollbar">
                         {['B', 'I', 'U', 'S', 'Link', 'HTML'].map(tool => (
                             <span key={tool} className="nm-raised-sm px-3 py-1 rounded-lg text-[9px] font-black text-text-muted cursor-pointer hover:text-sage">{tool}</span>
                         ))}
                    </div>
                    <textarea 
                        name="noi_dung" 
                        rows={12} 
                        defaultValue={initialData?.noi_dung || ''}
                        placeholder="Kể câu chuyện về loài hoa của bạn..." 
                        className="w-full bg-transparent px-8 py-6 outline-none text-sm text-[#2D3436] resize-none"
                        required
                    ></textarea>
                </div>
            </div>

            <div className="pt-8 flex gap-6">
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`flex-1 nm-button-sage py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.5em] text-white flex items-center justify-center gap-4 ${loading ? 'opacity-50' : 'hover:scale-[1.02]'} transition-all`}
                >
                    <Save size={18} /> {loading ? 'ĐANG XỬ LÝ...' : mode === 'add' ? 'ĐĂNG BÀI' : 'CẬP NHẬT'}
                </button>
                <button type="reset" className="nm-raised px-10 py-6 rounded-[30px] font-black text-xs uppercase tracking-widest text-text-muted hover:text-red-400">
                    LÀM LẠI
                </button>
            </div>
        </form>
    </div>
  );
}
