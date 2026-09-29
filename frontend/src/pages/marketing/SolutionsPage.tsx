import React, { useMemo, useState } from 'react';
import {
  Building2,
  Stethoscope,
  Landmark,
  GraduationCap,
  ShoppingBag,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles,
  Cloud,
  BrainCircuit,
  Database,
  X,
  CheckCircle2,
  Globe2,
  Layers3,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';



export const SolutionsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const industries = [
    {
      title: 'Fintech & Banking',
      category: 'Finance',
      icon: Landmark,
      accent: 'gold',
      desc: 'High-performance financial platforms, analytics engines, secure payment workflows, and automated reporting systems.',
      capabilities: [
        'Payment Systems',
        'Financial Analytics',
        'Automated Reporting',
        'Banking Platforms',
        'Risk Management',
        'API Integrations',
      ],
    },
    {
      title: 'Healthcare & Telemedicine',
      category: 'Healthcare',
      icon: Stethoscope,
      accent: 'sage',
      desc: 'Secure healthcare platforms that connect patients, doctors, and medical systems through seamless digital experiences.',
      capabilities: [
        'Patient Portals',
        'Telemedicine',
        'EHR Integrations',
        'Appointment Systems',
        'Healthcare Analytics',
        'Secure APIs',
      ],
    },
    {
      title: 'EdTech & Online Learning',
      category: 'Education',
      icon: GraduationCap,
      accent: 'rose',
      desc: 'Modern learning platforms with interactive content, assessments, analytics, subscriptions, and intelligent learning tools.',
      capabilities: [
        'Learning Platforms',
        'AI Assessment',
        'Course Management',
        'Live Classes',
        'Student Analytics',
        'Subscriptions',
      ],
    },
    {
      title: 'E-Commerce & Retail',
      category: 'Commerce',
      icon: ShoppingBag,
      accent: 'terracotta',
      desc: 'Scalable commerce experiences with modern storefronts, inventory systems, personalized experiences, and reliable checkout.',
      capabilities: [
        'Online Stores',
        'Inventory Systems',
        'Payment Integration',
        'Order Management',
        'Customer Analytics',
        'Personalization',
      ],
    },
    {
      title: 'Enterprise Cloud',
      category: 'Enterprise',
      icon: Building2,
      accent: 'olive',
      desc: 'Cloud-native infrastructure designed for scalable applications, distributed systems, reliability, and continuous delivery.',
      capabilities: [
        'Cloud Architecture',
        'Microservices',
        'CI/CD',
        'Containerization',
        'Monitoring',
        'Infrastructure Automation',
      ],
    },
    {
      title: 'Security & Governance',
      category: 'Security',
      icon: ShieldCheck,
      accent: 'gold',
      desc: 'Security-focused systems designed around access control, application protection, governance, and resilient infrastructure.',
      capabilities: [
        'Security Audits',
        'IAM',
        'Zero Trust',
        'API Security',
        'Compliance Support',
        'Risk Assessment',
      ],
    },
  ];

  const categories = [
    'All',
    'Finance',
    'Healthcare',
    'Education',
    'Commerce',
    'Enterprise',
    'Security',
  ];

  const accentStyles: Record<string, any> = {
    gold: {
      icon: 'bg-[#D4B483]/20 text-[#8B6F3D] dark:text-[#D4B483]',
      glow: 'bg-[#D4B483]/10',
      badge: 'bg-[#D4B483]/10 text-[#8B6F3D] dark:text-[#D4B483]',
    },
    sage: {
      icon: 'bg-[#7C8B78]/15 text-[#667562]',
      glow: 'bg-[#7C8B78]/10',
      badge: 'bg-[#7C8B78]/10 text-[#667562]',
    },
    rose: {
      icon: 'bg-[#A87878]/15 text-[#8F6262]',
      glow: 'bg-[#A87878]/10',
      badge: 'bg-[#A87878]/10 text-[#8F6262]',
    },
    terracotta: {
      icon: 'bg-[#A9684F]/15 text-[#8D513C]',
      glow: 'bg-[#A9684F]/10',
      badge: 'bg-[#A9684F]/10 text-[#8D513C]',
    },
    olive: {
      icon: 'bg-[#85805D]/15 text-[#706B4D]',
      glow: 'bg-[#85805D]/10',
      badge: 'bg-[#85805D]/10 text-[#706B4D]',
    },
  };

  const filteredIndustries = useMemo(() => {
    const query = search.toLowerCase().trim();

    return industries.filter((industry) => {
      const matchesCategory =
        activeCategory === 'All' ||
        industry.category === activeCategory;

      const matchesSearch =
        !query ||
        industry.title.toLowerCase().includes(query) ||
        industry.category.toLowerCase().includes(query) ||
        industry.desc.toLowerCase().includes(query) ||
        industry.capabilities.some((item) =>
          item.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-16">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[420px] bg-[#D4B483]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[5%] top-44 w-32 h-32 rounded-full bg-[#7C8B78]/5 blur-3xl" />

        <div className="absolute right-[6%] top-52 w-36 h-36 rounded-full bg-[#A9684F]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D4B483]/40 bg-[#D4B483]/10 shadow-sm">

            <Sparkles className="w-4 h-4 text-[#D4B483]" />

            <span className="text-xs sm:text-sm font-Clarkson font-bold uppercase tracking-[0.2em] text-[#6B4E3A] dark:text-[#D4B483]">
              Industry Solutions
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 font-Clarkson font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.98] tracking-[-0.055em]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Built for your
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              industry's reality.
            </span>

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-8 font-Clarkson text-[#6B4E3A]/80 dark:text-[#D4B483]/75">
            We combine engineering expertise with industry context to build
            digital solutions around the challenges, regulations, and
            workflows that actually matter to your business.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <div className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:-translate-y-1 hover:border-[#D4B483]/60 hover:shadow-lg transition-all duration-300">

              <Globe2 className="w-5 h-5 text-[#D4B483] group-hover:rotate-12 transition-transform" />

              <span className="text-sm font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                6 Industry Verticals
              </span>

            </div>

            <div className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:-translate-y-1 hover:border-[#D4B483]/60 hover:shadow-lg transition-all duration-300">

              <Layers3 className="w-5 h-5 text-[#7C8B78] group-hover:scale-110 transition-transform" />

              <span className="text-sm font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                36+ Capabilities
              </span>

            </div>

            <div className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:-translate-y-1 hover:border-[#D4B483]/60 hover:shadow-lg transition-all duration-300">

              <BrainCircuit className="w-5 h-5 text-[#A9684F] group-hover:rotate-6 transition-transform" />

              <span className="text-sm font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Technology + Domain
              </span>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">

        <div className="rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-5 sm:p-7 shadow-sm hover:shadow-lg transition-shadow duration-300">

          {/* Search */}
          <div className="relative">

            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B4E3A]/45 dark:text-[#D4B483]/45" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search industries, capabilities..."
              className="w-full h-14 pl-14 pr-12 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 outline-none font-Clarkson text-sm sm:text-base text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/40 dark:placeholder:text-[#D4B483]/40 focus:border-[#D4B483] focus:ring-4 focus:ring-[#D4B483]/10 transition-all"
            />

            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6B4E3A]/50 hover:text-[#6B4E3A] dark:text-[#D4B483]/50 dark:hover:text-[#D4B483] hover:scale-110 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}

          </div>

          {/* Filters */}
          <div className="mt-5 flex gap-3 overflow-x-auto pb-1">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  shrink-0 px-5 py-3 rounded-xl
                  text-xs sm:text-sm
                  font-Clarkson font-semibold
                  border transition-all duration-300
                  hover:-translate-y-0.5
                  ${
                    activeCategory === category
                      ? 'bg-[#2E1F17] text-[#F8F4EB] border-[#2E1F17] shadow-lg dark:bg-[#D4B483] dark:text-[#2E1F17] dark:border-[#D4B483]'
                      : 'bg-[#F8F4EB] dark:bg-[#1A110B] text-[#6B4E3A] dark:text-[#D4B483] border-[#D4B483]/20 hover:border-[#D4B483]/60 hover:shadow-sm'
                  }
                `}
              >
                {category}
              </button>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED APPROACH + UI IMAGE
      ====================================================== */}

      {!search && activeCategory === 'All' && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16">

          <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 shadow-xl">

            {/* Background glows */}
            <div className="absolute -right-32 -top-32 w-[30rem] h-[30rem] rounded-full bg-[#D4B483]/10 blur-3xl pointer-events-none" />

            <div className="absolute -left-32 -bottom-32 w-[28rem] h-[28rem] rounded-full bg-[#7C8B78]/10 blur-3xl pointer-events-none" />

            {/* Main side-by-side layout */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 p-7 sm:p-10 lg:p-14 xl:p-16 items-center">

              {/* LEFT CONTENT */}
              <div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/20">

                  <Sparkles className="w-4 h-4 text-[#D4B483]" />

                  <span className="text-xs font-Clarkson uppercase tracking-[0.2em] text-[#D4B483]">
                    Featured Approach
                  </span>

                </div>

                <h2 className="mt-7 max-w-xl font-Clarkson font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.045em] text-[#F8F4EB]">

                  Technology that understands

                  <span className="text-[#D4B483]">
                    {' '}your business.
                  </span>

                </h2>

                <p className="mt-6 max-w-xl text-base sm:text-lg leading-8 font-Clarkson text-[#F8F4EB]/70">
                  Great software is not just about writing code. It needs to
                  understand users, workflows, regulations, data, and the
                  environment it operates in.
                </p>

                {/* Feature pills */}
                <div className="mt-8 flex flex-wrap gap-3">

                  {[
                    'Domain Expertise',
                    'Modern Architecture',
                    'Data & AI',
                    'Security First',
                  ].map((item) => (

                    <span
                      key={item}
                      className="px-4 py-2 rounded-full border border-[#F8F4EB]/10 bg-[#F8F4EB]/5 text-xs sm:text-sm font-Clarkson text-[#F8F4EB]/75 hover:bg-[#D4B483]/10 hover:border-[#D4B483]/30 hover:text-[#D4B483] transition-all duration-300"
                    >
                      {item}
                    </span>

                  ))}

                </div>

                {/* Small CTA */}
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-3 mt-9 px-6 py-3.5 rounded-xl bg-[#D4B483] text-[#2E1F17] text-sm font-Clarkson font-bold hover:bg-[#E2C99A] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  Explore our approach
                  <ArrowRight className="w-5 h-5" />
                </Link>

              </div>


              {/* RIGHT IMAGE */}
              <div className="relative">

                {/* Image glow */}
                <div className="absolute -inset-5 rounded-[2rem] bg-[#D4B483]/10 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Image frame */}
                <div className="relative rounded-[1.75rem] border border-[#D4B483]/30 bg-[#F8F4EB]/5 p-2 shadow-2xl overflow-hidden transform group-hover:-translate-y-2 group-hover:rotate-[0.3deg] transition-all duration-700">

                  <div className="relative overflow-hidden rounded-[1.35rem]">

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F17]/35 via-transparent to-transparent opacity-60 pointer-events-none" />

                  </div>

                </div>


                {/* Floating UI badge */}
                <div className="absolute -bottom-5 -left-5 sm:-left-7 px-4 py-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#241812] border border-[#D4B483]/30 shadow-xl">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-[#D4B483]/15 flex items-center justify-center">

                      <Globe2 className="w-5 h-5 text-[#D4B483]" />

                    </div>

                    <div>

                      <p className="text-[10px] uppercase tracking-wider font-Clarkson text-[#6B4E3A]/50 dark:text-[#D4B483]/50">
                        Designed around
                      </p>

                      <p className="text-sm font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                        Your Industry
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          INDUSTRY CARDS
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">

        <div className="flex items-end justify-between mb-10">

          <div>

            <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              Explore Verticals
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.04em] text-[#2E1F17] dark:text-[#F8F4EB]">
              Solutions for real-world industries
            </h2>

          </div>

          <span className="hidden sm:block text-sm font-Clarkson text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
            {filteredIndustries.length} industries
          </span>

        </div>


        {filteredIndustries.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {filteredIndustries.map((industry, index) => {

              const Icon = industry.icon;
              const accent = accentStyles[industry.accent];

              return (

                <div
                  key={industry.title}
                  className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:shadow-2xl hover:-translate-y-3 hover:border-[#D4B483]/60 transition-all duration-500"
                >

                  {/* Glow */}
                  <div
                    className={`absolute -right-20 -top-20 w-56 h-56 rounded-full ${accent.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative p-7 sm:p-8">

                    {/* Header */}
                    <div className="flex items-start justify-between">

                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accent.icon} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-sm font-Clarkson font-semibold text-[#6B4E3A]/25 dark:text-[#D4B483]/25">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>


                    {/* Title */}
                    <div className="mt-7">

                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-Clarkson font-bold uppercase tracking-wider ${accent.badge}`}
                      >
                        {industry.category}
                      </span>

                      <h3 className="mt-4 text-2xl sm:text-[1.7rem] leading-tight font-Clarkson font-bold tracking-[-0.03em] text-[#2E1F17] dark:text-[#F8F4EB]">
                        {industry.title}
                      </h3>

                    </div>


                    {/* Description */}
                    <p className="mt-4 text-sm sm:text-base leading-7 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
                      {industry.desc}
                    </p>


                    {/* Capabilities */}
                    <div className="mt-7">

                      <div className="flex items-center gap-3 mb-4">

                        <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
                          Capabilities
                        </span>

                        <div className="h-px flex-1 bg-[#EFE7D5] dark:bg-[#3D2C23]" />

                      </div>

                      <div className="grid grid-cols-1 gap-2.5">

                        {industry.capabilities.map((capability) => (

                          <div
                            key={capability}
                            className="flex items-center gap-3 text-sm font-Clarkson text-[#6B4E3A] dark:text-[#D4B483] group-hover:translate-x-1 transition-transform duration-300"
                          >

                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${accent.icon.split(' ')[1]}`}
                            />

                            {capability}

                          </div>

                        ))}

                      </div>

                    </div>


                    {/* Bottom */}
                    <div className="mt-8 pt-6 border-t border-[#EFE7D5] dark:border-[#3D2C23]">

                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 text-sm font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] group/link"
                      >

                        Explore solution

                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />

                      </Link>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        ) : (

          <div className="py-24 rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D4B483]/10 flex items-center justify-center">

              <Search className="w-7 h-7 text-[#D4B483]" />

            </div>

            <h3 className="mt-6 font-Clarkson font-bold text-2xl text-[#2E1F17] dark:text-[#F8F4EB]">
              No industries found
            </h3>

            <p className="mt-3 text-sm font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/60">
              Try another search or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 text-sm font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] underline underline-offset-4"
            >
              Clear filters
            </button>

          </div>

        )}

      </section>


      {/* =====================================================
          TECHNOLOGY FOUNDATION
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24">

        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#D4B483]/30 bg-white dark:bg-[#241812] p-8 sm:p-10 lg:p-14 shadow-sm hover:shadow-xl transition-shadow duration-500">

          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <span className="text-xs font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                Technology Foundation
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.04em] text-[#2E1F17] dark:text-[#F8F4EB]">

                Modern technology.

                <br />

                <span className="text-[#6B4E3A] dark:text-[#D4B483]">
                  Practical outcomes.
                </span>

              </h2>

              <p className="mt-6 text-base sm:text-lg leading-8 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65 max-w-xl">
                Our solutions are built using modern development practices,
                cloud infrastructure, intelligent data systems, and
                security-conscious architecture.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-4">

              {[
                {
                  icon: Building2,
                  label: 'Engineering',
                  color: 'text-[#6B4E3A]',
                },
                {
                  icon: Cloud,
                  label: 'Cloud',
                  color: 'text-[#7C8B78]',
                },
                {
                  icon: Database,
                  label: 'Data',
                  color: 'text-[#85805D]',
                },
                {
                  icon: ShieldCheck,
                  label: 'Security',
                  color: 'text-[#A9684F]',
                },
              ].map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.label}
                    className="group p-6 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 hover:-translate-y-2 hover:border-[#D4B483]/50 hover:shadow-lg transition-all duration-300"
                  >

                    <Icon
                      className={`w-7 h-7 ${item.color} group-hover:scale-110 transition-transform`}
                    />

                    <p className="mt-5 text-base font-Clarkson font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">
                      {item.label}
                    </p>

                  </div>

                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20">

        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 px-8 py-16 sm:px-12 sm:py-20 text-center shadow-xl">

          <div className="absolute left-[15%] top-0 w-56 h-56 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="absolute right-[15%] bottom-0 w-56 h-56 rounded-full bg-[#7C8B78]/10 blur-3xl" />

          <div className="relative">

            <span className="text-xs font-Clarkson uppercase tracking-[0.25em] text-[#D4B483]">
              Your industry. Your challenge.
            </span>

            <h2 className="mt-6 max-w-3xl mx-auto text-3xl sm:text-4xl lg:text-5xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">

              Let's build something

              <span className="text-[#D4B483]">
                {' '}that fits.
              </span>

            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-8 font-Clarkson text-[#F8F4EB]/60">
              Tell us about your industry, your challenge, or the product
              you're imagining. We'll help translate it into a practical
              technology solution.
            </p>

            <div className="mt-9">

              <Link to="/signup">

                <Button
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Start a Conversation
                </Button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};