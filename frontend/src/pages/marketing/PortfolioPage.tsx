import React, { useState } from 'react';
import { initialProjectsMock } from '../../data/mockData';
import { ExternalLink, Filter } from 'lucide-react';
import { StatusBadge } from '../../components/ui/Badge';

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Cloud Infrastructure', 'Web & Application Development', 'Data & Analytics Solutions', 'Mobile App Development', 'Business Automation'];

  const filtered = initialProjectsMock.filter(p => filter === 'All' || p.serviceType === filter);

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          Our Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Real Projects. Real Impact.
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto">
          A selection of our recent work across different industries and technologies.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === cat
                  ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B]'
                  : 'bg-white dark:bg-[#241812] text-[#6B4E3A] dark:text-[#D4B483] border border-[#D4B483]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {filtered.map((proj) => (
            <div key={proj.id} className="p-6 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#A6815B]">{proj.serviceType}</span>
                <StatusBadge status={proj.status} />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{proj.name}</h3>
              <p className="text-xs text-[#6B4E3A]/80 dark:text-[#D4B483]/70 line-clamp-3 leading-relaxed">{proj.description}</p>
              <div className="pt-2 border-t border-[#EFE7D5] dark:border-[#3D2C23] flex items-center justify-between text-xs text-[#6B4E3A]">
                <span>Budget: {proj.budget}</span>
                <span>Completed: {proj.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
