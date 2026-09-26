import React from 'react';
import { Building2, Stethoscope, Landmark, GraduationCap, ShoppingBag, ShieldCheck } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const industries = [
    { title: 'Fintech & Banking', icon: Landmark, desc: 'High-frequency analytical engines, PCI-DSS compliance & automated reporting tools.' },
    { title: 'Healthcare & Telemedicine', icon: Stethoscope, desc: 'HIPAA-compliant patient portals, EHR integrations and doctor tele-consultations.' },
    { title: 'EdTech & Online Learning', icon: GraduationCap, desc: 'Interactive SaaS course portals with live video, AI grading and subscription billing.' },
    { title: 'E-Commerce & Retail', icon: ShoppingBag, desc: 'Headless storefront architectures, real-time inventory sync and global checkout.' },
    { title: 'Enterprise Cloud Infra', icon: Building2, desc: 'Multi-region AWS/Azure cluster deployment with zero-downtime microservices.' },
    { title: 'Security & Governance', icon: ShieldCheck, desc: 'SOC2 Type II audits, IAM least-privilege automation and zero-trust policies.' },
  ];

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          Tailored Industry Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Engineered for Specific Vertical Demands
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto">
          We combine domain expertise with high-performance software architecture to solve industry-specific challenges.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 space-y-4 shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{ind.title}</h3>
                <p className="text-xs text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">{ind.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
