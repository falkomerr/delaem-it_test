'use client';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useQuery } from '@tanstack/react-query';

export function Header() {
  return (
    <div className="mt-2 flex w-full items-center justify-between gap-2">
      <TonConnectButton />
      <TonBalance />
    </div>
  );
}

export function TonBalance() {
  const address = useTonAddress();
  const { data: balance } = useQuery({
    queryFn: async ({ queryKey }) => {
      return fetch(`https://testnet.tonapi.io/v2/accounts/${queryKey[1]}`).then(
        (res) => res.json() ?? null,
      );
    },
    queryKey: ['balance', address],
  });

  if (!balance) return;

  return (
    <div className="flex cursor-pointer flex-col items-center gap-2 whitespace-nowrap rounded-full bg-blue-500 p-2 px-3 text-base text-white shadow-xl">
      Balance: {(balance.balance / 1000000000).toFixed(6)}
    </div>
  );
}
