"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, Phone, MapPin, RefreshCw, AlertCircle, CheckCircle2, X } from 'lucide-react';

type FormFields = 'ten_dn' | 'mat_khau' | 'ho' | 'ten' | 'sdt' | 'email' | 'dia_chi' | 'captcha';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ten_dn: '',
    mat_khau: '',
    ho: '',
    ten: '',
    sdt: '',
    email: '',
    dia_chi: '',
    gioi_tinh: '1',
    captcha: ''
  });

  const [errors, setErrors] = useState<Partial<Record<FormFields, string>>>({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as FormFields]) {
      setErrors({ ...errors, [name as FormFields]: '' });
    }
    setApiError('');
  };

  const validate = () => {
    const newErrors: Partial<Record<FormFields, string>> = {};
    
    if (!formData.ten_dn) newErrors.ten_dn = 'Vui lòng nhập tên đăng nhập';
    else if (formData.ten_dn.length < 11) newErrors.ten_dn = 'Tên đăng nhập phải tối thiểu 11 ký tự';
    else if (formData.ten_dn.length > 30) newErrors.ten_dn = 'Tối đa 30 ký tự';

    if (!formData.mat_khau) newErrors.mat_khau = 'Vui lòng nhập mật khẩu';
    else if (formData.mat_khau.length < 11) newErrors.mat_khau = 'Mật khẩu phải tối thiểu 11 ký tự';
    else if (formData.mat_khau.length > 30) newErrors.mat_khau = 'Tối đa 30 ký tự';

    if (!formData.ho) newErrors.ho = 'Vui lòng nhập họ';
    else if (/\d/.test(formData.ho)) newErrors.ho = 'Không được chứa chữ số';

    if (!formData.ten) newErrors.ten = 'Vui lòng nhập tên';
    else if (/\d/.test(formData.ten)) newErrors.ten = 'Không được chứa chữ số';

    if (!formData.sdt) newErrors.sdt = 'Vui lòng nhập số điện thoại';
    else if (!formData.sdt.startsWith('0')) newErrors.sdt = 'Phải bắt đầu bằng số 0';
    else if (formData.sdt.length < 9) newErrors.sdt = 'Số điện thoại phải tối thiểu 9 số';
    else if (formData.sdt.length > 12) newErrors.sdt = 'Tối đa 12 số';
    else if (!/^\d+$/.test(formData.sdt)) newErrors.sdt = 'Chỉ được chứa chữ số';

    if (!formData.email) newErrors.email = 'Vui lòng nhập email';
    else if (formData.email.length > 50) newErrors.email = 'Tối đa 50 ký tự';
    else if (!/\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';

    if (!formData.dia_chi) newErrors.dia_chi = 'Vui lòng nhập địa chỉ';
    else if (formData.dia_chi.length > 200) newErrors.dia_chi = 'Tối đa 200 ký tự';

    if (!formData.captcha) newErrors.captcha = 'Vui lòng nhập mã captcha';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        setApiError(result.error || 'Có lỗi xảy ra khi đăng ký');
      }
    } catch (error) {
      setApiError('Không thể kết nối đến máy chủ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    router.push('/dang-nhap'); // Redirect to login form
  };

  const handleReset = () => {
    setFormData({
      ten_dn: '',
      mat_khau: '',
      ho: '',
      ten: '',
      sdt: '',
      email: '',
      dia_chi: '',
      gioi_tinh: '1',
      captcha: ''
    });
    setErrors({});
    setApiError('');
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const ErrorMessage = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1 text-red-500 text-[10px] font-black mt-2 ml-4 uppercase tracking-tighter"
        >
          <AlertCircle size={10} /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const inputClasses = (field: FormFields) => `
    w-full nm-inset px-6 py-4 rounded-2xl outline-none text-text-main placeholder-text-muted/40 transition-all font-medium
    ${errors[field] ? 'border-2 border-red-400 shadow-[inset_4px_4px_8px_#feb2b2,inset_-4px_-4px_8px_#ffffff]' : 'border border-transparent focus:shadow-inner'}
  `;

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-center bg-base overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl nm-raised p-8 md:p-12 rounded-[40px] border border-white/20"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-black text-text-main mb-2 tracking-tight">Đăng Ký Khách Hàng</h1>
          <p className="text-text-muted font-medium italic">Tham gia cộng đồng Siêu Thị Hoa OnLine</p>
        </div>

        {apiError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 nm-inset border-2 border-red-400 rounded-2xl text-red-500 text-xs font-bold text-center uppercase tracking-widest"
          >
            ⚠️ {apiError}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                <User size={12} /> Tên Đăng Nhập <span className="text-red-500">(*)</span>
              </label>
              <input type="text" name="ten_dn" value={formData.ten_dn} onChange={handleChange} className={inputClasses('ten_dn')} placeholder="HungNX" minLength={11} maxLength={30} />
              <ErrorMessage message={errors.ten_dn} />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                <Lock size={12} /> Mật Khẩu <span className="text-red-500">(*)</span>
              </label>
              <input type="password" name="mat_khau" value={formData.mat_khau} onChange={handleChange} className={inputClasses('mat_khau')} placeholder="••••••••" minLength={11} maxLength={30} />
              <ErrorMessage message={errors.mat_khau} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Họ <span className="text-red-500">(*)</span></label>
              <input type="text" name="ho" value={formData.ho} onChange={handleChange} className={inputClasses('ho')} placeholder="Nguyễn Xuân" maxLength={50} />
              <ErrorMessage message={errors.ho} />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Tên <span className="text-red-500">(*)</span></label>
              <input type="text" name="ten" value={formData.ten} onChange={handleChange} className={inputClasses('ten')} placeholder="Hùng" maxLength={50} />
              <ErrorMessage message={errors.ten} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                <Phone size={12} /> Số Điện Thoại <span className="text-red-500">(*)</span>
              </label>
              <input type="tel" name="sdt" value={formData.sdt} onChange={handleChange} className={inputClasses('sdt')} placeholder="0912345678" minLength={9} maxLength={12} />
              <ErrorMessage message={errors.sdt} />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
                <Mail size={12} /> Email <span className="text-red-500">(*)</span>
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses('email')} placeholder="hungnx@email.com" maxLength={50} />
              <ErrorMessage message={errors.email} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">
              <MapPin size={12} /> Địa Chỉ Nhà <span className="text-red-500">(*)</span>
            </label>
            <textarea name="dia_chi" rows={2} value={formData.dia_chi} onChange={handleChange} className={inputClasses('dia_chi')} placeholder="250 Hoàng Quốc Việt, Cầu Giấy, Hà Nội" maxLength={200}></textarea>
            <ErrorMessage message={errors.dia_chi} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Giới Tính <span className="text-red-500">(*)</span></label>
              <select name="gioi_tinh" value={formData.gioi_tinh} onChange={handleChange} className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-text-main appearance-none bg-transparent font-bold text-sm">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Khác</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Captcha <span className="text-red-500">(*)</span></label>
                <button type="button" className="text-text-muted hover:text-text-main transition-colors"><RefreshCw size={12} /></button>
              </div>
              <div className="flex gap-2">
                <div className="flex-grow nm-recessed flex items-center justify-center rounded-2xl bg-white/20 border border-white/10 select-none font-mono text-lg tracking-tighter text-text-muted italic h-[52px]">K S 7 2 W</div>
                <input type="text" name="captcha" value={formData.captcha} onChange={handleChange} className={`w-1/2 nm-inset px-4 py-4 rounded-2xl outline-none text-text-main text-center font-mono uppercase font-bold ${errors.captcha ? 'border-2 border-red-400' : ''}`} placeholder="Mã" />
              </div>
              <ErrorMessage message={errors.captcha} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex gap-6 pt-8">
            <button type="button" onClick={handleReset} className="flex-1 nm-button py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-text-main">Làm Trắng Form</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 nm-button py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-text-main hover:scale-[1.02] active:scale-95 disabled:opacity-50">
              {isSubmitting ? 'ĐANG GỬI...' : 'ĐĂNG KÝ'}
            </button>
          </motion.div>
        </form>
      </motion.div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseSuccess} className="absolute inset-0 bg-text-main/20 backdrop-blur-md"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="relative w-full max-w-sm nm-raised p-8 rounded-[40px] text-center border border-white/40">
              <button onClick={handleCloseSuccess} className="absolute top-6 right-6 text-text-muted hover:text-text-main transition-colors nm-raised-sm p-2 rounded-full"><X size={16} /></button>
              <div className="flex justify-center mb-6"><div className="nm-inset p-6 rounded-full text-green-500"><CheckCircle2 size={48} /></div></div>
              <h3 className="font-serif text-2xl font-black text-text-main mb-3">Đăng ký thành công!</h3>
              <p className="text-text-muted font-medium text-sm leading-relaxed mb-8 px-4">Tài khoản của bạn đã được khởi tạo. Hệ thống sẽ đưa bạn đến trang đăng nhập.</p>
              <button onClick={handleCloseSuccess} className="w-full nm-button py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-text-main hover:scale-105 active:scale-95">Đăng nhập ngay</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
