'use client';

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useState } from 'react';

export function TransactionForm() {
  const address = useTonAddress();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const [tonConnectUi] = useTonConnectUI();

  if (!address) return;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recipientAddress || !amount || amount === '') return;

    const transaction = {
      messages: [
        {
          address: recipientAddress,
          amount: (parseInt(amount) * 1000000).toString(),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 360,
    };

    tonConnectUi.sendTransaction(transaction);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-center gap-y-4 rounded-3xl bg-gray-100 p-6 shadow-2xl">
      <input
        type="text"
        required
        placeholder="Recipient address"
        className="h-10 w-full rounded-xl px-2 py-1 text-lg outline-none"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="number"
        required
        placeholder="Amount"
        className="h-10 w-full rounded-xl px-2 py-1 text-lg outline-none"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        type="submit"
        className="h-10 w-full rounded-xl bg-white px-2 py-1 text-lg">
        Transfer
      </button>
    </form>
  );
}
