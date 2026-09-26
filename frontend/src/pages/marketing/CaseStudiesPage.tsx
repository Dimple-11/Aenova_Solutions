import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 'cs-1',
      client: 'Global FinTech Corp',
      title: 'High-Frequency Financial Analytics Dashboard & Microservices Migration',
      challenge: 'Legacy monolithic system experienced 3.2s query latency during market opening hours.',
      solution: 'Architected event-driven microservices using Redis caching and PostgreSQL partitioning.',
      results: ['96% reduction in API response time (120ms average)', 'Zero downtime during 50,000 req/sec spikes', '$140k annual cloud savings'],
      metric: '96% Speedup'
    },
    {
      id: 'cs-2',
      client: 'EduFlow Learning Platforms',
      title: 'Multi-Tenant Interactive Learning SaaS Architecture',
      challenge: 'Scaling live video streaming and course grading for 100k active concurrent students.',
      solution: 'Built auto-scaling Kubernetes cluster on AWS with WebRTC video distribution.',
      results: ['Scales to 100,000+ active sessions automatically', '99.99% system availability SLA', 'Integrated Stripe multi-currency billing'],
      metric: '100k Concurrent'
    }
  ];

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          Proven Success Stories
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          In-Depth Technical Case Studies
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto">
          Detailed breakdowns of challenges, solutions, and quantitative business results delivered for clients.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7D5] dark:border-[#3D2C23] pb-6">
              <div>
                <span className="text-xs font-bold text-[#D4B483] uppercase">{cs.client}</span>
                <h2 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-1">{cs.title}</h2>
              </div>
              <span className="px-4 py-2 rounded-2xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] text-sm font-bold font-serif shrink-0">
                {cs.metric}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-xs">The Challenge</h4>
                <p className="text-[#6B4E3A] dark:text-[#D4B483]/80 leading-relaxed">{cs.challenge}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-xs">The Architecture Solution</h4>
                <p className="text-[#6B4E3A] dark:text-[#D4B483]/80 leading-relaxed">{cs.solution}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] space-y-2">
              <h4 className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] uppercase">Key Quantitative Impact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                {cs.results.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#D4B483]" /> {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
