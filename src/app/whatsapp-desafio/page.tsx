import { redirect } from 'next/navigation';

export default function RedirectPage() {
  redirect('https://api.whatsapp.com/send?phone=5511976650763');
} 