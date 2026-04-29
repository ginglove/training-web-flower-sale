"use client";

import { deleteNews } from '@/app/actions/news';
import { useState } from 'react';
import NotificationModal from './NotificationModal';
import Link from 'next/link';

export default function NewsItemActions({ id }: { id: number }) {
  const [notification, setNotification] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const handleDelete = async () => {
    if (window.confirm("Bạn có thực sự muốn xóa bản tin này không?")) {
      const result = await deleteNews(id);
      if (result.success) {
        setNotification({
            isOpen: true,
            message: "Tin tức đã được gỡ bỏ thành công.",
            type: 'success'
        });
      } else {
        setNotification({
            isOpen: true,
            message: result.error || "Không thể xóa tin tức này.",
            type: 'error'
        });
      }
    }
  };

  return (
    <>
        <NotificationModal 
            isOpen={notification.isOpen} 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification({ ...notification, isOpen: false })}
        />
        <div className="flex gap-6">
            <Link 
                href={`/quan-tri/tin-tuc/sua/${id}`}
                className="text-[10px] font-black uppercase tracking-widest text-[#2D3436] hover:text-sage transition-colors"
            >
                Sửa
            </Link>
            <button 
                onClick={handleDelete}
                className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
            >
                Xóa
            </button>
        </div>
    </>
  );
}
