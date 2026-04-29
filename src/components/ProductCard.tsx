"use client";

import { useState } from 'react';

interface ProductCardProps {
    product: any;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex flex-col group ${index % 2 !== 0 ? 'md:mt-12' : ''}`}>
        <div className="nm-raised rounded-[50px] p-3 overflow-hidden aspect-[4/5] relative bg-white/50">
            {product.hinh_anh && !imageError ? (
                <img 
                    src={product.hinh_anh} 
                    alt={product.ten_hoa} 
                    className="w-full h-full object-cover rounded-[40px] group-hover:scale-110 transition-transform duration-700 bg-sage/5" 
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-full h-full bg-sage/10 rounded-[40px] flex items-center justify-center">
                    <span className="text-4xl opacity-20 animate-pulse">🌿</span>
                </div>
            )}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="nm-raised-sm w-12 h-12 rounded-full flex items-center justify-center bg-white/90 text-xl hover:bg-sage hover:text-white transition-colors">
                    🛒
                </button>
            </div>
        </div>
        <div className="mt-8 px-4 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-sage mb-2 block">{product.ten_loai}</span>
            <h3 className="font-serif text-2xl font-bold text-text-main mb-2 hover:text-sage transition-colors cursor-pointer">
                {product.ten_hoa}
            </h3>
            <p className="text-text-main font-black tracking-tighter">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia)}
            </p>
        </div>
    </div>
  );
}
