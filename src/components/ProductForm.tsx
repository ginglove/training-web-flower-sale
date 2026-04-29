"use client";

import { Flower2, Tag, DollarSign, Image as ImageIcon, AlignLeft, Eye, Undo2, Save, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addProduct, updateProduct } from '@/app/actions/product';
import NotificationModal from '@/components/NotificationModal';

interface ProductFormProps {
  categories: any[];
  initialData?: any;
  mode: 'add' | 'edit';
}

export default function ProductForm({ categories, initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    message: '',
    type: 'success'
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (formData: FormData) => {
    const errors: { [key: string]: string } = {};
    const ten_hoa = formData.get('ten_hoa') as string;
    const gia = Number(formData.get('gia'));
    const mo_ta = formData.get('mo_ta') as string;

    if (!ten_hoa) errors.ten_hoa = "Tên hoa không được để trống";
    else if (ten_hoa.length < 5) errors.ten_hoa = "Tên hoa phải có ít nhất 5 ký tự";
    else if (ten_hoa.length > 20) errors.ten_hoa = "Tên hoa không được quá 20 ký tự";

    if (!gia) errors.gia = "Vui lòng nhập giá bán";
    else if (gia < 5000) errors.gia = "Giá bán tối thiểu là 5.000đ";
    else if (gia > 7000000) errors.gia = "Giá bán tối đa là 7.000.000đ";

    if (!mo_ta) errors.mo_ta = "Vui lòng nhập mô tả chi tiết";
    else if (mo_ta.length > 250) errors.mo_ta = "Mô tả không được quá 250 ký tự";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const ErrorDisplay = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="flex items-center gap-2 text-red-500 text-[9px] font-black mt-2 ml-6 uppercase tracking-widest"
        >
          <AlertCircle size={10} /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  async function handleSubmit(formData: FormData) {
    if (!validateForm(formData)) return;
    
    setLoading(true);
    let result;
    
    if (mode === 'add') {
      result = await addProduct(formData);
    } else {
      result = await updateProduct(initialData.ma_hoa, formData);
    }

    setLoading(false);

    if (result.success) {
      setNotification({
        isOpen: true,
        message: mode === 'add' ? "Bản thảo hoa mới đã được thêm vào bộ sưu tập của bạn!" : "Thông tin hoa đã được cập nhật thành công!",
        type: 'success'
      });
      
      // Delay navigation to let them see the modal
      setTimeout(() => {
        router.push('/quan-tri/hoa');
        router.refresh();
      }, 2000);
    } else {
      setNotification({
        isOpen: true,
        message: result.error || "Có lỗi xảy ra trong quá trình lưu trữ. Vui lòng kiểm tra lại.",
        type: 'error'
      });
    }
  }

  return (
    <>
      <NotificationModal 
        isOpen={notification.isOpen} 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ ...notification, isOpen: false })}
      />

      <form noValidate action={handleSubmit} className="space-y-12">
        {/* Main Info Row */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
              <Flower2 size={12} className="text-sage" /> Tên Hoa <span className="text-red-400 font-bold ml-1">* (Bắt buộc)</span>
            </label>
            <input 
              name="ten_hoa" 
              type="text" 
              defaultValue={initialData?.ten_hoa || ''}
              placeholder="Ví dụ: Ánh Dương Rực Rỡ" 
              className={`w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main placeholder:opacity-30 transition-all ${fieldErrors.ten_hoa ? 'border-2 border-red-200 shadow-[inset_4px_4px_8px_#feb2b2,inset_-4px_-4px_8px_#ffffff]' : 'border border-transparent focus:shadow-inner'}`}
              minLength={5}
              maxLength={20}
              required 
            />
            <ErrorDisplay message={fieldErrors.ten_hoa} />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
              <Tag size={12} className="text-sage" /> Loại Hoa
            </label>
            <select 
              name="ma_loai" 
              defaultValue={initialData?.ma_loai || categories[0]?.ma_loai}
              className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main appearance-none bg-transparent"
              required
            >
              {categories.map((c) => (
                <option key={c.ma_loai} value={c.ma_loai} className="bg-[#F7F5F2]">{c.ten_loai}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
              <DollarSign size={12} className="text-sage" /> Giá Bán (VNĐ) <span className="text-red-400 font-bold ml-1">* (Bắt buộc)</span>
            </label>
            <input 
              name="gia" 
              type="number" 
              defaultValue={initialData?.gia || ''}
              placeholder="Ví dụ: 500000" 
              className={`w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main transition-all ${fieldErrors.gia ? 'border-2 border-red-200 shadow-[inset_4px_4px_8px_#feb2b2,inset_-4px_-4px_8px_#ffffff]' : 'border border-transparent focus:shadow-inner'}`}
              min={5000}
              max={7000000}
              required 
            />
            <ErrorDisplay message={fieldErrors.gia} />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
              <Eye size={12} className="text-sage" /> Trạng Thái Hiển Thị
            </label>
            <select 
              name="trang_thai" 
              defaultValue={initialData?.trang_thai || "1"}
              className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main appearance-none bg-transparent"
            >
              <option value="1" className="bg-[#F7F5F2]">Hiển thị (Bình thường)</option>
              <option value="0" className="bg-[#F7F5F2]">Ẩn (Tạm ngưng)</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
            <AlignLeft size={12} className="text-sage" /> Mô Tả Chi Tiết <span className="text-red-400 font-bold ml-1">* (Bắt buộc)</span>
          </label>
          <textarea 
            name="mo_ta" 
            rows={5} 
            defaultValue={initialData?.mo_ta || ''}
            placeholder="Mô tả vẻ đẹp, ý nghĩa và cách chăm sóc loại hoa này..." 
            className={`w-full nm-inset px-8 py-6 rounded-[40px] outline-none text-sm text-text-main resize-none transition-all ${fieldErrors.mo_ta ? 'border-2 border-red-200 shadow-[inset_4px_4px_8px_#feb2b2,inset_-4px_-4px_8px_#ffffff]' : 'border border-transparent focus:shadow-inner'}`}
            maxLength={250}
            required
          ></textarea>
          <ErrorDisplay message={fieldErrors.mo_ta} />
        </div>

        {/* Image URL */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
            <ImageIcon size={12} className="text-sage" /> Đường Dẫn Hình Ảnh (URL)
          </label>
          <div className="flex gap-4">
              <input 
                  name="hinh_anh" 
                  type="text" 
                  defaultValue={initialData?.hinh_anh || ''}
                  placeholder="https://images.unsplash.com/..." 
                  className="flex-1 nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main" 
              />
              <div className="nm-raised px-8 py-5 rounded-3xl text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center justify-center opacity-40 italic">
                  Tải lên
              </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 flex items-center gap-6">
          <button 
              type="submit"
              disabled={loading}
              className={`flex-1 nm-button-sage py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
          >
            <Save size={20} /> {loading ? 'ĐANG XỬ LÝ...' : mode === 'add' ? 'THÊM MỚI SẢN PHẨM' : 'CẬP NHẬT THÔNG TIN'}
          </button>
          {mode === 'add' && (
              <button 
                  type="reset"
                  className="nm-raised px-10 py-6 rounded-[30px] font-black text-xs uppercase tracking-widest text-text-muted hover:text-red-400 transition-colors"
              >
                LÀM LẠI
              </button>
          )}
        </div>
      </form>
    </>
  );
}
