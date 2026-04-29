"use client";

import { useState } from 'react';
import { updateUser } from '@/app/actions/user';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MemberProfileForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validate = (formData: FormData) => {
    const errors: { [key: string]: string } = {};
    const ho = formData.get('ho') as string;
    const ten = formData.get('ten') as string;
    const sdt = formData.get('sdt') as string;
    const email = formData.get('email') as string;
    const dia_chi = formData.get('dia_chi') as string;
    const mat_khau = formData.get('mat_khau') as string;

    if (!ho) errors.ho = "Vui lòng nhập họ";
    else if (/\d/.test(ho)) errors.ho = "Không được chứa chữ số";

    if (!ten) errors.ten = "Vui lòng nhập tên";
    else if (/\d/.test(ten)) errors.ten = "Không được chứa chữ số";

    if (!sdt) errors.sdt = "Vui lòng nhập số điện thoại";
    else if (!sdt.startsWith('0')) errors.sdt = "Bắt đầu bằng số 0";
    else if (sdt.length < 9) errors.sdt = "Tối thiểu 9 số";
    else if (sdt.length > 12) errors.sdt = "Tối đa 12 số";
    else if (!/^\d+$/.test(sdt)) errors.sdt = "Chỉ chứa số";

    if (!email) errors.email = "Vui lòng nhập email";
    else if (email.length > 50) errors.email = "Tối đa 50 ký tự";
    else if (!/\S+@\S+\.\S+$/.test(email)) errors.email = "Email không hợp lệ";

    if (!dia_chi) errors.dia_chi = "Vui lòng nhập địa chỉ";
    else if (dia_chi.length > 200) errors.dia_chi = "Tối đa 200 ký tự";

    if (mat_khau && mat_khau !== "••••" && mat_khau.length < 11) {
      errors.mat_khau = "Mật khẩu mới phải từ 11-30 ký tự";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const ErrorDisplay = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1 text-red-500 text-[9px] font-bold mt-1 uppercase tracking-tighter"
        >
          <AlertCircle size={10} /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validate(formData)) return;

    setLoading(true);
    const data = Object.fromEntries(formData.entries());
    const result = await updateUser(data);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/thanh-vien');
        router.refresh();
      }, 2000);
    } else {
      alert(result.error);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 nm-inset rounded-full flex items-center justify-center text-sage">
          <CheckCircle2 size={40} />
        </div>
        <p className="text-sm font-bold text-text-main uppercase tracking-widest">Cập nhật thành công!</p>
        <p className="text-xs text-text-muted italic">Đang quay lại trang cá nhân...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-0 border border-gray-200 no-validate">
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 flex items-center">Tên Đăng Nhập</div>
        <div className="col-span-2 px-4 py-2 text-xs text-text-muted flex items-center font-bold uppercase">{user.ten_dn}</div>
      </div>
      
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 flex items-center">Mật Khẩu Mới</div>
        <div className="col-span-2 px-4 py-2">
          <input 
            name="mat_khau" 
            type="password" 
            defaultValue="••••" 
            className={`w-full px-2 py-1 border text-xs outline-none transition-all ${fieldErrors.mat_khau ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-sage'}`} 
          />
          <ErrorDisplay message={fieldErrors.mat_khau} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 flex items-center">Họ</div>
        <div className="px-4 py-2">
          <input 
            name="ho" 
            defaultValue={user.ho_kh} 
            className={`w-full px-2 py-1 border text-xs outline-none transition-all ${fieldErrors.ho ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-sage'}`} 
          />
          <ErrorDisplay message={fieldErrors.ho} />
        </div>
        <div className="grid grid-cols-2">
            <div className="bg-[#F9F9F9] px-2 py-2 text-xs font-bold text-text-muted border-r border-l border-gray-200 text-center flex items-center justify-center">Tên</div>
            <div className="px-2 py-2">
              <input 
                name="ten" 
                defaultValue={user.ten_kh} 
                className={`w-full px-2 py-1 border text-xs outline-none transition-all ${fieldErrors.ten ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-sage'}`} 
              />
              <ErrorDisplay message={fieldErrors.ten} />
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 flex items-center">Số Điện Thoại</div>
        <div className="col-span-2 px-4 py-2">
          <input 
            name="sdt" 
            defaultValue={user.sdt} 
            className={`w-full px-2 py-1 border text-xs outline-none transition-all ${fieldErrors.sdt ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-sage'}`} 
          />
          <ErrorDisplay message={fieldErrors.sdt} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 flex items-center">Email</div>
        <div className="col-span-2 px-4 py-2">
          <input 
            name="email" 
            defaultValue={user.email} 
            className={`w-full px-2 py-1 border text-xs outline-none transition-all ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-sage'}`} 
          />
          <ErrorDisplay message={fieldErrors.email} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 h-20 flex items-center">Địa Chỉ Nhà</div>
        <div className="col-span-2 px-4 py-2">
          <textarea 
            name="dia_chi" 
            defaultValue={user.dia_chi} 
            className={`w-full h-16 px-2 py-1 border text-xs outline-none resize-none transition-all ${fieldErrors.dia_chi ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-sage'}`} 
          />
          <ErrorDisplay message={fieldErrors.dia_chi} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 border-b border-gray-200">
        <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 flex items-center">Giới Tính</div>
        <div className="col-span-2 px-4 py-2">
            <select name="gioi_tinh" defaultValue={user.gioi_tinh === 1 ? 'Nam' : 'Nữ'} className="px-2 py-1 border border-gray-200 text-xs outline-none focus:border-sage">
                <option>Nam</option>
                <option>Nữ</option>
            </select>
        </div>
      </div>
      
      <div className="p-4 flex justify-start gap-4">
        <button 
          type="submit" 
          disabled={loading}
          className="nm-button px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-sage hover:text-sage-dark transition-all disabled:opacity-50"
        >
            {loading ? 'Đang cập nhật...' : 'Cập Nhật Thông Tin'}
        </button>
        <button 
          type="button" 
          onClick={() => router.push('/thanh-vien')}
          className="nm-raised px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-red-400 transition-all"
        >
            Hủy Bỏ
        </button>
      </div>
    </form>
  );
}
