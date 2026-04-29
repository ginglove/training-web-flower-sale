"use client";

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deleteMember } from '@/app/actions/member';
import NotificationModal from './NotificationModal';

export default function MemberDeleteBtn({ id }: { id: number }) {
  const [notification, setNotification] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const handleDelete = async () => {
    if (window.confirm("Bạn có thực sự muốn xóa khách hàng này không?")) {
        const result = await deleteMember(id);
        if (result.success) {
            setNotification({
                isOpen: true,
                message: "Thành viên đã được gỡ bỏ khỏi hệ thống.",
                type: 'success'
            });
        } else {
            setNotification({
                isOpen: true,
                message: result.error || "Không thể xóa thành viên này.",
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
        <button 
            onClick={handleDelete}
            className="nm-button w-10 h-10 rounded-xl flex items-center justify-center text-[#2D3436] hover:text-red-500 transition-colors"
        >
            <Trash2 size={16} />
        </button>
    </>
  );
}
