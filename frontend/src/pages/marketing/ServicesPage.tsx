import React from 'react';
import { catalogServicesMock } from '../../data/mockData';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          Our Services Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          End-to-End Technology Solutions
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto">
          Tailored services to help your business build, scale, and succeed in the digital world.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {catalogServicesMock.map((srv) => (
            <div key={srv.id} className="p-8 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{srv.title}</h2>
              <p className="text-xs text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">{srv.fullDesc}</p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] uppercase">Key Features</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {srv.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#6B4E3A] dark:text-[#D4B483]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B483]" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE7D5] dark:border-[#3D2C23] flex items-center justify-between">
                <span className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Timeline: {srv.estimatedTimeline}</span>
                <Link to="/signup">
                  <Button variant="gold" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    Request in Portal
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
