import { redirect } from 'next/navigation';

export default function WhatsappDuvidasTestePage() {
  // Redireciona para o WhatsApp do número indicado (Brasil +55)
  redirect('https://wa.me/5511958072826');
}
