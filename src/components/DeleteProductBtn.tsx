"use client";

import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/app/actions/product';

export default function DeleteProductBtn({ id }: { id: number }) {
  const handleDelete = async () => {
    if (window.confirm("Bạn có thực sự muốn xóa sản phẩm này không?")) {
      const result = await deleteProduct(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="nm-button w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-red-400 transition-colors"
    >
      <Trash2 size={16} />
    </button>
  );
}
