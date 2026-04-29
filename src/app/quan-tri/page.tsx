import { redirect } from 'next/navigation';

// Admin root redirects to overview
export default function AdminRoot() {
  redirect('/quan-tri/tong-quan');
}
