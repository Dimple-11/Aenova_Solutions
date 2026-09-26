import React from 'react';
import { Target, Eye, Award, Users, CheckCircle2 } from 'lucide-react';
import { teamMembersMock } from '../../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          About Aevona Solution
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] max-w-3xl mx-auto">
          People. Technology. A Brighter Tomorrow.
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto leading-relaxed">
          We are a technology company committed to delivering reliable, scalable, and innovative digital solutions that help businesses grow and create lasting impact.
        </p>
      </section>

      {/* Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Our Story</h2>
            <p className="text-xs sm:text-sm text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">
              Aevona Solution was founded with a simple belief: that technology should empower people and businesses to achieve more. We bring together technical expertise, creative thinking, and a client-centric approach to solve real-world challenges.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">
                <div className="text-xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB]">50+</div>
                <div className="text-xs text-[#6B4E3A]">Projects Delivered</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">
                <div className="text-xl font-bold font-serif text-[#2E1F17] dark:text-[#F8F4EB]">30+</div>
                <div className="text-xs text-[#6B4E3A]">Happy Clients</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#D4B483]">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Team meeting" className="w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Our Mission</h3>
            <p className="text-xs text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">
              To empower businesses with reliable, scalable, and innovative digital solutions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 space-y-3 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Our Vision</h3>
            <p className="text-xs text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed">
              A world where technology quietly enables people and businesses to achieve more.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Our Leadership Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembersMock.slice(0, 4).map((tm) => (
            <div key={tm.id} className="p-6 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 text-center space-y-3 shadow-sm">
              <img src={tm.avatar} alt={tm.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#D4B483]" />
              <div>
                <h4 className="text-sm font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{tm.name}</h4>
                <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]">{tm.department}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
