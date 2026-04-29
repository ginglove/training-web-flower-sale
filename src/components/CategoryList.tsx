"use client";

import { Tag, Edit3, Trash2, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import { addCategory, updateCategory, deleteCategory } from '@/app/actions/category';

export default function CategoryList({ initialCategories }: { initialCategories: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = async (formData: FormData) => {
    const result = await addCategory(formData);
    if (result.success) {
      alert("Thêm loại hoa thành công!");
      setIsAdding(false);
    } else {
      alert(result.error);
    }
  };

  const handleUpdate = async (id: number, formData: FormData) => {
    const result = await updateCategory(id, formData);
    if (result.success) {
      alert("Cập nhật loại hoa thành công!");
      setEditingId(null);
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có thực sự muốn xóa loại hoa này không?")) {
      const result = await deleteCategory(id);
      if (result.success) {
        alert("Xóa loại hoa thành công!");
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-[#2D3436]">Quản Lý Loại Hoa</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="nm-raised px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sage hover:scale-105 transition-transform"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? 'Hủy bỏ' : 'Thêm Loại Mới'}
        </button>
      </div>

      {isAdding && (
        <div className="nm-raised rounded-[40px] p-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <form action={handleAdd} className="flex gap-6 items-end">
            <div className="flex-1 space-y-4">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Tên loại hoa mới</label>
              <input 
                name="ten_loai" 
                type="text" 
                placeholder="Ví dụ: Hoa Lan Hồ Điệp" 
                className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm" 
                required 
              />
            </div>
            <button type="submit" className="nm-button-sage px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest text-white">
              Lưu loại hoa
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialCategories.map((cat, index) => (
          <div key={cat.ma_loai} className="nm-raised p-8 rounded-[40px] group transition-all hover:scale-[1.02]">
            {editingId === cat.ma_loai ? (
              <form action={(fd) => handleUpdate(cat.ma_loai, fd)} className="space-y-6">
                <input 
                  name="ten_loai" 
                  defaultValue={cat.ten_loai} 
                  className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm font-bold" 
                  autoFocus
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 nm-button-sage py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Lưu</button>
                  <button type="button" onClick={() => setEditingId(null)} className="flex-1 nm-raised py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted">Hủy</button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-sage opacity-40">#{index + 1}</span>
                    <div className="nm-inset p-3 rounded-xl text-sage">
                        <Tag size={20} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingId(cat.ma_loai)}
                      className="w-10 h-10 nm-button flex items-center justify-center text-[#2D3436] hover:text-sage transition-colors rounded-xl"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.ma_loai)}
                      className="w-10 h-10 nm-button flex items-center justify-center text-[#2D3436] hover:text-red-400 transition-colors rounded-xl"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2D3436] mb-2">{cat.ten_loai}</h3>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">ID: #{cat.ma_loai}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
