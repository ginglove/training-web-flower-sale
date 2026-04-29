import sql from "@/lib/db";
import CategoryList from "@/components/CategoryList";

export const dynamic = 'force-dynamic';

export default async function AdminCategories() {
  let categories: any[] = [];
  try {
    categories = await sql`SELECT * FROM loai_hoa ORDER BY ma_loai ASC`;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <CategoryList initialCategories={categories} />
    </div>
  );
}
