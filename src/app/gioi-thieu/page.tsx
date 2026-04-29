import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';

export default function GioiThieuPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header Section */}
      <section className="text-center mb-24">
        <span className="nm-raised-sm px-6 py-2 rounded-full text-[10px] font-black text-sage uppercase tracking-[0.3em] bg-white/80 mb-8 inline-block">
          Câu chuyện của chúng tôi
        </span>
        <h1 className="font-serif text-6xl md:text-8xl font-black text-text-main leading-tight mb-8">
          Đưa tâm hồn vào <br />
          <span className="text-sage italic">Từng nhành hoa</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
          Siêu Thị Hoa OnLine không chỉ là một cửa hàng, mà là nơi những cảm xúc được nuôi dưỡng và trao gửi thông qua vẻ đẹp thuần khiết của thiên nhiên.
        </p>
      </section>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="nm-raised rounded-[60px] p-12 bg-white/40 backdrop-blur-sm">
          <div className="w-16 h-16 nm-inset rounded-2xl flex items-center justify-center text-sage mb-8">
            <Leaf size={32} />
          </div>
          <h2 className="font-serif text-3xl font-black text-text-main mb-6">Triết lý "Floral Soul"</h2>
          <p className="text-text-muted font-medium leading-relaxed">
            Chúng tôi tin rằng mỗi bông hoa đều mang trong mình một linh hồn riêng. Sứ mệnh của chúng tôi là kết nối tâm hồn của người tặng và người nhận thông qua những thiết kế hoa nghệ thuật tinh tế nhất.
          </p>
        </div>

        <div className="nm-raised rounded-[60px] p-12 bg-white/40 backdrop-blur-sm md:mt-20">
          <div className="w-16 h-16 nm-inset rounded-2xl flex items-center justify-center text-petal mb-8">
            <Award size={32} />
          </div>
          <h2 className="font-serif text-3xl font-black text-text-main mb-6">Chất lượng Tuyệt đối</h2>
          <p className="text-text-muted font-medium leading-relaxed">
            Từng nhành hoa tại Siêu Thị Hoa OnLine được tuyển chọn khắt khe từ những trang trại hữu cơ uy tín nhất thế giới. Chúng tôi cam kết độ tươi mới kéo dài, mang lại sự hài lòng tuyệt đối cho khách hàng.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <section className="nm-raised rounded-[80px] p-16 md:p-24 relative overflow-hidden mb-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1">
            <h2 className="font-serif text-5xl font-black text-text-main leading-tight mb-8">Giá trị cốt lõi</h2>
            <p className="text-text-muted font-bold text-sm uppercase tracking-widest leading-loose">
              Tận tâm • Sáng tạo • Bền vững • Lan tỏa yêu thương
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 nm-inset rounded-full flex items-center justify-center text-sage">
                <Heart size={20} />
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Tận tâm phục vụ</h4>
                <p className="text-sm text-text-muted leading-relaxed">Luôn lắng nghe và thấu hiểu nhu cầu của từng khách hàng để tạo nên những trải nghiệm cá nhân hóa.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 nm-inset rounded-full flex items-center justify-center text-sage">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Bảo mật & Tin cậy</h4>
                <p className="text-sm text-text-muted leading-relaxed">Hệ thống quản lý chuyên nghiệp đảm bảo mọi đơn hàng đều được giao đúng hẹn và an toàn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="font-serif text-4xl font-black text-text-main mb-10">Cùng chúng tôi lan tỏa vẻ đẹp</h2>
        <a href="/hoa" className="nm-button-sage px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] inline-block">
          Xem các bộ sưu tập ngay
        </a>
      </section>
    </div>
  );
}
