import React, { useState } from 'react';
import { CreditCard, Download, Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { billingPlansMock, invoicesMock } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const BillingPage: React.FC = () => {
  const [plans] = useState(billingPlansMock);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleSelectUpgrade = (planName: string) => {
    setSelectedPlan(planName);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Billing & Subscription Overview
        </h1>
        <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
          Manage platform tiers, bandwidth usage quotas, payment methods, and PDF invoices.
        </p>
      </div>

      {/* Current Subscription Banner */}
      <div className="bg-gradient-to-r from-[#2E1F17] via-[#473224] to-[#2E1F17] text-[#F8F4EB] p-6 sm:p-8 rounded-3xl border border-[#D4B483]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4B483]/20 text-xs font-semibold text-[#D4B483] border border-[#D4B483]/30">
            <Sparkles className="w-3.5 h-3.5" /> Current Active Subscription
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#F8F4EB]">
            Professional Tier Plan
          </h2>
          <p className="text-xs text-[#E2D3B7]/80">
            Billing Cycle: $799.00 / month • Renews on October 01, 2024
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="gold" size="md" onClick={() => handleSelectUpgrade('Business')}>
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Usage Quota Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md space-y-2">
          <div className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">Active Projects</div>
          <div className="text-xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB]">3 of 10 Used</div>
          <div className="h-2 w-full bg-[#EFE7D5] dark:bg-[#31231B] rounded-full overflow-hidden">
            <div className="h-full bg-[#D4B483] rounded-full" style={{ width: '30%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md space-y-2">
          <div className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">Encrypted Storage</div>
          <div className="text-xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB]">39.1 GB of 100 GB</div>
          <div className="h-2 w-full bg-[#EFE7D5] dark:bg-[#31231B] rounded-full overflow-hidden">
            <div className="h-full bg-[#A6815B] rounded-full" style={{ width: '39%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md space-y-2">
          <div className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]/80">Team Seats</div>
          <div className="text-xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB]">5 of 15 Seats</div>
          <div className="h-2 w-full bg-[#EFE7D5] dark:bg-[#31231B] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>
      </div>

      {/* Subscription Plans Selection Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Available SaaS Platform Plans
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between space-y-6 relative transition-all ${
                p.isCurrent
                  ? 'bg-white dark:bg-[#241812] border-2 border-[#D4B483] shadow-xl'
                  : 'bg-white/80 dark:bg-[#241812]/80 border-[#D4B483]/30 hover:border-[#D4B483]'
              }`}
            >
              {p.isCurrent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#6B4E3A] text-white text-[10px] font-bold uppercase tracking-wider">
                  Current Plan
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{p.name}</h4>
                  <div className="text-2xl font-bold text-[#6B4E3A] dark:text-[#D4B483] mt-1 font-serif">
                    {p.price} <span className="text-xs text-[#6B4E3A]/70 font-normal">/ month</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-[#2E1F17] dark:text-[#F8F4EB]">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4B483] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={p.isCurrent ? 'outline' : 'gold'}
                fullWidth
                size="sm"
                disabled={p.isCurrent}
                onClick={() => handleSelectUpgrade(p.name)}
              >
                {p.isCurrent ? 'Active Tier' : `Select ${p.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Billing History & Invoices
        </h3>

        <div className="divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
          {invoicesMock.map((inv) => (
            <div key={inv.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{inv.number}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {inv.status}
                  </span>
                </div>
                <div className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-0.5">{inv.description}</div>
                <div className="text-[10px] text-[#A6815B]">{inv.date}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{inv.amount}</span>
                <Button variant="outline" size="sm" onClick={() => alert(`Downloading invoice ${inv.number}`)} icon={<Download className="w-3.5 h-3.5" />}>
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKOUT MODAL PREVIEW */}
      <Modal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} title={`Upgrade to ${selectedPlan} Plan`}>
        <div className="space-y-4 text-center py-4">
          <ShieldCheck className="w-12 h-12 text-[#D4B483] mx-auto" />
          <h3 className="text-base font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Frontend Payment Preview Mode
          </h3>
          <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80">
            This SaaS application uses a frontend mock layer. In production, this modal connects directly to Stripe or Paddle payment gateways.
          </p>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCheckoutModalOpen(false)}>Cancel</Button>
            <Button variant="gold" size="sm" onClick={() => { alert(`Plan upgraded to ${selectedPlan}!`); setIsCheckoutModalOpen(false); }}>
              Simulate Upgrade Confirmation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
