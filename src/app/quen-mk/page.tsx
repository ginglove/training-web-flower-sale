import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";

export default function ForgotPassword() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <SidebarLeft />
        </aside>

        <main className="lg:col-span-6">
          <div className="nm-raised rounded-[40px] overflow-hidden">
            <div className="bg-sage px-8 py-5">
              <h2 className="text-white text-center font-black text-xs uppercase tracking-[0.3em]">Quên Mật Khẩu</h2>
            </div>

            <div className="p-16 flex flex-col items-center">
              <form className="w-full max-w-md space-y-8">
                <p className="text-xs text-text-muted italic text-center mb-10 leading-relaxed">
                  Vui lòng nhập Email hoặc Tên đăng nhập của bạn. <br/> Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu ngay lập tức.
                </p>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-6">Email / Tên đăng nhập</label>
                  <input 
                    type="text" 
                    className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main placeholder-text-muted/30"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>

                <button 
                  type="button"
                  className="w-full nm-button py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] text-text-main hover:scale-[1.02] transition-transform"
                >
                  Gửi Yêu Cầu
                </button>
                
                <div className="text-center pt-4">
                  <a href="/" className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-text-main transition-colors border-b border-transparent hover:border-text-muted/20 pb-1">
                    Quay lại Trang Chủ
                  </a>
                </div>
              </form>
            </div>
          </div>
        </main>

        <aside className="lg:col-span-3">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
}
