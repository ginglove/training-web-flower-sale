import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import CheckoutForm from "@/components/CheckoutForm";

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <SidebarLeft />
        </aside>

        <main className="lg:col-span-9">
          <CheckoutForm />
        </main>
      </div>
    </div>
  );
}
