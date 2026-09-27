
import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  X,
  Layers3,
  TrendingUp,
  Code2,
} from 'lucide-react';
import { initialProjectsMock } from '../../data/mockData';
import { StatusBadge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'Cloud Infrastructure',
    'Web & Application Development',
    'Data & Analytics Solutions',
    'Mobile App Development',
    'Business Automation',
  ];

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return initialProjectsMock.filter((project) => {
      const matchesCategory =
        filter === 'All' || project.serviceType === filter;

      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.serviceType.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const featuredProject = initialProjectsMock[0];

  const clearFilters = () => {
    setFilter('All');
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-14">

        {/* Background atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#D4B483]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="absolute left-[5%] top-44 w-32 h-32 rounded-full bg-[#7C8B78]/5 blur-3xl" />

        <div className="absolute right-[7%] top-60 w-36 h-36 rounded-full bg-[#A9684F]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4B483]/40 bg-[#D4B483]/10">

            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />

            <span className="text-[10px] sm:text-[11px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#6B4E3A] dark:text-[#D4B483]">
              Selected Work
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-[-0.055em]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Ideas turned into
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              digital reality.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#6B4E3A]/80 dark:text-[#D4B483]/75">
            A curated collection of products, platforms, and digital
            experiences we've designed and engineered for real-world impact.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <div className="px-5 py-3 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <div className="text-lg font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                {initialProjectsMock.length}+
              </div>

              <div className="text-[9px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/55 dark:text-[#D4B483]/55">
                Projects
              </div>

            </div>

            <div className="px-5 py-3 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <div className="text-lg font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                10+
              </div>

              <div className="text-[9px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/55 dark:text-[#D4B483]/55">
                Core Services
              </div>

            </div>

            <div className="px-5 py-3 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <div className="text-lg font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                100%
              </div>

              <div className="text-[9px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/55 dark:text-[#D4B483]/55">
                Built with Purpose
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURED PROJECT
      ====================================================== */}

      {featuredProject && (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 shadow-xl">

            {/* Decorative glow */}
            <div className="absolute -right-28 -top-28 w-96 h-96 rounded-full bg-[#D4B483]/10 blur-3xl" />

            <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#7C8B78]/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 p-7 sm:p-10 lg:p-14">

              {/* Content */}
              <div className="flex flex-col justify-center">

                <div className="flex items-center gap-3">

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/20">

                    <Sparkles className="w-3 h-3 text-[#D4B483]" />

                    <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#D4B483]">
                      Featured Project
                    </span>

                  </span>

                  <StatusBadge status={featuredProject.status} />

                </div>

                <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.045em] text-[#F8F4EB]">
                  {featuredProject.name}
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 font-Clarkson text-[#F8F4EB]/65">
                  {featuredProject.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">

                  <span className="px-3 py-1.5 rounded-full bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 text-[9px] font-Clarkson text-[#F8F4EB]/65">
                    {featuredProject.serviceType}
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 text-[9px] font-Clarkson text-[#F8F4EB]/65">
                    Production Ready
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 text-[9px] font-Clarkson text-[#F8F4EB]/65">
                    Scalable Architecture
                  </span>

                </div>

              </div>


              {/* Project visual */}
              <div className="flex items-center justify-center">

                <div className="relative w-full max-w-sm aspect-[4/3] rounded-[1.5rem] bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 overflow-hidden">

                  {/* Fake dashboard visual */}
                  <div className="absolute top-0 left-0 right-0 h-10 border-b border-[#F8F4EB]/10 flex items-center gap-1.5 px-4">

                    <span className="w-2.5 h-2.5 rounded-full bg-[#A9684F]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4B483]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C8B78]" />

                  </div>

                  <div className="absolute top-16 left-5 right-5">

                    <div className="grid grid-cols-3 gap-2">

                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="h-14 rounded-xl bg-[#D4B483]/10 border border-[#D4B483]/10"
                        />
                      ))}

                    </div>

                    <div className="mt-3 h-28 rounded-xl bg-[#D4B483]/5 border border-[#D4B483]/10 flex items-end gap-2 px-4 pb-4">

                      {[35, 60, 45, 80, 55, 90, 70].map((height, index) => (

                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-[#D4B483]/40"
                          style={{ height: `${height}%` }}
                        />

                      ))}

                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">

                      <div className="h-10 rounded-xl bg-[#7C8B78]/10" />
                      <div className="h-10 rounded-xl bg-[#A9684F]/10" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FILTER + SEARCH
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">

        <div className="rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-4 sm:p-5 shadow-sm">

          {/* Search */}
          <div className="relative">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4E3A]/40 dark:text-[#D4B483]/40" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, services, technologies..."
              className="w-full h-12 pl-11 pr-11 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 outline-none font-Clarkson text-xs text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/40 dark:placeholder:text-[#D4B483]/40 focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
            />

            {search && (

              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B4E3A]/50 hover:text-[#6B4E3A] dark:text-[#D4B483]/50 dark:hover:text-[#D4B483]"
              >
                <X className="w-4 h-4" />
              </button>

            )}

          </div>


          {/* Categories */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">

            <div className="hidden sm:flex items-center gap-2 mr-2 text-[#6B4E3A]/45 dark:text-[#D4B483]/45">

              <Filter className="w-3.5 h-3.5" />

              <span className="text-[9px] font-Clarkson font-bold uppercase tracking-wider">
                Filter
              </span>

            </div>

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  shrink-0 px-4 py-2.5 rounded-xl
                  text-[9px] sm:text-[10px]
                  font-Clarkson font-semibold
                  border transition-all duration-300
                  ${
                    filter === cat
                      ? 'bg-[#6B4E3A] text-white border-[#6B4E3A] shadow-md dark:bg-[#D4B483] dark:text-[#1A110B] dark:border-[#D4B483]'
                      : 'bg-[#F8F4EB] dark:bg-[#1A110B] text-[#6B4E3A] dark:text-[#D4B483] border-[#D4B483]/20 hover:border-[#D4B483]/60'
                  }
                `}
              >
                {cat}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECT GRID
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="flex items-end justify-between mb-7">

          <div>

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              The Work
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
              Projects worth talking about
            </h2>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#6B4E3A]/45 dark:text-[#D4B483]/45">

            <Layers3 className="w-3.5 h-3.5" />

            <span className="text-[10px] font-Clarkson">
              {filtered.length} results
            </span>

          </div>

        </div>


        {filtered.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((proj, index) => (

              <article
                key={proj.id}
                className="group relative overflow-hidden rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#D4B483]/55 transition-all duration-500"
              >

                {/* Accent glow */}
                <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-[#D4B483]/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 sm:p-7">

                  {/* Top row */}
                  <div className="flex items-center justify-between">

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#D4B483]/10 text-[#8B6F3D] dark:text-[#D4B483] text-[8px] font-Clarkson font-bold uppercase tracking-wider">
                      {proj.serviceType}
                    </span>

                    <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A]/25 dark:text-[#D4B483]/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>


                  {/* Project icon */}
                  <div className="mt-7 w-11 h-11 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 flex items-center justify-center">

                    <Code2 className="w-5 h-5 text-[#6B4E3A] dark:text-[#D4B483]" />

                  </div>


                  {/* Title */}
                  <h3 className="mt-5 text-xl font-Clarkson font-bold tracking-[-0.025em] text-[#2E1F17] dark:text-[#F8F4EB]">
                    {proj.name}
                  </h3>


                  {/* Description */}
                  <p className="mt-3 text-xs leading-6 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65 line-clamp-3">
                    {proj.description}
                  </p>


                  {/* Project metadata */}
                  <div className="mt-6 grid grid-cols-2 gap-2">

                    <div className="p-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/15">

                      <div className="text-[8px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/40 dark:text-[#D4B483]/40">
                        Budget
                      </div>

                      <div className="mt-1 text-[11px] font-Clarkson font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">
                        {proj.budget}
                      </div>

                    </div>

                    <div className="p-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/15">

                      <div className="text-[8px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/40 dark:text-[#D4B483]/40">
                        Progress
                      </div>

                      <div className="mt-1 text-[11px] font-Clarkson font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">
                        {proj.progress}%
                      </div>

                    </div>

                  </div>


                  {/* Progress */}
                  <div className="mt-5">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-[8px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/40 dark:text-[#D4B483]/40">
                        Delivery Progress
                      </span>

                      <TrendingUp className="w-3 h-3 text-[#7C8B78]" />

                    </div>

                    <div className="h-1.5 w-full rounded-full bg-[#EFE7D5] dark:bg-[#3D2C23] overflow-hidden">

                      <div
                        className="h-full rounded-full bg-[#D4B483] transition-all duration-700"
                        style={{
                          width: `${Math.min(proj.progress, 100)}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* Bottom */}
                  <div className="mt-6 pt-5 border-t border-[#EFE7D5] dark:border-[#3D2C23] flex items-center justify-between">

                    <StatusBadge status={proj.status} />

                    <button
                      className="inline-flex items-center gap-2 text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] group/link"
                    >

                      View project

                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />

                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* Empty state */
          <div className="py-20 rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D4B483]/10 flex items-center justify-center">

              <Search className="w-6 h-6 text-[#D4B483]" />

            </div>

            <h3 className="mt-5 font-Clarkson font-bold text-lg text-[#2E1F17] dark:text-[#F8F4EB]">
              No projects found
            </h3>

            <p className="mt-2 text-xs font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/60">
              Try a different category or search term.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 text-xs font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] underline underline-offset-4"
            >
              Clear filters
            </button>

          </div>

        )}

      </section>


      {/* =====================================================
          CAPABILITIES STRIP
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-7 sm:p-10 lg:p-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div>

              <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                What sits behind the work
              </span>

              <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
                More than a pretty interface.
              </h2>

              <p className="mt-4 text-sm leading-7 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65 max-w-xl">
                Every project is backed by thoughtful architecture,
                scalable infrastructure, clean engineering, and measurable
                business outcomes.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-3">

              {[
                'Scalable Architecture',
                'Cloud Infrastructure',
                'Data & Analytics',
                'Business Automation',
                'Modern UI/UX',
                'Secure Systems',
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/15"
                >

                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4B483] shrink-0" />

                  <span className="text-[9px] sm:text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          <div className="absolute left-[15%] top-0 w-48 h-48 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="absolute right-[15%] bottom-0 w-48 h-48 rounded-full bg-[#7C8B78]/10 blur-3xl" />

          <div className="relative">

            <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#D4B483]">
              Have an idea?
            </span>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">

              Your next project could
              <span className="text-[#D4B483]">
                {' '}be here.
              </span>

            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#F8F4EB]/60">
              Let's turn your product idea, business challenge, or
              technical requirement into something people actually want
              to use.
            </p>

            <div className="mt-8">

              <Link to="/signup">

                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4B483] text-[#2E1F17] text-xs font-Clarkson font-bold hover:bg-[#E1C795] hover:-translate-y-0.5 transition-all shadow-lg">

                  Start Your Project

                  <ArrowRight className="w-4 h-4" />

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
