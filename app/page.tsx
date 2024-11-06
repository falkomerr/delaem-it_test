import { Header } from '@/components/Header';
import { TransactionForm } from '@/components/TransactionForm';

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-120px)] w-full flex-col items-center justify-center gap-4 px-10">
      <Header />
      <TransactionForm />
    </div>
  );
}
