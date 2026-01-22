'use client';

import { useMemo, useState } from 'react';
import { authApi, orderApi, type BillingPeriod } from '@/lib/api';

const PRICE = {
  monthlyPerUser: 5,
  yearlyPerUser: 50,
  keyOneTime: 30,
};

function digitsOnlyNoLeadingZeros(value: string, allowEmpty = true): string {
  // keep only digits
  const raw = value.replace(/\D/g, '');

  if (raw === '') return allowEmpty ? '' : '0';

  // remove leading zeros when there are more digits after them
  const cleaned = raw.replace(/^0+(?=\d)/, '');
  return cleaned;
}

export default function DashboardPage() {
  const user = authApi.getUser();

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('MONTHLY');

  // store input as string so UI never gets stuck with "0233"
  const [subscriptionsInput, setSubscriptionsInput] = useState('1');
  const [keysInput, setKeysInput] = useState('0');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const subscriptions = useMemo(() => {
    const n = parseInt(subscriptionsInput, 10);
    return Number.isFinite(n) ? n : 0;
  }, [subscriptionsInput]);

  const keys = useMemo(() => {
    const n = parseInt(keysInput, 10);
    return Number.isFinite(n) ? n : 0;
  }, [keysInput]);

  const total = useMemo(() => {
    const subs = Math.max(0, subscriptions);
    const k = Math.max(0, keys);

    const subsPrice =
      billingPeriod === 'MONTHLY'
        ? subs * PRICE.monthlyPerUser
        : subs * PRICE.yearlyPerUser;

    const keysPrice = k * PRICE.keyOneTime;

    return { subsPrice, keysPrice, grandTotal: subsPrice + keysPrice };
  }, [billingPeriod, subscriptions, keys]);

  const submitOrder = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!user?.userId) throw new Error('Missing userId. Please re-login.');
      if (subscriptions < 1) throw new Error('Subscriptions must be at least 1');
      if (keys < 0) throw new Error('Keys cannot be negative');

      const resp = await orderApi.create({
        userId: user.userId,
        subscriptionCount: subscriptions,
        physicalKeyCount: keys,
      });

      setSuccessMsg(resp?.message || 'Your order is successfully stored.');
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };


  if (!user) {
    return (
      <main className="min-h-screen p-6 text-slate-200">
        You are not authenticated.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-400">Welcome, {user.name || user.login}.</p>
        </div>

        {/* User card */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold">Your account</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs text-slate-400">Login</div>
              <div className="mt-1 font-medium">{user.login}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs text-slate-400">Company</div>
              <div className="mt-1 font-medium">{user.companyName}</div>
            </div>
          </div>
        </section>

        {/* Order */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold">New order</h2>
          <p className="mt-1 text-sm text-slate-400">
            Security software subscriptions + optional physical keys.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Billing */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-sm font-medium">Billing</div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setBillingPeriod('MONTHLY')}
                  className={
                    'flex-1 rounded-lg border px-3 py-2 text-sm ' +
                    (billingPeriod === 'MONTHLY'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                      : 'border-slate-800 bg-slate-950/40 text-slate-200 hover:border-slate-700')
                  }
                >
                  Monthly (€5/user)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod('YEARLY')}
                  className={
                    'flex-1 rounded-lg border px-3 py-2 text-sm ' +
                    (billingPeriod === 'YEARLY'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                      : 'border-slate-800 bg-slate-950/40 text-slate-200 hover:border-slate-700')
                  }
                >
                  Yearly (€50/user)
                </button>
              </div>
            </div>

            {/* Quantities */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-sm font-medium">Quantities</div>

              <label className="mt-3 block text-xs text-slate-400">
                Subscriptions (users)
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100 outline-none focus:border-cyan-600"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={subscriptionsInput}
                onChange={(e) =>
                  setSubscriptionsInput(digitsOnlyNoLeadingZeros(e.target.value, true))
                }
                onBlur={() => {
                  // enforce min=1 on blur
                  const v = digitsOnlyNoLeadingZeros(subscriptionsInput, false);
                  const n = parseInt(v || '0', 10);
                  setSubscriptionsInput(String(Math.max(1, Number.isFinite(n) ? n : 1)));
                }}
              />

              <label className="mt-3 block text-xs text-slate-400">
                Physical keys (€30 one-time)
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100 outline-none focus:border-cyan-600"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={keysInput}
                onChange={(e) => setKeysInput(digitsOnlyNoLeadingZeros(e.target.value, true))}
                onBlur={() => {
                  // enforce min=0 on blur
                  const v = digitsOnlyNoLeadingZeros(keysInput, false);
                  const n = parseInt(v || '0', 10);
                  setKeysInput(String(Math.max(0, Number.isFinite(n) ? n : 0)));
                }}
              />
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-sm font-medium">Summary</div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-200">
                  <span>Subscriptions</span>
                  <span>€{total.subsPrice}</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Physical keys</span>
                  <span>€{total.keysPrice}</span>
                </div>
                <div className="my-3 h-px bg-slate-800" />
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>€{total.grandTotal}</span>
                </div>
              </div>

              <button
                onClick={submitOrder}
                disabled={loading || subscriptions < 1}
                className="mt-5 w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-60"
              >
                {loading ? 'Saving…' : 'Place order'}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-200">
              {successMsg}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
