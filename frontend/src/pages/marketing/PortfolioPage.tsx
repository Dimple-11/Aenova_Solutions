import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Images } from 'lucide-react';
import { api } from '../../lib/api';
import { PortfolioItem } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    api.portfolio.list()
      .then(setItems)
      .catch(() => setLoadError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = ['All', ...new Set(items.map(item => item.category))];
  const filtered = items.filter(item => filter === 'All' || item.category === filter);
  const canManage = currentUser?.role === 'Owner' || currentUser?.role === 'Admin';

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
        {canManage && (
          <Link to="/dashboard/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline">
            Manage portfolio <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.length > 1 && <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === cat
                  ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B]'
                  : 'bg-white dark:bg-[#241812] text-[#6B4E3A] dark:text-[#D4B483] border border-[#D4B483]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {filtered.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="w-full aspect-[16/10] object-cover" />
              ) : (
                <div className="w-full aspect-[16/10] flex items-center justify-center bg-[#EFE7D5] dark:bg-[#31231B] text-[#A6815B]">
                  <Images className="w-8 h-8" />
                </div>
              )}
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold uppercase text-[#A6815B]">{item.category}</span>
                <h2 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{item.name}</h2>
                <p className="text-xs text-[#6B4E3A]/80 dark:text-[#D4B483]/70 line-clamp-3 leading-relaxed">{item.description}</p>
                {item.projectUrl && (
                  <a href={item.projectUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 pt-2 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline">
                    View project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {isLoading && <p className="py-12 text-center text-sm text-[#6B4E3A] dark:text-[#D4B483]">Loading portfolio...</p>}
        {!isLoading && loadError && <p role="alert" className="py-12 text-center text-sm text-rose-700 dark:text-rose-300">Portfolio is temporarily unavailable.</p>}
        {!isLoading && !loadError && filtered.length === 0 && <p className="py-12 text-center text-sm text-[#6B4E3A] dark:text-[#D4B483]">No portfolio projects to show yet.</p>}
      </section>
    </div>
  );
};
