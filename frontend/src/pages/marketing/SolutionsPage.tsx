
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
      line: 'bg-[#D4B483]',
    },
    sage: {
      icon: 'bg-[#7C8B78]/15 text-[#667562]',
      glow: 'bg-[#7C8B78]/10',
      badge: 'bg-[#7C8B78]/10 text-[#667562]',
      line: 'bg-[#7C8B78]',
    },
    rose: {
      icon: 'bg-[#A87878]/15 text-[#8F6262]',
      glow: 'bg-[#A87878]/10',
      badge: 'bg-[#A87878]/10 text-[#8F6262]',
      line: 'bg-[#A87878]',
    },
    terracotta: {
      icon: 'bg-[#A9684F]/15 text-[#8D513C]',
      glow: 'bg-[#A9684F]/10',
      badge: 'bg-[#A9684F]/10 text-[#8D513C]',
      line: 'bg-[#A9684F]',
    },
    olive: {
      icon: 'bg-[#85805D]/15 text-[#706B4D]',
      glow: 'bg-[#85805D]/10',
      badge: 'bg-[#85805D]/10 text-[#706B4D]',
      line: 'bg-[#85805D]',
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

      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-14">

        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4B483]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute left-[8%] top-36 w-24 h-24 rounded-full bg-[#7C8B78]/5 blur-3xl" />

        <div className="absolute right-[8%] top-48 w-28 h-28 rounded-full bg-[#A9684F]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4B483]/40 bg-[#D4B483]/10">

            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />

            <span className="text-[10px] sm:text-[11px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#6B4E3A] dark:text-[#D4B483]">
              Industry Solutions
            </span>

          </div>

          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.03] tracking-[-0.05em]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Built for your
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              industry's reality.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#6B4E3A]/80 dark:text-[#D4B483]/75">
            We combine engineering expertise with industry context to build
            digital solutions around the challenges, regulations, and
            workflows that actually matter to your business.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <Globe2 className="w-3.5 h-3.5 text-[#D4B483]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                6 Industry Verticals
              </span>

            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <Layers3 className="w-3.5 h-3.5 text-[#7C8B78]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                36+ Capabilities
              </span>

            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <BrainCircuit className="w-3.5 h-3.5 text-[#A9684F]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Technology + Domain
              </span>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

        <div className="rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-4 sm:p-5 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4E3A]/45 dark:text-[#D4B483]/45" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search industries, capabilities..."
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

          {/* Category filters */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  shrink-0 px-4 py-2.5 rounded-xl
                  text-[10px] sm:text-[11px]
                  font-Clarkson font-semibold
                  border transition-all duration-300
                  ${
                    activeCategory === category
                      ? 'bg-[#2E1F17] text-[#F8F4EB] border-[#2E1F17] shadow-md dark:bg-[#D4B483] dark:text-[#2E1F17] dark:border-[#D4B483]'
                      : 'bg-[#F8F4EB] dark:bg-[#1A110B] text-[#6B4E3A] dark:text-[#D4B483] border-[#D4B483]/20 hover:border-[#D4B483]/60'
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
          FEATURED INDUSTRY
      ====================================================== */}

      {!search && activeCategory === 'All' && (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30">

            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#D4B483]/10 blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[#7C8B78]/5 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 p-7 sm:p-10 lg:p-14">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/20">

                  <Sparkles className="w-3 h-3 text-[#D4B483]" />

                  <span className="text-[9px] font-Clarkson uppercase tracking-[0.2em] text-[#D4B483]">
                    Featured Approach
                  </span>

                </div>

                <h2 className="mt-5 max-w-3xl font-Clarkson font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.035em] text-[#F8F4EB]">

                  Technology that understands
                  <span className="text-[#D4B483]">
                    {' '}your business.
                  </span>

                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 font-Clarkson text-[#F8F4EB]/65">
                  Great software is not just about writing code.
                  It needs to understand users, workflows, regulations,
                  data, and the environment it operates in.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">

                  {[
                    'Domain Expertise',
                    'Modern Architecture',
                    'Data & AI',
                    'Security First',
                  ].map((item) => (

                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-[#F8F4EB]/10 bg-[#F8F4EB]/5 text-[10px] font-Clarkson text-[#F8F4EB]/70"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

              {/* Visual */}
              <div className="hidden lg:flex items-center justify-center">

                <div className="relative w-36 h-36 rounded-[2.5rem] border border-[#D4B483]/20 bg-[#D4B483]/5">

                  <div className="absolute inset-5 rounded-[1.75rem] bg-[#D4B483]/10 flex items-center justify-center">

                    <Globe2 className="w-11 h-11 text-[#D4B483]" />

                  </div>

                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#7C8B78] border-4 border-[#2E1F17]" />

                  <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-[#A9684F] border-4 border-[#2E1F17]" />

                  <div className="absolute top-1/2 -right-4 w-5 h-5 rounded-full bg-[#A87878] border-2 border-[#2E1F17]" />

                </div>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          INDUSTRY CARDS
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="flex items-end justify-between mb-7">

          <div>

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              Explore Verticals
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
              Solutions for real-world industries
            </h2>

          </div>

          <span className="hidden sm:block text-[10px] font-Clarkson text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
            {filteredIndustries.length} industries
          </span>

        </div>


        {filteredIndustries.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredIndustries.map((industry, index) => {

              const Icon = industry.icon;
              const accent = accentStyles[industry.accent];

              return (

                <div
                  key={industry.title}
                  className="group relative overflow-hidden rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#D4B483]/55 transition-all duration-500"
                >

                  {/* Glow */}
                  <div
                    className={`absolute -right-16 -top-16 w-44 h-44 rounded-full ${accent.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative p-6 sm:p-7">

                    {/* Header */}
                    <div className="flex items-start justify-between">

                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent.icon}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-Clarkson font-semibold text-[#6B4E3A]/30 dark:text-[#D4B483]/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>


                    {/* Title */}
                    <div className="mt-6">

                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[8px] font-Clarkson font-bold uppercase tracking-wider ${accent.badge}`}
                      >
                        {industry.category}
                      </span>

                      <h3 className="mt-3 text-xl font-Clarkson font-bold tracking-[-0.025em] text-[#2E1F17] dark:text-[#F8F4EB]">
                        {industry.title}
                      </h3>

                    </div>


                    {/* Description */}
                    <p className="mt-3 text-xs leading-6 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
                      {industry.desc}
                    </p>


                    {/* Capabilities */}
                    <div className="mt-6">

                      <div className="flex items-center gap-2 mb-3">

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
                          Capabilities
                        </span>

                        <div className="h-px flex-1 bg-[#EFE7D5] dark:bg-[#3D2C23]" />

                      </div>

                      <div className="grid grid-cols-1 gap-2">

                        {industry.capabilities.map((capability) => (

                          <div
                            key={capability}
                            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-Clarkson text-[#6B4E3A] dark:text-[#D4B483]"
                          >

                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${accent.icon.split(' ')[1]}`}
                            />

                            {capability}

                          </div>

                        ))}

                      </div>

                    </div>


                    {/* Bottom */}
                    <div className="mt-7 pt-5 border-t border-[#EFE7D5] dark:border-[#3D2C23]">

                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] group/link"
                      >

                        Explore solution

                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />

                      </Link>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        ) : (

          <div className="py-20 rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D4B483]/10 flex items-center justify-center">

              <Search className="w-6 h-6 text-[#D4B483]" />

            </div>

            <h3 className="mt-5 font-Clarkson font-bold text-lg text-[#2E1F17] dark:text-[#F8F4EB]">
              No industries found
            </h3>

            <p className="mt-2 text-xs font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/60">
              Try another search or category.
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
          TECHNOLOGY STACK
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="relative overflow-hidden rounded-[2rem] border border-[#D4B483]/30 bg-white dark:bg-[#241812] p-7 sm:p-10 lg:p-12">

          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#D4B483]/8 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div>

              <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                Technology Foundation
              </span>

              <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
                Modern technology.
                <br />
                <span className="text-[#6B4E3A] dark:text-[#D4B483]">
                  Practical outcomes.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65 max-w-xl">
                Our solutions are built using modern development practices,
                cloud infrastructure, intelligent data systems, and
                security-conscious architecture.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-3">

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
                    className="p-5 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20"
                  >

                    <Icon className={`w-5 h-5 ${item.color}`} />

                    <p className="mt-4 text-xs font-Clarkson font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          <div className="absolute left-[20%] top-0 w-44 h-44 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="absolute right-[20%] bottom-0 w-44 h-44 rounded-full bg-[#7C8B78]/10 blur-3xl" />

          <div className="relative">

            <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#D4B483]">
              Your industry. Your challenge.
            </span>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">

              Let's build something
              <span className="text-[#D4B483]">
                {' '}that fits.
              </span>

            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#F8F4EB]/60">
              Tell us about your industry, your challenge, or the product
              you're imagining. We'll help translate it into a practical
              technology solution.
            </p>

            <div className="mt-8">

              <Link to="/signup">

                <Button
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
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
